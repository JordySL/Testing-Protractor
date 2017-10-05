import { LogginPage } from './../../../pages/loggin.po';
import { TestUtils } from './../../../test-utils';
import { WsErrorResponse } from './../../../apis/common/wserror-response.model';
import { ChallengePayload, User } from './../../../apis/services.coaching/models/challenge-payload.model';
import { ChallengeApi } from './../../../apis/services.coaching/challenge-api';
import { ChallengeResponse } from './../../../apis/services.coaching/models/challenge-response';
import { SessionApi } from './../../../apis/session-api';
import { Session } from './../../../apis/webservices-mobile/models/session-response.model';


describe('Create and Delete challenge Api test',async () => {

	const title = 'New Challenge Title' + TestUtils.timestamp();
	let session: Session;
	let challengeId: number;

	beforeEach(async () => {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 80000;
		setTimeout(() => console.log('inside time out'), 500);

		session = await SessionApi.getSession('admin', 'admin', 'nolan');

	});

	it('coaching POC', async () => {
		const user1: User = { userId: session.UId };
		const challenge: ChallengeResponse = await ChallengeApi.createChallengeGeneric(session, title, [user1], [user1]);
		await expect(challenge.id).not.toBeNull();
		await expect(challenge.id).toBeGreaterThan(0);
		challengeId = challenge.id;
	});

	afterEach(async () => {
		const response: WsErrorResponse = await ChallengeApi.deleteChallenge(session,challengeId);
	});

});
