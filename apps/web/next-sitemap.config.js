/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://easyclub.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/**'],
};
