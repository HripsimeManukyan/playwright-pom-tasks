import { test } from "@playwright/test";
import { LoginPage } from "../PageObjects/LoginPage";
import validCredentials from "../testData/validCreds.json";
import invalidCredentials from "../testData/invalidCreds.json";

test.describe("Login Functionality @login", () => {
    let loginPage: LoginPage;


    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goToHomePage();
    });

    test("Should successfully login with valid credentials", async () => {
        await loginPage.goToLoginPage();
        await loginPage.validateOnLoginPage();
        await loginPage.login(validCredentials.email, validCredentials.password);
        await loginPage.validateSuccessfulLogin();
    });

    for (const creds of invalidCredentials) {
        test(`Should fail login with ${creds.scenario}`, async () => {
            await loginPage.goToLoginPage();
            await loginPage.validateOnLoginPage();
            await loginPage.login(creds.email, creds.password);
            await loginPage.validateFailedLogin();
        });
    }
});
