const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { test } = require('node:test');
const vm = require('node:vm');

const source = readFileSync(`${__dirname}/../assets/js/product-toggle.js`, 'utf8');
const sharedPage = 'guides/applications/register-single-page-app/';
const cloudBase = 'https://wso2.com/asgardeo/docs/';
const serverBase = 'https://is.docs.wso2.com/en/latest/';

function setup({ pathname, pageUrl = sharedPage, active = 'cloud', target = serverBase }) {
  function element(attributes = {}) {
    const classes = new Set();
    return {
      attributes, style: {}, classList: {
        add(name) { classes.add(name); },
        remove(name) { classes.delete(name); },
        contains(name) { return classes.has(name); }
      },
      getAttribute(name) { return this.attributes[name] ?? null; },
      setAttribute(name, value) { this.attributes[name] = value; },
      removeAttribute(name) { delete this.attributes[name]; },
      addEventListener(name, callback) { this[name] = callback; }
    };
  }
  const buttons = ['cloud', 'onprem'].map(choice => element({
    'data-choice': choice, 'aria-pressed': String(choice === active)
  }));
  const thumb = element();
  const status = { hidden: true, textContent: '' };
  const toggle = element({
    'data-active': active, 'data-page-url': pageUrl,
    'data-target-url': target
  });
  toggle.querySelectorAll = () => buttons;
  toggle.querySelector = selector => selector.endsWith('-thumb') ? thumb
    : selector.endsWith('-status') ? status
    : buttons.find(button => selector.includes(`"${button.getAttribute('data-choice')}"`));
  let now = 0;
  let timerId = 0;
  const timers = new Map();
  const scripts = [];
  const location = { pathname, hash: '#configuration', href: 'unchanged' };
  const listeners = {};
  const window = {
    location, addEventListener(name, callback) { (listeners[name] ||= []).push(callback); },
    setTimeout(callback, delay) { timers.set(++timerId, { at: now + delay, callback }); return timerId; },
    clearTimeout(id) { timers.delete(id); }
  };
  const document = {
    querySelector: () => toggle,
    createElement: () => ({ remove() {} }),
    head: { appendChild(script) { scripts.push(script); } }
  };
  vm.runInNewContext(source, { window, document });
  async function flush() { for (let i = 0; i < 8; i++) await Promise.resolve(); }
  async function advance(ms) {
    const until = now + ms;
    while (true) {
      const next = [...timers.entries()].filter(([, timer]) => timer.at <= until)
        .sort((a, b) => a[1].at - b[1].at)[0];
      if (!next) break;
      timers.delete(next[0]); now = next[1].at; next[1].callback(); await flush();
    }
    now = until; await flush();
  }
  return {
    window, toggle, status, scripts, advance, buttons, thumb,
    dispatch(name, event = {}) { (listeners[name] || []).forEach(callback => callback(event)); },
    click(choice = active === 'cloud' ? 'onprem' : 'cloud') {
      buttons.find(button => button.getAttribute('data-choice') === choice).click();
    },
    async load(pages) {
      window.__WSO2_DOCS_MANIFEST__ = pages;
      scripts.at(-1).onload(); await flush();
    },
    async fail() { scripts.at(-1).onerror(); await flush(); }
  };
}

for (const prefix of ['/asgardeo/docs/', '/identity-platform/docs/', '/preview/']) {
  test(`SaaS ${prefix} preserves the matching page and section`, async () => {
    const app = setup({ pathname: prefix + sharedPage });
    assert.equal(app.scripts[0].src, serverBase + 'page-manifest.js');
    await app.load([sharedPage]); app.click(); await app.advance(220);
    assert.equal(app.window.location.href, serverBase + sharedPage + '#configuration');
  });
}

for (const version of ['7.0.0', '7.1.0', '7.2.0', '7.3.0', 'latest', 'next']) {
  test(`IS ${version} preserves the matching page through the SaaS redirect URL`, async () => {
    const app = setup({ pathname: `/en/${version}/${sharedPage}`, active: 'onprem', target: cloudBase });
    assert.equal(app.scripts[0].src, cloudBase + 'page-manifest.js');
    await app.load([sharedPage]); app.click(); await app.advance(220);
    assert.equal(app.window.location.href, cloudBase + sharedPage + '#configuration');
  });
}

for (const active of ['cloud', 'onprem']) {
  const target = active === 'cloud' ? serverBase : cloudBase;
  test(`${active}: missing page goes home without the old section`, async () => {
    const app = setup({ pathname: '/docs/unique/', pageUrl: 'unique/', active, target });
    await app.load(['', sharedPage]); app.click(); await app.advance(220);
    assert.equal(app.window.location.href, target);
  });
  test(`${active}: homepage switches without waiting for the page list`, async () => {
    const app = setup({ pathname: '/docs/', pageUrl: './', active, target });
    app.click(); await app.advance(220);
    assert.equal(app.window.location.href, target);
  });
}

test('an early click waits for the manifest instead of sending a matching page home', async () => {
  const app = setup({ pathname: '/identity-platform/docs/' + sharedPage });
  app.click(); await app.advance(1200);
  assert.equal(app.window.location.href, 'unchanged');
  assert.equal(app.toggle.getAttribute('aria-busy'), 'true');
  await app.load([sharedPage]);
  assert.equal(app.window.location.href, serverBase + sharedPage + '#configuration');
});

