import {expect, test} from "@playwright/test";

test.describe('Login Form Validation', () => {
    let page;

    test.beforeEach(async ({browser}) => {
        page = await browser.newPage();
        await page.goto('/');
    });

    test('should display error message when username is missing', async () => {
        const signInBtn = page.locator('.header_signin')
        await signInBtn.click();

        const signInPopup = page.locator('app-signin-modal')
        const emailInput = signInPopup.locator('[name="email"]')
        const passwordInput = signInPopup.locator('[name="password"]')

        await passwordInput.fill('random value')
        emailInput.focus()
        emailInput.blur()

        await expect(emailInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')

        const bgColor = await emailInput.evaluate((el)=> window.getComputedStyle(el).borderColor)
        console.log('bgColor', bgColor)

        const errorMessage = page.locator('.invalid-feedback p')
        await expect(errorMessage, 'valid error message should be displayed when username is missing').toHaveText('Email required')
    });

    test('should display error message when password is missing', async () => {
        const signInBtn = page.locator('.header_signin')
        await signInBtn.click();

        const signInPopup = page.locator('app-signin-modal')
        const emailInput = signInPopup.locator('[name="email"]')
        const passwordInput = signInPopup.locator('[name="password"]')

        await emailInput.fill('test@mail.com')
        passwordInput.focus()
        passwordInput.blur()

        const errorMessage = page.locator('.invalid-feedback p')
        await expect(errorMessage, 'valid error message should be displayed when password is missing').toHaveText('Password required')
    });
})