import { GitHubBusqueda } from './../../../pages/producto/github-busqueda.po';

describe('Git Hub Busqueda', async () => {

    it('Primer Test', async () => {
        let page: GitHubBusqueda = await new GitHubBusqueda();
        await page.navigateToSearch();
    });
});
