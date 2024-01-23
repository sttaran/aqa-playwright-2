import axios from "axios";
import {USERS} from "../../../../src/data/users.js";
import {expect, test} from "@playwright/test";
import {wrapper} from "axios-cookiejar-support";
import {CookieJar} from "tough-cookie";
import {negativeFixtures} from "./fixtures/createCar.fixtures.js";

test.describe.skip("Cars", ()=>{
    test.describe("Create", ()=>{
        test.describe("Positive case (Use header)", ()=>{
            let client = axios.create({
                baseURL: 'https://qauto.forstudy.space/api'
            })

            let brands;

            test.beforeAll(async ()=>{
                const signInResponse = await client.post('/auth/signin', {
                    "email": USERS.JOE_DOU.email,
                    "password": USERS.JOE_DOU.password,
                    "remember": false
                })
                const cookie = signInResponse.headers["set-cookie"][0].split(';')[0]
                client = axios.create({
                    baseURL: 'https://qauto.forstudy.space/api',
                    headers: {
                        cookie,
                        // 'authorisation': `Bearer ${token}`
                    }
                })

                const response = await client.get('/cars/brands')
                brands = response.data.data
            })

            test.afterAll(async()=>{
                const userCars = await client.get('/cars')
                await Promise.all(
                    userCars.data.data.map((car)=> client.delete(`/cars/${car.id}`))
                )
            })

            test('Create car', async ()=>{
                for (const brand of brands) {
                    await test.step(`Create car brand ${brand.title}`, async()=>{

                        const modelsResponse = await client.get(`/cars/models?carBrandId=${brand.id}`)
                        const models = modelsResponse.data.data

                        for (const model of models) {
                            await test.step(`Model : ${model.title}`, async()=>{
                                const createCarReqBody = {
                                    "carBrandId": brand.id,
                                    "carModelId": model.id,
                                    "mileage": Math.floor(Math.random() * 100)
                                }
                                const createCarResponse = await client.post('/cars', createCarReqBody)
                                expect(createCarResponse.status, "Status code should be valid").toBe(201)
                            })
                        }
                    })
                }
            })
        })
    })
})

test.describe("Cars", ()=>{
    test.describe("Create", ()=>{
        test.describe("Positive case", ()=>{
            const jar = new CookieJar()

            let client = wrapper(axios.create({
                baseURL: 'https://qauto.forstudy.space/api',
                jar
            }))

            let brands;

            test.beforeAll(async ()=>{
               await client.post('/auth/signin', {
                    "email": USERS.JOE_DOU.email,
                    "password": USERS.JOE_DOU.password,
                    "remember": false
                })

                const response = await client.get('/cars/brands')
                brands = response.data.data
            })

            test.afterAll(async()=>{
                const userCars = await client.get('/cars')
                await Promise.all(
                    userCars.data.data.map((car)=> client.delete(`/cars/${car.id}`))
                )
            })

            test('Create car', async ()=>{
                for (const brand of brands) {
                    await test.step(`Create car brand ${brand.title}`, async()=>{

                        const modelsResponse = await client.get(`/cars/models?carBrandId=${brand.id}`)
                        const models = modelsResponse.data.data

                        for (const model of models) {
                            await test.step(`Model : ${model.title}`, async()=>{
                                const createCarReqBody = {
                                    "carBrandId": brand.id,
                                    "carModelId": model.id,
                                    "mileage": Math.floor(Math.random() * 100)
                                }
                                const createCarResponse = await client.post('/cars', createCarReqBody)
                                expect(createCarResponse.status, "Status code should be valid").toBe(201)
                            })
                        }
                    })
                }
            })
        })
    })
})


test.describe.skip("Cars", ()=>{
    test.describe("Create", ()=>{
        test.describe("Negative case", ()=>{
            const jar = new CookieJar()

            let client = wrapper(axios.create({
                baseURL: 'https://qauto.forstudy.space/api',
                jar,
                validateStatus: (status)=> status < 501
            }))
            let brands;

            test.beforeAll(async ()=>{
                await client.post('/auth/signin', {
                    "email": USERS.JOE_DOU.email,
                    "password": USERS.JOE_DOU.password,
                    "remember": false
                })

                const response = await client.get('/cars/brands')
                brands = response.data.data
            })

            test('should return error message when mileage is missing.', async ()=>{
                const brand = brands[0]
                const modelsResponse = await client.get(`/cars/models?carBrandId=${brand.id}`)
                const models = modelsResponse.data.data

                const model = models[0]

                const createCarReqBody = {
                    "carBrandId": brand.id,
                    "carModelId": model.id,
                }

                const createCarResponse = await client.post('/cars', createCarReqBody)
                expect(createCarResponse.status, "Status code should be valid").toBe(400)
                expect(createCarResponse.data, "Response body should be valid").toEqual({ status: 'error', message: 'Mileage is required' })
            })

            test('should return error message when brandId is missing.', async ()=>{
                const brand = brands[0]
                const modelsResponse = await client.get(`/cars/models?carBrandId=${brand.id}`)
                const models = modelsResponse.data.data

                const model = models[0]

                const createCarReqBody = {
                    "carModelId": model.id,
                    "mileage": Math.floor(Math.random() * 100)
                }

                const createCarResponse = await client.post('/cars', createCarReqBody)
                expect(createCarResponse.status, "Status code should be valid").toBe(400)
                expect(createCarResponse.data, "Response body should be valid").toEqual({ status: 'error', message: "Car brand id is required" })
            })

            test('should return error message when modelId is missing.', async ()=>{
                const brand = brands[0]

                const createCarReqBody = {
                    "carBrandId": brand.id,
                    "mileage": Math.floor(Math.random() * 100)
                }

                const createCarResponse = await client.post('/cars', createCarReqBody)
                expect(createCarResponse.status, "Status code should be valid").toBe(400)
                expect(createCarResponse.data, "Response body should be valid").toEqual({ status: 'error', message: "Car model id is required" })
            })
        })
    })
})

test.describe("Cars", ()=>{
    test.describe("Create", ()=>{
        test.describe("Negative case", ()=>{
            const jar = new CookieJar()

            let client = wrapper(axios.create({
                baseURL: 'https://qauto.forstudy.space/api',
                jar,
                validateStatus: (status)=> status < 501
            }))
            let brands;

            test.beforeAll(async ()=>{
                await client.post('/auth/signin', {
                    "email": USERS.JOE_DOU.email,
                    "password": USERS.JOE_DOU.password,
                    "remember": false
                })

                const response = await client.get('/cars/brands')
                brands = response.data.data
            })


            for (const {title, inputData, expectedData} of negativeFixtures) {
                test(title, async ()=>{
                    const createCarResponse = await client.post('/cars', inputData)
                    expect(createCarResponse.status, "Status code should be valid").toBe(expectedData.statusCode)
                    expect(createCarResponse.data, "Response body should be valid").toEqual(expectedData.data)
                })
            }
        })
    })
})



