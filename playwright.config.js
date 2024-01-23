// @ts-check
import { defineConfig, devices }  from '@playwright/test';
import {config as testConfig} from "./config/config.js";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = defineConfig({
  // testDir: './tests',
  testMatch: '/tests/**/*.spec.js',
  globalSetup: './globalSetup.js',
  globalTeardown: './globalTeardown.js',
  timeout: 40_000,
  maxFailures: 10,
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  // retries: 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
      ['html', {open: "never"}],
      // ['playwright-qase-reporter',
      //   {
      //     apiToken: process.env.QASE_API_TOKEN,
      //     projectCode: process.env.QASE_PROJECT_CODE,
      //     runComplete: true,
      //     basePath: 'https://api.qase.io/v1',
      //     logging: true,
      //     uploadAttachments: true,
      //   }],
    // ['json', {  outputFile: 'test-results.json' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: {
      mode: 'retain-on-failure',
      size: {
        width: 1920,
        height: 1080
      }
    },
    actionTimeout: 7_0000,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: testConfig.baseURL,
    viewport: {
      width: 1080,
      height: 720
    },
    headless: true,
    httpCredentials: testConfig.httpCredentials,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    // launchOptions: {
    //   slowMo: 400
    // }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "global-setup",
      testMatch: 'tests/setup/*.setup.js',
    },
    {
      name: "global-teardown",
      testMatch: 'tests/teardown/*.teardown.js',
    },
    {
      name: 'e2e chrome',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ["global-setup"],
      teardown: "global-teardown",
      testMatch: '/tests/e2e/**/*.spec.js'
    },
    {
      name: 'API tests',
      testMatch: '/tests/api/**/*.spec.js'
    },
    // {
    //   name: 'regression-tests',
    //   use: { ...devices['Desktop Chrome'] },
    //   dependencies: ["global-setup"],
    //   teardown: "global-teardown",
    // },

    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    //   dependencies: ["global-setup"],
    //   teardown: "global-teardown",
    // },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    //
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
    //
    // /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
    //
    // /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     ...devices['Desktop Edge'],
    //     channel: 'msedge'
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     channel: 'chrome'
    //   },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

export default config
