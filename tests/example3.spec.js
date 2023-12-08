// @ts-check
import {expect, test} from "@playwright/test";

test.describe('Test describe title 3', ()=>{
    test('test 1 @smoke @regression', async ({page}) =>{
        await page.goto('/')
        await expect(page.locator('button', {hasText : 'Guest log in'})).toBeVisible()
    })
})

