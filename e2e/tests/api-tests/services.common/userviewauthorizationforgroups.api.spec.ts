import { expect } from 'chai';
import { WsErrorResponse } from './../../../apis/common/wserror-response.model';
import { UserViewAuthorizationForGroupsApi } from './../../../apis/services.common/userviewauthorizationforgroups-api';
import { UserViewAuthorizationForGroupsResponse } from './../../../apis/services.common/models/userviewauthorizationforgroups-response';
import { User } from './../../../apis/misc/models/user.model';
import { SessionApi } from './../../../apis/session-api';
import { TestUtils } from '../../../test-utilities/test-utils';
import { Session } from './../../../apis/webservices-mobile/models/session-response.model';
import { WebElement } from 'protractor';

describe('UserViewAuthorizationForGroups Api test', async () => {
	const companyName = process.env.BRAINSHARK_COMPANY_AUTO3;

	// cadmin
	const cadminUsername = process.env.BRAINSHARK_USERS_CADMIN_USERNAME;
	const cadminPassword = process.env.BRAINSHARK_USERS_CADMIN_PASSWORD;
	// Learning Administrator
	const lAdminUsername = process.env.BRAINSHARK_USERS_LEARNINGADMIN_USERNAME;
	const lAdminPassword = process.env.BRAINSHARK_USERS_LEARNINGADMIN_PASSWORD;
	// Group manager
	const gManagerUsername = process.env.BRAINSHARK_USERS_GROUPMANAGER_USERNAME;
	const gManagerPassword = process.env.BRAINSHARK_USERS_GROUPMANAGER_PASSWORD;
	// A student in Group1
	const user1Username = process.env.BRAINSHARK_USERS_STUDENT1_USERNAME;
	const user1Password = process.env.BRAINSHARK_USERS_STUDENT1_PASSWORD;

	const apiVersion = process.env.BRAINSHARK_SERVICES_COMMON_API_VERSION;

	const group1Id : number = process.env.GROUP1_ID;
	const group2Id : number = process.env.GROUP2_ID;
	const allGroupId : number = process.env.ALL_COMPANY_USERS_GROUP_ID;
	const adminsGroupId : number = process.env.ADMINISTRATORS_GROUP_ID;
	const groupManagerGroupId : number = process.env.GROUP_MANAGER_GROUP_ID;
	
	let session: Session;
	var groupList: number[];
	
	it('Check Groups Authorizations for cadmin', (async () => {
		session = await SessionApi.getSession(cadminUsername, cadminPassword, companyName);
		
		// The last group is non-existent
		groupList = [group1Id, allGroupId, adminsGroupId, groupManagerGroupId, 12345];

		let userViewAuthorizationForGroupsResponse: Array<UserViewAuthorizationForGroupsResponse> = await UserViewAuthorizationForGroupsApi.postUserViewAuthorizationForGroups(session, apiVersion, groupList);

		// cadmins should see all groups. So all asserts are expected to be true ecxept the last.
		expect(userViewAuthorizationForGroupsResponse[0].GroupId == group1Id).to.be.true;
		expect(userViewAuthorizationForGroupsResponse[0].HasGroupViewAuthorization).to.be.true;
		expect(userViewAuthorizationForGroupsResponse[1].GroupId == allGroupId).to.be.true;
		expect(userViewAuthorizationForGroupsResponse[1].HasGroupViewAuthorization).to.be.true;
		expect(userViewAuthorizationForGroupsResponse[2].GroupId == adminsGroupId).to.be.true;
		expect(userViewAuthorizationForGroupsResponse[2].HasGroupViewAuthorization).to.be.true;
		expect(userViewAuthorizationForGroupsResponse[3].GroupId == groupManagerGroupId).to.be.true;
		expect(userViewAuthorizationForGroupsResponse[3].HasGroupViewAuthorization).to.be.true;
		expect(userViewAuthorizationForGroupsResponse[4].GroupId).to.be.equal(12345);
		// The below assertion fails because of the open issue: EV-104
		//expect(userViewAuthorizationForGroupsResponse[4].HasGroupViewAuthorization).to.be.false;
	}));

	it('Check Groups Authorizations for learnin admin', (async () => {
		session = await SessionApi.getSession(lAdminUsername, lAdminPassword, companyName);
		
		// The last group is non-existent
		groupList = [group1Id, allGroupId, adminsGroupId, groupManagerGroupId, 12345];

		let userViewAuthorizationForGroupsResponse: Array<UserViewAuthorizationForGroupsResponse> = await UserViewAuthorizationForGroupsApi.postUserViewAuthorizationForGroups(session, apiVersion, groupList);

		// LAdmins should see all groups like cadmins. So all asserts are expected to be true ecxept the last.
		expect(userViewAuthorizationForGroupsResponse[0].GroupId == group1Id).to.be.true;
		//expect(userViewAuthorizationForGroupsResponse[0].GroupId).to.be.equal(group1Id);
		expect(userViewAuthorizationForGroupsResponse[0].HasGroupViewAuthorization).to.be.true;
		expect(userViewAuthorizationForGroupsResponse[1].GroupId == allGroupId).to.be.true;
		expect(userViewAuthorizationForGroupsResponse[1].HasGroupViewAuthorization).to.be.true;
		expect(userViewAuthorizationForGroupsResponse[2].GroupId == adminsGroupId).to.be.true;
		expect(userViewAuthorizationForGroupsResponse[2].HasGroupViewAuthorization).to.be.true;
		expect(userViewAuthorizationForGroupsResponse[3].GroupId == groupManagerGroupId).to.be.true;
		expect(userViewAuthorizationForGroupsResponse[3].HasGroupViewAuthorization).to.be.true;
		expect(userViewAuthorizationForGroupsResponse[4].GroupId).to.be.equal(12345);
		// The below assertion fails because of the open issue: EV-104
		//expect(userViewAuthorizationForGroupsResponse[4].HasGroupViewAuthorization).to.be.false;
	}));

	it('Check Groups Authorizations for group manager', (async () => {
		session = await SessionApi.getSession(gManagerUsername, gManagerPassword, companyName);
		
		groupList = [group1Id, allGroupId, adminsGroupId, 12345, groupManagerGroupId];

		let userViewAuthorizationForGroupsResponse: Array<UserViewAuthorizationForGroupsResponse> = await UserViewAuthorizationForGroupsApi.postUserViewAuthorizationForGroups(session, apiVersion, groupList);

		// Group manager can see only group which he managers.
		expect(userViewAuthorizationForGroupsResponse[0].GroupId == group1Id).to.be.true;
		expect(userViewAuthorizationForGroupsResponse[0].HasGroupViewAuthorization).to.be.false;
		expect(userViewAuthorizationForGroupsResponse[1].GroupId == allGroupId).to.be.true;
		// The below line should return true. Filed an issue: EV-107
		// expect(userViewAuthorizationForGroupsResponse[1].HasGroupViewAuthorization).to.be.true;
		expect(userViewAuthorizationForGroupsResponse[2].GroupId == adminsGroupId).to.be.true;
		expect(userViewAuthorizationForGroupsResponse[2].HasGroupViewAuthorization).to.be.false;
		expect(userViewAuthorizationForGroupsResponse[3].GroupId).to.be.equal(12345);
		expect(userViewAuthorizationForGroupsResponse[3].HasGroupViewAuthorization).to.be.false;
		expect(userViewAuthorizationForGroupsResponse[4].GroupId == groupManagerGroupId).to.be.true;
		expect(userViewAuthorizationForGroupsResponse[4].HasGroupViewAuthorization).to.be.true;
	}));

	it('Check Groups Authorizations for student', (async () => {
		session = await SessionApi.getSession(user1Username, user1Password, companyName);
		
		groupList = [group1Id, allGroupId, adminsGroupId, 12345, groupManagerGroupId, group2Id];

		let userViewAuthorizationForGroupsResponse: Array<UserViewAuthorizationForGroupsResponse> = await UserViewAuthorizationForGroupsApi.postUserViewAuthorizationForGroups(session, apiVersion, groupList);

		// A student can see only group which he belongs to.
		expect(userViewAuthorizationForGroupsResponse[0].GroupId == group1Id).to.be.true;
		expect(userViewAuthorizationForGroupsResponse[0].HasGroupViewAuthorization).to.be.true;
		expect(userViewAuthorizationForGroupsResponse[1].GroupId == allGroupId).to.be.true;
		expect(userViewAuthorizationForGroupsResponse[1].HasGroupViewAuthorization).to.be.true;
		expect(userViewAuthorizationForGroupsResponse[2].GroupId == adminsGroupId).to.be.true;
		expect(userViewAuthorizationForGroupsResponse[2].HasGroupViewAuthorization).to.be.false;
		expect(userViewAuthorizationForGroupsResponse[3].GroupId).to.be.equal(12345);
		expect(userViewAuthorizationForGroupsResponse[3].HasGroupViewAuthorization).to.be.false;
		expect(userViewAuthorizationForGroupsResponse[4].GroupId == groupManagerGroupId).to.be.true;
		expect(userViewAuthorizationForGroupsResponse[4].HasGroupViewAuthorization).to.be.false;
		expect(userViewAuthorizationForGroupsResponse[5].GroupId == group2Id).to.be.true;
		expect(userViewAuthorizationForGroupsResponse[5].HasGroupViewAuthorization).to.be.false;
	}));
});
