import { Email } from '../../../test-utilities/mailhandler/emails.email.model';
import { Emails } from '../../../test-utilities/mailhandler/emails.model';
import { MailHandlerService, SubjectMatchType } from '../../../test-utilities/mailhandler/mailhandler.service';
import { PresentationApi } from './../../../apis/webservices-mobile/presentation-api';
import { SavePresentationForm } from './../../../apis/misc/models/savepresentation-form.model';
import { SavePresentationResponse } from './../../../apis/misc/models/savepresentation-response.model';
import { SavePresentation } from './../../../apis/misc/savepresentation-api';
import { TestUtils } from '../../../test-utilities/test-utils';
import { SessionApi } from './../../../apis/session-api';
import { Session } from './../../../apis/webservices-mobile/models/session-response.model';
import { browser, by, element, WebElement, ElementFinder, ExpectedConditions } from 'protractor';
import { expect } from 'chai';

describe('Example test for uploading, editing and delting a presentation', async () => {
	let session: Session;
	const username = process.env.BRAINSHARK_USERS_AUTHOR1_USERNAME;
	const password = process.env.BRAINSHARK_USERS_AUTHOR1_PASSWORD;
	const loginDir = process.env.BRAINSHARK_COMPANY;

	beforeEach(async (done) => {
		session = await SessionApi.getSession(username, password, loginDir);
		done();
	}, 200000);

	it('create and edit a presentation, then delete it', async () => {

		const file = TestUtils.getFilePath('1slide.pptx');

		// Uploads a file like a pptx to be converted as a brainshark and waits for conversion
		const  resp: SavePresentationResponse = await SavePresentation.uploadPresentation(session, file);
		expect(resp.pid).to.be.greaterThan(0);

		const form = new SavePresentationForm();
		form.pid = resp.pid; // Set the pid of the pres we want to edit
		form.title = 'Nolans New Title' + TestUtils.timestamp();
		form.description = 'Nolans New Description' + TestUtils.timestamp();
		// Modifies the presentation and changes fields like title and description
		const resp2: SavePresentationResponse = await SavePresentation.modifyPresentation(session, form);
		expect(resp2.pid).to.be.equals(resp.pid); // verify we get the same pid back

		// Checks the message of the delete call and returns a boolean if it was sucessfully deleted
		const deleteResponse = await PresentationApi.deletePresentationAssert(session, resp.pid);

		expect(deleteResponse).to.be.equals(true); // verify delete was successful
	});


});
