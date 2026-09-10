import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // FIX #9: Use correct Cloudflare config for v1.20.2+
  // Remove deprecated 'edgeExternals' - handled automatically
  // Instead, specify externals at build time in wrangler.jsonc
});
