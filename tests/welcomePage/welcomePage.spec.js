import {expect, test} from "@playwright/test";


test.describe.only('Welcome page', ()=>{
    let page

    test.beforeAll(async ({browser})=>{
        const ctx = await browser.newContext()
        page = await ctx.newPage()
        await page.goto('/')
    })

    test.beforeEach(async ()=>{
        await page.goto('/')
    })

    test('guest login button should be visible', async ()=>{
        // const guestLoginBtn = page.locator('button.header-link.-guest')
        const guestLoginBtn = page.locator('button', {
            hasText: 'Guest log in'
        })

        const header = page.locator('header', {
            has: page.getByText('Guest log in')
        })

        await expect(header).toBeVisible()

        await guestLoginBtn.click()
    })

    test('guest login button should be visible 2', async ()=>{
        const headerLinks = page.locator('.header-link')
        const guestLoginBtn = headerLinks.filter({hasText: 'Guest log in'})

        await guestLoginBtn.click()
    })

    test('should display all header links', async ()=>{
        const headerLinks = page.locator('.header-link')
        const count = await headerLinks.count()
        const textList = []

        for (let i = 0; i < count; i++) {
            const linkText = await headerLinks.nth(i).innerText()
            textList.push(linkText)
        }

        expect(textList).toEqual(['Home', 'About', 'Contacts', 'Guest log in'])
    })

    test('should display all header links 2', async ()=>{
        const headerLinks = page.locator('.header-link')
        const textList = []
        const allHeaderLinks = await headerLinks.all()

        for (const link of allHeaderLinks) {
            const linkText = await link.innerText()
            textList.push(linkText)
        }


        expect(textList).toEqual(['Home', 'About', 'Contacts', 'Guest log in'])
    })
})
