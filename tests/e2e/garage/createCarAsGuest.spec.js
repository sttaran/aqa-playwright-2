import {expect, test} from "@playwright/test";
import WelcomePage from "../../../src/pageObjects/welcomePage/WelcomePage.js";

test.describe('Guest', ()=>{
    test('should be able to create a car', async ({page})=>{
        const welcomePage = new WelcomePage(page)
        await welcomePage.visit()
        const garagePage = await welcomePage.loginAsGuest()
        const popup = await garagePage.openAddCarPopup()
        await popup.fillAndSubmit("BMW", "X6", 12)

        await expect(page.locator('p', {hasText: `BMW X6`})).toBeVisible()

        // console.log("NODE JS ENVIRONMENT")
        // await page.evaluate(()=> console.log("BROWSER ENVIRONMENT"))

        const guestData = await page.evaluate(()=> sessionStorage.getItem('guestData'))
        const parsedGuestData = JSON.parse(guestData)
        expect(parsedGuestData.cars[0].brand).toBe("BMW")
        const audiCar = {
            "id": 2,
            "brand": "Audi",
            "model": "TT",
            "logo": "audi.png",
            "initialMileage": 111,
            "updatedMileageAt": "2023-12-26T17:19:02.083Z",
            "carCreatedAt": "2023-12-26T17:19:02.083Z",
            "carBrandId": 1,
            "carModelId": 1,
            "mileage": 111
        }
        parsedGuestData.cars.push(audiCar)

        await page.evaluate((data)=> sessionStorage.setItem('guestData', JSON.stringify(data)), parsedGuestData)
        // await page.evaluate((data)=> localStorage.setItem('guestDataLocal', JSON.stringify(data)), parsedGuestData)

        // await page.pause()
    })
})