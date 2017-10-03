import { MachineScorePage } from './machine-score.po';
import { browser, by, element, WebElement, ElementFinder, ElementArrayFinder, ExpectedConditions } from 'protractor';

export class CoachingDashboardPage {
    private loginIframePosition = 0;
    private searchBox: ElementFinder = element(by.className('au-tableview-searchbox'));

	constructor() {
		var until = browser.ExpectedConditions;
		browser.wait(until.presenceOf(element(by.id('all-challenges-md-tab-group'))), 10000, 'Element ('+ 'all-challenges-md-tab-group' +') taking too long to appear in the DOM');
		browser.waitForAngularEnabled(true);
	}

    navigateToChallengeByName(challengeName: string) {
        this.setSearchBox(challengeName);
        const challengeLink = element(by.linkText(challengeName));
        challengeLink.click();
        browser.waitForAngularEnabled(true);
        return new MachineScorePage();
    }

    setSearchBox(text: string) {
        this.searchBox.click();
        this.searchBox.clear();
        this.searchBox.sendKeys(text);
	}
	
	getDashboardRows(): ElementArrayFinder {
		browser.wait(ExpectedConditions.presenceOf(element(by.tagName('app-all-challenges-table'))), 10000, 'Timeout waiting for all challenges table');
		const allChallengesTable = element(by.tagName('app-all-challenges-table'));
		const rows = allChallengesTable.all(by.className('datatable-body-row'));
		return rows;
	}
	
	async isFirstChallengeName(searchString: string) {
		const challenge = await this.getDashboardRows().first();
		const text = await challenge.element(by.tagName('a')).getText();
		return text;
	}

	
    async search(text: string) {
		const until = browser.ExpectedConditions;
		browser.wait(until.presenceOf(element(by.css('input[placeholder="Search Challenges..."]'))), 10000, 'Element searchbox taking too long to appear in the DOM');
		let  searchBox: ElementFinder = element(by.css('input[placeholder="Search Challenges..."]'));
        searchBox.click();
        searchBox.clear();
       await searchBox.sendKeys(text);
	}

}
