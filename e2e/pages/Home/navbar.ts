import { CoachingDashboardPage } from './../Coaching/dashboard.po';
import { browser, by, element, ElementFinder, ExpectedConditions } from 'protractor';

export class NavBar {

	async navigateToCoaching() {
		const nav: ElementFinder = await this.getNav();
		const coaching: ElementFinder = await nav.element(by.id('nav-coaching'));
		await coaching.click();
		return await new CoachingDashboardPage();
	}

	async getNav() {
		await browser.wait(ExpectedConditions.presenceOf(element(by.id('nav-link-section'))), 10000);
		return element(by.id('nav-link-section'));
	}
}
