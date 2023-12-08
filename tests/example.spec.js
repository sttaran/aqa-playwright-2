// @ts-check
import {expect, test} from "@playwright/test";

test.describe('Test describe title', ()=>{
    test.beforeAll(async ()=>{
        console.log('before all hook')
    })

    test.beforeEach(async ()=>{
        console.log('before each hook')
    })

    test.afterEach(async ()=>{
        console.log('after each hook')
    })

    test.afterAll(async ()=>{
        console.log('after all hook')
    })


    test('test 1', async () =>{
        console.log("Test 1")
    })

    test('test 2', async () =>{
        console.log("Test 2")
    })
})

