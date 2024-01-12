import {expect, test} from "@playwright/test";


test.describe("Cars", ()=>{
    test.describe("Delete", ()=>{
        test.describe("Negative case", ()=>{
            test("test", async ()=>{
                expect(1).toBe(1)
            })
        })
    })
})