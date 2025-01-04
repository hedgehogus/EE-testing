import { test, expect, Page } from '@playwright/test';
import HomePage from '../pages/home.page';

test.describe.serial('Home', () => { // need to use serial with before all block - run only single worker and run test in a sequence
    let homePage: HomePage;
    let page: Page;

    test.beforeAll(async ({ browser }) => { // no page available here
        // use for authentication only for sequential tests
        page = await browser.newPage();

        await page.goto('/my-account');
        await page.locator('#username').fill('pacticeuser1');
        await page.locator('#password').fill('pacticepass1');
        await page.locator('[value="Log in"').click();
        await expect(page.locator('a:has-text("logout")')).toBeVisible();
    })

    test.beforeEach(async ({ }) => { // remove page from all blocks to run test in serial mode
        homePage = new HomePage(page);
        // open url
        //await page.goto('https://diadia.ua/');
        await homePage.navigate();
    })
    

    test('Open Homepage and verify title', async ({ page }) => {
        // verify title
        await expect(page).toHaveTitle('Інтернет-магазин жіночого одягу DiaDia в Києві - купити стильний, модний одяг для жінок');
    })

    test.describe('test for not logged in user', () => {
        test.use({ storageState: 'notLoggedInState.json'})
        test('verify smth for not logged in user', async ({ page }) => {
            // do smth
            // run tests
        })
    })

    test('Open New Colection and verify title', async ({ page }) => {
        // open url
        await page.goto('https://diadia.ua/new-collection/');
 
        // verify title
        await expect(page).toHaveTitle('New collection');
    })

    test('Click overview using css selector', async ({ page }) => {

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
        // find the text locator
        const headingTextFirst = page.locator('text=Нова колекція').first();

        // combine css and text selectors

        //const headingText = page.locator('.slider__title >> text=Нова колекція');
        //const headingText = page.locator('.slider__title:has-text("Нова колекція")');


        // verify text element is visible
        await expect(homePage.headingText).toBeVisible();
    })

    test('check search is visible by xpath selector', async ({ page }) => {
        // find the search icon
        //const searchIcon = page.locator('//*[@class="header-wrapper"]//*[@class="search"]');

        // verify text element is visible
        await expect(homePage.searchIcon).toBeVisible();

        // other locators docs https://playwright.dev/docs/other-locators#xpath-locator
    })

    test('verify text for nav links', async ({ page }) => {
        
        const expectedLinks = [
            'Жінкам',
            'Жінкам',
            'Чоловікам',
            'Чоловікам',
            'Інформація',
            'Інформація'
        ]

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
