import { CheckConvertStatus } from './checkconversationstatus-api';
import { TestUtils } from '../../test-utilities/test-utils';
import { SavePresentationForm } from './models/savepresentation-form.model';
import { SavePresentationResponse } from './models/savepresentation-response.model';
import { Apibase } from './../apibase/apibase';
import { Session } from './../webservices-mobile/models/session-response.model';

export class SavePresentation extends Apibase{

	public static async uploadPresentation(session: Session, pathToFile: string): Promise<SavePresentationResponse> {
		const url = super.getBaseUrl() + 'brainshark/brainshark.net/author/savepresentation.ashx';
		let queryParams = {
			'mode': 'upload',
			'pid': 0,
			'uploadtype': pathToFile.split('.').pop(), // get file extension 
			'responsetype': 'text',
			'folder': '/brainshark/brainshark.net/author/null'
		};
		const response = await Apibase.httpPostFile(session, url, pathToFile, queryParams);
		const responseParts: string[] = response.split('\n');
		let savePresentationResponse: SavePresentationResponse = new SavePresentationResponse();
		savePresentationResponse.pid = Number(responseParts[0]);
		savePresentationResponse.qid = Number(responseParts[1]);
		savePresentationResponse.epid = responseParts[2];
		await CheckConvertStatus.pollConversion(session, savePresentationResponse.pid);
		return savePresentationResponse;
	}

	public static async modifyPresentation(session: Session, savePresentationForm: SavePresentationForm): Promise<SavePresentationResponse> {
		const url = super.getBaseUrl() + 'brainshark/brainshark.net/author/savepresentation.ashx';
		let queryParams = {
			'mode': 'save'
		};
		savePresentationForm.responsetype = 'json';
		const response = await Apibase.httpPost(session, url,SavePresentationResponse, null, savePresentationForm, queryParams);
		return response;
	}
}