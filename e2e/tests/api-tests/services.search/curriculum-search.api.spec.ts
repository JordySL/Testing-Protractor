import { SessionApi } from './../../../apis/session-api';
import { Session } from './../../../apis/webservices-mobile/models/session-response.model';
import { browser, by, element, WebElement, ElementFinder, ExpectedConditions } from 'protractor';
import { expect } from 'chai';
import { SearchApi } from './../../../apis/services.search/search-api';
import { CurriculumsSearchResponse } from './../../../apis/services.search/models/curriculums-search-response';

describe('*** Search Curriculums spec ***', async () => {
	let session: Session;
	const username = process.env.BRAINSHARK_USERS_AUTHOR1_USERNAME;
	const password = process.env.BRAINSHARK_USERS_AUTHOR1_PASSWORD;
	const loginDir = process.env.BRAINSHARK_COMPANY;

	beforeEach(async () => {
		session = await SessionApi.getSession(username, password, loginDir);
	});

	it('Should return Curriculums search results', async () => {
		const apiVersion = 'v1';
		const curriculumsSearchResponse: CurriculumsSearchResponse = await SearchApi.searchCurriculums(session, apiVersion, null);

		expect(curriculumsSearchResponse.Count).to.be.null;
		expect(curriculumsSearchResponse.Results.length).to.be.greaterThan(0);
	});

	it('Should return Curriculums search results total Count', async () => {
		const apiVersion = 'v1';
		const searchParams = {
			"SearchCriteria": {
				"IncludeTotalResultCount": true
				}
			};

		const curriculumsSearchResponse: CurriculumsSearchResponse = await SearchApi.searchCurriculums(session, apiVersion, searchParams);

		expect(curriculumsSearchResponse.Count).to.be.not.null;
		expect(curriculumsSearchResponse.Count).to.be.greaterThan(0);
	});
});
