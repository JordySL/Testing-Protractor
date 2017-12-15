import { SessionApi } from './../../../apis/session-api';
import { Session } from './../../../apis/webservices-mobile/models/session-response.model';
import { expect } from 'chai';
import { LearningApi } from './../../../apis/services.learning/learning-api';

describe('Get Student enrollments spec', async () => {
	let session: Session;
	const username = process.env.BRAINSHARK_USERS_AUTHOR1_USERNAME;
	const password = process.env.BRAINSHARK_USERS_AUTHOR1_PASSWORD;
	const loginDir = process.env.BRAINSHARK_COMPANY_AUTO3;
	const companyId = process.env.BRAINSHARK_COMPANY_AUTO3_ID;

	beforeEach(async () => {
		session = await SessionApi.getSession(username, password, loginDir);
	});

	it('Should return Courses enrollments', async () => {
		const apiVersion = 'v1';
		const queryParams = {
			'query.userId': session.UId,
			'query.companyId': companyId
		};

		const enrollmentResponse: any = await LearningApi.getCourseEnrollments(session, apiVersion, queryParams);

		expect(enrollmentResponse).to.be.not.null;
		expect(enrollmentResponse.length).to.be.greaterThan(0);
	});

	it('Should return Curriculum enrollments', async () => {
		const apiVersion = 'v1';
		const queryParams = {
			'query.userId': session.UId,
			'query.companyId': companyId
		};

		const enrollmentResponse: any = await LearningApi.getCurriculumEnrollments(session, apiVersion, queryParams);

		expect(enrollmentResponse).to.be.not.null;
		expect(enrollmentResponse.length).to.be.greaterThan(0);
	});
});
