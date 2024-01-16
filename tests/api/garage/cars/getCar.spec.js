import {expect, test} from "@playwright/test";
import {CookieJar} from "tough-cookie";
import {wrapper} from "axios-cookiejar-support";
import axios from "axios";
import {USERS} from "../../../../src/data/users.js";
import {CAR_BRANDS} from "../../../../src/data/dict/carBrands.js";
import {CAR_MODELS} from "../../../../src/data/dict/carModels.js";


test.describe("Cars", ()=>{
    test.describe("Get by Id", ()=>{
        test.describe("Positive case", ()=>{
            let carId;
            const carBrand = CAR_BRANDS.AUDI
            const carModel = CAR_MODELS.AUDI.A8
            const carRequestBody = {
                "carBrandId": carBrand.id,
                "carModelId": carModel.id,
                "mileage": 123
            }
            const jar = new CookieJar()

            let client = wrapper(axios.create({
                baseURL: 'https://qauto.forstudy.space/api',
                jar,
                validateStatus: () => true
            }))

            async function createCar(requestData){
                const createCarResponse = await client.post('/cars', requestData)
                return createCarResponse.data.data.id
            }

            test.beforeAll(async ()=>{
                await client.post('/auth/signin', {
                    "email": USERS.JOE_DOU.email,
                    "password": USERS.JOE_DOU.password,
                    "remember": false
                })
                carId = await createCar(carRequestBody)
            })

            test.afterAll(async()=>{
                await client.delete(`/cars/${carId}`)
            })

            test('Get car by id', async ()=>{
                const startTime = Date.now()

                const response = await client.get(`/cars/${carId}`)
                expect(response.status, "Status should be valid").toBe(200)
                expect(response.data.data).toMatchObject({
                    "id": carId,
                    "carBrandId": carRequestBody.carBrandId,
                    "carModelId": carRequestBody.carModelId,
                    "initialMileage": carRequestBody.mileage,
                    "mileage": carRequestBody.mileage,
                    "brand": carBrand.title,
                    "model": carModel.title,
                    "logo": carBrand.logoFilename
                })
                expect(new Date(response.data.data.updatedMileageAt).getTime()).toBeLessThanOrEqual(startTime)
            })
        })
    })
})