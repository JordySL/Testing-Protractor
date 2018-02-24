import { ProductoApi } from './../../../apis/services.producto/producto-api';
import { ProductoResponse } from './../../../apis/services.producto/models/producto-response';
import { expect } from 'chai';
describe('Producto Catalog Spec', async () => {
    it('Should return Producto Results', async () => {
        const params = {
            "offset": 1,
            "perpage": 20
        };
        const productoResponse: ProductoResponse = await ProductoApi.getProductos(params);
        console.log(productoResponse)
        //expect(productoResponse.items.length).to.be.greaterThan(0);
        expect(productoResponse.items.length).to.be.equal(-1);
    });
});