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

# id selector and check url after
```
await page.locator('#get-started').click();

// full path
await expect(page).toHaveUrl('https://expected.com/url');
// part of url
await expect(page).toHaveUrl('/.*expected-url');
```
# text selector
```
// text should be unique in the dom

// case insensitive, substring
conts headingText = await page.locator('text=think different');

// totally string match
conts headingText = await page.locator('text="think different"');

// verify heading text is visible
await expect(headingText).toBeVisible();
```
