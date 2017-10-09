import { TestUtils } from './../../../e2e/test-utils';
import { Session } from './../../../e2e/apis/webservices-mobile/models/session-response.model';
import { SerializationHelper } from './serialization-helper'
import * as request from 'request-promise';
import { promise } from 'protractor';
import { browser } from 'protractor';

export class Apibase {

	constructor() { }

	public static getBaseUrl(): string {
		return 'https://wwwqa.brainshark.com/';
	}

	private static makeHttpGet(url: string, queryStringParams?: any): string {
		//TODO: Make this work like the POST method
		let responseBody = '';
		request.get(url, {
			qs: queryStringParams
		}, function (error, response, body) {
			console.log(body);
			responseBody = body;
		});

		return responseBody;
	}


	private static async makeHttpPost(session: Session, url: string, requestBody?: any, queryStringParams?: any) {

		if (session) {
			// For now we will pass session on the query string parms if session is provided
			Object.assign(queryStringParams, this.getSessionParamsObject(session));
		}

		return request({
			url: url,
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			rejectUnauthorized: false, // Lets us hit our local machines with certificate issues
			qs: queryStringParams,
			json: true,
			body: requestBody ? requestBody : null
		});
	}

	static httpGet<T>(url: string, responseClass: T, queryStringParams?: any, isBskResponse: boolean = true) {
		const response = this.makeHttpGet(url);
		let json = JSON.parse(response);
		if (isBskResponse) {
			json = json['results'];
		}
		return SerializationHelper.toInstance(responseClass, json);
	}

	// All Brainshark rest resopnses in the last few years follow the same json structure. This call assumes that response.
	static async httpPostBsk<T>(session: Session, url: string, responseClass: { new(): T }, jsonBody: any, queryStringParams?: any): Promise<T[]> {
		let response = await this.makeHttpPost(session, url, jsonBody, queryStringParams);
		TestUtils.log('POST call to url (' + url + ') \n returned response \n ' + JSON.stringify(response));
		let results = response['results'];
		return SerializationHelper.toInstanceArray(new responseClass(), results);
	}

	// This call is for all other calls that don't return the brainsahrk response json.
	static async httpPost<T>(session: Session, url: string, responseClass: { new(): T }, jsonBody: any, queryStringParams?: any): Promise<T> {
		let response = await this.makeHttpPost(session, url, jsonBody, queryStringParams);
		TestUtils.log('POST call to url (' + url + ') \n returned response \n ' + JSON.stringify(response));
		return SerializationHelper.toInstance(new responseClass(), response);
	}

	private static getSessionParamsObject(session: Session) {
		const sessionParams = {
			'sid': session.Id,
			'sky': session.Key,
			'uid': session.UId
		};
		return sessionParams
	}

	private static makeHttpDelete(session: Session, url: string, queryStringParams?: any) {

		if (session) {
			// For now we will pass session on the query string parms if session is provided
			Object.assign(queryStringParams, this.getSessionParamsObject(session));
		}

		return request({
			url: url,
			method: 'DELETE',
			headers: {
				'content-type': 'application/json'
			},
			json: true,
			rejectUnauthorized: false, // Lets us hit our local machines with certificate issues
			qs: queryStringParams
		});
	}

	// This call is for all other calls that don't return the brainsahrk response json.
	static async httpDelete<T>(session: Session, url: string, responseClass: { new(): T }, queryStringParams?: any): Promise<T> {
		let response = await this.makeHttpDelete(session, url, queryStringParams);
		return SerializationHelper.toInstance(new responseClass(), response);
	}

	// All Brainshark rest resopnses in the last few years follow the same json structure. This call assumes that response.
	static async httpDeleteBsk<T>(session: Session, url: string, responseClass: { new(): T }, queryStringParams?: any): Promise<T[]> {
		if(!queryStringParams) {
			queryStringParams = { }
		}
		let response = await this.makeHttpDelete(session, url, queryStringParams);
		TestUtils.log('DELETE call to url (' + url + ') \n returned response \n ' + JSON.stringify(response));
		let results = response['results'];
		return SerializationHelper.toInstanceArray(new responseClass(), results);
	}
}
