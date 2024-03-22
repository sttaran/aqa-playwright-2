import {test} from '../../../../src/fixtures/customFixtures.js'
import {expect} from "@playwright/test";
import moment from "moment";

test.describe.only("Cars", ()=>{
    test.describe("Create", ()=>{
        test.describe("Positive case (Use header)", ()=>{
            test.only('create car', async ({apiClient})=> {
                const requestBody =  {
                    "carBrandId": 1,
                    "carModelId": 1,
                    "mileage": 122
                }
                const expectedBodyData = {
                    "id": expect.any(Number),
                    "carBrandId": requestBody.carBrandId,
                    "carModelId": requestBody.carModelId,
                    "initialMileage": requestBody.mileage,
                    "updatedMileageAt": expect.any(String),
                    "carCreatedAt": expect.any(String),
                    "mileage": requestBody.mileage,
                    "brand": "Audi",
                    "model": "TT",
                    "logo": "audi.png"
                }

                const startTime = new Date()
                const response = await apiClient.post('/api/cars', {
                    data: requestBody
                })

                const body = await response.json()
                expect(body.status).toBe("ok")
                expect(body.data).toEqual(expectedBodyData)
                expect(body.data.updatedMileageAt).toBe(body.data.carCreatedAt)

                expect(moment(body.data.updatedMileageAt).isAfter(startTime)).toBe(true)
                expect(moment(body.data.carCreatedAt).isAfter(startTime)).toBe(true)

                expect(moment(body.data.updatedMileageAt).diff(startTime)).toBeLessThanOrEqual(1000)
                expect(moment(body.data.carCreatedAt).diff(startTime)).toBeLessThanOrEqual(1000)

                expect(body.data.id).toBeGreaterThan(0)
            })
        })
    })
})



