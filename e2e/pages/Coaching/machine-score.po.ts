import { MdSelect } from './../Common/mdSelect';
import { LeaderBoardPage } from './leaderboard.po';
import { browser, by, element, WebElement, ElementFinder, ExpectedConditions } from 'protractor';

export class MachineScorePage {
    private participant: ElementFinder;
    private versionList: ElementFinder;

    private summary: ElementFinder = element(by.className('summary-information'));
    private leaderBoardLink: ElementFinder = this.summary.element(by.linkText('View Leaderboard'));

    constructor() {
        browser.waitForAngularEnabled(false);
    }

    async switchVersion(version: number): Promise<void> {
		const versionSelect = await browser.findElement(by.css('md-select[placeholder="Version"]'));
		const mdSelect = new MdSelect(versionSelect);
		await mdSelect.selectByText(version.toString());
    }

    async goToLeaderBoard() {
        await browser.waitForAngularEnabled(false);
        await this.leaderBoardLink.click();
        await browser.waitForAngularEnabled(true);
        return await new LeaderBoardPage();
    }
}
