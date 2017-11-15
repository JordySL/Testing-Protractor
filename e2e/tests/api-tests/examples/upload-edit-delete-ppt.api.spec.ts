import { Email } from '../../../test-utilities/mailhandler/emails.email.model';
import { Emails } from '../../../test-utilities/mailhandler/emails.model';
import { MailHandlerService, SubjectMatchType } from '../../../test-utilities/mailhandler/mailhandler.service';
import { PresentationApi } from './../../../apis/webservices-mobile/presentation-api';
import { SavePresentationForm } from './../../../apis/misc/models/savepresentation-form.model';
import { SavePresentationResponse } from './../../../apis/misc/models/savepresentation-response.model';
import { SavePresentation } from './../../../apis/misc/savepresentation-api';
import { TestUtils } from '../../../test-utilities/test-utils';
import { SessionApi } from './../../../apis/session-api';
import { Session } from './../../../apis/webservices-mobile/models/session-response.model'
import { browser, by, element, WebElement, ElementFinder, ExpectedConditions } from 'protractor';



describe('Example test for uploading, editing and delting a presentation', async () => {
	let session: Session;

	beforeEach(async (done) => {
		setTimeout(() => console.log('inside time out'), 500);
		const mailHandler = new MailHandlerService();
		const emails:Emails = await mailHandler.waitForEmailsBySubject('OK', 1, 60, SubjectMatchType.Exact);
		const emailsFound: Email[] = emails.emails;
		let email = emailsFound[0];
		let parsedEmail = email.parsedBody;
		
		email.downloadAttachment(0, true);

		session = await SessionApi.getSession('admin', 'admin', 'testnolan2');
		done();
	}, 200000);

	it('create and edit a presentation, then delete it', async () => {

		const file = TestUtils.getFilePath('1slide.pptx');

		//Uploads a file like a pptx to be converted as a brainshark and waits for conversion
		const  resp: SavePresentationResponse = await SavePresentation.uploadPresentation(session, file); 
		await expect(resp.pid).toBeGreaterThan(0);

		let form = new SavePresentationForm();
		form.pid = resp.pid;// Set the pid of the pres we want to edit
		form.title = 'Nolans New Title' + TestUtils.timestamp();
		form.description = 'Nolans New Description' + TestUtils.timestamp();
		//Modifies the presentation and changes fields like title and description
		const resp2: SavePresentationResponse = await SavePresentation.modifyPresentation(session, form);
		await expect(resp2.pid).toBe(resp.pid); // verify we get the same pid back

		const deleteResponse = await PresentationApi.deletePresentationAssert(session, resp.pid); // Checks the message of the delete call and returns a boolean if it was sucessfully deleted
		//const deleteResponse = await PresentationApi.deletePresentation(session, resp.pid); //Returns the full message from the delete call
		await expect(deleteResponse).toBe(true);// verify delete was successful
	});

	afterEach(async () => {

	});

});
