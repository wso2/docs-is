(function () {
  'use strict';

  const Icons = {
    Copy: `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z" /><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z" /></svg>`,
    Markdown: `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M14.85 3c.63 0 1.15.52 1.14 1.15v7.7c0 .63-.51 1.15-1.15 1.15H1.15C.52 13 0 12.48 0 11.84V4.15C0 3.52.52 3 1.15 3h13.7zM9 11V5H7l-1.5 2.25L4 5H2v6h2V8l1.5 2L7 8v3h2zm2.99.5L14.5 8H13V5h-2v3H9.5l2.49 3.5z" /></svg>`,
    Chevron: `<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true" class="copy-page-chevron-icon"><path d="M2.22 4.47a.75.75 0 011.06 0L6 7.19l2.72-2.72a.75.75 0 111.06 1.06l-3.25 3.25a.75.75 0 01-1.06 0L2.22 5.53a.75.75 0 010-1.06z" /></svg>`,
    External: `<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true" class="copy-page-external-icon"><path d="M3.5 3a.5.5 0 00-.5.5v5a.5.5 0 00.5.5h5a.5.5 0 00.5-.5V6.5a.5.5 0 011 0v2A1.5 1.5 0 018.5 10h-5A1.5 1.5 0 012 8.5v-5A1.5 1.5 0 013.5 2h2a.5.5 0 010 1h-2z" /><path d="M7 1.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-1 0V2.707L6.354 6.354a.5.5 0 11-.708-.708L9.293 2H7.5a.5.5 0 01-.5-.5z" /></svg>`,
    ChatGPT: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.896zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" /></svg>`,
    Claude: `<svg width="16" height="16" viewBox="0 0 256 257" fill="currentColor" aria-hidden="true"><path d="m50.228 170.321 50.357-28.257.843-2.463-.843-1.361h-2.462l-8.426-.518-28.775-.778-24.952-1.037-24.175-1.296-6.092-1.297L0 125.796l.583-3.759 5.12-3.434 7.324.648 16.202 1.101 24.304 1.685 17.629 1.037 26.118 2.722h4.148l.583-1.685-1.426-1.037-1.101-1.037-25.147-17.045-27.22-18.017-14.258-10.37-7.713-5.25-3.888-4.925-1.685-10.758 7-7.713 9.397.649 2.398.648 9.527 7.323 20.35 15.75L94.817 91.9l3.889 3.24 1.555-1.102.195-.777-1.75-2.917-14.453-26.118-15.425-26.572-6.87-11.018-1.814-6.61c-.648-2.723-1.102-4.991-1.102-7.778l7.972-10.823L71.42 0 82.05 1.426l4.472 3.888 6.61 15.101 10.694 23.786 16.591 32.34 4.861 9.592 2.592 8.879.973 2.722h1.685v-1.556l1.36-18.211 2.528-22.36 2.463-28.776.843-8.1 4.018-9.722 7.971-5.25 6.222 2.981 5.12 7.324-.713 4.73-3.046 19.768-5.962 30.98-3.889 20.739h2.268l2.593-2.593 10.499-13.934 17.628-22.036 7.778-8.749 9.073-9.657 5.833-4.601h11.018l8.1 12.055-3.628 12.443-11.342 14.388-9.398 12.184-13.48 18.147-8.426 14.518.778 1.166 2.01-.194 30.46-6.481 16.462-2.982 19.637-3.37 8.88 4.148.971 4.213-3.5 8.62-20.998 5.184-24.628 4.926-36.682 8.685-.454.324.519.648 16.526 1.555 7.065.389h17.304l32.21 2.398 8.426 5.574 5.055 6.805-.843 5.184-12.962 6.611-17.498-4.148-40.83-9.721-14-3.5h-1.944v1.167l11.666 11.406 21.387 19.314 26.767 24.887 1.36 6.157-3.434 4.86-3.63-.518-23.526-17.693-9.073-7.972-20.545-17.304h-1.36v1.814l4.73 6.935 25.017 37.59 1.296 11.536-1.814 3.76-6.481 2.268-7.13-1.297-14.647-20.544-15.1-23.138-12.185-20.739-1.49.843-7.194 77.448-3.37 3.953-7.778 2.981-6.48-4.925-3.436-7.972 3.435-15.749 4.148-20.544 3.37-16.333 3.046-20.285 1.815-6.74-.13-.454-1.49.194-15.295 20.999-23.267 31.433-18.406 19.702-4.407 1.75-7.648-3.954.713-7.064 4.277-6.286 25.47-32.405 15.36-20.092 9.917-11.6-.065-1.686h-.583L44.07 198.125l-12.055 1.555-5.185-4.86.648-7.972 2.463-2.593 20.35-13.999-.064.065Z" /></svg>`,
    Perplexity: `<svg width="16" height="16" viewBox="0 0 34 38" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.12114 0.0400391L15.919 9.98864V9.98636V0.062995H18.0209V10.0332L28.8671 0.0400391V11.3829H33.3202V27.744H28.8808V37.8442L18.0209 28.303V37.9538H15.919V28.4604L5.13338 37.96V27.744H0.680176V11.3829H5.12114V0.0400391ZM14.3344 13.4592H2.78208V25.6677H5.13074V21.8167L14.3344 13.4592ZM7.23518 22.7379V33.3271L15.919 25.6786V14.8506L7.23518 22.7379ZM18.0814 25.5775V14.8404L26.7677 22.7282V27.744H26.7789V33.219L18.0814 25.5775ZM28.8808 25.6677H31.2183V13.4592H19.752L28.8808 21.7302V25.6677ZM26.7652 11.3829V4.81584L19.6374 11.3829H26.7652ZM14.3507 11.3829H7.22306V4.81584L14.3507 11.3829Z" /></svg>`
  };

  function getFlattenedMarkdownUrlFromHtmlUrl(htmlUrl) {
    const u = new URL(htmlUrl);
    u.hash = ''; u.search = '';

    // Strip index.html AND .html extension
    let cleanPath = u.pathname
      .replace(/\/index\.html$/, '/')
      .replace(/\.html$/, '')
      .replace(/\/$/, '');

    const segments = cleanPath.split('/').filter(Boolean);

    if (segments.length === 0) { u.pathname = '/index.md'; return u.href; }

    const folderName = segments[segments.length - 1];
    const parentSegments = segments.slice(0, -1);
    const parentPath = parentSegments.join('/');

    const isVersion = /^\d+\.\d+\.\d+$/.test(folderName);
    const isLangOrVersion = isVersion || ['en', 'next', 'latest'].includes(folderName);
    
    if (isLangOrVersion) { u.pathname = `/${segments.join('/')}/index.md`; } 
    else { u.pathname = parentPath ? `/${parentPath}/${folderName}.md` : `/${folderName}.md`; }
    
    return u.href;
  }

  async function fetchFlattenedMarkdownForCurrentPage() {
    const mdUrl = getFlattenedMarkdownUrlFromHtmlUrl(window.location.href);
    const res = await fetch(mdUrl, { cache: 'no-cache' });
    if (!res.ok) throw new Error("Fetch failed");
    return await res.text();
  }

  function createCopyPageButton() {
    const container = document.createElement('div');
    container.className = 'copy-page-container';

    const button = document.createElement('button');
    button.className = 'copy-page-button header-group-btn'; 
    button.setAttribute('aria-expanded', 'false');
    button.innerHTML = `${Icons.Copy} <span class="btn-text">Use Page in AI</span> ${Icons.Chevron}`;

    const backdrop = document.createElement('div');
    backdrop.className = 'copy-page-backdrop';

    const menu = document.createElement('div');
    menu.className = 'copy-page-menu';
    menu.innerHTML = `
      <button class="copy-page-item cp-copy">${Icons.Copy}<div class="copy-page-item-text"><span class="copy-page-item-title">Copy page</span><span class="copy-page-item-desc">Markdown for LLMs</span></div></button>
      <button class="copy-page-item cp-view">${Icons.Markdown}<div class="copy-page-item-text"><span class="copy-page-item-title">View Markdown</span><span class="copy-page-item-desc">Open as plain text</span></div></button>
      <div class="copy-page-divider"></div>
      <button class="copy-page-item cp-chatgpt">${Icons.ChatGPT}<div class="copy-page-item-text"><span class="copy-page-item-title">Open in ChatGPT</span></div>${Icons.External}</button>
      <button class="copy-page-item cp-claude">${Icons.Claude}<div class="copy-page-item-text"><span class="copy-page-item-title">Open in Claude</span></div>${Icons.External}</button>
      <button class="copy-page-item cp-perplexity">${Icons.Perplexity}<div class="copy-page-item-text"><span class="copy-page-item-title">Open in Perplexity</span></div>${Icons.External}</button>
    `;

    container.appendChild(button); container.appendChild(backdrop); container.appendChild(menu);

    let isOpen = false;
    const setOpen = (open) => {
      isOpen = open; button.setAttribute('aria-expanded', open.toString());
      if (open) { menu.style.display = 'block'; menu.classList.add('active'); backdrop.classList.add('active'); } 
      else { menu.classList.remove('active'); menu.style.display = 'none'; backdrop.classList.remove('active'); }
    };


    button.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); setOpen(!isOpen); });
    backdrop.addEventListener('click', () => setOpen(false));
    window.addEventListener('scroll', () => { if (isOpen) setOpen(false); }, { passive: true });

    menu.querySelector('.cp-copy').addEventListener('click', async () => {
      const btnText = button.querySelector('.btn-text');
      try {
        btnText.innerText = 'Fetching...';
        const markdown = await fetchFlattenedMarkdownForCurrentPage();
        await navigator.clipboard.writeText(markdown);
        btnText.innerText = 'Copied!';
        button.classList.add('copied-success');
      } catch (err) { btnText.innerText = 'ERROR'; } 
      finally { setOpen(false); setTimeout(() => { btnText.innerText = 'Use Page in AI'; button.classList.remove('copied-success'); }, 2000); }
    });

    menu.querySelector('.cp-view').addEventListener('click', async () => {
    const mdUrl = getFlattenedMarkdownUrlFromHtmlUrl(window.location.href);
    try {
      const res = await fetch(mdUrl);
      if (!res.ok) throw new Error();
      const markdown = await res.text();
      
      // Create a new blob with the plain text type
      const blob = new Blob([markdown], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      
      // Open this temporary URL in a new tab
      window.open(url, '_blank');
      
      // Clean up memory after a short delay
      setTimeout(() => URL.revokeObjectURL(url), 100);
    } catch (err) {
    alert("Could not open Markdown view. Please try 'Copy page' instead.");
    }
    setOpen(false);
    });
    
    const aiLinks = { '.cp-chatgpt': 'https://chat.openai.com/?q=', '.cp-claude': 'https://claude.ai/new?q=', '.cp-perplexity': 'https://www.perplexity.ai/?q=' };
    Object.entries(aiLinks).forEach(([selector, url]) => {
      menu.querySelector(selector).addEventListener('click', () => {
        window.open(url + encodeURIComponent('Read this: ' + getFlattenedMarkdownUrlFromHtmlUrl(window.location.href)), '_blank');
        setOpen(false);
      });
    });

    return container;
  }

  Icons.FullGuide = `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l3.414 3.414c.329.328.513.773.513 1.237v8.086A1.75 1.75 0 0113.75 15h-10A1.75 1.75 0 012 13.25V1.75zm1.75-.25a.25.25 0 00-.25.25v11.5c0 .138.112.25.25.25h10a.25.25 0 00.25-.25V5.5h-2.75A1.75 1.75 0 019.5 3.75V1.5h-5.75zM11 1.5v2.25a.25.25 0 00.25.25H13.5L11 1.5z"/></svg>`;

  function getFullGuideUrl(htmlUrl) {
    const u = new URL(htmlUrl);
    const segments = u.pathname.split('/').filter(Boolean);
    const cgIndex = segments.indexOf('complete-guides');
    
    if (cgIndex !== -1 && segments.length > cgIndex + 1) {
      const framework = segments[cgIndex + 1];
      const root = segments.slice(0, cgIndex).join('/');
      return `${u.origin}${root ? '/' + root : ''}/complete-guides/${framework}.md`;
    }
    return null;
  }

  function createFullGuideButton(guideUrl) {
    const btn = document.createElement('button');
    btn.className = 'copy-page-button header-group-btn full-guide-btn';
    btn.style.marginLeft = '8px'; // Space from the standard "Copy Page"
    btn.innerHTML = `${Icons.FullGuide} <span class="btn-text">Copy Complete Guide for AI</span>`;

    btn.addEventListener('click', async () => {
      const btnText = btn.querySelector('.btn-text');
      try {
        btnText.innerText = 'Fetching Guide...';
        const res = await fetch(guideUrl, { cache: 'no-cache' });
        if (!res.ok) throw new Error();
        const text = await res.text();
        await navigator.clipboard.writeText(text);
        btnText.innerText = 'Complete Guide Copied!';
        btn.classList.add('copied-success');
      } catch (err) {
        btnText.innerText = 'Error Fetching';
      } finally {
        setTimeout(() => {
          btnText.innerText = 'Copy Complete Guide for AI';
          btn.classList.remove('copied-success');
        }, 2000);
      }
    });
    return btn;
  }

  function init() {
    // 1. Prevent multiple injections
    if (document.querySelector('.copy-page-container')) return;
    
    // Checks if the main title contains "404" to avoid showing buttons on error pages
    const pageTitle = document.title || "";
    const h1Text = document.querySelector('h1')?.innerText || "";
    if (pageTitle.includes("404") || h1Text.includes("404")) {
      return;
    }

    // 3. Homepage Detection Logic
    const u = new URL(window.location.href);
    const segments = u.pathname.split('/').filter(Boolean);
    
    if (segments.length <= 2) {
      // This is likely /en/, /en/latest/, or /en/7.2.0/
      return; 
    }

    const title = document.querySelector('article h1') || document.querySelector('.md-content h1');
    if (title) {
      observer.disconnect();
      const container = createCopyPageButton();
      
      const fullGuideUrl = getFullGuideUrl(window.location.href);
      if (fullGuideUrl) {
        const fullGuideBtn = createFullGuideButton(fullGuideUrl);
        container.appendChild(fullGuideBtn);
      }

      title.insertAdjacentElement('afterend', container);
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  const observer = new MutationObserver((mutations) => {
    if (!document.querySelector('.copy-page-container')) {
      init();
    }
  });

  init();
  observer.observe(document.body, { childList: true, subtree: true });

})();
