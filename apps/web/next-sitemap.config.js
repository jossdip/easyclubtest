/**
 * Réécrit public/robots.txt à chaque build (postbuild). Les pages étant toutes rendues à la demande
 * (runtime edge), next-sitemap n'en liste aucune : le plan du site est tenu à la main dans
 * public/sitemap.xml, et robots.txt y renvoie.
 * @type {import('next-sitemap').IConfig}
 */
module.exports = {
  siteUrl: 'https://easyclub.fr',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/**'],
  robotsTxtOptions: {
    additionalSitemaps: ['https://easyclub.fr/sitemap.xml'],
  },
};
