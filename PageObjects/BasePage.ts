import { expect, Page } from "@playwright/test";
import { BaseUrl } from "../utils/constants";

export class BasePage{
    readonly page: Page

    constructor (page: Page) {
        this.page = page
    }

     async goToHomePage(): Promise<void> {
        await this.page.goto(BaseUrl);
        await expect(this.page).toHaveURL(/route=common\/home/);
        await expect(this.page).toHaveTitle('Your Store');
    }

}
