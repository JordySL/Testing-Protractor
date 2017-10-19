export class Envelope {
	constructor(
		public date: any,
		public subject: string,
		public from: any[],
		public to: any[]
	) {}
}