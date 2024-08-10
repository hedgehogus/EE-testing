# Test setup

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

