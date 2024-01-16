import {expect, test} from "@playwright/test";
import {CookieJar} from "tough-cookie";
import {wrapper} from "axios-cookiejar-support";
import axios from "axios";
import {USERS} from "../../../../src/data/users.js";


test.describe("Cars", ()=>{
    test.describe("Delete", ()=>{
        test.describe("Positive case", ()=>{
            let carId;
            const jar = new CookieJar()

            let client = wrapper(axios.create({
                baseURL: 'https://qauto.forstudy.space/api',
                jar,
                validateStatus: () => true
            }))


          async function createCar(brandId = 1, modelId = 1, mileage = 11){
                const createCarReqBody = {
                    "carBrandId":brandId,
                    "carModelId": modelId,
                    "mileage": mileage
                }
                const createCarResponse = await client.post('/cars', createCarReqBody)
              return createCarResponse.data.data.id
            }


            test.beforeAll(async ()=>{
                await client.post('/auth/signin', {
                    "email": USERS.JOE_DOU.email,
                    "password": USERS.JOE_DOU.password,
                    "remember": false
                })
                carId = await createCar()
            })



            test('Delete car', async ()=>{
                await test.step("Delete car", async ()=>{
                    const response = await client.delete(`/cars/${carId}`)
                    expect(response.status, "Status should be valid").toBe(200)
                })

                await test.step("Get car by id", async ()=>{
                    const response = await client.get(`/cars/${carId}`)
                    expect(response.status, "Status should be valid").toBe(404)
                    expect(response.data, "Response body should be valid for deleted car").toEqual({
                        "status": "error",
                        "message": "Car not found"
                    })
                })
            })
        })
    })
})