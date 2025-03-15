// @ts-check
const { defineConfig, devices } = require('@playwright/test');
let sEnvironment = process.env.ENV || 'tech'
let sSystemName = process.env.SYSTEM || 'playwrightProject'
let sEnvJson = `./.env/${sSystemName.toLowerCase()}.${sEnvironment.toLowerCase()}.environment.js`
require('dotenv').config({ path: sEnvJson });

module.exports = defineConfig({
  timeout: 120 * 1000,
  expect:{
    timeout: 90000,
  },
  actionTimeout: 30000,
  toMatchSnapshot: {
    maxDiffPixels: 10,
  },
  reporter:  [
    [ process.env.CI ? 'dot' : 'list',{
      printSteps:true
    }],
    ['html', {
      open: 'never',
      outputFolder: `results/${sSystemName.toLowerCase()}-${sEnvironment.toLowerCase()}/playwright-report/`
    }],
    ['junit', {
      outputFile: `results/${sSystemName.toLowerCase()}-${sEnvironment.toLowerCase()}/playwright-${sEnvironment.toLowerCase()}.xml`
    }],
    ['allure-playwright', {
      detail: true,
      outputFolder: `results/${sSystemName.toLowerCase()}-${sEnvironment.toLowerCase()}/allure-results/`,
      suiteTitle: false,
    }],
    [
      'json', {
      outputFile: `results/${sSystemName.toLowerCase()}-${sEnvironment.toLowerCase()}/result-${sEnvironment.toLowerCase()}.json`
    }],
  ],
  // testDir: './e2e',
  // /* Run tests in files in parallel */
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    screenshot:'on'
  },
  projects: [
    {
      name: 'orange-hrm',
      use: { ...devices['Desktop Chrome'] },
      testDir: `tests/orangehrm`
    },
    {
      name: 'lab-swaglabs',
      use: { ...devices['Desktop Edge'] },
      testDir: `tests/swaglabs`
    },
    // {
    //   name: 'orange-hrm',
    //   use: { ...devices['Desktop Firefox'] },
    //   testDir: `tests/orangehrm`
    // },
    // {
    //   name: 'orange-hrm',
    //   use: { ...devices['Desktop Safari'] },
    //   testDir: `tests/orangehrm`
    // },
  ],
  // @ts-ignore
  testPathIgnorePatterns: ["\\\\node_modules\\\\"],
});


// APP
// {
//   name: 'Microsoft Edge',
//   use: { ...devices['Desktop Edge'], channel: 'msedge' },
// },
// {
//   name: 'Google Chrome',
//   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
// },
// {
//   name: 'Mobile Safari',
//   use: { ...devices['iPhone 12'] },
// },