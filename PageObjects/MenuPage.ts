import { expect, Locator, Page } from '@playwright/test';
import { BaseUrl } from '../utils/constants';

export class MenuPage {

    readonly page: Page;
    readonly continueButton: Locator;



    constructor(page: Page) {
        this.page = page;
        this.continueButton = this.page.getByRole('link', { name: 'Continue' });
    }


    async goToHomePage(): Promise<void> {
        await this.page.goto(BaseUrl);
        await expect(this.page).toHaveURL(/route=common\/home/);
        await expect(this.page).toHaveTitle('Your Store');
    }


    async clickSubMenu(menuName: string, subMenuName: string): Promise<void> {
        await this.page.getByRole('link', { name: menuName, exact: true }).hover();
        await this.page.getByRole('link', { name: subMenuName }).click();
    }


    async clickContinueButton(): Promise<void> {
        await this.continueButton.click();
    }

    async checkCurrentPageHeading(heading: string): Promise<void> {
        await expect(this.page.getByRole('heading', { name: heading, exact: true })).toBeVisible();
    }

    async checkCurrentPage(title: string, url: RegExp): Promise<void> {
        await expect(this.page).toHaveTitle(title);
        await expect(this.page).toHaveURL(url);
    }

    async clickCameras(menuName: string): Promise<void> {
        await this.page.getByRole('link', { name: menuName }).click();
    }
    async expectCamerasText(heading: string): Promise<void> {
        await expect(this.page.getByRole('heading', { name: heading, exact: true })).toBeVisible();
    }  
    
    async clickTablets(menuName: string): Promise<void> {
        await this.page.getByRole('link', { name: menuName, exact: true }).click();

    }
    async expectTabletsText(heading: string): Promise<void> {
        await expect(this.page.locator('h2').filter({ hasText: heading })).toBeVisible();
    }

    async clickSoftware(menuName: string): Promise<void> {
        await this.page.getByRole('link', { name: menuName }).click();
    }
    async expectSoftwareText(heading: string): Promise<void> {
        await expect(this.page.getByRole('heading', { name: heading, exact: true })).toBeVisible();
    }

    async clickPhonesAndPDAs(menuName: string): Promise<void> {
        await this.page.getByRole('link', { name: menuName }).click();
    }
    async expectPhonesAndPDAsText(heading: string): Promise<void> {
        await expect(this.page.getByRole('heading', { name: heading, exact: true })).toBeVisible();
    }

}
