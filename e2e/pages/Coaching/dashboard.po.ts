import { MachineScorePage } from './machine-score.po';
import { CoachingCreateEditPage } from './create-edit.po';
import { browser, by, element, WebElement, ElementFinder, ElementArrayFinder, ExpectedConditions, promise } from 'protractor';

export class CoachingDashboardPage  {
	private loginIframePosition = 0;
	private challengeSearchBoxFinder: ElementFinder = element(by.css('input[placeholder="Search Activities..."]'));
	private dontShowAgainTutorialButtonFinder: ElementFinder = element(by.className('tutorial-mute'));
	private rowsInChallengesTableFinder = element.all(by.css('.coaching-table .datatable-body-row'));
	private challengesTableFinder: ElementFinder = element(by.className('coaching-table'));

	constructor() {	}

	async navigateToChallengeByName(challengeName: string) {
		await this.setSearchBox(challengeName);
		const challengeLink = element(by.linkText(challengeName));
		await challengeLink.click();
		await browser.waitForAngularEnabled(true);
		return await new MachineScorePage();
	}

	async createChallenge() {
		const until = browser.ExpectedConditions;
		await browser.wait(until.presenceOf(element(by.className('mat-fab'))), 10000,
		'Element searchbox taking too long to appear in the DOM');
		const createButton = element(by.className('mat-fab'));
		await createButton.click();
		await browser.waitForAngularEnabled(true);
		return new CoachingCreateEditPage();
	}


	async setSearchBox(text: string) {
		await this.challengeSearchBoxFinder.click();
		await this.challengeSearchBoxFinder.clear();
		await this.challengeSearchBoxFinder.sendKeys(text);
	}

	async getNumberOfChallengesInDashboardTable(): Promise<number> {
		return (await this.getDashboardTableRows()).length;
	}

	async getDashboardTableRows(): Promise<WebElement[]> {
		const until = browser.ExpectedConditions;
		await browser.wait(until.presenceOf(this.challengesTableFinder), 10000, 'Timeout waiting for all challenges table');
		return await this.rowsInChallengesTableFinder;
	}

	async getFirstChallengeNameInDashboardTable(): Promise<String> {
		const firstChallengeRowFinder = this.challengesTableFinder.element(by.css(':first-child'));
		const firstChallengeTitleCellFinder = firstChallengeRowFinder.element(by.className('title-cell'));
		const firstChallengeTitleComponent = firstChallengeTitleCellFinder.element(by.tagName('a'));
		const firstChallengeTitle = await firstChallengeTitleComponent.getText();
		return firstChallengeTitle.trim();
	}

	async isTutorialModalWindowShown(): Promise<boolean> {
		// if the button is displayed there, then we can assume the whole tutorial modal window is shown as well
		return await (this.dontShowAgainTutorialButtonFinder.isPresent());
	}

	async closeTutorialModalWindow() {
		await this.dontShowAgainTutorialButtonFinder.click();
	}

	async search(text: string) {
		const until = browser.ExpectedConditions;
		await browser.wait(until.presenceOf(this.challengeSearchBoxFinder), 10000, 'Element searchbox taking too long to appear in the DOM');
		await this.setSearchBox(text);
		browser.sleep(1000);
	}

}
