/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://easyclub.fr',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/**'],
};
