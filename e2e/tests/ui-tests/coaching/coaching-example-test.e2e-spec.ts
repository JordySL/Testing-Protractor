import { expect } from 'chai';
import { MailHandlerService, SubjectMatchType } from '../../../test-utilities/mailhandler/mailhandler.service';
import { LoginPage } from './../../../pages/login.po';
import { TestUtils } from '../../../test-utilities/test-utils';
import { WsErrorResponse } from './../../../apis/common/wserror-response.model';
import { ChallengePayload, User } from './../../../apis/services.coaching/models/challenge-payload.model';
import { ChallengeApi } from './../../../apis/services.coaching/challenge-api';
import { ChallengeResponse } from './../../../apis/services.coaching/models/challenge-response';
import { SessionApi } from './../../../apis/session-api';
import { Session } from './../../../apis/webservices-mobile/models/session-response.model';
import { browser, by, element, WebElement, ElementFinder, ExpectedConditions } from 'protractor';


describe('protractor-test App', async () => {
	let page: LoginPage;
	const title = 'New Challenge Title' + TestUtils.timestamp();
	let session: Session;
	let challengeId: number;

	const username = process.env.BRAINSHARK_USERS_CHALLENGEMANAGER_USERNAME;
	const password = process.env.BRAINSHARK_USERS_CHALLENGEMANAGER_PASSWORD;
	const companyName = process.env.BRAINSHARK_COMPANY_AUTO3;
	const companyId = process.env.BRAINSHARK_COMPANY_AUTO3_ID;

	beforeEach(async () => {
		//jasmine.DEFAULT_TIMEOUT_INTERVAL = 80000;
		setTimeout(() => console.log('inside time out'), 500);
		const mailHandler = new MailHandlerService();
		const emails: any = await mailHandler.waitForEmailsBySubject('OK', 3, 60, SubjectMatchType.Exact);
		const emailsFound: any[] = emails.emails;
		console.log(JSON.stringify(emailsFound));
		console.log(JSON.stringify('Size: ' + emailsFound.length));

		session = await SessionApi.getSession(username, password, companyName);

		const user1: User = { userId: session.UId };
		// Creating new challenge with Apis. For now, invite myself and add myself as a reviewer
		const challenge: ChallengeResponse = await ChallengeApi.createChallengeGeneric(session, title, [user1], [user1]);
		challengeId = challenge.id;

		page = await new LoginPage();

	}, 200000);

	it('coaching POC', async () => {
		await browser.waitForAngularEnabled(false);
		await page.navigateToCompanyId(companyId);
		const homePage = await page.login(username, password);

		const coachingDashboard = await homePage.MasterNavBar.navigateToCoaching();
		await coachingDashboard.search(title);
		const s = await coachingDashboard.isFirstChallengeName(title);
		
		expect(s).to.be.equals(title);
	});

	afterEach(async () => {
		const response: WsErrorResponse = await ChallengeApi.deleteChallenge(session, challengeId);
	});

});
