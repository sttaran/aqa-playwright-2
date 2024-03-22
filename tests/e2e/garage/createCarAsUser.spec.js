import {expect} from "@playwright/test";
import {testAdvanced as test} from "../../../src/fixtures/customFixtures.js";
import {STORAGE_STATE_USER_PATH} from "../../../src/data/constants/storageState.js";
import GaragePage from "../../../src/pageObjects/garagePage/GaragePage.js";

test.describe('Garage (with custom fixture)', ()=>{
    test('add car button should be shown and enabled', async ({garagePageWithCar, page})=>{
        await garagePageWithCar.visit()

        await page.pause()
        await expect(garagePageWithCar.addCarButton).toBeVisible()
        await expect(garagePageWithCar.addCarButton).toBeEnabled()
    })

    test('should be able to create a car', async ({garagePage})=>{
        await garagePage.visit()
        const popup = await garagePage.openAddCarPopup()

        await popup.fillAndSubmit("BMW", "X6", 12)
    })
})


test.describe('Garage', ()=>{
    let page

    test.beforeEach(async({browser})=>{
        const ctx = await browser.newContext({
            storageState : STORAGE_STATE_USER_PATH
        })

        page = await ctx.newPage()
    })

    test.afterEach(async ()=>{
        await page.close()
    })

    test('add car button should be shown and enabled', async ()=>{
        const garagePage = new GaragePage(page)
        await garagePage.visit()

        await expect(garagePage.addCarButton).toBeVisible()
        await expect(garagePage.addCarButton).toBeEnabled()
    })

    test('should be able to create a car', async ()=>{
        const garagePage = new GaragePage(page)
        await garagePage.visit()
        const popup = await garagePage.openAddCarPopup()

        await popup.fillAndSubmit("BMW", "X6", 12)
    })
})


