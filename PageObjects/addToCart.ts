import { expect, Page } from "@playwright/test";
import { BaseUrl } from "../utils/constants";

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToHomePage(): Promise<void> {
    await this.page.goto(BaseUrl);
    await expect(this.page).toHaveURL(/route=common\/home/);
    await expect(this.page).toHaveTitle("Your Store");
  }

  async addFirstProductToCart(): Promise<void> {
    await this.page.getByRole("button", { name: " Add to Cart" }).first().click();
  }

  async validateProductAdded(productName: string): Promise<void> {
    const successAlert = this.page.locator(".alert-success");
    await expect(successAlert).toBeVisible();
    await expect(successAlert).toContainText(`Success: You have added ${productName} to your shopping cart!`);
  }

  async openCartDropdown(): Promise<void> {
    const productCart = this.page.getByRole("button", { name: /item\(s\)/ });
    await productCart.click();
  }

  async validateCartDropdown(productName: string): Promise<void> {
    const cartDropdown = this.page.locator("#cart");
    await expect(cartDropdown).toContainText(productName);
    await expect(cartDropdown).toContainText("x1");
    await expect(cartDropdown).toContainText(/602\.00/);
    await expect(cartDropdown).toContainText("Sub-Total");
    await expect(cartDropdown).toContainText(/500\.00/);
    await expect(cartDropdown).toContainText("Eco Tax");
    await expect(cartDropdown).toContainText(/2\.00/);
    await expect(cartDropdown).toContainText("VAT");
    await expect(cartDropdown).toContainText(/100\.00/);
    await expect(cartDropdown).toContainText("Total");
    await expect(cartDropdown).toContainText(/602\.00/);
  }

  async removeFromCart(): Promise<void> {
    const removeButton = this.page.getByRole("button", { name: "" });
    await removeButton.click();
  }

  async validateCartEmptyInDropdown(): Promise<void> {
    const updatedCart = this.page.getByRole("button", { name: /0 item\(s\)/ });
    await expect(updatedCart).toContainText("0 item(s)");
    await expect(updatedCart).toContainText(/0\.00/);
    await updatedCart.click();
    await expect(this.page.locator("#cart")).toContainText("Your shopping cart is empty!");
  }

  async goToViewCart(): Promise<void> {
    await this.page.getByRole("link", { name: "View Cart" }).click();
    await expect(this.page).toHaveURL(/route=checkout\/cart/);
    await expect(this.page.locator("#content").getByRole("heading", { name: "Shopping Cart" })).toBeVisible();
  }

  async validateProductInCartTable(productName: string): Promise<void> {
    const cartTable = this.page.locator(".table-responsive");
    await expect(
      cartTable.getByRole("cell", { name: `${productName} *** Reward Points:` }).getByRole("link", { name: productName })
    ).toBeVisible();
    await expect(cartTable.locator('input[name*="quantity"]')).toHaveValue("1");
  }

  async updateQuantity(newQty: string): Promise<void> {
    const cartTable = this.page.locator(".table-responsive");
    const quantityInput = cartTable.locator('input[name*="quantity"]');
    await quantityInput.fill(newQty);
    const updateButton = this.page.getByRole("button", { name: "" });
    await updateButton.click();
  }

  async validateCartUpdated(): Promise<void> {
    const successAlert = this.page.locator(".alert-success");
    await expect(successAlert).toBeVisible();
    await expect(successAlert).toContainText("Success: You have modified your shopping cart!");
    await expect(this.page.locator("#content form").getByRole("cell", { name: "$1,204.00" })).toBeVisible();
  }

  async removeFromCartTable(): Promise<void> {
    const cartTable = this.page.locator(".table-responsive");
    await cartTable.getByRole("button", { name: "" }).click();
  }

  async validateCartEmptyInPage(): Promise<void> {
    await expect(this.page.locator("#content")).toContainText("Your shopping cart is empty!");
  }
}
