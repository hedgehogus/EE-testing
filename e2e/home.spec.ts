import { test, expect } from '@playwright/test';
import HomePage from '../pages/home.page';

test.describe('Home', () => {
    let homePage: HomePage;

    test('Open Homepage and verify title', async ({ page }) => {
        homePage = new HomePage(page);
        // open url
        //await page.goto('https://diadia.ua/');
        await homePage.navigate();
 
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
        homePage = new HomePage(page);

        await homePage.navigate();

        // click the button
        // await page.locator('#button').click(); // by id
        // await page.locator('.empty__button').click(); // by class

        // default text matching: case-insensitive and serches for a substring
        //await page.locator('text=Переглянути').click();

        // case sensitive
        //await page.locator('text="Переглянути"').click();
        await homePage.reviewBtn.click();

        // verify url
        //await expect(page).toHaveURL('https://diadia.ua/new-collection/'); // full path
        await expect(page).toHaveURL(/.*new-collection/); // regex
    })

    test('verify heading text is visible', async ({ page }) => {
        homePage = new HomePage(page);

        await homePage.navigate();

        // find the text locator
        const headingTextFirst = page.locator('text=Нова колекція').first();

        // combine css and text selectors

        //const headingText = page.locator('.slider__title >> text=Нова колекція');
        //const headingText = page.locator('.slider__title:has-text("Нова колекція")');


        // verify text element is visible
        await expect(homePage.headingText).toBeVisible();
    })

    test('check search is visible by xpath selector', async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.navigate();

        // find the search icon
        //const searchIcon = page.locator('//*[@class="header-wrapper"]//*[@class="search"]');

        // verify text element is visible
        await expect(homePage.searchIcon).toBeVisible();

        // other locators docs https://playwright.dev/docs/other-locators#xpath-locator
    })

    test('verify text for nav links', async ({ page }) => {
        homePage = new HomePage(page);

        const expectedLinks = [
            'Жінкам',
            'Жінкам',
            'Чоловікам',
            'Чоловікам',
            'Інформація',
            'Інформація'
        ]
        await homePage.navigate();

        // find the nav links
       // const navLinks = page.locator('.navbar-nav li[class*=drop] span[class*=dropdown-toggle]');

        // one required element
        //const navLink = homePage.navLink;
/* 
        let result: any [] = [];
        for(const el of await homePage.navLinks.elementHandles()) {
            const text = await el.textContent();
            result.push(text?.trim())
        } */

        expect.soft(await homePage.getNavLinksText()[0]).toEqual(expectedLinks[2]);

        // verify nav links text
        //expect(await navLinks.allTextContents()).toEqual(expectedLinks);
       // expect(await navLink.textContent()).toEqual(expectedLinks[2]);
       expect(await homePage.getNavLinksText()).toEqual(expectedLinks);
    })
})
