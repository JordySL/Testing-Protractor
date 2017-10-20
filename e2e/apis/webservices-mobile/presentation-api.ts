import { PresentationDeleteResponse } from './models/presentation-delete-response.model';
import { Apibase } from './../apibase/apibase';
import { Session } from './models/session-response.model';

export class PresentationApi extends Apibase{
	///brainshark/webservices_mobile/presentation.ashx

	
	public static async deletePresentation(session: Session, presentationId: number): Promise<PresentationDeleteResponse> {
		const url = super.getBaseUrl() + 'brainshark/webservices_mobile/presentation.ashx';
		const queryParams = {
			pid: presentationId
		}
		let response = await Apibase.httpDelete(session, url, PresentationDeleteResponse, queryParams);
		return response;
	}

	public static async deletePresentationAssert(session: Session, presentationId: number): Promise<boolean> {
		let response:PresentationDeleteResponse = await PresentationApi.deletePresentation(session, presentationId);
		return response.Message.startsWith('Brainshark Presentation ' + presentationId + ' deleted');
	}
}