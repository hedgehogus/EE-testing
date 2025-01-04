import { test, expect } from '@playwright/test';
import CartPage from '../pages/cart.page';
const path = require('path');

test.describe('upload', () => {
    let cartPage: CartPage;

    test('regular upload', async ({ page }) => {
        // open url
        await page.goto('https://zenui.net/color-palette');

        // store test file path
        const filePath = path.join(__dirname, '../data/images.jpg');

        // upload test file in non hidden input
        await page.setInputFiles('input#upfile_1', filePath);

        // click the submit button
        await page.locator('#upload_1').click();

        // assertion
        await expect(page.locator('#succes_message_id')).toContainText('uploaded succesfully');
    })

    test.describe('try to upload different files with parameterizing', () => {
        const fileName = ['logotitle.png', '3mb-file.pdf'];

        for (const name of fileName) {
            test(`upload file ${name}`, async ({ page }) => {
                await page.goto('https://zenui.net/color-palette');

                // store test file path
                const filePath = path.join(__dirname, `../data/${name}`);
            
                // upload test file in non hidden input
                await page.setInputFiles('input#upfile_1', filePath);
            
                // click the submit button
                await page.locator('#upload_1').click();
            
                // assertion
                await expect(page.locator('#succes_message_id')).toContainText('uploaded succesfully');
            })
        }
    })

    test('upload using cart.page', async ({ page }) => {
        cartPage = new CartPage(page);

        await page.pause(); // should be underlined by linter
        
        // open url
        await page.goto('https://practice.automationbro.com/cart/');

        // provide test file path
        const filePath = path.join(__dirname, '../data/images.jpg');

        // upload test file
        await cartPage.uploadComponent().uploadFile(filePath);

        // assertion
        await expect(cartPage.uploadComponent().successTxt).toContainText('uploaded succesfully');
    })

    test('upload with DOM manipulation when field is hidden', async ({ page }) => {
        // open url
        await page.goto('https://zenui.net/color-palette');

        // store test file path
        const filePath = path.join(__dirname, '../data/images.jpg');

        // Dom manipulation
        await page.evaluate(() => {
            const selector = document.querySelector('input#uploadImage');
            if (selector){
               selector.className = ''
            }
        })

        // upload test file in hidden input
        await page.setInputFiles('input#uploadImage', filePath);

        // assertion
        await expect(page.locator('.custom-color-picker-from-image')).toBeVisible();
    })

    test('wait for timeout', async ({ page }) => {
        // open url
        await page.goto('https://zenui.net/color-palette');

        // store test file path
        const filePath = path.join(__dirname, '../data/3-mb-image.jpg');

        // upload test file in non hidden input
        await page.setInputFiles('input#uploadImage', filePath);

        // click the submit button
        await page.locator('#upload_1').click();
        
        // 1) -----!!!!------- HARDCODED WAIT
        // hardcoded sleep - WRONG WAY
        await page.waitForTimeout(5000);


        // 2) -----!!!!----- CONDITIONAL WAIT
        // waitFor locator

        // Returns when element specified by locator satisfies the 'state' option
        /*  options?: {
            state?: {
                'attached' - wait for element to be present in dom
                'detached' - wait for element not to be present in dom
                'visible' - wait for element to have non-empty bounding box and no visibility:hidden. 
                            Note thatelement without any content or with display:none has an empty bounding box and is not considered visible
                'hidden' - wait for element to be eaither detached from DOM, or have an empty boundingbox or visibility: hidden.
                            This is oposite to the 'visible' option
            },
            timeout? - maximum time in milliseconds, default to 30 seconds, pass 0 to disable timeout
            }
        } */

        // wait for condition
        await page.locator('#succes_message').waitFor({state: 'visible', timeout: 10000});


        // 3) -----!!!!----- ASSERTION WAIT
        // we can set larger timeout for particular assertion
        await expect(page.locator('.custom-color-picker-from-image')).toBeVisible({timeout:10000});

        // assertion
        await expect(page.locator('.custom-color-picker-from-image')).toBeVisible();
    })
})
