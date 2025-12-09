// ======== Modification for file next.config.mjs locatied at [/web/next.config.mjs] =========

module.exports = [
  {
    id: "mod1",

    pattern:
      /export\s+default\s+withSentryConfig\(\s*nextConfig\s*,\s*\{[\s\S]*?\}\s*\);/,
    replacement: (match) => `export default nextConfig;`,
  },
];
