import { Session } from './webservices-mobile/models/session-response.model';
import { Apibase } from './../../src/app/apibase/apibase.component';

export class SessionApi extends Apibase {

	public static async getSession(username: string, password: string, loginDirectory: string): Promise<Session> {
		const sessionUrl =  super.getBaseUrl() + '/brainshark/webservices_mobile/session.ashx?';
		var queryParams = {
			'username': username,
			'password': password,
			'login_dir': loginDirectory
		}
		return  await Apibase.httpPost(sessionUrl, Session, null, queryParams, false);
	}
}