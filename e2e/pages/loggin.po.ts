import { HomePage } from './Home/home.po';
import { browser, by, element, WebElement, ElementFinder } from 'protractor';

export class LogginPage {
    private loginIframePosition = 0;
    private username: ElementFinder = element(by.id('txtUserName'));
    private password: ElementFinder = element(by.id('txtPassword'));
    private btnLogin: ElementFinder = element(by.id('bntLogin'));

    navigateTo() {
        browser.get(browser.params.baseUrl + 'brainshark/public/login/m/login2.asp?companyid=21362');
        browser.switchTo().frame(this.loginIframePosition);
    }

    login(username: string, password: string) {
        this.setUsername(username);
        this.setPassword(password);
        this.btnLogin.click();
        return new HomePage();
    }

    setUsername(username: string) {
        return this.username.sendKeys(username);
    }

    setPassword(password: string) {
        return this.password.sendKeys(password);
    }
}
