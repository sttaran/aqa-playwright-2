import {expect, test} from "@playwright/test";
import WelcomePage from "../../src/pageObjects/welcomePage/WelcomePage.js";

test.describe('Login Form Validation POM', () => {
    let page;
    let welcomePage;
    let signInPopup

    test.beforeEach(async ({browser}) => {
        const ctx = await browser.newContext();
        page = await ctx.newPage()

        welcomePage = new WelcomePage(page)
        await welcomePage.visit()
        signInPopup = await welcomePage.clickSignInButtonAndOpenPopup()
    });

    test('should display error message when username is missing @pom', async () => {
        await signInPopup.passwordInput.fill('random value')
        signInPopup.emailInput.focus()
        signInPopup.emailInput.blur()
        await expect(signInPopup.errorMessage, 'valid error message should be displayed when username is missing').toHaveText('Email required')
    });

    test('should display error message when password is missing @pom', async () => {
        await signInPopup.emailInput.fill('test@mail.com')
        signInPopup.passwordInput.focus()
        signInPopup.passwordInput.blur()

        await expect(signInPopup.errorMessage, 'valid error message should be displayed when password is missing').toHaveText('Password required')
    });
})