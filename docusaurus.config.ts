import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {homepage, name as projectName, description, author} from './package.json';

const appName = 'Angular Tips';
const organizationName = 'martinboue';
const repository = `https://github.com/${organizationName}/${projectName}`;

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: appName,
  tagline: description,
  favicon: 'img/favicon.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    faster: true,
    v4: true
  },

  // Set the production url of your site here
  url: homepage,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: `/`,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: organizationName, // Usually your GitHub org/user name.
  projectName: projectName, // Usually your repo name.
  
  trailingSlash: false,

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw'
    }
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: `${repository}/edit/main`,
          showLastUpdateTime: true,
          routeBasePath: '/',
          lastVersion: 'current',
          versions: {
            current: {
              label: '22',
            },
            '21': {
              banner: 'none',
            },
            '20': {
              banner: 'none',
            },
            '19': {
              banner: 'none',
            }
          }
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-JC9M5X39LR',
          anonymizeIP: true,
        }
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
    navbar: {
      title: appName,
      logo: {
        alt: `${appName} logo`,
        src: 'img/logo.svg',
      },
      hideOnScroll: true,
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownItemsBefore: [
            {
              type: 'html',
              className: 'dropdown-versions-title',
              value: '<b>Angular versions</b>',
            }
          ]
        },
        {
          href: repository,
          className: 'header-github-link',
          position: 'right',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    algolia: {
      appId: '9K5EE9F705',
      apiKey: '4bb0dda93d707f3e480714f1bac0b1c7',
      indexName: 'ngtips',
    },
    tableOfContents: {
      maxHeadingLevel: 4
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting started',
              to: '/',
            },
            {
              label: 'General',
              to: '/category/general',
            },
            {
              label: 'Component',
              to: '/category/component',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: repository,
            },
          ],
        },
        {
          title: 'Made by',
          items: [
            {
              label: author.name,
              href: 'https://martinboue.fr',
            }
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ${appName}. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.oneDark,
      additionalLanguages: ['scss', 'ignore']
    },
    announcementBar: {
      id: 'v22-released',
      content: `🎉 Angular Tips v22 is here! Show your support by starring it on <a target="_blank" rel="noopener noreferrer" href="${repository}">GitHub</a> ⭐`,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
