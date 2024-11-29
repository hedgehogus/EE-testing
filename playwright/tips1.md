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
**page.pause()** in any place in the code