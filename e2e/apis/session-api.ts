import { Apibase } from './apibase/apibase';
import { Session } from './webservices-mobile/models/session-response.model';

export class SessionApi extends Apibase {

	public static async getSession(username: string, password: string, loginDirectory: string): Promise<Session> {
		const sessionUrl =  super.getBaseUrl() + '/brainshark/webservices_mobile/session.ashx?';
		var queryParams = {
			'username': username,
			'password': password,
			'login_dir': loginDirectory
		}
		return  await Apibase.httpPost(null, sessionUrl, Session, null, null, queryParams);
	}
}