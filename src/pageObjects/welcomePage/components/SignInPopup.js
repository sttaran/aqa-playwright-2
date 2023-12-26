import BaseComponent from "../../../components/BaseComponent.js";
import {expect} from "@playwright/test";
import GaragePage from "../../garagePage/GaragePage.js";

export default class SignInPopup extends BaseComponent{
    constructor(page) {
        super(page, page.locator('app-signin-modal'))
        this.emailInput = this.container.locator('[name="email"]')
        this.passwordInput = this.container.locator('[name="password"]')
        this.errorMessage = this.container.locator('.invalid-feedback p')
        this.submitButton = this.container.locator('.btn-primary')
    }


    async loginWithCredentials(email, password){
        await this.fill(email, password)
        await this.submitButton.click()
        return new GaragePage(this._page)
    }

    async fill(email, password){
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)
    }

    // OK
    async checkErrorMessage(message){
        await expect(this.errorMessage).toEqual(message)
    }

    // NOT OK
    async checkErrorMessageInvalidEmail(message){
        await this.emailInput.fill("olololol")
        await this.emailInput.blur()
        await expect(this.error).toEqual(message)
    }
}