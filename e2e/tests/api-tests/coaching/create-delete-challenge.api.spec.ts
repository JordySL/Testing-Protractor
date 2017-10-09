import { async } from '@angular/core/testing';
import { LogginPage } from './../../../e2e/pages/loggin.po';
import { TestUtils } from './../../../e2e/test-utils';
import { WsErrorResponse } from './../../../e2e/apis/common/wserror-response.model';
import { ChallengePayload, User } from './../../../e2e/apis/services.coaching/models/challenge-payload.model';
import { ChallengeApi } from './../../../e2e/apis/services.coaching/challenge-api';
import { ChallengeResponse } from './../../../e2e/apis/services.coaching/models/challenge-response';
import { SessionApi } from './../../../e2e/apis/session-api';
import { Session } from './../../../e2e/apis/webservices-mobile/models/session-response.model';

describe('Create and Delete challenge Api test',async () => {
	
		const title = 'New Challenge Title' + TestUtils.timestamp();
		let session: Session;
		let challengeId: number;
	
		beforeEach((async (done) => {
			jasmine.DEFAULT_TIMEOUT_INTERVAL = 80000;
			setTimeout(() => console.log('inside time out'), 500);
	
			session = await SessionApi.getSession('admin', 'admin', 'nolan');
			done();
		}));
	
		it('coaching POC', (async (done) => {
			const user1: User = { userId: session.UId };
			const challenge: ChallengeResponse = await ChallengeApi.createChallengeGeneric(session, title, [user1], [user1]);
			await expect(challenge.id).not.toBeNull();
			await expect(challenge.id).toBeGreaterThan(0);
			challengeId = challenge.id;
			
			done();
		}));
	
		afterEach((async (done) => {
			const response: WsErrorResponse = await ChallengeApi.deleteChallenge(session,challengeId);
			done();
		}));
	
	});
	
