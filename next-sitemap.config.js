/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://arvaya.in",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/api/", "/account/", "/checkout/"] },
    ],
  },
  exclude: ["/api/*", "/account", "/checkout"],
  changefreq: "weekly",
  priority: 0.7,
  additionalPaths: async () => [
    { loc: "/quiz", changefreq: "monthly", priority: 0.9 },
    { loc: "/quiz/start", changefreq: "monthly", priority: 0.8 },
  ],
};
