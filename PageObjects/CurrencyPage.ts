import { expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class CurrencyPage extends BasePage {
  readonly page: Page;

  constructor(page: Page) {
    super(page)
    this.page = page;
  }


  async openCurrencyDropdown(): Promise<void> {
    await this.page.locator("#form-currency button.dropdown-toggle").click();
  }

  async selectCurrency(option: string): Promise<void> {
    await this.page.getByRole("button", { name: option }).click();
  }

  async validateCurrencyHeader(symbol: string): Promise<void> {
    const header = this.page.locator("#form-currency button.dropdown-toggle");
    await expect(header).toContainText(symbol);
  }

  async validateProductPrices(symbol: string): Promise<void> {
    const prices = this.page.locator(".price");
    const count = await prices.count();
    for (let i = 0; i < count; i++) {
      await expect(prices.nth(i)).toContainText(symbol);
    }
  }
}
