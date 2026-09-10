import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  default: {
    override: {
      wrapper: "cloudflare-node",
      converter: "edge",
    },
    bundler: {
      externals: ["jose", "jwks-rsa", "firebase-admin"],
    },
  },
});
