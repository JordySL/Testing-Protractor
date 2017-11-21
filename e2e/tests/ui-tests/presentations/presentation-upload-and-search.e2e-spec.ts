import { expect } from 'chai';
import { LoginPage } from './../../../pages/login.po';
import { TestUtils } from '../../../test-utilities/test-utils';
import { WsErrorResponse } from './../../../apis/common/wserror-response.model';
import { PresentationApi } from './../../../apis/webservices-mobile/presentation-api';
import { SavePresentationForm } from './../../../apis/misc/models/savepresentation-form.model';
import { SavePresentationResponse } from './../../../apis/misc/models/savepresentation-response.model';
import { SavePresentation } from './../../../apis/misc/savepresentation-api';
import { SessionApi } from './../../../apis/session-api';
import { Session } from './../../../apis/webservices-mobile/models/session-response.model'
import { browser, by, element, WebElement, ElementFinder, ExpectedConditions } from 'protractor';
import { User } from './../../../apis/misc/models/user.model';

describe('protractor-test App', async () => {
	let page: LoginPage;
	const presentation = '1slide.pptx';
	let session: Session;
	let presTitle: string;
	let resp: SavePresentationResponse;

	const username = process.env.BRAINSHARK_USERS_PRINCIPAL_USERNAME;
	const password = process.env.BRAINSHARK_USERS_PRINCIPAL_PASSWORD;
	const companyName = process.env.BRAINSHARK_COMPANY_AUTO3;
	const companyId = process.env.BRAINSHARK_COMPANY_AUTO3_ID;

	beforeEach(async () => {
		setTimeout(() => console.log('inside time out'), 500);
		session = await SessionApi.getSession(username, password, companyName);
		const user1: User = { userId: session.UId };
		const file = TestUtils.getFilePath(presentation);

		// Uploads a file like a pptx to be converted as a brainshark and waits for conversion
		resp = await SavePresentation.uploadPresentation(session, file);
		await expect(resp.pid).to.be.greaterThan(0);

		const form = new SavePresentationForm();
		form.pid = resp.pid; // Set the pid of the pres we want to edit
		presTitle = 'SearchForMe' + TestUtils.timestamp();
		form.title = presTitle;
		form.description = 'This is the interesting description of the presentation - ' + presTitle;
		const resp2: SavePresentationResponse = await SavePresentation.modifyPresentation(session, form);
		await expect(resp2.pid).to.be.equals(resp.pid); // verify we get the same pid back

		page = await new LoginPage();

	}, 200000);

	it('Should return presentation when searching from My Content', async () => {
		await browser.waitForAngularEnabled(false);
		await page.navigateToCompanyId(companyId);
		const homePage = await page.login(username, password);
		const myContent = await homePage.MasterNavBar.navigateToMyContent();
		await myContent.MasterNavBar.searchMyContent(presTitle);
		await expect(await myContent.isPresentationPresent(presTitle)).to.be.true;
	});

	afterEach(async () => {
		// Checks the message of the delete call and returns a boolean if it was sucessfully deleted
		const deleteResponse = await PresentationApi.deletePresentationAssert(session, resp.pid);
		await expect(deleteResponse).to.be.true; // verify delete was successful
	});

});