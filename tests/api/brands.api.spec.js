import {expect, test} from "@playwright/test";


test('Get car brands', async()=>{
    const carBrandsResponse = await fetch('https://qauto.forstudy.space/api/cars/brands')
    const body = await carBrandsResponse.json()

    expect(body).toEqual([])
})