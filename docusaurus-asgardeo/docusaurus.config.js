// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Asgardeo',
  tagline: 'Asgardeo Learning Center',
  favicon: 'assets/images/asgardeo-favicon.svg',
  url: 'https://wso2.com',
  baseUrl: '/asgardeo/docs/',
  organizationName: 'wso2',
  projectName: 'docs-is',
  trailingSlash: true,
  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    format: 'detect',
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: '.generated-docs',
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/wso2/docs-is/edit/master/en/asgardeo/docs/',
          showLastUpdateTime: false,
          breadcrumbs: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  stylesheets: [
    '/asgardeo/docs/assets/libs/fontawesome-free-6.4.2-web/css/all.min.css',
  ],

  scripts: [
    '/asgardeo/docs/assets/js/redoc.standalone.js',
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'assets/images/asgardeo-docs-logo-dark.svg',
      navbar: {
        logo: {
          alt: 'Asgardeo',
          src: 'assets/images/asgardeo-docs-logo-dark.svg',
          srcDark: 'assets/images/asgardeo-docs-logo.svg',
        },
        items: [
          {
            href: 'https://github.com/wso2/docs-is',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Docs',
            items: [
              { label: 'Get Started', to: '/get-started' },
              { label: 'Guides', to: '/guides' },
              { label: 'APIs', to: '/apis' },
              { label: 'References', to: '/references' },
            ],
          },
          {
            title: 'Community',
            items: [
              { label: 'Discord', href: 'https://discord.com/invite/wso2' },
              { label: 'GitHub', href: 'https://github.com/wso2' },
              { label: 'YouTube', href: 'https://www.youtube.com/user/WSO2TechFlicks' },
              { label: 'X (Twitter)', href: 'https://twitter.com/intent/follow?screen_name=wso2' },
            ],
          },
          {
            title: 'Support',
            items: [
              { label: 'Stack Overflow', href: 'https://stackoverflow.com/questions/tagged/wso2-asgardeo' },
              { label: 'Send us an email', href: 'mailto:asgardeo-help@wso2.com' },
            ],
          },
          {
            title: 'More',
            items: [
              { label: 'Asgardeo Console', href: 'https://console.asgardeo.io/' },
              { label: 'WSO2', href: 'https://wso2.com/' },
            ],
          },
        ],
        copyright: `Copyright &copy; ${new Date().getFullYear()} WSO2 LLC. All Rights Reserved.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['java', 'bash', 'yaml', 'json'],
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: false,
        },
      },
    }),
};

export default config;
