import { SessionApi } from './../../../apis/session-api';
import { Session } from './../../../apis/webservices-mobile/models/session-response.model';
import { browser, by, element, WebElement, ElementFinder, ExpectedConditions } from 'protractor';
import { expect } from 'chai';
import { SearchApi } from './../../../apis/services.search/search-api';
import { PresentationsSearchResponse } from './../../../apis/services.search/models/presentations-search-response';

describe('*** Search presentation spec ***', async () => {
	let session: Session;
	const username = process.env.BRAINSHARK_USERS_AUTHOR1_USERNAME;
	const password = process.env.BRAINSHARK_USERS_AUTHOR1_PASSWORD;
	const loginDir = process.env.BRAINSHARK_COMPANY;
	const apiVersion = 'v1';

	beforeEach(async () => {
		session = await SessionApi.getSession(username, password, loginDir);
	});

	it('Should return Presentations search results', async () => {
		const presentationsSearchResponse: PresentationsSearchResponse = await SearchApi.searchPresentations(session, apiVersion, null);

		expect(presentationsSearchResponse.Count).to.be.null;
		expect(presentationsSearchResponse.Results.length).to.be.greaterThan(0);
	});

	it('Should return Presentations search results total Count', async () => {
		const searchParams = {
			"SearchCriteria": {
				"IncludeTotalResultCount": true
				}
			};

		const presentationsSearchResponse: PresentationsSearchResponse = await SearchApi.searchPresentations(session, apiVersion, searchParams);

		expect(presentationsSearchResponse.Count).to.be.not.null;
		expect(presentationsSearchResponse.Count).to.be.greaterThan(0);
	});
});
