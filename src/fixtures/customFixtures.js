import {request, test as base} from "@playwright/test"
import GaragePage from "../pageObjects/garagePage/GaragePage.js";
import {STORAGE_STATE_USER_PATH} from "../data/constants/storageState.js";


export const test = base.extend({
    page: async ({browser}, use)=>{
        const ctx = await browser.newContext({
            storageState: STORAGE_STATE_USER_PATH
        })
        const page = await ctx.newPage()

        await use(page)

       await ctx.close()
    },
    garagePage : async ({page}, use)=>{
        const garagePage = new GaragePage(page)
        await use(garagePage)
    },
    apiClient :  async ({}, use)=>{
        const client = await request.newContext({
            storageState: STORAGE_STATE_USER_PATH
        })

        await use(client)

        await client.dispose()
    },
})

export const testAdvanced = test.extend({
    garagePageWithCar : async ({garagePage}, use)=>{
        await garagePage.visit()
        const popup = await garagePage.openAddCarPopup()

        await popup.fillAndSubmit("BMW", "X6", 12)

        await use(garagePage)
    }
})