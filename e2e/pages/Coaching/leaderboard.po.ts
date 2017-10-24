import { MdSelect } from './../Common/mdSelect';
import { browser, by, element, WebElement, ElementFinder, ExpectedConditions } from 'protractor';

export class LeaderBoardPage {
	private highlightedContainer: ElementFinder = element(by.tagName('app-leaderboard-card-highlights'));
	private leaderBoardContent: ElementFinder = element(by.tagName('app-leaderboard'));

	constructor() {
		browser.wait(ExpectedConditions.presenceOf(this.leaderBoardContent), 3000);
	}

	public async switchChallenge(challengeName: string): Promise<LeaderBoardPage> {
		await browser.wait(ExpectedConditions.presenceOf(element(by.className('mat-select-value'))), 6000);
		const select: WebElement = await browser.findElement((by.className("mat-select-value")));
		const mdSelect = new MdSelect(select);
		await mdSelect.selectByText(challengeName);
		return new LeaderBoardPage();
	}

	public async switchToTableView() {
		const el = await browser.findElement(by.id("md-tab-label-0-1"));
		await el.click();
		await browser.wait(ExpectedConditions.presenceOf(element(by.className('bsk-leaderboard'))), 5000);
	}

	public async getLeaderboardTableEntries() {
		let leaderboardRows: LeaderboardRow[]= [];
		const table = await browser.findElement(by.ClassName("bsk-leaderboard"));
		const body = await table.findElement(by.ClassName("datatable-body"));
		const rows = await body.findElements(by.ClassName("datatable-row-center"));
		for(let row of rows)
		{
			const columns = await row.findElements(by.CssSelector("datatable-body-cell div"));
			const place: number = Number.parseInt(await columns[1].getText());
			const name: string = await columns[2].getText();
			const scoreText = await columns[3].getText(); 
			const score: number = Number.parseInt((await columns[3].getText()).replace(" %",""));
			const duration: string = await columns[4].getText();

			leaderboardRows.push(new LeaderboardRow (place, name, score, duration));
		}

		return leaderboardRows;
	}

}

export class LeaderboardRow {
	constructor(
		public Place: number,
		public ParticipantName: string,
		public Score: number,
		public Duration: string
	) { }

}