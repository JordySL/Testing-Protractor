// import { LogginPage } from './pages/loggin.po';
// import { browser, by, element, WebElement, ElementFinder, ExpectedConditions } from 'protractor';
// import * as request from 'request';

// describe('protractor-test App', () => {
//   let page: LogginPage;

//   beforeEach(async () => {
//     jasmine.DEFAULT_TIMEOUT_INTERVAL = 80000;
//     setTimeout(() => console.log('inside time out'), 500);
//     page = await new LogginPage();
//   });

//   it('should login', async () => {

//     // NON-ANGULAR PAGES
//     await browser.waitForAngularEnabled(false);
//     await page.navigateTo();
//     const homePage = await page.login('admin', 'admin');
//     await browser.driver.sleep(5000); // -> What we are trying to avoid, time consuming.

//     const coachingDashboard = await homePage.MasterNavBar.navigateToCoaching();
//     await browser.driver.sleep(5000); // -> What we are trying to avoid, time consuming.

//     const machineScore = await coachingDashboard.navigateToChallengeByName('Test challenge for Automation');
//     await browser.waitForAngularEnabled(true);
//     // END OF NON-ANGULAR PAGES

//     const leaderBoard = await machineScore.goToLeaderBoard();
//     const firstChallengeScore = await leaderBoard.getFirstChallenge();
//     await expect(firstChallengeScore).toEqual('83.12%');
//   });

// });
