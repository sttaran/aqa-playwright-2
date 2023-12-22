import BasePage from "../BasePage.js";
import AddCarPopup from "./components/AddCarPopup.js";


export default class GaragePage extends BasePage{
    constructor(page) {
        super(page, '/panel/garage')
        this.addCarButton = this._page.locator('button', {hasText: 'Add car'})
    }

   async openAddCarPopup(){
        await this.addCarButton.click()
       return new AddCarPopup(this._page)
    }
}