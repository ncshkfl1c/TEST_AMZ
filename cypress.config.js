const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    userAgent:
      "Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Mobile Safari/537.36", //config mobile device
    pageLoadTimeout: 5000,
    defaultCommandTimeout: 5000,
    viewportWidth: 1200,
    viewportHeight: 800,
    chromeWebSecurity: false,
    experimentalSessionAndOrigin: true,
    experimentalFetchPolyfill: true,
    setupNodeEvents: require("dd-trace/ci/cypress/plugin"),
    supportFile: "cypress/support/index.js",
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser = {}, launchOptions) => {
        if (browser.name === "chrome") {
          launchOptions.args.push("--lang=en");
          return launchOptions;
        }
      });
    },
  },
});
