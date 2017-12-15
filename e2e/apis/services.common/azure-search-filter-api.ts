import { Apibase } from './../apibase/apibase';
import { WsErrorResponse } from './../common/wserror-response.model';
import { Session } from './../webservices-mobile/models/session-response.model';

export class AzureSearchFilterApi extends Apibase {
	private static getPresentaionSearchFilterUrl(apiVersion: string): string {
    //https://wwwqa.brainshark.com/brainshark/brainshark.services.common/api/v1/AzureSearchFilter/Presentations
		return `${super.getBaseUrl()}brainshark/brainshark.services.common/api/${apiVersion}/AzureSearchFilter/Presentations`;
	}

  private static getCurriculumSearchFilterUrl(apiVersion: string): string {
    //https://wwwqa.brainshark.com/brainshark/brainshark.services.common/api/v1/AzureSearchFilter/Curriculums
		return `${super.getBaseUrl()}brainshark/brainshark.services.common/api/${apiVersion}/AzureSearchFilter/Curriculums`;
	}

	public static async getPresentationFilters(session: Session, apiVersion: string, queryParams: Object): Promise<any> {
		const url = this.getPresentaionSearchFilterUrl(apiVersion);
		return await Apibase.httpPost(session, url, null, queryParams, null, null, true, true);
	}

  public static async getCurriculumFilters(session: Session, apiVersion: string, queryParams: Object): Promise<any> {
		const url = this.getCurriculumSearchFilterUrl(apiVersion);
		return await Apibase.httpPost(session, url, null, queryParams, null, null, true, true);
	}
}
