import BasePage from "./BasePage.js";
import SignInPopup from "../components/SignInPopup.js";


export default class WelcomePage extends BasePage{
    constructor(page) {
        super(page, '/', '.header_signin')
    }

    async clickSignInButtonAndOpenPopup(){
        await this.header.signInButton.click()
        return new SignInPopup(this._page)
    }
}