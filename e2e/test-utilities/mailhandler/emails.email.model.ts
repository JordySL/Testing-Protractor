import { TestUtils } from '../test-utils';
import { ParsedMail, Attachment } from 'mailparser';
import { Envelope } from './email.envelope.model';
import * as fs from 'fs';

export class Email {
	
		constructor(
			public number: any,
			public uid: any,
			public flags: any,
			public envelope: Envelope,
			public rawbody: any,
			public parsedBody: ParsedMail
		) {}
	
		public downloadAttachment(index: number, appendTimestamp: boolean): Promise<{}> {
			let attachment: Attachment = this.parsedBody.attachments[index];
			let buffer = new Buffer(attachment.content);
			let fileName = attachment.filename;
			if(appendTimestamp) {
				fileName = '[' + TestUtils.timestamp() + ']' + fileName;
			}
			let promise = new Promise((resolve) => {
				fs.writeFile('outputfiles/'+fileName, buffer, resolve);
			});
			return promise;
		}
	}