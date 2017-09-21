import { MachineScorePage } from './machine-score.po';
import { browser, by, element, WebElement, ElementFinder } from 'protractor';

export class CoachingDashboardPage {
    private loginIframePosition = 0;
    private searchBox: ElementFinder = element(by.className('au-tableview-searchbox'));


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
}
