import { Apibase } from './../apibase/apibase';
import { WsErrorResponse } from './../common/wserror-response.model';
import { ChallengePayload, User } from './models/challenge-payload.model';
import { Session } from './../webservices-mobile/models/session-response.model';
import { ChallengeResponse } from './models/challenge-response';

export class ChallengeApi extends Apibase {

	private static getCoachingChallengeUrl(userId: number, challengeId?: number): string {
		let url = super.getBaseUrl() + 'brainshark/brainshark.services.coaching/user/' + userId + '/Challenge/';
		if (challengeId) {
			url += challengeId;
		}
		return url;
	}

	public static async createChallengeGeneric(session: Session, title: string, invitedUsers: User[], reviewers: User[]): Promise<ChallengeResponse> {
		const challengePayload = ChallengePayload.createGenericChallengeInput(title, invitedUsers, reviewers);
		return this.createChallenge(session, challengePayload);
	}

	public static async createChallenge(session: Session, challengePayload: ChallengePayload): Promise<ChallengeResponse> {
		const url = this.getCoachingChallengeUrl(session.UId);
		const queryParams = {
		}
		let response = await Apibase.httpPostBsk(session, url, ChallengeResponse, challengePayload, null, queryParams);
		return response[0];
	}

	public static async deleteChallenge(session: Session, challengeId: number): Promise<WsErrorResponse> {
		const url = this.getCoachingChallengeUrl(session.UId, challengeId);
		const queryParams = {
		}
		let response = await Apibase.httpDeleteBsk(session, url, WsErrorResponse, queryParams);
		return response[0];
	}

	public static async getChallenge(session: Session, challengeId: number): Promise<ChallengeResponse> {
		const url = this.getCoachingChallengeUrl(session.UId);
		const queryParams = {
		}
		let response = await Apibase.httpGetBsk(session, url, ChallengeResponse, queryParams);
		return response[0];
	}


	public static async getChallenges(session: Session, challengeId: number): Promise<ChallengeResponse> {
		const url = this.getCoachingChallengeUrl(session.UId, challengeId);
		const queryParams = {
		}
		let response = await Apibase.httpGetBsk(session, url, ChallengeResponse, queryParams);
		return response[0];
	}

}