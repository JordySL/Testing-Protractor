import { SerializationHelper } from './serialization-helper'
import * as request from 'request';
import { promise } from 'protractor';
import { browser } from 'protractor';

export class Apibase {

	constructor() { }

	public static  getBaseUrl(): string {
		return browser.params.baseUrl;
	}

	private static makeHttpGet(url: string, queryStringParams?: any): string {
		let responseBody = '';
		request.get(url, {
			qs: queryStringParams
		}, function (error, response, body) {
			console.log(body);
			responseBody = body;
		  });
	  
		return responseBody;
	}


	private static makeHttpPost(url: string, requestBody?: string, queryStringParams?: any){
		const deferred = promise.defer();
		request({
			url: url,
			method: 'POST',
			headers: {
				'content-type': 'application/json'
				},
			rejectUnauthorized: false,
			qs: queryStringParams,
			json: true,
		  	body: requestBody? JSON.stringify(requestBody) : null
			}, 
			(error, resp, body) => {
				if (error) {
					deferred.reject({
						error: error
					});
				} else {
					deferred.fulfill(body);
				}
			}
		);

		return deferred.promise;
	}

	static httpGet<T>(url: string, responseClass: {new(): T; }, queryStringParams?: any, isBskResponse: boolean = true) {
		const response = this.makeHttpGet(url);
		let json = JSON.parse(response);
		if (isBskResponse) {
			json = json['results'];
		}
		return SerializationHelper.toInstance(new responseClass(), json);
	}

	static async httpPost<T>(url: string, responseClass: { new(): T; }, jsonBody: any, queryStringParams?: any, isBskResponse: boolean = true): Promise<T> {
		const response = await this.makeHttpPost(url, jsonBody, queryStringParams);
		return SerializationHelper.toInstance(new responseClass(), response);
	}
}
