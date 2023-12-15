import {expect, test} from "@playwright/test";
import WelcomePage from "../../src/pageObjects/WelcomePage.js";

test.describe.only('Login Form Validation POM', () => {
    let page;
    let welcomePage;

    test.beforeEach(async ({browser}) => {
        page = await browser.newPage();
        welcomePage = new WelcomePage(page)
        await welcomePage.visit()
    });

    test('should display error message when username is missing', async () => {
        const signInPopup = await welcomePage.clickSignInButtonAndOpenPopup()
        await signInPopup.passwordInput.fill('random value')
        signInPopup.emailInput.focus()
        signInPopup.emailInput.blur()

        await expect(signInPopup.errorMessage, 'valid error message should be displayed when username is missing').toHaveText('Email required')
    });

    test('should display error message when password is missing', async () => {
        const signInPopup = await welcomePage.clickSignInButtonAndOpenPopup()

        await signInPopup.emailInput.fill('test@mail.com')
        signInPopup.passwordInput.focus()
        signInPopup.passwordInput.blur()

        await expect(signInPopup.errorMessage, 'valid error message should be displayed when password is missing').toHaveText('Password required')
    });
})