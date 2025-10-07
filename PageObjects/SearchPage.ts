import { expect, Page } from "@playwright/test";
import { BaseUrl } from "../utils/constants";

export class SearchPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToHomePage(): Promise<void> {
    await this.page.goto(BaseUrl);
    await expect(this.page).toHaveURL(/route=common\/home/);
    await expect(this.page).toHaveTitle("Your Store");
  }

  async fillSearchInput(searchItem: string): Promise<void> {
    await this.page.getByRole("textbox", { name: "Search" }).click();
    await this.page.getByRole("textbox", { name: "Search" }).fill(searchItem);
  }

  async clickSearchButton(): Promise<void> {
    await this.page.getByRole("button", { name: "" }).click();
  }

  async checkSearchItems(searchItem: string): Promise<void> {
    const products = await this.page
      .locator(".product-thumb .caption h4")
      .allTextContents();
    for (let item of products) {
      expect(item.toLowerCase()).toContain(searchItem.toLowerCase());
    }
  }

  async validateNoSearchResults(): Promise<void> {
    await expect(this.page.locator("div[id='content'] h1")).toBeVisible();
    await expect(
      this.page.locator("text=There is no product that matches the search criteria.")
    ).toBeVisible();
    await expect(
      this.page.getByText("Products meeting the search criteria")
    ).toBeVisible();
  }
}




