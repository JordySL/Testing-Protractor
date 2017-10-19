import { MachineScorePage } from './machine-score.po';
import { browser, by, element, WebElement, ElementFinder, ElementArrayFinder, ExpectedConditions, promise } from 'protractor';

export class CoachingDashboardPage  {
	private loginIframePosition = 0;
	private searchBox: ElementFinder = element(by.className('au-tableview-searchbox'));

	constructor() {
		
	}
	
	// async ngOnInit() {
	// 	var until = browser.ExpectedConditions;
	// 	await browser.wait(until.presenceOf(element(by.id('all-challenges-md-tab-group'))), 0, 'Element (' + 'all-challenges-md-tab-group' + ') taking too long to appear in the DOM');
	// 	await browser.waitForAngularEnabled(true);
	// }

	async navigateToChallengeByName(challengeName: string) {
		await this.setSearchBox(challengeName);
		const challengeLink = element(by.linkText(challengeName));
		await challengeLink.click();
		await browser.waitForAngularEnabled(true);
		return await new MachineScorePage();
	}

	async setSearchBox(text: string) {
		await this.searchBox.click();
		await this.searchBox.clear();
		await this.searchBox.sendKeys(text);
	}

	async getDashboardRows(): Promise<WebElement[]> {
		await browser.wait(ExpectedConditions.presenceOf(element(by.tagName('app-all-challenges-table'))), 10000, 'Timeout waiting for all challenges table');
		const allChallengesTable = await browser.findElement(by.tagName('app-all-challenges-table'));
		return await allChallengesTable.findElements(by.className('datatable-body-row'));
	}

	async isFirstChallengeName(searchString: string) {
		const challengeRows: WebElement[] = await this.getDashboardRows();
		const challenge = await challengeRows[0].findElement(by.tagName('a'));
		const text = await challenge.getText();
		return text.trim();
	}

	async search(text: string) {
		const until = browser.ExpectedConditions;
		await browser.wait(until.presenceOf(element(by.css('input[placeholder="Search Challenges..."]'))), 10000, 'Element searchbox taking too long to appear in the DOM');
		let searchBox: WebElement = await browser.findElement(by.css('input[placeholder="Search Challenges..."]'));
		await searchBox.click();
		await searchBox.clear();
		await searchBox.sendKeys(text);
		browser.sleep(1000);
	}

}
