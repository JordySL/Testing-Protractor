import { CoachingDashboardPage } from './../Coaching/dashboard.po';
import { MyContentPage } from './mycontent.po';
import { browser, by, element, ElementFinder, ExpectedConditions, WebElement, Key } from 'protractor';
import { TestUtils } from '../../test-utilities/test-utils';

export class NavBar {
	private searchField: ElementFinder = element(by.id('search-text'));

	async navigateToCoaching() {
		const nav: ElementFinder = await this.getNav();
		const coaching: ElementFinder = await nav.element(by.id('nav-coaching'));
		await coaching.click();
		return await new CoachingDashboardPage();
	}

	async navigateToMyContent() {
		const nav: ElementFinder = await this.getNav();
		await browser.wait(ExpectedConditions.elementToBeClickable(nav.element(by.id('nav-mycontent'))), 10000, 'Timeout waiting for My Content button');
		const myContent: ElementFinder = await nav.element(by.id('nav-mycontent'));
		await myContent.click();
		return await new MyContentPage();
	}

	async searchMyContent(searchText: string) {
		const until = browser.ExpectedConditions;
		await browser.wait(until.presenceOf(element(by.id('search-text'))), 10000, 'Element searchbox taking too long to appear in the DOM');
		let searchBox: WebElement = await browser.findElement(by.id('search-text'));
		await searchBox.sendKeys(searchText);
		await searchBox.sendKeys(Key.ENTER);
		browser.sleep(1000);
		return await new MyContentPage();
	}

	async getNav() {
		await browser.wait(ExpectedConditions.visibilityOf(element(by.id('nav-link-section'))), 10000);
		return element(by.id('nav-link-section'));
	}
}
