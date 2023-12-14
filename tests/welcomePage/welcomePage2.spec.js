import {expect, test} from "@playwright/test";


test.describe.only('Welcome page', ()=>{
    test('page actions', async ({page})=>{
        await page.goto('/')

        await page.reload()
        await page.goBack()
        await page.goForward()
    })

    test('locator actions', async ({page})=>{
        const btn = page.locator('button')
        await btn.click()
        await btn.hover()
        await btn.innerText()

        const input = page.locator('input')

        await input.fill('test@email.com')
        await input.pressSequentially('test@email.com')

        await input.clear()
        await input.focus()
        await input.blur()

        const radio = page.locator('input[type="radio"]')
        await radio.check()
        await radio.uncheck()
    })
})
