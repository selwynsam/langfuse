// ======== Modification for file entitlements.ts locatied at [/web/src/features/entitlements/constants/entitlements.ts] =========

module.exports = [
  // Add playground module to selfHostedAllPlansEntitlements array
  {
    id: "mod1",
    pattern:
      /(const\s+selfHostedAllPlansEntitlements:\s*Entitlement\[\]\s*=\s*\[)([^\]]*)(\])/,
    replacement: (match, p1, p2, p3) => {
      // Check if the array is empty or only contains whitespace
      const newArrayContent = p2.trim()
        ? `${p2}, "playground"`
        : `"playground"`;

      return `${p1}${newArrayContent}${p3}`;
    },
  },
];
