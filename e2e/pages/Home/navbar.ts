import { CoachingDashboardPage } from './../Coaching/dashboard.po';
import { MyContentPage } from './mycontent.po';
import { browser, by, element, ElementFinder, ExpectedConditions, WebElement, Key } from 'protractor';

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
		const myContent: ElementFinder = await nav.element(by.id('nav-mycontent'));
		await myContent.click();
		return await new MyContentPage();
	}

	async searchMyContent(searchText: string) {
		const until = browser.ExpectedConditions;
		await browser.wait(until.presenceOf(element(by.css('input[id="search-text"]'))), 10000, 'Element searchbox taking too long to appear in the DOM');
		let searchBox: WebElement = await browser.findElement(by.css('input[id="search-text"]'));
		await searchBox.click();
		await searchBox.clear();
		await searchBox.sendKeys(searchText);
		await searchBox.sendKeys(Key.ENTER);
		return await new MyContentPage();
	}

	async getNav() {
		await browser.wait(ExpectedConditions.presenceOf(element(by.id('nav-link-section'))), 10000);
		return element(by.id('nav-link-section'));
	}
}
