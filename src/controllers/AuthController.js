import BaseController from "./BaseController.js";

export default class AuthController  extends BaseController{
    #LOGIN_PATH = '/auth/signin'

    constructor(jar) {
       super(jar)
    }

    async login(requestBody){
        return this.client.post(this.#LOGIN_PATH, requestBody)
    }
}