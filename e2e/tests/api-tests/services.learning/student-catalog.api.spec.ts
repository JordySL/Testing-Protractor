import { SessionApi } from './../../../apis/session-api';
import { Session } from './../../../apis/webservices-mobile/models/session-response.model';
import { browser, by, element, WebElement, ElementFinder, ExpectedConditions } from 'protractor';
import { expect } from 'chai';
import { SearchApi } from './../../../apis/services.search/search-api';
import { LearningSearchResponse, LearningItem } from './../../../apis/services.search/models/learning-search-response';
import { LearningSearchCriteria, SearchDomain } from './../../../apis/services.search/models/learning-search-criteria';

describe('*** Search student catalog that contains combined Courses and Curriculums list spec ***', async () => {
	let session: Session;
	const username = process.env.BRAINSHARK_USERS_AUTHOR1_USERNAME;
	const password = process.env.BRAINSHARK_USERS_AUTHOR1_PASSWORD;
	const loginDir = process.env.BRAINSHARK_COMPANY_AUTO3;
	const companyId = process.env.BRAINSHARK_COMPANY_AUTO3_ID;

	beforeEach(async () => {
		session = await SessionApi.getSession(username, password, loginDir);
	});

	it('Should return Learning Catalog search results', async () => {
		const apiVersion = 'v1';
		const searchParams = new LearningSearchCriteria();
		searchParams.SearchDomain = SearchDomain.LearningCatalog
		searchParams.IncludePrior = true;
		searchParams.IncludeCurrent = true;
		searchParams.Query = '*';

		const learningSearchResponse: LearningSearchResponse = await SearchApi.searchLearningCatalog(session, apiVersion, searchParams);

		expect(learningSearchResponse.Count).to.be.not.null;
		expect(learningSearchResponse.LearningItems.length).to.be.greaterThan(0);
	});

	it('Should return both Learning Courses and Curriculums', async () => {
		const apiVersion = 'v1';
		const searchParams = new LearningSearchCriteria();
		searchParams.SearchDomain = SearchDomain.LearningCatalog
		searchParams.IncludePrior = true;
		searchParams.IncludeCurrent = true;
		searchParams.Query = '*';

		const learningSearchResponse: LearningSearchResponse = await SearchApi.searchLearningCatalog(session, apiVersion, searchParams);
		const courses: Array<LearningItem> = learningSearchResponse.LearningItems.filter(learningItem => learningItem.IsCourse);
		const curriculums: Array<LearningItem> = learningSearchResponse.LearningItems.filter(learningItem => !learningItem.IsCourse);

		expect(learningSearchResponse.Count).to.be.not.null;
		expect(learningSearchResponse.LearningItems.length).to.be.greaterThan(0);
		expect(courses.length).to.be.greaterThan(0);
		expect(curriculums.length).to.be.greaterThan(0);
	});

	it('Should return Page 1', async () => {
		const apiVersion = 'v1';
		const searchParams = new LearningSearchCriteria();
		searchParams.SearchDomain = SearchDomain.LearningCatalog
		searchParams.IncludePrior = true;
		searchParams.IncludeCurrent = true;
		searchParams.Query = '*';
		searchParams.Offset = 1;
		searchParams.PerPage = 2;

		const learningSearchResponse: LearningSearchResponse = await SearchApi.searchLearningCatalog(session, apiVersion, searchParams);

		expect(learningSearchResponse.Count).to.be.not.null;
		expect(learningSearchResponse.LearningItems.length).to.be.eq(2);
	});

	it('Should return Page 2', async () => {
		const apiVersion = 'v1';
		const searchParams = new LearningSearchCriteria();
		searchParams.SearchDomain = SearchDomain.LearningCatalog
		searchParams.IncludePrior = true;
		searchParams.IncludeCurrent = true;
		searchParams.Query = '*';
		searchParams.Offset = 3;
		searchParams.PerPage = 3;

		const learningSearchResponse: LearningSearchResponse = await SearchApi.searchLearningCatalog(session, apiVersion, searchParams);

		expect(learningSearchResponse.Count).to.be.not.null;
		expect(learningSearchResponse.LearningItems.length).to.be.eq(3);
	});

	it('Should find a course', async () => {
		const apiVersion = 'v1';
		const searchParams = new LearningSearchCriteria();
		searchParams.SearchDomain = SearchDomain.LearningCatalog
		searchParams.IncludePrior = true;
		searchParams.IncludeCurrent = true;
		searchParams.Query = 'katz';

		const learningSearchResponse: LearningSearchResponse = await SearchApi.searchLearningCatalog(session, apiVersion, searchParams);
		const courses: Array<LearningItem> = learningSearchResponse.LearningItems.filter(learningItem => learningItem.IsCourse);
		const curriculums: Array<LearningItem> = learningSearchResponse.LearningItems.filter(learningItem => !learningItem.IsCourse);

		expect(learningSearchResponse.Count).to.be.not.null;
		expect(learningSearchResponse.LearningItems.length).to.be.greaterThan(0);
		expect(courses.length).to.be.eq(2);
		expect(curriculums.length).to.be.eq(1);
	});
});
