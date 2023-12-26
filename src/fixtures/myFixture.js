import {test as base} from '@playwright/test'
import WelcomePage from "../pageObjects/welcomePage/WelcomePage.js";
import {USERS} from "../data/users.js";
import {STORAGE_STATE_USER_PATH} from "../data/constants/storageState.js";
import GaragePage from "../pageObjects/garagePage/GaragePage.js";

export const test = base.extend({
    MESSAGES: ["HELLO"],
    userGaragePage: async({page, MESSAGES}, use) =>{
        const welcomePage = new WelcomePage(page)
        await welcomePage.visit()
        const signInPopup = await welcomePage.clickSignInButtonAndOpenPopup()
        const garagePage = await signInPopup.loginWithCredentials(USERS.JOE_DOU.email, USERS.JOE_DOU.password)

        // Usage
        use(garagePage)

        // Clean up
        console.log("DELETE USER")
    },
    userGaragePageWithStorage: async({browser, MESSAGES}, use) =>{
        const ctx = await browser.newContext({
            storageState: STORAGE_STATE_USER_PATH
        })
        const page = await ctx.newPage()
        const garagePage = new GaragePage(page)
        await garagePage.visit()

        // Usage
        use(garagePage)

        // Clean up
    }
})
