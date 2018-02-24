import { Apibase} from './../apibase/apibase';
import { ProductoResponse } from './models/producto-response';
export class ProductoApi extends Apibase{
    private static getProductoUrl():string{
        return super.getBaseUrl()+ 'api/producto/getproductos1';
    }
    public static async getProductos(queryParams: Object): Promise<ProductoResponse>{
        const url = this.getProductoUrl();
        return await super.httpPost(url, ProductoResponse, queryParams,null,null);
    }

}