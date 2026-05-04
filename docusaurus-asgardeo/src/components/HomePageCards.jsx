import React, { useEffect } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

const columnData = [
  {
    cards: [
      {
        title: 'Get Started',
        icon: 'rocket',
        iconColor: 'icon-color-1',
        links: [
          { title: 'Create Account', url: '/get-started/create-asgardeo-account/' },
          { title: 'Connect React App', url: '/quick-starts/react/' },
          { title: 'Connect Angular App', url: '/quick-starts/angular/' },
          { title: 'Connect Javascript App', url: '/quick-starts/javascript/' },
          { title: 'Connect Next.js App', url: '/quick-starts/nextjs/' },
          { title: 'Connect Express.js App', url: '/complete-guides/expressjs/introduction/' },
          { title: 'Connect .NET App', url: '/complete-guides/dotnet/introduction/' },
          { title: 'Connect Spring Boot App', url: '/quick-starts/springboot/' },
        ],
      },
    ],
  },
  {
    cards: [
      {
        title: 'Guides',
        icon: 'book',
        iconColor: 'icon-color-4',
        links: [
          { title: 'Applications', url: '/guides/applications/' },
          { title: 'Authentication', url: '/guides/authentication/' },
          { title: 'API authorization', url: '/guides/authorization/' },
          { title: 'Branding', url: '/guides/branding/' },
          { title: 'User management', url: '/guides/users/' },
          { title: 'User self-service', url: '/guides/user-self-service/' },
          { title: 'Organizations', url: '/guides/organization-management/' },
        ],
      },
    ],
  },
  {
    cards: [
      {
        title: 'Developer Resources',
        icon: 'tools',
        iconColor: 'icon-color-3',
        links: [
          { title: 'APIs', url: '/apis/' },
          { title: 'Tutorials', url: '/tutorials/' },
          { title: 'SDKs and Integrations', url: '/sdks/' },
        ],
      },
      {
        title: 'Community and Support',
        icon: 'light-bulb',
        iconColor: 'icon-color-2',
        links: [
          { title: 'Community Help', url: 'https://discord.com/invite/wso2', external: true },
          { title: 'Enterprise Support', url: 'https://wso2.com/asgardeo/pricing/', external: true },
        ],
      },
    ],
  },
];

const iconSvgs = {
  rocket: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
      <path d="M14.491 1c-2.198.148-5.757 1.007-8.134 3.229L4.29 3.153 1.745 5.804l2.698.67c-.455 1.084-1.126 3.243-.506 5.104l-.87 1.305L1.5 14.5l1.617-1.567.87-1.304c1.693.564 3.626.031 4.991-.44l.67 2.698 2.651-2.545-1.076-2.067c2.223-2.378 3.072-5.943 3.219-8.13.017-.262-.22-.48-.482-.463z" />
    </svg>
  ),
  book: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
      <path d="M0 1.75A.75.75 0 01.75 1h4.253c1.227 0 2.317.59 3 1.501A3.744 3.744 0 0111.006 1h4.245a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75h-4.507a2.25 2.25 0 00-1.591.659l-.622.621a.75.75 0 01-1.06 0l-.622-.621A2.25 2.25 0 005.258 13H.75a.75.75 0 01-.75-.75V1.75zm8.755 3a2.25 2.25 0 012.25-2.25H14.5v9h-3.757c-.71 0-1.4.201-1.992.572l.004-7.322zm-1.504 7.324.004-5.073-.002-2.253A2.25 2.25 0 005.003 2.5H1.5v9h3.757a3.75 3.75 0 011.994.574z" />
    </svg>
  ),
  tools: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
      <path d="M4.5 4.5a3 3 0 00-3 3v.5h6v-.5a3 3 0 00-3-3zM8 8v.5A3.5 3.5 0 014.5 12h-3a.5.5 0 01-.5-.5v-4A3.5 3.5 0 014.5 4h.5v-.5A3.5 3.5 0 018.5 0h6a.5.5 0 01.5.5v4a.5.5 0 01-.5.5h-6A3.5 3.5 0 018 8zm1-4.5V8a2.5 2.5 0 005 0V4a2.5 2.5 0 00-5 0zm5 .5v3a1.5 1.5 0 01-3 0V4a1.5 1.5 0 013 0zM8 8.5V12a3.5 3.5 0 003.5 3.5h3a.5.5 0 00.5-.5v-4a.5.5 0 00-.5-.5h-3A3.5 3.5 0 008 7v1.5z" />
    </svg>
  ),
  'light-bulb': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
      <path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 01-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 00-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.767 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319a8.47 8.47 0 00-.543.681c-.206.3-.33.565-.37.847a.751.751 0 01-1.485-.212c.086-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.09.147-.173.215-.253.56-.679.984-1.32.984-2.304 0-2.06-1.637-3.75-4-3.75zM5.75 12h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 010-1.5zM6 15.25a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 01-.75-.75z" />
    </svg>
  ),
};

