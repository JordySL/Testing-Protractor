import { LogginPage } from './pages/loggin.po';
import { browser, by, element, WebElement, ElementFinder, ExpectedConditions } from 'protractor';

describe('protractor-test App', () => {
  let page: LogginPage;

  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 80000;
    setTimeout(() => console.log('inside time out'), 500);
    page = new LogginPage();
  });

  it('should login', () => {

    // NON-ANGULAR PAGES
    browser.waitForAngularEnabled(false);
    page.navigateTo();
    const homePage = page.login('admin', 'admin');
    browser.driver.sleep(5000); // -> What we are trying to avoid, time consuming.

    const coachingDashboard = homePage.MasterNavBar.navigateToCoaching();
    browser.driver.sleep(5000); // -> What we are trying to avoid, time consuming.

    const machineScore = coachingDashboard.navigateToChallengeByName('Its the ML challenge of accuracy');
    browser.waitForAngularEnabled(true);
    // END OF NON-ANGULAR PAGES


    const leaderBoard = machineScore.goToLeaderBoard();
    const firstChallengeScore = leaderBoard.getFirstChallenge();
    expect(firstChallengeScore).toEqual('93.14%');
  });



});
