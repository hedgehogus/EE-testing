import { test, expect } from '@playwright/test';

test.describe('Home', () => {
    test('Open Homepage and verify title', async ({ page }) => {
        // open url
        await page.goto('https://diadia.ua/');
 
        // verify title
        await expect(page).toHaveTitle('Інтернет-магазин жіночого одягу DiaDia в Києві - купити стильний, модний одяг для жінок');
    })

    test('Open New Colection and verify title', async ({ page }) => {
        // open url
        await page.goto('https://diadia.ua/new-collection/');
 
        // verify title
        await expect(page).toHaveTitle('New collection');
    })

    test('Click overview using css selector ', async ({ page }) => {
        await page.goto('https://diadia.ua/');

        // click the button
        // await page.locator('#button').click(); // by id
        // await page.locator('.empty__button').click(); // by class

        // default text matching: case-insensitive and serches for a substring
        //await page.locator('text=Переглянути').click();

        // case sensitive
        await page.locator('text="Переглянути"').click();

        // verify url
        //await expect(page).toHaveURL('https://diadia.ua/new-collection/'); // full path
        await expect(page).toHaveURL(/.*new-collection/); // regex
    })

    test('verify heading text is visible', async ({ page }) => {
        await page.goto('https://diadia.ua/');

        // find the text locator
        const headingTextFirst = page.locator('text=Нова колекція').first();

        // combine css and text selectors

        //const headingText = page.locator('.slider__title >> text=Нова колекція');
        const headingText = page.locator('.slider__title:has-text("Нова колекція")');


        // verify text element is visible
        await expect(headingText).toBeVisible();
    })

    test('check search is visible by xpath selector', async ({ page }) => {
        await page.goto('https://diadia.ua/');

        // find the search icon
        const searchIcon = page.locator('//*[@class="header-wrapper"]//*[@class="search"]');

        // verify text element is visible
        await expect(searchIcon).toBeVisible();

        // other locators docs https://playwright.dev/docs/other-locators#xpath-locator
    })
    
    
})
