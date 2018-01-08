import { SessionApi } from './../../../apis/session-api';
import { Session } from './../../../apis/webservices-mobile/models/session-response.model';
import { expect } from 'chai';
import { LearningApi } from './../../../apis/services.learning/learning-api';
import { CourseCatalogResponse } from './../../../apis/services.learning/models/course-catalog-response';

describe('Course catalog spec', async () => {
	let session: Session;
	const username = process.env.BRAINSHARK_USERS_AUTHOR1_USERNAME;
	const password = process.env.BRAINSHARK_USERS_AUTHOR1_PASSWORD;
	const loginDir = process.env.BRAINSHARK_COMPANY_AUTO3;	

	beforeEach(async () => {
		session = await SessionApi.getSession(username, password, loginDir);
	});

	it('Should return Course Catalog results', async () => {
		const apiVersion = 'v1.0';
		const params: string[] = [
			`perpage=21`, `sortby=title`, `sortdirection=a`, `offset=1`, `includePrior=false`,
			`includeCurrent=true`, `includeOnlyEnrolled=false`, `excludefilterdata=false`, `Query=`];

		const courseCatalogResponse: CourseCatalogResponse = await LearningApi.searchCourseCatalog(session, apiVersion, params.join('&'));

		expect(courseCatalogResponse.TotalRows).greaterThan(0);
		expect(courseCatalogResponse.Filters.length).greaterThan(0);
	});

	it('Should return Course Catalog results - Page 1', async () => {
		const apiVersion = 'v1.0';
		const params: string[] = [
			`perpage=9`, `sortby=title`, `sortdirection=a`, `offset=1`, `includePrior=false`,
			`includeCurrent=true`, `includeOnlyEnrolled=false`, `excludefilterdata=false`, `Query=`];

		const courseCatalogResponse: CourseCatalogResponse = await LearningApi.searchCourseCatalog(session, apiVersion, params.join('&'));

		expect(courseCatalogResponse.TotalRows).greaterThan(0);
		expect(courseCatalogResponse.Items.length).equals(9);
		expect(courseCatalogResponse.Filters.length).greaterThan(0);
	});

	it('Should return Course Catalog results - Page 2', async () => {
		const apiVersion = 'v1.0';
		const params: string[] = [
			`perpage=9`, `sortby=title`, `sortdirection=a`, `offset=10`, `includePrior=false`,
			`includeCurrent=true`, `includeOnlyEnrolled=false`, `excludefilterdata=false`, `Query=`];

		const courseCatalogResponse: CourseCatalogResponse = await LearningApi.searchCourseCatalog(session, apiVersion, params.join('&'));		
		expect(courseCatalogResponse.TotalRows).greaterThan(0);
		expect(courseCatalogResponse.Items.length).greaterThan(0);
		expect(courseCatalogResponse.Filters.length).greaterThan(0);
	});

	it('Should return Course Catalog results - Applying author filters', async () => {
		const apiVersion = 'v1.0';
		const params: string[] = [
			`perpage=9`, `sortby=title`, `sortdirection=a`, `offset=10`, `includePrior=false`,
			`includeCurrent=true`, `includeOnlyEnrolled=false`, `excludefilterdata=false`, `Query=`,`authorid=848206`];

		const courseCatalogResponse: CourseCatalogResponse = await LearningApi.searchCourseCatalog(session, apiVersion, params.join('&'));		
		expect(courseCatalogResponse.TotalRows).greaterThan(0);
		expect(courseCatalogResponse.Items.length).greaterThan(0);
		expect(courseCatalogResponse.Filters.length).greaterThan(0);
	});

	it('Should return Course Catalog results - Applying author filters and folder filters', async () => {
		const apiVersion = 'v1.0';
		const params: string[] = [
			`perpage=9`, `sortby=title`, `sortdirection=a`, `offset=10`, `includePrior=false`,
			`includeCurrent=true`, `includeOnlyEnrolled=false`, `excludefilterdata=false`, `Query=`,`authorid=848206`,`folderid=473978`];

		const courseCatalogResponse: CourseCatalogResponse = await LearningApi.searchCourseCatalog(session, apiVersion, params.join('&'));		
		expect(courseCatalogResponse.TotalRows).greaterThan(0);
		expect(courseCatalogResponse.Items.length).greaterThan(0);
		expect(courseCatalogResponse.Filters.length).greaterThan(0);
	});
});
