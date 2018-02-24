export class ClienteResponse {
	public items : Client[];
	constructor() { }
}

export class Client {
	public id: number;
	public firstName: string;
	public lastName: string;
	public direccion: string;
	public birthDate: string;

	constructor() { }
}