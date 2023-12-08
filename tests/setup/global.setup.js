import { test as setup, expect } from '@playwright/test';


setup('do some preparation', async () => {
    console.log('PROJECT SETUP')
    // await page.goto('/');
    // await page.getByLabel('User Name').fill('user');
    // await page.getByLabel('Password').fill('password');
    // await page.getByText('Sign in').click();
    //
    // // Wait until the page actually signs in.
    // await expect(page.getByText('Hello, user!')).toBeVisible();
    //
    // await page.context().storageState({ path: STORAGE_STATE });
});