import { expect } from 'chai';
import { WsErrorResponse } from './../../../apis/common/wserror-response.model';
import { UserApi } from './../../../apis/services.common/user-api';
import { UserResponse } from './../../../apis/services.common/models/user-response';
import { User } from './../../../apis/misc/models/user.model';
import { SessionApi } from './../../../apis/session-api';
import { TestUtils } from '../../../test-utilities/test-utils';
import { Session } from './../../../apis/webservices-mobile/models/session-response.model';
import { WebElement } from 'protractor';

describe('Get User Api test', async () => {
	const companyName = process.env.BRAINSHARK_COMPANY;
	const username = process.env.BRAINSHARK_USERS_APIUSER1_USERNAME;
	const password = process.env.BRAINSHARK_USERS_APIUSER1_PASSWORD;
	const apiVersion = process.env.BRAINSHARK_SERVICES_COMMON_API_VERSION;
	
	let session: Session;
	
	beforeEach((async () => {
		setTimeout(() => console.log('inside time out'), 500);

		session = await SessionApi.getSession(username, password, companyName);
	}));
	
	it('Get User', (async () => {
		const userApiResponse: UserResponse = await UserApi.getUser(session, apiVersion);
		expect(userApiResponse.FullName).to.be.equals('api First Name api Last Name');
		expect(userApiResponse.Email).to.be.equals('qaauto1+apiuser1@brainshark.com');
		expect(userApiResponse.CompanyName).to.be.equals('AutomationInc');
		expect(userApiResponse.isActive).to.be.true;		
		expect(userApiResponse.Bio).to.be.equals('Raised in forest\r\nused to be hungry very often');;		
		expect(userApiResponse.Address1).to.be.equals('123 Sunny Hill');
		expect(userApiResponse.Address2).to.be.equals('apartment 666');
		expect(userApiResponse.State).to.be.equals('MA');
		expect(userApiResponse.Country).to.be.equals('USA');
		expect(userApiResponse.PostalCode).to.be.equals('12345');
		expect(userApiResponse.Phone).to.be.equals('+13333333333');
		expect(userApiResponse.Custom1).to.be.equals('one');
		expect(userApiResponse.Custom2).to.be.equals('two');
		expect(userApiResponse.Custom3).to.be.equals('three');
		expect(userApiResponse.Custom4).to.be.equals('four');
		expect(userApiResponse.Custom5).to.be.equals('five');
		expect(userApiResponse.Custom6).to.be.equals('six');
		expect(userApiResponse.Custom7).to.be.equals('seven');
		expect(userApiResponse.Custom8).to.be.equals('eight');
		expect(userApiResponse.Custom9).to.be.equals('nine');
		expect(userApiResponse.Custom10).to.be.equals('ten');
		expect(userApiResponse.Username).to.be.equals('apiuser1');
		expect(userApiResponse.Title).to.be.equals('Master');
		expect(userApiResponse.IsLocked).to.be.false;		
		expect(userApiResponse.Id).to.be.equals(parseInt(process.env.BRAINSHARK_USERS_APIUSER1_ID));
		expect(userApiResponse.PhotoUrl).to.contain('brainshark.com/brainshark/brainshark.net/apppresentation/GetBGImage.aspx');
		expect(userApiResponse.CompanyId).to.be.equals(parseInt(process.env.BRAINSHARK_COMPANY_ID));
		expect(userApiResponse.WebsiteUrl).to.be.equals('http://www.mysite.test');
		expect(userApiResponse.UserImageId).to.be.greaterThan(0);
	}));
	
	afterEach((async () => {
	}));
	
});
	
