import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {name as projectName, description, author} from './package.json';

const appName = 'Angular Tips';
const organizationName = 'martinboue';
const repository = `https://github.com/${organizationName}/${projectName}`;

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: appName,
  tagline: description,
  favicon: 'img/favicon.png',

  // Set the production url of your site here
  url: `https://${organizationName}.github.io/`,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: `/${projectName}/`,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: organizationName, // Usually your GitHub org/user name.
  projectName: projectName, // Usually your repo name.
  
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

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
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
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
          label: 'Docs',
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
      appId: '2ILZS3R8JA',
      apiKey: '8acfd050f8e1e0854b3f49f80ec46a26',
      indexName: 'martinboueio',
    },
    tableOfContents: {
      maxHeadingLevel: 4
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Docs',
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
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['scss']
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