function ArrowIcon() {
  return (
    <svg width="11" height="15" viewBox="0 -3 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.95801 0.0537109L10.748 4.83643L5.95801 9.62646L5.21094 8.88672L8.76318 5.36377L0.0473633 5.34912V4.33105L8.74854 4.31641L5.21094 0.793457L5.95801 0.0537109Z" fill="currentColor" />
    </svg>
  );
}

function HomeCard({ title, icon, iconColor, links }) {
  return (
    <div className="md-card md-column-grid-item">
      <div className="md-column-grid-item-header-container">
        <div className="md-column-grid-item-header-text">{title}</div>
        <div className={`md-column-grid-item-header-icon ${iconColor}`}>
          {iconSvgs[icon]}
        </div>
      </div>
      {links.map((link, i) => (
        <div className="md-list-item-container" key={i}>
          <div className="md-list-item">
            {link.external ? (
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                <div className="md-list-item-icon"><ArrowIcon /></div>
                <div className="md-list-item-text">{link.title}</div>
              </a>
            ) : (
              <a href={useBaseUrl(link.url.slice(1))}>
                <div className="md-list-item-icon"><ArrowIcon /></div>
                <div className="md-list-item-text">{link.title}</div>
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HomePageCards() {
  useEffect(() => {
    const el = document.getElementById('asgardeo-home');
    if (!el) return;

    // Walk up to find the main content column
    let markdownEl = el.parentElement;
    while (markdownEl && !markdownEl.classList.contains('theme-doc-markdown')) {
      markdownEl = markdownEl.parentElement;
    }
    if (markdownEl) {
      markdownEl.style.maxWidth = '100%';
      markdownEl.style.padding = '0';
    }

    // Find and expand the content column
    const docItemCol = el.closest('.docItemCol_VOVn');
    if (docItemCol) {
      docItemCol.style.maxWidth = '100%';
    }

    // Hide TOC sidebar column
    const docItemColEl = el.closest('.docItemCol_VOVn');
    if (docItemColEl) {
      const row = docItemColEl.parentElement;
      if (row) {
        for (const child of row.children) {
          if (!child.classList.contains('docItemCol_VOVn')) {
            child.style.display = 'none';
          }
        }
      }
    }

    // Widen the container
    const container = el.closest('.container');
    if (container) {
      container.style.maxWidth = '100%';
    }
  }, []);

  return (
    <>
      <style>{`
        .theme-doc-markdown:has(#asgardeo-home) {
          max-width: 100% !important;
          padding: 0 !important;
          margin: 0 auto 3rem !important;
        }
        .docMainContainer_TBSr .container:has(#asgardeo-home) {
          max-width: 100% !important;
        }
        #asgardeo-home {
          max-width: 1400px;
          margin: 0 auto;
        }
        .md-column-grid {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 0;
        }
        .md-grid-column {
          width: 32%;
          flex-shrink: 0;
        }
        @media (max-width: 996px) {
          .md-column-grid {
            flex-direction: column;
          }
          .md-grid-column {
            width: 100%;
          }
        }
      `}</style>
      <div id="asgardeo-home" className="home-page-container">
      <div className="md-home-gradient" />
      <div className="md-home-search-container">
        <h1 className="md-home-search-input-label">How can we help?</h1>
        <p className="md-home-search-input-description">
          Welcome to Asgardeo documentation! Within these pages,
          you will learn how to build a seamless login experience for your applications using
          Asgardeo.
        </p>
      </div>
      <div className="md-home-sections md-column-grid">
        {columnData.map((column, i) => (
          <div className="md-grid-column" key={i}>
            {column.cards.map((card, j) => (
              <HomeCard key={j} {...card} />
            ))}
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
