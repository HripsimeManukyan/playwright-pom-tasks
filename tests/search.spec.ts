import { test } from "@playwright/test";
import { SearchPage } from "../PageObjects/SearchPage";

test.describe("Search Functionality", () => {
  let searchPage: SearchPage;

  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page);
    await searchPage.goToHomePage();
  });

  const searchTerms = ["mac", "iphone"];

  for (let item of searchTerms) {
    test(`Verify valid product search: ${item}`, async () => {
      await searchPage.fillSearchInput(item);
      await searchPage.clickSearchButton();
      await searchPage.checkSearchItems(item);
    });
  }

  const invalidSearchItems = ["մակ", "1phone", "1234", "%$*@"];

  for (let invalidItem of invalidSearchItems) {
    test(`Verify invalid product search: ${invalidItem}`, async () => {
      await searchPage.fillSearchInput(invalidItem);
      await searchPage.clickSearchButton();
      await searchPage.validateNoSearchResults();
    });
  }
});
