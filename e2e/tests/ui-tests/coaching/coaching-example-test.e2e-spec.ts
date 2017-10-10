import { MailHandlerService } from './../../../../src/mailhandler/mailhanlder.service';
import { LogginPage } from './../../../pages/loggin.po';
import { TestUtils } from './../../../test-utils';
import { WsErrorResponse } from './../../../apis/common/wserror-response.model';
import { ChallengePayload, User } from './../../../apis/services.coaching/models/challenge-payload.model';
import { ChallengeApi } from './../../../apis/services.coaching/challenge-api';
import { ChallengeResponse } from './../../../apis/services.coaching/models/challenge-response';
import { SessionApi } from './../../../apis/session-api';
import { Session } from './../../../apis/webservices-mobile/models/session-response.model';
import { browser, by, element, WebElement, ElementFinder, ExpectedConditions } from 'protractor';


describe('protractor-test App',async () => {
	let page: LogginPage;
	const title = 'New Challenge Title' + TestUtils.timestamp();
	let session: Session;
	let challengeId: number;

	beforeEach(async () => {
		//jasmine.DEFAULT_TIMEOUT_INTERVAL = 80000;
		setTimeout(() => console.log('inside time out'), 500);
		const mailHandler = new MailHandlerService();
		const emailFound: any[] = await mailHandler.waitForEmailsBySubject('OK', 1, 60);
		console.log(JSON.stringify(emailFound));

		session = await SessionApi.getSession('admin', 'admin', 'nolan');

		const user1: User = { userId: session.UId };
		// Creating new challenge with Apis. For now, invite myself and add myself as a reviewer
		const challenge: ChallengeResponse = await ChallengeApi.createChallengeGeneric(session, title, [user1], [user1]);
		challengeId = challenge.id;

		page = await new LogginPage();

	}, 200000);

	it('coaching POC', async () => {
		await browser.waitForAngularEnabled(false);
		await page.navigateTo();
		const homePage = await page.login('admin', 'admin');

		const coachingDashboard = await homePage.MasterNavBar.navigateToCoaching();
		await coachingDashboard.search(title) ;
		const s = await coachingDashboard.isFirstChallengeName(title);
		await expect(s).toEqual(title);
	});

	afterEach(async () => {
		const response: WsErrorResponse = await ChallengeApi.deleteChallenge(session,challengeId);
	});

});
