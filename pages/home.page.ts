import {Page, Locator} from '@playwright/test';

class HomePage {
    page: Page;
    reviewBtn: Locator;
    headingTextFirst: Locator;
    headingText: Locator;
    searchIcon: Locator;
    navLinks: Locator;
    navLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.reviewBtn = page.locator('text="Переглянути"');
        this.headingTextFirst = page.locator('text=Нова колекція').first();
        this.headingText = page.locator('.slider__title:has-text("Нова колекція")');
        this.searchIcon = page.locator('//*[@class="header-wrapper"]//*[@class="search"]');
        this.navLinks = page.locator('.navbar-nav li[class*=drop] span[class*=dropdown-toggle]');
        this.navLink = page.locator('.navbar-nav li[class*=drop] span[class*=dropdown-toggle]').nth(2);
    }

    async navigate(): Promise<void> {
        await this.page.goto('https://diadia.ua/');
    }

    async getNavLinksText(): Promise<any []>  {
        let result: any [] = [];
        for(const el of await this.navLinks.elementHandles()) {
            result.push((await el.textContent())?.trim())
        }

        return result;
    }

}

export default HomePage