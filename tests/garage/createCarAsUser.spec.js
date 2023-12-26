import { expect } from "@playwright/test";
import { test } from '../../src/fixtures/myFixture.js'

test.describe.only('User', ()=>{
    test('should be able to create a car', async ({userGaragePageWithStorage})=>{
        const popup = await userGaragePageWithStorage.openAddCarPopup()
        await popup.fillAndSubmit("BMW", "X6", 12)

        const {page} = userGaragePageWithStorage

        await expect(page.locator('p', {hasText: `BMW X6`})).toBeVisible()
    })
})