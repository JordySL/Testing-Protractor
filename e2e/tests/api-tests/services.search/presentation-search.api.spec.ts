import { SessionApi } from './../../../apis/session-api';
import { Session } from './../../../apis/webservices-mobile/models/session-response.model';
import { browser, by, element, WebElement, ElementFinder, ExpectedConditions } from 'protractor';
import { expect } from 'chai';
import { SearchApi } from './../../../apis/services.search/search-api';
import { PresentationsSearchResponse } from './../../../apis/services.search/models/presentations-search-response';
import { LearningSearchCriteria, SearchDomain } from './../../../apis/services.search/models/learning-search-criteria';
import { LearningSearchResponse } from './../../../apis/services.search/models/learning-search-response';

describe('Search Presentations spec', async () => {
	let session: Session;
	const username = process.env.BRAINSHARK_USERS_AUTHOR1_USERNAME;
	const password = process.env.BRAINSHARK_USERS_AUTHOR1_PASSWORD;
	const loginDir = process.env.BRAINSHARK_COMPANY_AUTO3;

	beforeEach(async () => {
		session = await SessionApi.getSession(username, password, loginDir);
	});

	it('Should return Presentations search results', async () => {
		const apiVersion = 'v1';
		const presentationsSearchResponse: PresentationsSearchResponse = await SearchApi.searchPresentations(session, apiVersion, null);

		expect(presentationsSearchResponse.Count).to.be.null;
		expect(presentationsSearchResponse.Results.length).to.be.greaterThan(0);
	});

	it('Should return Presentations search results total Count', async () => {
		const apiVersion = 'v1';
		const searchParams = {
			'SearchCriteria': {
				'IncludeTotalResultCount': true
				}
			};

		const presentationsSearchResponse: PresentationsSearchResponse = await SearchApi.searchPresentations(session, apiVersion, searchParams);

		expect(presentationsSearchResponse.Count).to.be.not.null;
		expect(presentationsSearchResponse.Count).to.be.greaterThan(0);
	});

	it('Should return Courses search results', async () => {
		const apiVersion = 'v2';
		const searchParams = new LearningSearchCriteria();
		searchParams.SearchDomain = SearchDomain.LearningCatalog
		searchParams.IncludePrior = true;
		searchParams.IncludeCurrent = true;
		searchParams.Query = '*';

		const coursesSearchResponse: LearningSearchResponse = await SearchApi.searchCourses(session, apiVersion, searchParams);

		expect(coursesSearchResponse.Count).to.be.not.null;
		expect(coursesSearchResponse.Count).to.be.greaterThan(0);
		expect(coursesSearchResponse.LearningItems.length).to.be.greaterThan(0);
	});
});
