import { Envelope } from './email.envelope.model';
import { Email } from './emails.email.model';
import { ParsedMail, simpleParser } from 'mailparser';
import { TestUtils } from '../test-utils';
import { Emails } from './emails.model';
import * as ImapClient from 'emailjs-imap-client';

export enum SubjectMatchType {
	Exact,
	Regex
}

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

			this.client = new ImapClient(config[0], config[1], config[2]);
			this.client.logLevel = this.client.LOG_LEVEL_NONE;
		}
	}

	public async waitForEmailsBySubject(subjectToMatch: string, expectedEmailCount: number, timeoutSeconds: number, subjectMatchType: SubjectMatchType): Promise<Emails> {

		let internalRetryTmeOutId;
		let externalTimeOutId;

		const promiseForThis = new Promise<Emails>(async (resolve, reject) => {
			TestUtils.log('attempting to connect to outlook server');
			await this.client.connect();
			TestUtils.log('Connected to outlook');
			let inbox = await this.client.selectMailbox('INBOX');
			TestUtils.log('Connected to outlook inbox');
			let emailIndex = inbox.exists;
			let emailOffset = 0;
			let messages: any[] = [];
			const foundEmails = new Emails();

			const retryTimeInMilliSeconds = 5000;

			internalRetryTmeOutId = await setInterval(async () => {

				inbox = await this.client.selectMailbox('INBOX');
				TestUtils.log('Refreshing Inbox');
				const newEmailIndex = inbox.exists;

				if (newEmailIndex > emailIndex) {

					emailOffset = (newEmailIndex - emailIndex) - 1;
					emailIndex = newEmailIndex;

					messages = await this.getMessages(emailIndex, emailOffset);

					for (const message of messages) {
						const subject = message['envelope']['subject'];
						if (((subjectMatchType === SubjectMatchType.Exact) && (subject.trim() === subjectToMatch)) ||
							((subjectMatchType === SubjectMatchType.Regex) && new RegExp(subjectToMatch).test)) {
							TestUtils.log('Recieved new message with matching subject: [' + subjectToMatch + ']');
							// the message is gross looking like some sort of invalid json object.
							const email: Email = new Email(
								message['#'],
								message['uid'],
								message['flags'],
								new Envelope(message['envelope']['date'],
									message['envelope']['subject'],
									message['envelope']['from'],
									message['envelope']['to']
								),
								message['body[]'],
								await this.parseBody(message['body[]']));
							foundEmails.emails.push(email); // push the whole message
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

	public async parseBody(rawBody: string): Promise<ParsedMail> {
		return await simpleParser(rawBody);
	}

	public async waitForEmailBySubject(subjectToMatch: string, timeoutSeconds: number, subjectMatchType: SubjectMatchType): Promise<Emails> {
		return await this.waitForEmailsBySubject(subjectToMatch, 1, timeoutSeconds, subjectMatchType);
	}

	public async expectEmailsBySubject(subjectToMatch: string, expectedEmailCount, timeoutSeconds: number, subjectMatchType: SubjectMatchType): Promise<boolean> {
		const foundEmails: Emails = await this.waitForEmailsBySubject(subjectToMatch, 1, timeoutSeconds, subjectMatchType);
		return (foundEmails.emails.length >= expectedEmailCount);
	}

	private getMessages(startIndex: number, count: number) {
		return this.client.listMessages('INBOX', (startIndex - count) + ':' + startIndex, ['uid', 'flags', 'envelope', 'body[]']);
	}

}