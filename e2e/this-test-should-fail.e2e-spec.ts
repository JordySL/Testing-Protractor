import { WsErrorResponse } from './apis/common/wserror-response.model';
import { ChallengePayload, User } from './apis/services.coaching/models/challenge-payload.model';
import { ChallengeApi } from './apis/services.coaching/challenge-api';
import { ChallengeResponse } from './apis/services.coaching/models/challenge-response';
import { SessionApi } from './apis/session-api';
import { Session } from './apis/webservices-mobile/models/session-response.model';
import { Apibase } from './../src/app/apibase/apibase.component';
import { LogginPage } from './pages/loggin.po';
import { browser, by, element, WebElement, ElementFinder, ExpectedConditions } from 'protractor';


describe('protractor-test App',async () => {
	let page: LogginPage;
	const title = 'New Challenge Title' + Math.floor(Date.now() / 1000);
	let session: Session;
	let challengeId: number;

	beforeEach(async () => {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 80000;
		setTimeout(() => console.log('inside time out'), 500);

		session = await SessionApi.getSession('admin', 'admin', 'nolan');
		console.log('Session: ' + JSON.stringify(session));

		const user1: User = { userId: session.UId };
		// Creating new challenge with Apis. For now, invite myself and add myself as a reviewer
		const challenge: ChallengeResponse = await ChallengeApi.createChallengeGeneric(session, title, [user1], [user1]);
		challengeId = challenge.id;
		console.log('Challenge: ' + JSON.stringify(challenge));

		page = new LogginPage();

	});

	it('coaching POC', async () => {
		console.log('I hope this is the last message in the console');
		await browser.waitForAngularEnabled(false);
		await page.navigateTo();
		await browser.driver.sleep(2000); // -> What we are trying to avoid, time consuming.
		const homePage = await page.login('admin', 'admin');
		await browser.driver.sleep(5000); // -> What we are trying to avoid, time consuming.

		const coachingDashboard = await homePage.MasterNavBar.navigateToCoaching();
		await browser.driver.sleep(3000); // -> What we are trying to avoid, time consuming.
		await coachingDashboard.search(title) ;
		await browser.driver.sleep(1000);
		const s = await coachingDashboard.isFirstChallengeName(title);
		await expect(s).toEqual(title);
	});

	afterEach(async () => {
		const response: WsErrorResponse = await ChallengeApi.deleteChallenge(session,challengeId);
	});

});
