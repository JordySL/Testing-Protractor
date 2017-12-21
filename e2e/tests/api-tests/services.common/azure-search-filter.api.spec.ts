import { SessionApi } from './../../../apis/session-api';
import { Session } from './../../../apis/webservices-mobile/models/session-response.model';
import { browser, by, element, WebElement, ElementFinder, ExpectedConditions } from 'protractor';
import { expect } from 'chai';
import { AzureSearchFilterApi } from './../../../apis/services.common/azure-search-filter-api';
import { SearchDomain } from './../../../apis/services.search/models/learning-search-criteria';

describe('Generate Azure search OData filters spec', async () => {
	let session: Session;
	const username = process.env.BRAINSHARK_USERS_AUTHOR1_USERNAME;
	const password = process.env.BRAINSHARK_USERS_AUTHOR1_PASSWORD;
	const loginDir = process.env.BRAINSHARK_COMPANY_AUTO3;
	const companyId = process.env.BRAINSHARK_COMPANY_AUTO3_ID;

	beforeEach(async () => {
		session = await SessionApi.getSession(username, password, loginDir);
	});

	it('Should return Presentations search filters', async () => {
		const apiVersion = 'v1';
		const searchParams = {
			'UserId': session.UId,
	    'CompanyId': companyId,
			'SearchDomain': SearchDomain.LearningCatalog,
	    'Access': 'Author',
	    'AuthorIds': null,
	    'CustomFilterIds': null,
	    'ExcludedFolderIds': null,
	    'FolderIds': null,
	    'IncludeDeleted': false,
	    'IndexName': "presentations",
	    'IsPublicOnly': false,
	    'LearningAzureSearchFilterInput': {
				'HideDeletedCoursesInCompletedEnrollments': false,
				'IncludeCurrentEnrollments': true,
				'IncludeOnlyEnrolled': false,
				'IncludeOnlyIncomplete': false,
				'IncludePriorEnrollments': true,
				'IsCompanyAdmin': true,
				'IsGroupAdmin': false,
				'IsLearningCourseAdmin': true,
				'IsLearningManager': true
			},
	    'PresentationAzureSearchFilterInput': {
				'IncludeArchived': false,
				'IncludeCourses': true,
				'IncludeExpired': true,
				'IncludeInactive': false,
				'IsPublicOnly': false,
				'IsWrapBit': false,
				'PrivateLabelIds': null
			},
	    'TagIds': null
		};

		const presentationFilters: string = await AzureSearchFilterApi.getPresentationFilters(session, apiVersion, searchParams);

		expect(presentationFilters).to.be.not.null;
		expect(presentationFilters.length).to.be.greaterThan(0);
	});

	it('Should return Curriculum search filters', async () => {
		const apiVersion = 'v1';
		const searchParams = {
			'UserId': session.UId,
	    'CompanyId': companyId,
			'SearchDomain': SearchDomain.LearningCatalog,
	    'Access': 'Author',
	    'AuthorIds': null,
	    'CustomFilterIds': null,
	    'ExcludedFolderIds': null,
	    'FolderIds': null,
	    'IncludeDeleted': false,
	    'IndexName': "presentations",
	    'IsPublicOnly': false,
	    'LearningAzureSearchFilterInput': {
				'HideDeletedCoursesInCompletedEnrollments': false,
				'IncludeCurrentEnrollments': true,
				'IncludeOnlyEnrolled': false,
				'IncludeOnlyIncomplete': false,
				'IncludePriorEnrollments': true,
				'IsCompanyAdmin': true,
				'IsGroupAdmin': false,
				'IsLearningCourseAdmin': true,
				'IsLearningManager': true
			},
	    'PresentationAzureSearchFilterInput': {
				'IncludeArchived': false,
				'IncludeCourses': true,
				'IncludeExpired': true,
				'IncludeInactive': false,
				'IsPublicOnly': false,
				'IsWrapBit': false,
				'PrivateLabelIds': null
			},
	    'TagIds': null
		};

		const presentationFilters: string = await AzureSearchFilterApi.getCurriculumFilters(session, apiVersion, searchParams);

		expect(presentationFilters).to.be.not.null;
		expect(presentationFilters.length).to.be.greaterThan(0);
	});
});
