import { TestUtils } from './../../e2e/test-utils';
import { Injectable } from '@angular/core';

@Injectable()
export class MailHandlerService {

	client = null;

	constructor() {
		if (!this.client) {

			var config = [
				'outlook.office365.com', 993, {
					auth: {
						user: 'qaauto1@brainshark.com',
						pass: 'QA$3rv3r!',
					},
					useSecureTransport: true,
					requireTLS: true,
					tls: { rejectUnauthorized: false }
				}];


			// Found at https://github.com/emailjs/emailjs-imap-client
			var ImapClient = require('emailjs-imap-client');

			this.client = new ImapClient(config[0], config[1], config[2]);
			this.client.logLevel = this.client.LOG_LEVEL_NONE;
		}
	}

	public async waitForEmailsBySubject(subjectToMatch: string, expectedEmailCount: number, timeoutSeconds: number): Promise<any[]> {
		await this.client.connect();
		let inbox = await this.client.selectMailbox("INBOX");
		TestUtils.log('Connected to outlook inbox');
		let emailIndex = inbox.exists;
		let emailOffset = 0;
		let messages: any[] = [];
		let foundEmails = [];
		const sleepSeconds = 5; 
		
		while (timeoutSeconds > 0) {

			inbox = await this.client.selectMailbox("INBOX");
			TestUtils.log('Refreshing Inbox');
			let newEmailIndex = inbox.exists;

			if (newEmailIndex > emailIndex) {

				emailOffset = (newEmailIndex - emailIndex) - 1;
				emailIndex = newEmailIndex;

				messages = await this.getMessages(emailIndex, emailOffset);

				for (let m of messages) {
					const subject = m['envelope']['subject'];
					if (subject.trim() === subjectToMatch) {
						TestUtils.log('Found message with subject: [' + subjectToMatch + ']');
						foundEmails.push(m); // push the whole message
					}

				}
			}

			if (foundEmails.length >= expectedEmailCount) {
				break;
			}

			
			await TestUtils.sleep(sleepSeconds * 1000);
			timeoutSeconds = timeoutSeconds - sleepSeconds;
		}

		await this.client.close();
		return foundEmails; // TODO: Probably create some object instead of returning 'any[]'
	}

	public async waitForEmailBySubject(subjectToMatch: string, timeoutSeconds: number): Promise<any[]> {
		return await this.waitForEmailsBySubject(subjectToMatch, 1, timeoutSeconds);
	}

	public async expectEmailsBySubject(subjectToMatch: string, expectedEmailCount, timeoutSeconds: number) {
		const foundEmails: any[] = await this.waitForEmailsBySubject(subjectToMatch, 1, timeoutSeconds);
		return (foundEmails >= expectedEmailCount);
	}

	private async getMessages(startIndex: number, count: number) {
		return await this.client.listMessages('INBOX', (startIndex - count) + ':' + startIndex, ['uid', 'flags', 'envelope', 'body[]']);
	}


}