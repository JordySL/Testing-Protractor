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
		await expect(userApiResponse.FullName).to.be.equals('api First Name api Last Name');
		await expect(userApiResponse.Email).to.be.equals('qaauto1+apiuser1@brainshark.com');
		await expect(userApiResponse.CompanyName).to.be.equals('AutomationInc');
		await expect(userApiResponse.isActive).to.be.true;		
		await expect(userApiResponse.Bio).to.be.equals('Raised in forest\r\nused to be hungry very often');;		
		await expect(userApiResponse.Address1).to.be.equals('123 Sunny Hill');
		await expect(userApiResponse.Address2).to.be.equals('apartment 666');
		await expect(userApiResponse.State).to.be.equals('MA');
		await expect(userApiResponse.Country).to.be.equals('USA');
		await expect(userApiResponse.PostalCode).to.be.equals('12345');
		await expect(userApiResponse.Phone).to.be.equals('+13333333333');
		await expect(userApiResponse.Custom1).to.be.equals('one');
		await expect(userApiResponse.Custom2).to.be.equals('two');
		await expect(userApiResponse.Custom3).to.be.equals('three');
		await expect(userApiResponse.Custom4).to.be.equals('four');
		await expect(userApiResponse.Custom5).to.be.equals('five');
		await expect(userApiResponse.Custom6).to.be.equals('six');
		await expect(userApiResponse.Custom7).to.be.equals('seven');
		await expect(userApiResponse.Custom8).to.be.equals('eight');
		await expect(userApiResponse.Custom9).to.be.equals('nine');
		await expect(userApiResponse.Custom10).to.be.equals('ten');
		await expect(userApiResponse.Username).to.be.equals('apiuser1');
		await expect(userApiResponse.Title).to.be.equals('Master');
		await expect(userApiResponse.IsLocked).to.be.false;		
		await expect(userApiResponse.Id).to.be.equals(parseInt(process.env.BRAINSHARK_USERS_APIUSER1_ID));
		await expect(userApiResponse.PhotoUrl).to.contain('brainshark.com/brainshark/brainshark.net/apppresentation/GetBGImage.aspx');
		await expect(userApiResponse.CompanyId).to.be.equals(parseInt(process.env.BRAINSHARK_COMPANY_ID));
		await expect(userApiResponse.WebsiteUrl).to.be.equals('http://www.mysite.test');
		await expect(userApiResponse.UserImageId).to.be.greaterThan(0);
	}));
	
	afterEach((async () => {
	}));
	
});
	
