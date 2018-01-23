import { Apibase } from './../apibase/apibase';
import { TestUtils } from '../../test-utilities/test-utils';
import { WsErrorResponse } from './../common/wserror-response.model';
import { UserViewAuthorizationForGroupsPayload, User } from './models/userviewauthorizationforgroups-payload';
import { Session } from './../webservices-mobile/models/session-response.model';
import { UserViewAuthorizationForGroupsResponse } from './models/userviewauthorizationforgroups-response';

export class UserViewAuthorizationForGroupsApi extends Apibase {
	private static getUserViewAuthorizationForGroupsUrl(apiVersion: number): string {
		let url = super.getBaseUrl() + 'brainshark/brainshark.services.common/api/' + apiVersion + '/UserViewAuthorizationForGroups';
		console.log(url);
		return url;
	}

	public static async postUserViewAuthorizationForGroups(session: Session, apiVersion: number, groupList: number[]): Promise<UserViewAuthorizationForGroupsResponse[]> {
		const url = this.getUserViewAuthorizationForGroupsUrl(apiVersion);
		const userViewAuthorizationForGroupsPayload = UserViewAuthorizationForGroupsPayload.createUserViewAuthorizationForGroupsPayload(groupList);
		const queryParams = {
		}

		let response = await Apibase.httpPostBskSTok(session.SessionToken, url, UserViewAuthorizationForGroupsResponse, userViewAuthorizationForGroupsPayload.groupList, null, queryParams);
		
		// It will return a list of UserViewAuthorizationForGroupsResponse
		return response;
	}
}