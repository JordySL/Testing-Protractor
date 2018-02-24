import { expect } from 'chai';
import { ClienteApi } from './../../../apis/services.cliente/cliente-api';
import { ClienteResponse } from './../../../apis/services.cliente/models/cliente-response';

describe('Cliente catalog spec', async () => {
	

	beforeEach(async () => {
		
	});

	it('Should return cliente results', async () => {
		const apiVersion = 'v1.0';
		const params=
			{
				"offset":1,
				"perpage":20
			};
		
		const clienteResponse: ClienteResponse = await ClienteApi.getClientes(params);
		
		expect(clienteResponse.items.length).greaterThan(0);
		expect(clienteResponse.items[0].firstName).equal("qwe");
	});

	
});

