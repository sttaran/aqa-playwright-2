
import { test, expect } from '@playwright/test';
import {MOCK_PEOPLE_RESPONSE_BODY} from "./fixtures/people.fixtures.js";

test.only('test', async ({ page }) => {
    await page.goto('https://cloud.idurarapp.com/');

    await page.getByRole('link', { name: 'Already Have Account Login' }).click();
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('stastaransa1nt@gmail.com');

    await page.locator('div').filter({ hasText: /^Password$/ }).nth(2).click();
    await page.getByPlaceholder('Password').fill('Password01');

    await page.getByRole('button', { name: 'Log In' }).click();

    await page.route('https://server.idurarapp.com/api/people/list*',async (route, request)=>{
            await route.fulfill({
                status: 200,
                body: JSON.stringify(MOCK_PEOPLE_RESPONSE_BODY)
            })
    })
    const tableLoader = page.locator('main .ant-spin-nested-loading span.ant-spin-dot').first()
    const tableDataPlaceholder = page.locator('tr.ant-table-placeholder').last()



    await page.getByRole('link', { name: 'Peoples' }).click();
    // await expect(tableLoader).toBeVisible()
    await expect(tableLoader).toBeHidden()
    await expect(tableDataPlaceholder).toBeHidden()

    const tableContainer = page.locator('.ant-table-container')
    const tableRow = tableContainer.locator('tbody tr:not([aria-hidden="true"])')

    const actualPeopleList = []

    for (const row of await tableRow.all()) {
        const values = {
            firstname: await row.locator('td').first().innerText(),
            lastname:  await row.locator('td').nth(1).innerText(),
            company: await row.locator('td').nth(2).innerText(),
        }

        actualPeopleList.push(values)
    }

    for (let i = 0; i < actualPeopleList.length; i++) {
        const actualPerson = actualPeopleList[i]
        const expectedPerson = MOCK_PEOPLE_RESPONSE_BODY.result[i]

        expect(actualPerson.firstname).toBe(expectedPerson.firstname)
        expect(actualPerson.lastname).toBe(expectedPerson.lastname)
        expect(actualPerson.company).toBe(expectedPerson.company.name)

    }
});