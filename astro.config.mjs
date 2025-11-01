import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import svelte from "@astrojs/svelte";

export default defineConfig({
  output: 'server',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [svelte()],
});