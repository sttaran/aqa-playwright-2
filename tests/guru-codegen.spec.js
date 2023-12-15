
import { test, expect } from '@playwright/test';

test.skip('test1', async ({ page }) => {
    await page.goto('https://javascript.info/');
    await page.getByRole('searchbox', { name: 'Search in the tutorial' }).click();
    await page.getByRole('searchbox', { name: 'Search in the tutorial' }).fill('class');
    await page.getByRole('button', { name: 'Search' }).nth(1).click();
    await page.getByRole('link', { name: 'Class inheritance' }).click();
    await expect(page.getByRole('article')).toContainText('The “extends” keyword');
    await expect(page.getByRole('heading', { name: 'Class inheritance' })).toBeVisible();
});

test.skip('test', async ({ page }) => {
        await page.goto('https://qauto.forstudy.space/');
        await page.getByRole('button', { name: 'Guest log in' }).click();
        await page.getByRole('button', { name: 'Add car' }).click();
        await page.getByLabel('Brand').selectOption('BMW');
        await page.getByLabel('Model').selectOption('X5');
        await page.getByLabel('Mileage').click();
        await page.getByLabel('Mileage').fill('120');
        await page.getByRole('button', { name: 'Add' }).click();
        await expect(page.locator('app-car')).toContainText('BMW X5');
        await expect(page.getByRole('button', { name: 'Add fuel expense' })).toBeVisible();
});