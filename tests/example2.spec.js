// @ts-check
import {expect, test} from "@playwright/test";

test.describe('Test describe title 2 @smoke', ()=>{
    test.beforeAll(async ()=>{
        console.log('before all hook 2')
    })

    test.beforeEach(async ()=>{
        console.log('before each hook 2')
    })

    test.afterEach(async ()=>{
        console.log('after each hook 2')
    })

    test.afterAll(async ()=>{
        console.log('after all hook 2')
    })


    test('test 1', async () =>{
        console.log("Test 2-1")
    })

    test('test 2', async () =>{
        console.log("Test 2-2")
    })
})

