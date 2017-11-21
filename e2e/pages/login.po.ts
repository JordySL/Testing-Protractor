import { HomePage } from './Home/home.po';
import { browser, by, element, WebElement, ElementFinder } from 'protractor';

export class LoginPage {
	private loginIframePosition = 0;
	private username: ElementFinder = element(by.id('txtUserName'));
	private password: ElementFinder = element(by.id('txtPassword'));
	private btnLogin: ElementFinder = element(by.id('bntLogin'));

	async navigateToCompanyId(companyId: number) {
		await browser.get(process.env.BSK_BASE_URL + 'brainshark/public/login/m/login.asp?companyid='+companyId);
		return await browser.switchTo().frame(this.loginIframePosition);
	}

	async login(username: string, password: string) {
		await this.setUsername(username);
		await this.setPassword(password);
		await this.btnLogin.click();
		return await new HomePage();
	}

	async setUsername(username: string) {
		return await this.username.sendKeys(username);
	}

	async setPassword(password: string) {
		return await this.password.sendKeys(password);
	}
}