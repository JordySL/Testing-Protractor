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

	private static makeHttpGet(session: Session, url: string, queryStringParams?: any): request.RequestPromise {
		if (session) {
			// For now we will pass session on the query string parms if session is provided
			(<any>Object).assign(queryStringParams, this.getSessionParamsObject(session));
		}
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

	private static makeHttpPost(session: Session, url: string, requestBody?: any, queryStringParams?: any): request.RequestPromise {

		if (session) {
			// For now we will pass session on the query string parms if session is provided
			(<any>Object).assign(queryStringParams, this.getSessionParamsObject(session));
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

	private static makeHttpPut(session: Session, url: string, requestBody?: any, queryStringParams?: any): request.RequestPromise {

		if (session) {
			// For now we will pass session on the query string parms if session is provided
			(<any>Object).assign(queryStringParams, this.getSessionParamsObject(session));
		}

		return request({
			url: url,
			method: 'PUT',
			headers: {
				'content-type': 'application/json'
			},
			rejectUnauthorized: false, // Lets us hit our local machines with certificate issues
			qs: queryStringParams,
			json: true,
			body: requestBody ? requestBody : null
		});
	}

	private static makeHttpDelete(session: Session, url: string, queryStringParams?: any): request.RequestPromise {

		if (session) {
			// For now we will pass session on the query string parms if session is provided
			(<any>Object).assign(queryStringParams, this.getSessionParamsObject(session));
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


	static async httpGet<T>(session: Session, url: string, responseClass: { new(): T }, queryStringParams?: any) {
		let response = await this.makeHttpGet(session, url);
		TestUtils.log('GET call to url (' + url + ') \n returned response \n ' + JSON.stringify(response));
		return SerializationHelper.toInstance(new responseClass(), response);
	}

	static async httpGetBsk<T>(session: Session, url: string, responseClass: { new(): T }, queryStringParams?: any) {
		let response = await this.makeHttpGet(session, url);
		TestUtils.log('GET call to url (' + url + ') \n returned response \n ' + JSON.stringify(response));
		let results = response['results'];
		return SerializationHelper.toInstanceArray(new responseClass(), results);
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

	// All Brainshark rest resopnses in the last few years follow the same json structure. This call assumes that response.
	static async httpPutBsk<T>(session: Session, url: string, responseClass: { new(): T }, jsonBody: any, queryStringParams?: any): Promise<T[]> {
		let response = await this.makeHttpPut(session, url, jsonBody, queryStringParams);
		TestUtils.log('POST call to url (' + url + ') \n returned response \n ' + JSON.stringify(response));
		let results = response['results'];
		return SerializationHelper.toInstanceArray(new responseClass(), results);
	}

	// This call is for all other calls that don't return the brainsahrk response json.
	static async httpPut<T>(session: Session, url: string, responseClass: { new(): T }, jsonBody: any, queryStringParams?: any): Promise<T> {
		let response = await this.makeHttpPut(session, url, jsonBody, queryStringParams);
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

	// This call is for all other calls that don't return the brainsahrk response json.
	static async httpDelete<T>(session: Session, url: string, responseClass: { new(): T }, queryStringParams?: any): Promise<T> {
		let response = await this.makeHttpDelete(session, url, queryStringParams);
		return SerializationHelper.toInstance(new responseClass(), response);
	}

	// All Brainshark rest resopnses in the last few years follow the same json structure. This call assumes that response.
	static async httpDeleteBsk<T>(session: Session, url: string, responseClass: { new(): T }, queryStringParams?: any): Promise<T[]> {
		if (!queryStringParams) {
			queryStringParams = {}
		}
		let response = await this.makeHttpDelete(session, url, queryStringParams);
		TestUtils.log('DELETE call to url (' + url + ') \n returned response \n ' + JSON.stringify(response));
		let results = response['results'];
		return SerializationHelper.toInstanceArray(new responseClass(), results);
	}
}
