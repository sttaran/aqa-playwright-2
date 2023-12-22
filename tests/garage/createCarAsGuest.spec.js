import {expect, test} from "@playwright/test";
import WelcomePage from "../../src/pageObjects/welcomePage/WelcomePage.js";


test.describe('Guest', ()=>{
    test('should be able to create a car', async ({page})=>{
        const welcomePage = new WelcomePage(page)
        await welcomePage.visit()
        const garagePage = await welcomePage.loginAsGuest()
        const popup = await garagePage.openAddCarPopup()
        await popup.fillAndSubmit("BMW", "X6", 12)

        await expect(page.locator('p', {hasText: `BMW X6`})).toBeVisible()
    })
})