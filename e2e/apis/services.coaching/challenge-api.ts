import { Apibase } from './../apibase/apibase.component';
import { WsErrorResponse } from './../common/wserror-response.model';
import { ChallengePayload, User } from './models/challenge-payload.model';
import { Session } from './../webservices-mobile/models/session-response.model';
import { ChallengeResponse } from './models/challenge-response';

export class ChallengeApi extends Apibase {

	private static getCoachingChallengeUrl(userId: number, challengeId?: number) {
		let url = super.getBaseUrl() + 'brainshark/brainshark.services.coaching/user/' + userId +'/Challenge/';
		if (challengeId) {
			url += challengeId;
		}
		return url;
	}

	public static async createChallengeGeneric(session: Session, title: string, invitedUsers: User[], reviewers: User[]): Promise<ChallengeResponse> {
		let challengePayload = ChallengePayload.createGenericChallengeInput(title, invitedUsers, reviewers);
		let response = await this.createChallenge(session, challengePayload);
		return response;
	}

	public static async createChallenge(session: Session, challengePayload: ChallengePayload): Promise<ChallengeResponse> {
		const url = this.getCoachingChallengeUrl(session.UId);
		const queryParams = {
		}
		let response = await Apibase.httpPostBsk(session, url, ChallengeResponse, challengePayload, queryParams);
		return response[0];
	}

	public static async deleteChallenge(session: Session, challengeId: number) {
		const url = this.getCoachingChallengeUrl(session.UId, challengeId);
		const queryParams = {
		}
		let response = await Apibase.httpDeleteBsk(session, url, WsErrorResponse);
		return response[0];
	}

	public static async getChallenge(session: Session, challengeId: number) {
		const url = this.getCoachingChallengeUrl(session.UId);
		const queryParams = {
		}
		let response = await Apibase.httpGetBsk(session, url, WsErrorResponse);
		return response[0];
	}

	
	public static async getChallenges(session: Session, challengeId: number) {
		const url = this.getCoachingChallengeUrl(session.UId, challengeId);
		const queryParams = {
		}
		let response = await Apibase.httpGetBsk(session, url, WsErrorResponse);
		return response[0];
	}

}