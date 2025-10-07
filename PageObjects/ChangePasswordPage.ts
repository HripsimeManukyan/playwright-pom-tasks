import { expect, Page } from "@playwright/test";
import { BaseUrl } from "../utils/constants";

export class ChangePasswordPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goToHomePage(): Promise<void> {
        await this.page.goto(BaseUrl);
        await expect(this.page).toHaveURL(/route=common\/home/);
        await expect(this.page).toHaveTitle("Your Store");
    }

    async login(email: string, password: string): Promise<void> {
        await this.page.getByRole("link", { name: " My Account" }).click();
        await this.page.getByRole("link", { name: "Login" }).click();
        await this.page.getByRole("textbox", { name: "E-Mail Address" }).click();
        await this.page.getByRole("textbox", { name: "E-Mail Address" }).fill(email);
        await this.page.getByRole("textbox", { name: "Password" }).click();
        await this.page.getByRole("textbox", { name: "Password" }).fill(password);
        await this.page.getByRole("button", { name: "Login" }).click();
        await expect(this.page.locator("#content").getByRole("heading", { name: "My Account" })).toBeVisible();
    }

    async goToChangePasswordPage(): Promise<void> {
        await this.page.getByRole("link", { name: "Change your password" }).click();
        await expect(this.page).toHaveURL(/route=account\/password/);
    }

    async fillPasswordFields(password: string, confirm: string): Promise<void> {
        await this.page.getByRole("textbox", { name: "* Password", exact: true }).click();
        await this.page.getByRole("textbox", { name: "* Password", exact: true }).fill(password);
        await this.page.getByRole("textbox", { name: "* Password Confirm" }).click();
        await this.page.getByRole("textbox", { name: "* Password Confirm" }).fill(confirm);
    }

    async submitPasswordChange(): Promise<void> {
        await this.page.getByRole("button", { name: "Continue" }).click();
    }

    async validatePasswordChanged(): Promise<void> {
        await expect(this.page.locator(".alert-success")).toHaveText(
            "Success: Your password has been successfully updated."
        );
    }

    async validatePasswordError(expectedError: string): Promise<void> {
        await expect(this.page.getByText(expectedError)).toBeVisible();
    }

    async logout(): Promise<void> {
        await this.page.getByRole("link", { name: " My Account" }).click();
        await this.page.locator("#top-links").getByRole("link", { name: "Logout" }).click();
        await expect(this.page.locator("#content").getByRole("heading", { name: "Account Logout" })).toBeVisible();
    }
}
