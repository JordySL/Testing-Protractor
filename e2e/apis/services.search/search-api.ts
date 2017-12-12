import { Apibase } from './../apibase/apibase';
import { WsErrorResponse } from './../common/wserror-response.model';
import { User } from './../misc/models/user.model';
import { Session } from './../webservices-mobile/models/session-response.model';
import { PresentationsSearchResponse } from './models/presentations-search-response';

export class SearchApi extends Apibase {
	private static getPresentationsSearchUrl(apiVersion: string): string {
		//https://wwwqa.brainshark.com/brainshark/brainshark.services.search/api/v1/search/presentations
		const url = super.getBaseUrl() + 'brainshark/brainshark.services.search/api/' + apiVersion + '/search/presentations';
		console.log('endpointUrl', url);
		return url;
	}

	public static async searchPresentations(session: Session, apiVersion: string, queryParams: Object): Promise<PresentationsSearchResponse> {
		const url = this.getPresentationsSearchUrl(apiVersion);
		queryParams = !queryParams ? {} : queryParams;
		console.log('queryParams', queryParams);
		return await Apibase.httpPost(session, url, PresentationsSearchResponse, queryParams, null, null);
	}
}
