## Test setup

``` 
import { test, expect, Page } from '@playwright/test';

test.describe('Home', () => {
  test('open and verify title', async ({page}) => {

    // open url
    await page.goto('https://practice.automationbro.com/');

    // verify title
    await expect(page).toHavetitle('expected title');

  })
})
```

## Locators

### id selector and check url after
```
await page.locator('#get-started').click();

// full path
await expect(page).toHaveUrl('https://expected.com/url');
// part of url
await expect(page).toHaveUrl('/.*expected-url');
```
### text selector
```
// text should be unique in the dom

// case insensitive, substring
conts headingText = await page.locator('text=think different');

// totally string match
conts headingText = await page.locator('text="think different"');

// verify heading text is visible
await expect(headingText).toBeVisible();
```
## DEBUGGING

### debug console
DEBUG=pw:api npx playwright test home.spec.ts    

### playwright trace viewer
playwright.config.js -> trace: 'off' | 'on' | 'retain-on-failure' | 'on-first-retry' | 'on-all-retries' | 'retain-on-first-failure';

### playwright inspector
PWDEBUG=1 npx playwright test home.spec.ts 
-- for windows: two lines
$env:PWDEBUG=1 
npx playwright test home.spec.ts 

**easy way to open inspector**
**await page.pause()** in any place in the code

## ESLint

https://www.npmjs.com/package/eslint-plugin-playwright

## Randomize data for testing

https://fakerjs.dev/

## run test

npx playwright test e2e

**define number of workers:**

npx playwright test e2e --workers 4

**use specific built in reporter**

npx playwright test e2e --reporter=list
npx playwright test e2e --reporter=line
npx playwright test e2e --reporter=html

## Setup allure reporter

npm i -D @playwright/test allure-playwright
npm i -D allure-commandline

npx allure generate allure-results --clean && npx allure open

in playwright.config.ts change **trace: 'retain-on-failure',**

- download report from trace
- go to trace.playwright.dev
- put zip file from the report
- see full trace report with screenshots