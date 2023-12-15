import BaseComponent from "./BaseComponent.js";

export default class SignInPopup extends BaseComponent{
    constructor(page) {
        super(page, page.locator('app-signin-modal'))
        this.emailInput = this.container.locator('[name="email"]')
        this.passwordInput = this.container.locator('[name="password"]')
        this.errorMessage = this.container.locator('.invalid-feedback p')
    }
}