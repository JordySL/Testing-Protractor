import { HomePage } from './Home/home.po';
import { browser, by, element, WebElement, ElementFinder, ExpectedConditions } from 'protractor';

export class LoginPage {
	private loginIframePosition = 0;
	private username: WebElement;
	private password: WebElement;
	private btnLogin: WebElement;

	async navigateToCompanyId(companyId: number) {
		await browser.get(process.env.BSK_BASE_URL + 'brainshark/public/login/m/login.asp?companyid='+companyId);
		await browser.wait(ExpectedConditions.visibilityOf(element(by.id('iframeLogin'))), 10000, 'Timeout waiting for login iframe');
		await browser.switchTo().frame(this.loginIframePosition);
		await browser.wait(ExpectedConditions.visibilityOf(element(by.id('txtUserName'))), 10000, 'Timeout waiting for username field');
		this.username = await browser.findElement(by.id('txtUserName'));
		this.password = await browser.findElement(by.id('txtPassword'));
		this.btnLogin = await browser.findElement(by.id('bntLogin'));
	
		return this;
	}

	async login(username: string, password: string) {
		await this.setUsername(username);
		await this.setPassword(password);
		await this.btnLogin.click();
		let homepage = await new HomePage();
		browser.switchTo().defaultContent();
		return homepage;
	}

	async setUsername(username: string) {
		return await this.username.sendKeys(username);
	}

	async setPassword(password: string) {
		for ( let c of password){
			await this.password.sendKeys(c);
		}
		return
	}
}
