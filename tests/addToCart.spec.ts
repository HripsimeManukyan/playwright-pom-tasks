import { test } from "@playwright/test";
import { CartPage } from "../PageObjects/CartPage";

test.describe("Add to Cart Functionality @cart", () => {
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page);
    await cartPage.goToHomePage();
  });

  test("should add the product, validate in header, dropdown, and remove from cart", async () => {
    const productName = "MacBook";

    await cartPage.addFirstProductToCart();
    await cartPage.validateProductAdded(productName);

    await cartPage.openCartDropdown();
    await cartPage.validateCartDropdown(productName);

    await cartPage.removeFromCart();
    await cartPage.validateCartEmptyInDropdown();
  });
});

test.describe("View Cart Functionality @viewCart", () => {
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page);
    await cartPage.goToHomePage();
    await cartPage.addFirstProductToCart();
    await cartPage.openCartDropdown();
    await cartPage.goToViewCart();
  });

  test("should display correct product details in cart", async () => {
    await cartPage.validateProductInCartTable("MacBook");
  });

  test("should update quantity and reflect totals", async () => {
    await cartPage.updateQuantity("2");
    await cartPage.validateCartUpdated();
  });

  test("should remove product and show empty cart message", async () => {
    await cartPage.removeFromCartTable();
    await cartPage.validateCartEmptyInPage();
  });

  test("should handle invalid quantity input (negative number)", async () => {
    await cartPage.updateQuantity("-3");
    await cartPage.validateCartEmptyInPage();
  });
});
