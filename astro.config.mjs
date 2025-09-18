// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://sofiaramirez.dev", // Update with your actual domain
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  integrations: [tailwind(), sitemap()],
  // Less aggressive caching strategy
  build: {
    inlineStylesheets: "auto",
  },
  // Configure caching headers for static assets
  vite: {
    build: {
      rollupOptions: {
        output: {
          // Reduce chunk size for better caching
          manualChunks: {
            vendor: ["astro"],
          },
        },
      },
    },
  },
  // Configure output for better caching
  output: "static",
});
