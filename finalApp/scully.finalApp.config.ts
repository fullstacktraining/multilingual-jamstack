import {
  httpGetJson,
  registerPlugin,
  ScullyConfig,
  setPluginConfig,
} from '@scullyio/scully';
import { baseHrefRewrite } from '@scullyio/scully-plugin-base-href-rewrite';
// const StoryblokClient = require('storyblok-js-client');

// let Storyblok = new StoryblokClient({
//   accessToken: 'ADD_YOUR_TOKEN_HERE',
// });

setPluginConfig(baseHrefRewrite, { href: `/${process.env.LOCALE}/` });

const getArticles = async () => {
  const starts_with = process.env.LOCALE === 'en' ? 'articles' : 'es/articles';
  const response = (await httpGetJson(
    `https://api.storyblok.com/v1/cdn/stories?starts_with=${starts_with}&version=published&cv=1612549095679&token=ADD_YOUR_TOKEN_HERE`
  )) as any;

  const articles = response.stories;
  const r = articles.map((story: any) => {
    return {
      route: `/articles/${story.slug}`,
    };
  });
  return r;
  // return Storyblok.getAll('cdn/stories', {
  //   starts_with,
  //   // version: 'draft',
  // }).then((stories: any) => {
  //   const r = stories.map((story: any) => {
  //     return {
  //       route: `/articles/${story.slug}`,
  //     };
  //   });
  //   return r;
  // });
};

const fixStaticLinksPlugin = async (html: any) => {
  const regex = new RegExp('(<a[^>]* href="/)([^"]*)"', 'gmi');
  html = html.replace(regex, `$1${process.env.LOCALE}/$2"`);
  return Promise.resolve(html);
};

registerPlugin('render', 'fixStaticLinks', fixStaticLinksPlugin);
registerPlugin('router', 'getArticles', getArticles);

const defaultPostRenderers = [
  'seoHrefOptimise',
  'fixStaticLinks',
  baseHrefRewrite,
];

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'finalApp',
  outDir: `./dist/static/${process.env.LOCALE}`,
  distFolder: `./dist/finalApp/${process.env.LOCALE}`,
  defaultPostRenderers,
  routes: {
    '/articles/:slug': {
      type: 'getArticles',
    },
  },
  puppeteerLaunchOptions: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
};
