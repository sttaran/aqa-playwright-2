import {expect, test} from "@playwright/test";
import {config} from "../../config/config.js";


test('TC-12 Get car brands', async()=>{
    const carBrandsResponse = await fetch(`${config.baseURL}api/cars/brands`)
    const body = await carBrandsResponse.json()
    expect(body).toEqual([])
})