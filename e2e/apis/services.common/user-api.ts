import { Apibase } from './../apibase/apibase';
import { WsErrorResponse } from './../common/wserror-response.model';
import { User } from './../misc/models/user.model';
import { Session } from './../webservices-mobile/models/session-response.model';
import { UserResponse } from './models/user-response';

export class UserApi extends Apibase {

	private static getUserUrl(apiVersion: number): string {
		let url = super.getBaseUrl() + 'brainshark/brainshark.services.common/api/' + apiVersion + '/User';
		console.log(url);
		return url;
	}
	
	public static async getUser(session: Session, apiVersion: number): Promise<UserResponse> {
		const url = this.getUserUrl(apiVersion);
		const queryParams = {
		}
		let response = await Apibase.httpGet(session, url, UserResponse, queryParams);
		return response;
	}

}