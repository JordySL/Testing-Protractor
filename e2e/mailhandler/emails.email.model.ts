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
	
		public downloadAttachment(index: number): Promise<{}> {
			let attachment: Attachment = this.parsedBody.attachments[index];
			let buffer = new Buffer(attachment.content);
			let promise = new Promise((resolve) => {
				fs.writeFile('outputfiles/'+attachment.filename, buffer, resolve);
			});
			return promise;
		}
	}