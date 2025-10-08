import { test } from "@playwright/test";
import { ChangePasswordPage } from "../PageObjects/ChangePasswordPage";

test.describe.skip("Change Password Functionality", () => {
    let changePasswordPage: ChangePasswordPage;

    const credentials = {
        email: "Tesstuseraccount1@gmail.com",
        oldPassword: "Test@123456",
        newPassword: "Test@12345",
    };

    const invalidPasswordTests = [
        {
            name: "mismatched confirm password",
            password: "Test@123456",
            confirm: "WrongPass123",
            expectedError: "Password confirmation does not match password!",
        },
        {
            name: "empty confirm password",
            password: "Test@123456",
            confirm: "",
            expectedError: "Password confirmation does not match password!",
        },
        {
            name: "empty password",
            password: "",
            confirm: "Test@123456",
            expectedError: "Password must be between 4 and 20 characters!",
        },
        {
            name: "both password and confirm empty",
            password: "",
            confirm: "",
            expectedError: "Password must be between 4 and 20 characters!",
        },
        {
            name: "short password",
            password: "abc",
            confirm: "abc",
            expectedError: "Password must be between 4 and 20 characters!",
        },
    ];

    test.beforeEach(async ({ page }) => {
        changePasswordPage = new ChangePasswordPage(page);

        await changePasswordPage.goToHomePage();
        await changePasswordPage.login(credentials.email, credentials.oldPassword);
    });

    test("Should successfully change password, login with new password, and reset", async () => {
        // Change to new password
        await changePasswordPage.goToChangePasswordPage();
        await changePasswordPage.fillPasswordFields(credentials.newPassword, credentials.newPassword);
        await changePasswordPage.submitPasswordChange();
        await changePasswordPage.validatePasswordChanged();

        // Logout and login with new password
        await changePasswordPage.logout();
        await changePasswordPage.login(credentials.email, credentials.newPassword);

        // Reset back to old password
        await changePasswordPage.goToChangePasswordPage();
        await changePasswordPage.fillPasswordFields(credentials.oldPassword, credentials.oldPassword);
        await changePasswordPage.submitPasswordChange();
        await changePasswordPage.validatePasswordChanged();
    });

    for (const testCase of invalidPasswordTests) {
        test(`Should fail to change password with ${testCase.name}`, async () => {
            await changePasswordPage.goToChangePasswordPage();
            await changePasswordPage.fillPasswordFields(testCase.password, testCase.confirm);
            await changePasswordPage.submitPasswordChange();
            await changePasswordPage.validatePasswordError(testCase.expectedError);
        });
    }
});