test('rapid clicks cannot queue competing navigations', async () => {
  const app = setup({ pathname: '/identity-platform/docs/' + sharedPage });
  app.click('onprem'); app.click('cloud'); await app.advance(220);
  assert.equal(app.toggle.getAttribute('data-active'), 'onprem');
  await app.load([sharedPage]);
  assert.equal(app.window.location.href, serverBase + sharedPage + '#configuration');
});

for (const failure of ['network', 'invalid manifest', 'timeout']) {
  test(`${failure} keeps the current page, restores the pill, and allows retry`, async () => {
    const app = setup({ pathname: '/asgardeo/docs/' + sharedPage });
    app.click(); await app.advance(220);
    if (failure === 'network') await app.fail();
    else if (failure === 'invalid manifest') await app.load(undefined);
    else await app.advance(8000);
    assert.equal(app.window.location.href, 'unchanged');
    assert.equal(app.toggle.getAttribute('data-active'), 'cloud');
    assert.equal(app.toggle.getAttribute('aria-busy'), null);
    assert.equal(app.status.hidden, false);
    app.click(); await app.advance(220);
    assert.equal(app.scripts.length, 2);
    await app.load([sharedPage]);
    assert.equal(app.window.location.href, serverBase + sharedPage + '#configuration');
  });
}

test('a failed preload is retried when the user clicks', async () => {
  const app = setup({ pathname: '/asgardeo/docs/' + sharedPage });
  await app.fail(); app.click(); await app.advance(220);
  assert.equal(app.scripts.length, 2);
  await app.load([sharedPage]);
  assert.equal(app.window.location.href, serverBase + sharedPage + '#configuration');
});

test('rendered page URLs handle index.html and non-directory output without guessing', async () => {
  const app = setup({ pathname: '/identity-platform/docs/guide/index.html', pageUrl: 'guide/' });
  await app.load(['guide/']); app.click(); await app.advance(220);
  assert.equal(app.window.location.href, serverBase + 'guide/#configuration');
  const html = setup({ pathname: '/identity-platform/docs/guide.html', pageUrl: 'guide.html' });
  await html.load(['guide.html']); html.click(); await html.advance(220);
  assert.equal(html.window.location.href, serverBase + 'guide.html#configuration');
});

for (const active of ['cloud', 'onprem']) {
  test(`${active}: Back/Forward restores the product and allows switching again`, async () => {
    const target = active === 'cloud' ? serverBase : cloudBase;
    const app = setup({ pathname: '/docs/' + sharedPage, active, target });
    await app.load([sharedPage]);
    for (let visit = 0; visit < 2; visit++) {
      app.click(); await app.advance(220);
      assert.equal(app.window.location.href, target + sharedPage + '#configuration');
      app.dispatch('pagehide', { persisted: true });
      app.window.location.href = 'restored';
      app.dispatch('pageshow', { persisted: true });
      assert.equal(app.toggle.getAttribute('data-active'), active);
      assert.equal(app.toggle.getAttribute('aria-busy'), null);
      assert.equal(app.thumb.classList.contains('wso2-product-switch-thumb--animate'), false);
      assert.equal(app.buttons.find(b => b.getAttribute('data-choice') === active).getAttribute('aria-pressed'), 'true');
      assert.equal(app.status.hidden, true);
      app.click(active); await app.advance(220);
      assert.equal(app.window.location.href, 'restored');
    }
  });
}

test('leaving during the slide does not resume an old navigation after Back', async () => {
  const app = setup({ pathname: '/docs/' + sharedPage });
  await app.load([sharedPage]);
  app.click(); await app.advance(100);
  app.dispatch('pagehide', { persisted: true });
  app.dispatch('pageshow', { persisted: true });
  await app.advance(220);
  assert.equal(app.window.location.href, 'unchanged');
  app.click(); await app.advance(220);
  assert.equal(app.window.location.href, serverBase + sharedPage + '#configuration');
});

test('a manifest finishing after Back cannot navigate for an old click', async () => {
  const app = setup({ pathname: '/docs/' + sharedPage });
  app.click(); await app.advance(220);
  app.dispatch('pagehide', { persisted: true });
  app.dispatch('pageshow', { persisted: true });
  await app.load([sharedPage]);
  assert.equal(app.window.location.href, 'unchanged');
  app.click(); await app.advance(220);
  assert.equal(app.window.location.href, serverBase + sharedPage + '#configuration');
});

test('an old failed request cannot reset a new click after Back', async () => {
  const app = setup({ pathname: '/docs/' + sharedPage });
  app.click(); await app.advance(220);
  app.dispatch('pagehide', { persisted: true });
  app.dispatch('pageshow', { persisted: true });
  app.click(); await app.fail();
  assert.equal(app.toggle.getAttribute('data-active'), 'onprem');
  assert.equal(app.status.hidden, true);
  await app.advance(220);
  await app.load([sharedPage]);
  assert.equal(app.window.location.href, serverBase + sharedPage + '#configuration');
});

test('a static error page without a MkDocs page URL switches to the destination homepage', async () => {
  const app = setup({ pathname: '/identity-platform/docs/missing/', pageUrl: null });
  app.click(); await app.advance(220);
  assert.equal(app.window.location.href, serverBase);
});
