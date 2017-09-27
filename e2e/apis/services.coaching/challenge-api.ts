import { ChallengePayload, User } from './models/challenge-payload.model';
import { Session } from './../webservices-mobile/models/session-response.model';
import { ChallengeResponse } from './models/challenge-response';
import { Apibase } from './../../../src/app/apibase/apibase.component';

export class ChallengeApi extends Apibase {

	public static async createChallengeGeneric(session: Session, title: string, invitedUsers: User[], reviewers: User[]): Promise<ChallengeResponse> {
		const url =  super.getBaseUrl() + 'brainshark/brainshark.services.coaching/user/' + session.UId +'/Challenge';
		const queryParams = {
		}
		let challengePayload = ChallengePayload.createGenericChallengeInput(title, invitedUsers, reviewers);
		let response = await Apibase.httpPostBsk(session, url, ChallengeResponse, challengePayload, queryParams);
		return response[0];
	}

	public static async createChallenge(session: Session, challengePayload: ChallengePayload): Promise<ChallengeResponse> {
		const url =  super.getBaseUrl() + '/brainshark/brainshark.services.coaching/user/' + session.UId +'/Challenge';
		const queryParams = {
		}
		let response = await Apibase.httpPostBsk(session, url, ChallengeResponse, challengePayload, queryParams);
		return response[0];
	}

}