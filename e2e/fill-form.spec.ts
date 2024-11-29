import { test, expect } from '@playwright/test';

test.describe('contact page', () => {
    test('fill contact form', async ({ page }) => {
        // open url
        await page.goto('https://practice.automationbro.com/contact');

        // fill out the input fields
        await page.locator('.contact-name input').fill('test Name');
        await page.locator('.contact-email input').fill('test@mail.com');
        await page.locator('.contact-phone input').fill('123456789');
        await page.locator('.contact-message textarea').fill('this is a text message');

        // add soft assertion
        await expect.soft(page.locator('.contact-message textarea')).toHaveText("Fail test message");

        // click submit
        await page.locator('button[type=submit]').click();

        // verify success message
        const successAllert = page.locator('div[role="alert"]');
        await expect(successAllert).toHaveText('success message');
    })

    test('verify the length of each list item in blog', async ({ page }) => {
        // open url
        await page.goto('https://practice.automationbro.com/blog');

        // get the recent post list elements
        const recentPostsList = page.locator('#recent-posts-3 ul li');

        // loop trough the list and assert the car length > 10
        for(const el of await recentPostsList.elementHandles()) {
            expect((await el.textContent())?.trim().length).toBeGreaterThan(10);
        }

        // assert the total length = 5
        expect(await recentPostsList.count()).toEqual(5);
    
        // negative assetrtions 
        await expect(page).not.toHaveURL(/.*#get-started/);
        await expect(recentPostsList).not.toBeHidden();

        // soft assertions - assertions can fail, but test will go further

        expect.soft(await recentPostsList.count()).toEqual(5);

        // check for soft assertions errors and fail test if they are there
        expect(test.info().errors.length).toBeLessThan(1);
    })

})
