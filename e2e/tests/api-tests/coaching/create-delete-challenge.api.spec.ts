import { Email } from './../../../test-utilities/mailhandler/emails.email.model';
import { Emails } from './../../../test-utilities/mailhandler/emails.model';
import { MailHandlerService, SubjectMatchType } from './../../../test-utilities/mailhandler/mailhandler.service';
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
		const username = process.env.BRAINSHARK_USERS_CHALLENGEMANAGER_USERNAME;
		const password = process.env.BRAINSHARK_USERS_CHALLENGEMANAGER_PASSWORD;
		const loginDir = process.env.BRAINSHARK_COMPANY3;
	
		beforeEach((async () => {
			setTimeout(() => console.log('inside time out'), 500);

			session = await SessionApi.getSession(username, password, loginDir);
		}));
	
		it('coaching POC', (async () => {
			const user1: User = { userId: session.UId };
			const challenge: ChallengeResponse = await ChallengeApi.createChallengeGeneric(session, title, [user1], [user1]);
			await expect(challenge.id).exist;
			await expect(challenge.id).to.be.greaterThan(0);
			challengeId = challenge.id;

			const mailHandler = new MailHandlerService();
			const emails:Emails = await mailHandler.waitForEmailsBySubject(`Coaching - Challenge Invitation:${title}`, 1, 60, SubjectMatchType.Exact);
			const emailsFound: Email[] = emails.emails;
			let email = emailsFound[0];
			let parsedEmail = email.parsedBody;
			const searchResult = parsedEmail.text.search('Brainshark for Coaching helps you and your manager refine your sales skills. Follow the link to view the challenge details and upload the requested content. Your manager will review it and provide feedback and support.');
			await expect(searchResult).not.equal(-1);
			// Download attachments if email has them
			//email.downloadAttachment(0, true);
			
		}));
	
		afterEach((async () => {
			const response: WsErrorResponse = await ChallengeApi.deleteChallenge(session,challengeId);
		}));
	
	});
	
