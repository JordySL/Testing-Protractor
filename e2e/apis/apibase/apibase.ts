import { TestUtils } from '../../test-utilities/test-utils';
import { SerializationHelper } from './serialization-helper';
import * as request from 'request-promise';
import { promise } from 'protractor';
import { browser } from 'protractor';
import * as fs from 'fs';

export class Apibase {

	constructor() { }

	public static getBaseUrl(): string {
		return process.env.BSK_API_BASE_URL;
	}

	private static makeHttpGet(url: string, queryStringParams: any): request.RequestPromise {

		return request({
			url: url,
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			},
			rejectUnauthorized: false, // Lets us hit our local machines with certificate issues
			qs: queryStringParams,
			json: true
		});
	}

	private static makeHttpPost(url: string, requestBody: any, form: any, queryStringParams: any): request.RequestPromise {

		if (!queryStringParams) {
			queryStringParams = {};
		}



		return request({
			url: url,
			method: 'POST',
			headers: (<any>Object).assign(
				{ 'content-type': 'application/json' }
			),
			rejectUnauthorized: false, // Lets us hit our local machines with certificate issues
			qs: queryStringParams,
			json: true,
			body: requestBody && requestBody,
			form: form && form
		});
	}

	static async httpGet<T>(url: string, responseClass: { new(): T }, queryStringParams: any, logInput: boolean = false, logResponse: boolean = false) {
		let response = await this.makeHttpGet(url, queryStringParams);
		logInput && TestUtils.log(`Input: \nqueryStringParams ${JSON.stringify(queryStringParams)}`);
		logResponse && TestUtils.log(`GET call to url (${url}) \nreturned response \n${JSON.stringify(response)}`);
		return responseClass ? SerializationHelper.toInstance(new responseClass(), response) : response;
	}

	static async httpPost<T>(url: string, responseClass: { new(): T }, jsonBody: any, form: any, queryStringParams: any, logInput: boolean = false, logResponse: boolean = false): Promise<T> {
		let response = await this.makeHttpPost(url, jsonBody, form, queryStringParams);
		return responseClass ? SerializationHelper.toInstance(new responseClass(), response) : response;
	}
}
