const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "./cypress/cucumber-json",
  reportPath: "./reports",
  metadata: {
    browser: {
      name: "Chrome",
      version: "117",
    },
    device: "Local test machine",
    platform: {
      name: "Linux Mint",
      version: "20.1 Ulyssa",
    },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "Cypress 13 Cucumber Favorite Movie" },
      { label: "Release", value: "0" },
      { label: "Execution Start Time", value: "" },
      { label: "Execution End Time", value: "" },
    ],
  },
});