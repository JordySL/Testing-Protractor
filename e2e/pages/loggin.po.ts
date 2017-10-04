import { HomePage } from './Home/home.po';
import { browser, by, element, WebElement, ElementFinder } from 'protractor';

export class LogginPage {
    private loginIframePosition = 0;
    private username: ElementFinder = element(by.id('txtUserName'));
    private password: ElementFinder = element(by.id('txtPassword'));
    private btnLogin: ElementFinder = element(by.id('bntLogin'));

     navigateTo() {
         browser.get(browser.params.baseUrl + 'brainshark/public/login/m/login2.asp?companyid=20586');
        return browser.switchTo().frame(this.loginIframePosition);
    }

    async login(username: string, password: string) {
       await  this.setUsername(username);
        await this.setPassword(password);
        await this.btnLogin.click();
        return new HomePage();
    }

    async setUsername(username: string) {
        return await this.username.sendKeys(username);
    }

    async setPassword(password: string) {
        return await this.password.sendKeys(password);
    }
}
