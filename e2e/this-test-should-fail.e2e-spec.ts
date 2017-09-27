import { ChallengePayload, User } from './apis/services.coaching/models/challenge-payload.model';
import { ChallengeApi } from './apis/services.coaching/challenge-api';
import { ChallengeResponse } from './apis/services.coaching/models/challenge-response';
import { SessionApi } from './apis/session-api';
import { Session } from './apis/webservices-mobile/models/session-response.model';
import { Apibase } from './../src/app/apibase/apibase.component';
import { LogginPage } from './pages/loggin.po';
import { browser, by, element, WebElement, ElementFinder, ExpectedConditions } from 'protractor';


describe('protractor-test App', () => {
	let page: LogginPage;
	const title = 'New Challenge Title';

	beforeEach(async () => {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 80000;
		setTimeout(() => console.log('inside time out'), 500);

		const session: Session = await SessionApi.getSession('admin', 'admin', 'nolan');
		console.log('Session: ' + JSON.stringify(session));

		const user1: User = { userId: session.UId };
		// Creating new challenge with Apis. For now, invite myself and add myself as a reviewer
		const challenge: ChallengeResponse = await ChallengeApi.createChallengeGeneric(session, title, [user1], [user1]);
		console.log('Challenge: ' + JSON.stringify(challenge));

		page = new LogginPage();

	});

	it('should fail', (done) => {
		console.log('I hope this is the last message in the console');
		browser.waitForAngularEnabled(false);
		page.navigateTo();
		const homePage = page.login('admin', 'admin');
		browser.driver.sleep(5000); // -> What we are trying to avoid, time consuming.

		const coachingDashboard = homePage.MasterNavBar.navigateToCoaching();
		browser.driver.sleep(5000); // -> What we are trying to avoid, time consuming.
		coachingDashboard.isFirstChallengeName(title).then((result) => { 
			expect(result === title);
			done();
		 });

		const num: number = 5;
		expect(num).toEqual(3);
	});

});
