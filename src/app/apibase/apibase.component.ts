import { SerializationHelper } from './serialization-helper'
import * as request from 'request';
import { promise } from 'protractor';

export class Apibase {

	constructor() { }

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
			}, (error, resp, body) => {
				if (error) {
					console.log('ERROR1: ' + error);
					deferred.reject({
						error: error
					});
				} else {
					console.log('DEBUG1: ' + body);
					deferred.fulfill(body);
				}
			});

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

	static httpPost<T>(url: string, responseClass: { new(): T; }, jsonBody: any, queryStringParams?: any, isBskResponse: boolean = true) {
		let response = {};
		const controlFlow = promise.controlFlow();
		controlFlow.execute(() => {this.makeHttpPost(url, jsonBody, queryStringParams)
			.then(res => {
				console.log('DEBUG2: ' + res);
				response = res;
			})
		});
		console.log('URL: ' + url);
		console.log('QueryParams: ' + JSON.stringify(queryStringParams));
		return SerializationHelper.toInstance(new responseClass(), response);
	}
}
