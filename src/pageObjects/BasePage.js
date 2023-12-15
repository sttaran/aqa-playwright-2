import Header from "../components/Header.js";
import BaseComponent from "../components/BaseComponent.js";


export default class BasePage  extends  BaseComponent{
    constructor(page, url, waitPageSelector = 'html') {
        super(page, page.locator('html'))
        this._waitPageSelector = waitPageSelector
        this._page = page
        this._url = url
        this.header = new Header(page)
    }

    async visit(){
        await this._page.goto(this._url)
        await this.waitLoaded()
    }

    async waitLoaded(){
        await this._page.locator(this._waitPageSelector).waitFor()
    }
}