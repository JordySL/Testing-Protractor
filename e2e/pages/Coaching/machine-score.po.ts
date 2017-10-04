import { LeaderBoardPage } from './leaderboard.po';
import { browser, by, element, WebElement, ElementFinder, ExpectedConditions } from 'protractor';

export class MachineScorePage {
    private participant: ElementFinder;
    private versionList: ElementFinder;

    private summary: ElementFinder = element(by.className('summary-information'));
    private leaderBoardLink: ElementFinder = this.summary.element(by.linkText('View Leaderboard'));

    constructor() {
        browser.waitForAngularEnabled(false);
        // browser.wait(ExpectedConditions.visibilityOf(this.summary), 3000);
        // const dropdowns = element.all(by.css('.mat-select-trigger'));
        // this.participant = dropdowns.get(0);
        // this.versionList = dropdowns.get(1);
    }

    async switchVesion(version: number) {
        // return this.versionList.click();
    }

    async goToLeaderBoard() {
        await browser.waitForAngularEnabled(false);
        await this.leaderBoardLink.click();
        await browser.waitForAngularEnabled(true);
        return await new LeaderBoardPage();
    }
}
