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
import { IBeforeAndAfterContext } from 'mocha';

describe('protractor-test App', async () => {
	let page: LoginPage;
	const presentation = '1slide.pptx';
	let session: Session;
	let presTitle: string;
	let resp: SavePresentationResponse;
	let file: string;

	const BNSKConfig = JSON.parse(process.env.BRAINSHARK_SETTINGS);
	const companyInfo = BNSKConfig.companies.find(c => c.name === 'AutomationInc3');
	const companyId = companyInfo.id;
	const authorUser = companyInfo.users.find(u => u.username === 'autouser1');

	beforeEach(async () => {
		setTimeout(() => console.log('inside time out'), 500);
		session = await	SessionApi.getSession(authorUser.username, authorUser.password, companyInfo.sharkive);
		file = TestUtils.getFilePath(presentation);

		// Uploads a file like a pptx to be converted as a brainshark and waits for conversion
		resp = await SavePresentation.uploadPresentation(session, file);
		expect(resp.pid).to.be.greaterThan(0);

		const form = new SavePresentationForm();
		form.pid = resp.pid; // Set the pid of the pres we want to edit
		presTitle = 'SearchForMe' + TestUtils.timestamp();
		form.title = presTitle;
		form.description = 'This is the interesting description of the presentation - ' + presTitle;
		const resp2: SavePresentationResponse = await SavePresentation.modifyPresentation(session, form);
		expect(resp2.pid).to.be.equals(resp.pid); // verify we get the same pid back

		page = new LoginPage();

	}, 200000);

	it('Should return presentation when searching from My Content', async () => {
		browser.executeScript('sauce:job-name=Should return presentation when searching from My Content'); 
		let presentationFound: boolean;
		await browser.waitForAngularEnabled(false);
		await page.navigateToCompanyId(companyId);
		const homePage = await page.login(authorUser.username, authorUser.password);
		const myContent = await homePage.MasterNavBar.navigateToMyContent();
	
		let count: number;
		count=0;
		do {
			await myContent.MasterNavBar.searchMyContent(resp.pid.toString());
			presentationFound = await myContent.isPresentationPresent(presTitle);
			count++;
		} while ((!presentationFound) && ( count < 10));

		browser.executeScript('sauce:context=Asserting presentation is present');
		expect(presentationFound, 'Expecting presentation to be found by Search').to.be.true;
	});

	afterEach(async function name() {
		const deleteResponse = await PresentationApi.deletePresentationAssert(session, resp.pid);		
		browser.executeScript('sauce:context=Asserting presentation delete was successful');
		expect(deleteResponse).to.be.true; // verify delete was successful
	});

});