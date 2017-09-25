import { LogginPage } from './pages/loggin.po';
import { browser, by, element, WebElement, ElementFinder, ExpectedConditions } from 'protractor';
import * as request from 'request';

describe('protractor-test App', () => {
  let page: LogginPage;

  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 80000;
    setTimeout(() => console.log('inside time out'), 500);
    page = new LogginPage();

    request.get('http://google.com/img.png', {}, function (error, message) {
      console.log('it worked first one');
    });

    request.get('http://google.com/', {}, function (error, message) {
      console.log('it worked  second one');
    });

  });

  it('should login', () => {

    // NON-ANGULAR PAGES
    browser.waitForAngularEnabled(false);
    page.navigateTo();
    const homePage = page.login('admin', 'admin');
    browser.driver.sleep(5000); // -> What we are trying to avoid, time consuming.

    const coachingDashboard = homePage.MasterNavBar.navigateToCoaching();
    browser.driver.sleep(5000); // -> What we are trying to avoid, time consuming.

    const machineScore = coachingDashboard.navigateToChallengeByName('Test challenge for Automation');
    browser.waitForAngularEnabled(true);
    // END OF NON-ANGULAR PAGES


    const leaderBoard = machineScore.goToLeaderBoard();
    const firstChallengeScore = leaderBoard.getFirstChallenge();
    expect(firstChallengeScore).toEqual('83.12%');
  });



});
