import { MachineScorePage } from './machine-score.po';
import { browser, by, element, WebElement, ElementFinder, ElementArrayFinder } from 'protractor';

export class CoachingDashboardPage {
    private loginIframePosition = 0;
    private searchBox: ElementFinder = element(by.className('au-tableview-searchbox'));

	constructor() {
		var until = browser.ExpectedConditions;
		browser.wait(until.presenceOf(element(by.tagName('app-tabs'))), 10000, 'Element taking too long to appear in the DOM');
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
		console.log('2');
		const allChallengesTable = element(by.tagName('app-all-challenges-table'));
		console.log('3');
		const rows = allChallengesTable.all(by.className('datatable-body-row'));
		console.log('4');
		return rows;
	}
	
	isFirstChallengeName(searchString: string) {
		console.log('1');
		const challenge = this.getDashboardRows().first();
		console.log('5');
		return challenge.element(by.tagName('a')).getText();
	}

	
    search(text: string) {
		const until = browser.ExpectedConditions;
		browser.wait(until.presenceOf(element(by.className('au-search-box'))), 10000, 'Element taking too long to appear in the DOM');
		let  searchBox: ElementFinder = element(by.className('au-search-box'));
        searchBox.click();
        searchBox.clear();
        searchBox.sendKeys(text);
	}

}
