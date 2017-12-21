import { TestUtils } from '../../test-utilities/test-utils';
import { Session } from './../../../e2e/apis/webservices-mobile/models/session-response.model';
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

	private static makeHttpGet(session: Session, url: string, queryStringParams: any): request.RequestPromise {
		if (session) {
			// For now we will pass session on the query string parms if session is provided
			(<any>Object).assign(queryStringParams, this.getSessionParamsObject(session));
		}
		return request({
			url: url,
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				'Brainshark-STok': session.SessionToken
			},
			rejectUnauthorized: false, // Lets us hit our local machines with certificate issues
			qs: queryStringParams,
			json: true
		});
	}

	private static makeHttpPost(session: Session, url: string, requestBody: any, form: any, queryStringParams: any): request.RequestPromise {

		if (!queryStringParams) {
			queryStringParams = {};
		}

		if (session) {
			// For now we will pass session on the query string parms if session is provided
			(<any>Object).assign(queryStringParams, this.getSessionParamsObject(session));
		}

		return request({
			url: url,
			method: 'POST',
			headers: (<any>Object).assign(
				{ 'content-type': 'application/json' },
				session && { 'Brainshark-STok': session.SessionToken }
			),
			rejectUnauthorized: false, // Lets us hit our local machines with certificate issues
			qs: queryStringParams,
			json: true,
			body: requestBody && requestBody,
			form: form && form
		});
	}

	private static httpFileSend(session: Session, method: string, url: string, pathToFile: string, queryStringParams: any): request.RequestPromise {

		if (!queryStringParams) {
			queryStringParams = {};
		}

		if (session) {
			// For now we will pass session on the query string parms if session is provided
			(<any>Object).assign(queryStringParams, this.getSessionParamsObject(session));
		}
		return request({
			url: url,
			method: method,
			headers: {
				'content-type': 'multipart/form-data; charset=UTF-8'
			},
			rejectUnauthorized: false, // Lets us hit our local machines with certificate issues
			qs: queryStringParams,
			formData: {
				fileData: fs.createReadStream(pathToFile)
			}
		});
	}

	private static makeHttpPut(session: Session, url: string, requestBody: any, form: any, queryStringParams: any): request.RequestPromise {

		if (session) {
			// For now we will pass session on the query string parms if session is provided
			(<any>Object).assign(queryStringParams, this.getSessionParamsObject(session));
		}

		return request({
			url: url,
			method: 'PUT',
			headers: {
				'content-type': 'application/json' // might not want to hardcode this
			},
			rejectUnauthorized: false, // Lets us hit our local machines with certificate issues
			qs: queryStringParams,
			json: true,
			body: requestBody ? requestBody : null,
			form: form ? form : null
		});
	}

	private static makeHttpDelete(session: Session, url: string, queryStringParams: any): request.RequestPromise {

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


	static async httpGet<T>(session: Session, url: string, responseClass: { new(): T }, queryStringParams: any, logInput: boolean = false, logResponse: boolean = false) {
		let response = await this.makeHttpGet(session, url, queryStringParams);
		logInput && TestUtils.log(`Input: \nqueryStringParams ${JSON.stringify(queryStringParams)}`);
		logResponse && TestUtils.log(`GET call to url (${url}) \nreturned response \n${JSON.stringify(response)}`);
		return responseClass ? SerializationHelper.toInstance(new responseClass(), response) : response;
	}

	static async httpGetBsk<T>(session: Session, url: string, responseClass: { new(): T }, queryStringParams: any) {
		let response = await this.makeHttpGet(session, url, queryStringParams);
		TestUtils.log('GET call to url (' + url + ') \n returned response \n ' + JSON.stringify(response));
		let results = response['results'];
		return SerializationHelper.toInstanceArray(new responseClass(), results);
	}

	// All Brainshark rest resopnses in the last few years follow the same json structure. This call assumes that response.
	static async httpPostBsk<T>(session: Session, url: string, responseClass: { new(): T }, jsonBody: any, form: any, queryStringParams: any): Promise<T[]> {
		let response = await this.makeHttpPost(session, url, jsonBody, form, queryStringParams);
		TestUtils.log('POST call to url (' + url + ') \n returned response \n ' + JSON.stringify(response));
		let results = response['results'];
		return SerializationHelper.toInstanceArray(new responseClass(), results);
	}

	// This call is for all other calls that don't return the brainsahrk response json.
	static async httpPost<T>(session: Session, url: string, responseClass: { new(): T }, jsonBody: any, form: any, queryStringParams: any, logInput: boolean = false, logResponse: boolean = false): Promise<T> {
		let response = await this.makeHttpPost(session, url, jsonBody, form, queryStringParams);
		logInput && TestUtils.log(`Input: \njsonBody ${JSON.stringify(jsonBody)} \nqueryStringParams ${JSON.stringify(queryStringParams)}`);
		logResponse && TestUtils.log(`POST call to url (${url}) \nreturned response \n${JSON.stringify(response)}`);
		return responseClass ? SerializationHelper.toInstance(new responseClass(), response) : response;
	}

	// All Brainshark rest resopnses in the last few years follow the same json structure. This call assumes that response.
	static async httpPutBsk<T>(session: Session, url: string, responseClass: { new(): T }, jsonBody: any, form: any, queryStringParams: any): Promise<T[]> {
		let response = await this.makeHttpPut(session, url, jsonBody, form, queryStringParams);
		TestUtils.log('POST call to url (' + url + ') \n returned response \n ' + JSON.stringify(response));
		let results = response['results'];
		return SerializationHelper.toInstanceArray(new responseClass(), results);
	}

	// This call is for all other calls that don't return the brainsahrk response json.
	static async httpPut<T>(session: Session, url: string, responseClass: { new(): T }, jsonBody: any, form: any, queryStringParams: any): Promise<T> {
		let response = await this.makeHttpPut(session, url, jsonBody, form, queryStringParams);
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
	static async httpDelete<T>(session: Session, url: string, responseClass: { new(): T }, queryStringParams: any): Promise<T> {
		let response = await this.makeHttpDelete(session, url, queryStringParams);
		TestUtils.log('DELETE call to url (' + url + ') \n returned response \n ' + JSON.stringify(response));
		return SerializationHelper.toInstance(new responseClass(), response);
	}

	// All Brainshark rest resopnses in the last few years follow the same json structure. This call assumes that response.
	static async httpDeleteBsk<T>(session: Session, url: string, responseClass: { new(): T }, queryStringParams: any): Promise<T[]> {
		if (queryStringParams == null) {
			queryStringParams = {};
		}
		let response = await this.makeHttpDelete(session, url, queryStringParams);
		TestUtils.log('DELETE call to url (' + url + ') \n returned response \n ' + JSON.stringify(response));
		let results = response['results'];
		return SerializationHelper.toInstanceArray(new responseClass(), results);
	}

	static async httpPostFileBsk<T>(session: Session, url: string, responseClass: { new(): T }, pathToFile: string, queryStringParams: any): Promise<T[]> {
		if (queryStringParams == null) {
			queryStringParams = {};
		}
		let response = await this.httpFileSend(session, 'POST', url, pathToFile, queryStringParams);
		TestUtils.log('POST call to url (' + url + ') \n returned response \n ' + JSON.stringify(response));
		let results = response['results'];
		return SerializationHelper.toInstanceArray(new responseClass(), results);
	}

	static async httpPostFile(session: Session, url: string, pathToFile: string, queryStringParams?: any): Promise<string> {
		if (queryStringParams == null) {
			queryStringParams = {};
		}
		let response = await this.httpFileSend(session, 'POST', url, pathToFile, queryStringParams);
		TestUtils.log('POST call to url (' + url + ') \n returned response \n ' + JSON.stringify(response));
		return response;
	}

	static async httpPutFileBsk<T>(session: Session, url: string, responseClass: { new(): T }, pathToFile: string, queryStringParams?: any): Promise<T[]> {
		if (queryStringParams == null) {
			queryStringParams = {}
		}
		let response = await this.httpFileSend(session, 'PUT', url, pathToFile, queryStringParams);
		TestUtils.log('POST call to url (' + url + ') \n returned response \n ' + JSON.stringify(response));
		let results = response['results'];
		return SerializationHelper.toInstanceArray(new responseClass(), results);
	}

	static async httpPutFile<T>(session: Session, url: string, responseClass: { new(): T }, pathToFile: string, queryStringParams?: any): Promise<T> {
		if (!queryStringParams) {
			queryStringParams = {}
		}
		let response = await this.httpFileSend(session, 'PUT', url, pathToFile, queryStringParams);
		TestUtils.log('POST call to url (' + url + ') \n returned response \n ' + JSON.stringify(response));
		return SerializationHelper.toInstance(new responseClass(), response);
	}
}
