import { expect, Page } from "@playwright/test";
import { BaseUrl } from "../utils/constants";

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

   async goToHomePage(): Promise<void> {
        await this.page.goto(BaseUrl);
        await expect(this.page).toHaveURL(/route=common\/home/);
        await expect(this.page).toHaveTitle('Your Store');
    }

  async goToLoginPage(): Promise<void> {
    await this.page.locator('a[title="My Account"]').click();
    await this.page.getByRole("link", { name: "Login" }).click();
   
  }

   async validateOnLoginPage(): Promise<void> {
    await expect(this.page.locator('h2:has-text("Returning Customer")')).toBeVisible();
    await expect(this.page).toHaveURL(/route=account\/login/);
  }

  async login(email: string, password: string): Promise<void> {
    await this.page.getByRole("textbox", { name: "E-Mail Address" }).fill(email);
    await this.page.getByRole("textbox", { name: "Password" }).fill(password);
    await this.page.getByRole("button", { name: "Login" }).click();
  }

  async validateSuccessfulLogin(): Promise<void> {
    await expect(
      this.page.locator("#content").getByRole("heading", { name: "My Account" })
    ).toBeVisible();
    await expect(this.page).toHaveURL(/route=account\/account/);
  }

  async validateFailedLogin(): Promise<void> {
    await expect(this.page.locator(".alert-danger")).toContainText(
      "Warning: No match for E-Mail Address and/or Password."
    );
  }
}
