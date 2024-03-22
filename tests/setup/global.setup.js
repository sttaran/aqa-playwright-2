import { test as setup, expect } from '@playwright/test';
import WelcomePage from "../../src/pageObjects/welcomePage/WelcomePage.js";
import {USERS} from "../../src/data/users.js";
import {STORAGE_STATE_USER_PATH} from "../../src/data/constants/storageState.js";
import APIClient from "../../src/client/APIClient.js";
import {CookieJar} from "tough-cookie";


setup('login as user and save storage state', async ({page}) => {

    const welcomePage = new WelcomePage(page)
    await welcomePage.visit()
    const signInPopup = await welcomePage.clickSignInButtonAndOpenPopup()
    const garagePage = await signInPopup.loginWithCredentials(USERS.JOE_DOU.email, USERS.JOE_DOU.password)
    await expect(garagePage.addCarButton).toBeVisible()

    await page.context().storageState({
        path: STORAGE_STATE_USER_PATH
    })
});