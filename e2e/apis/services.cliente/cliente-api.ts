import { Apibase } from './../apibase/apibase';
import { WsErrorResponse } from './../common/wserror-response.model';
import { ClienteResponse } from './models/cliente-response';

export class ClienteApi extends Apibase {
	private static getclientesUrl(): string {
		return super.getBaseUrl() + 'api/cliente/GetClientePaginado';
	}
	public static async getClientes(queryParams: Object): Promise<ClienteResponse> {
		const url = this.getclientesUrl();
		return await Apibase.httpPost(url, ClienteResponse, queryParams, null, null);
	}
}
