import { test } from "@playwright/test";
import { CurrencyPage } from "../PageObjects/CurrencyPage";



test.describe("Currency feature", () => {
  let currencyPage: CurrencyPage;

  const currencies = [
    { option: "€Euro", symbol: "€" },
    { option: "£Pound Sterling", symbol: "£" },
    { option: "$US Dollar", symbol: "$" },
  ];

  test.beforeEach(async ({ page }) => {
    currencyPage = new CurrencyPage(page);
    await currencyPage.goToHomePage();
  });

  for (const { option, symbol } of currencies) {
    test(`should switch to ${option} and update header + product prices`, async () => {
      await currencyPage.openCurrencyDropdown();
      await currencyPage.selectCurrency(option);
      await currencyPage.validateCurrencyHeader(symbol);
      await currencyPage.validateProductPrices(symbol);
    });
  }
});
