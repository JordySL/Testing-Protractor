import { TestUtils } from './../test-utils';
import { Emails } from './emails.model';
import ImapClient from 'emailjs-imap-client';


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
			// var ImapClient = require('emailjs-imap-client');

			this.client = new ImapClient(config[0], config[1], config[2]);
			this.client.logLevel = this.client.LOG_LEVEL_NONE;
		}
	}

	public async waitForEmailsBySubject(subjectToMatch: string, expectedEmailCount: number, timeoutSeconds: number): Promise<Emails> {

		let internalRetryTmeOutId: NodeJS.Timer;
		let externalTimeOutId: NodeJS.Timer;

		let promiseForThis = new Promise<Emails>(async (resolve, reject) => {
			await this.client.connect();
			let inbox = await this.client.selectMailbox("INBOX");
			TestUtils.log('Connected to outlook inbox');
			let emailIndex = inbox.exists;
			let emailOffset = 0;
			let messages: any[] = [];
			let foundEmails = new Emails();

			const retryTimeInMilliSeconds = 5000;

			internalRetryTmeOutId = await setInterval(async () => {

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
							TestUtils.log('Recieved new message with matching subject: [' + subjectToMatch + ']');
							foundEmails.emails.push(m); // push the whole message
						} else {
							TestUtils.log('Recieved new message with subject: [' + subject.trim() + ']');
						}
					}
				}

				if (foundEmails.emails.length >= expectedEmailCount) {
					clearInterval(externalTimeOutId);
					clearInterval(internalRetryTmeOutId);
					await this.client.close();
					resolve(foundEmails);
				}
			}, retryTimeInMilliSeconds);

			externalTimeOutId = setInterval(() => {
				clearInterval(internalRetryTmeOutId);
				clearInterval(externalTimeOutId);
				resolve(foundEmails);
			}, (timeoutSeconds * 1000));
		});

		return promiseForThis;
	}

	public async waitForEmailBySubject(subjectToMatch: string, timeoutSeconds: number): Promise<Emails> {
		return await this.waitForEmailsBySubject(subjectToMatch, 1, timeoutSeconds);
	}

	public async expectEmailsBySubject(subjectToMatch: string, expectedEmailCount, timeoutSeconds: number): Promise<boolean> {
		const foundEmails: Emails = await this.waitForEmailsBySubject(subjectToMatch, 1, timeoutSeconds);
		return (foundEmails.emails.length >= expectedEmailCount);
	}

	private getMessages(startIndex: number, count: number) {
		return this.client.listMessages('INBOX', (startIndex - count) + ':' + startIndex, ['uid', 'flags', 'envelope', 'body[]']);
	}

}