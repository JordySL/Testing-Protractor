import { TestUtils } from '../../test-utilities/test-utils';
import { Apibase } from './../apibase/apibase';
import { CheckConvertStatusResponse } from './models/checkconversionstatus-response.model';
import { Session } from './../webservices-mobile/models/session-response.model';

export class CheckConvertStatus extends Apibase {

	public static async getConversionStatus(session: Session, presentationId: number): Promise<CheckConvertStatusResponse> {
		const url = super.getBaseUrl() + 'brainshark/brainshark.net/author/CheckConvertStatus.aspx';
		const queryParams = {
			pid: presentationId,
			dst: TestUtils.timestamp()
		}
		let response = await Apibase.httpGet(session, url, CheckConvertStatusResponse, queryParams);
		return response;
	}

	public static async pollConversion(session: Session, presentationId: number, timeoutSeconds = 300): Promise<CheckConvertStatusResponse> {

		let internalRetryTmeOutId;
		let externalTimeOutId;

		let promiseForThis = new Promise<CheckConvertStatusResponse>(async (resolve, reject) => {

			const retryTimeInMilliSeconds = 5000;

			let conversionStatus: CheckConvertStatusResponse;

			internalRetryTmeOutId = await setInterval(async () => {
				
				conversionStatus = await CheckConvertStatus.getConversionStatus(session, presentationId);

				if (conversionStatus.isComplete()) {
					clearInterval(externalTimeOutId);
					clearInterval(internalRetryTmeOutId);
					resolve(conversionStatus);
				} else if(conversionStatus.status === -1) {
					clearInterval(internalRetryTmeOutId);
					clearInterval(externalTimeOutId);
					reject('Conversion ended with a status of -1. Check the error code in the CQA tablefor job_id="=' + conversionStatus.jobId);
				}
			}, retryTimeInMilliSeconds);

			externalTimeOutId = setInterval(() => {
				clearInterval(internalRetryTmeOutId);
				clearInterval(externalTimeOutId);
				reject('Wait operation timed out or had an error for job_id = ' + conversionStatus.jobId);
			}, (timeoutSeconds * 1000));
		});

		return promiseForThis;
	}
}