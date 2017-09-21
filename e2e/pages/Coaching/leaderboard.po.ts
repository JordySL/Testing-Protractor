import { browser, by, element, WebElement, ElementFinder, ExpectedConditions } from 'protractor';

export class LeaderBoardPage {
    private highlightedContainer: ElementFinder = element(by.tagName('app-leaderboard-card-highlights'));
    private leaderBoardContent: ElementFinder = element(by.tagName('app-leaderboard'));

    constructor() {
        browser.wait(ExpectedConditions.presenceOf(this.leaderBoardContent), 3000);
    }

    getFirstChallenge() {

        const first = element(by.className('big'));
        const fields = first.element(by.className('fields'));
        return fields.element(by.className('percent')).getText();
        // browser.wait(ExpectedConditions.presenceOf(this.highlightedContainer), 5000);
        // const highlightedChallenges = this.highlightedContainer.all(by.tagName('app-leaderboard-card'));
        // console.log(highlightedChallenges.count());
        // return highlightedChallenges.get(0);
    }

}
