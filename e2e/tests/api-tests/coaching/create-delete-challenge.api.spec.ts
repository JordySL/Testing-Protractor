import { WsErrorResponse } from './../../../apis/common/wserror-response.model';
import { ChallengeApi } from './../../../apis/services.coaching/challenge-api';
import { ChallengeResponse } from './../../../apis/services.coaching/models/challenge-response';
import { User } from './../../../apis/services.coaching/models/challenge-payload.model';
import { SessionApi } from './../../../apis/session-api';
import { TestUtils } from '../../../test-utilities/test-utils';
import { Session } from './../../../apis/webservices-mobile/models/session-response.model';
import { expect } from 'chai';

describe('Create and Delete challenge Api test', async () => {

	const title = 'New Challenge Title' + TestUtils.timestamp();
	let session: Session;
	let challengeId: number;

	beforeEach((async () => {
		setTimeout(() => console.log('inside time out'), 500);

		session = await SessionApi.getSession('admin', 'admin', 'nolan');
	}));

	it('coaching POC', (async () => {
		const user1: User = { userId: session.UId };
		const challenge: ChallengeResponse = await ChallengeApi.createChallengeGeneric(session, title, [user1], [user1]);
		await expect(challenge.id).exist;
		await expect(challenge.id).to.be.greaterThan(0);
		challengeId = challenge.id;

	}));

	afterEach((async () => {
		const response: WsErrorResponse = await ChallengeApi.deleteChallenge(session, challengeId);
	}));

});

