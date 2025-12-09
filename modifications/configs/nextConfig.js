// ======== Modification for file next.config.mjs locatied at [/web/next.config.mjs] =========

module.exports = [
  {
    id: "mod1",

    pattern: /export\s+default\s+withBundleAnalyzer\(\s*sentryConfig\s*\);/,
    replacement: (match) => `export default nextConfig;`,
  },
];
