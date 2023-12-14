import {expect, test} from "@playwright/test";


test.describe.only('Welcome page Assertions', ()=>{
    let page

    test.beforeAll(async ({browser})=>{
        const ctx = await browser.newContext()
        page = await ctx.newPage()
        await page.goto('/')
    })

    test.beforeEach(async ()=>{
        await page.goto('/')
    })

    test('regular assertions', async ()=>{
        const a  = 1 + 2
        expect(a).toBe(3)

        const user1 = {
            name: "Alice"
        }
        const user2 = {
            name: "Alice"
        }

        expect(user2, "users should be equal").toEqual(user1)

        const user3 = {
            name: "Alice",
            age: 12
        }

        expect(user3, "users should have some properties").toMatchObject(user2)
    })

    test('web first assertions', async ()=>{
        const guestLoginBtn = page.locator('button.header-link.-guest')

        // const isVisible = await guestLoginBtn.isVisible()
        // expect(isVisible).toBe(true)

        await expect.soft(guestLoginBtn, "Guest login button should be visible").not.toBeVisible()

        await expect(guestLoginBtn).toBeEnabled()
        await expect(guestLoginBtn).toHaveText('Guest log in')
    })

    test('screenshots', async ()=>{
        const guestLoginBtn = page.locator('button.header-link.-guest')
        await expect(guestLoginBtn, "Guest login button should be visible").toHaveScreenshot('guest-login-btn.png', {
            maxDiffPixelRatio: 0.02
        })

    })
})
