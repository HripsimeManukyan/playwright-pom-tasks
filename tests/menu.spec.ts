import { MenuPage } from "../PageObjects/MenuPage";
import { test } from "@playwright/test";


test.describe('Menu Tests', () => {

    let menuPage: MenuPage;

    test.beforeEach(async ({ page }) => {
        menuPage = new MenuPage(page);
        await menuPage.goToHomePage();
    });


    test('Desktop PC(0)', async ({ page }) => {
        await menuPage.clickSubMenu('Desktops', 'PC (0)');
        await menuPage.checkCurrentPageHeading('PC');
        await menuPage.clickContinueButton();
        await menuPage.checkCurrentPage('Your Store', /route=common\/home/);
    });

    test('Desktop Mac(1)', async ({ page }) => {
        await menuPage.clickSubMenu('Desktops', 'Mac (1)');
        await menuPage.checkCurrentPageHeading('Mac');
        await menuPage.checkCurrentPage('Mac', /product\/category&path=20_27/);
    });

    test('Cameras', async ({ page }) => {
        await menuPage.clickCameras("Cameras");
        await menuPage.expectCamerasText("Cameras");
    });

    test('Tablets', async ({ page }) => {
        await menuPage.clickTablets("Tablets");
        await menuPage.expectTabletsText("Tablets");
    });

    test('Software', async ({ page }) => {
        await menuPage.clickSoftware("Software");
        await menuPage.expectSoftwareText("Software");
        await menuPage.clickContinueButton();
        await menuPage.checkCurrentPage('Your Store', /route=common\/home/);
    });

});