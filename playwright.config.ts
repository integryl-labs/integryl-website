import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  use: { baseURL: "http://localhost:3100" },
  webServer: {
    command: "npm run build && npx next start -p 3100",
    // Switch Formspree off so tests never send a real inquiry.
    env: { FORMSPREE_FORM_ID: "" },
    url: "http://localhost:3100",
    timeout: 180_000,
    reuseExistingServer: true,
  },
});
