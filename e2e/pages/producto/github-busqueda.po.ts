import { browser, by, element, WebElement, ExpectedConditions } from 'protractor';

export class GitHubBusqueda {
    private searchTextBox: WebElement;
    private result: WebElement[];

    async navigateToSearch() {
        await browser.get(process.env.BSK_BASE_URL + 'producto/searchGitHub');
        await browser.wait(ExpectedConditions.visibilityOf(element(by.css('.form-control'))), 10000, 'Timeout');
        this.searchTextBox = await browser.findElement(by.css('.form-control'));
        return this;
    }
    async performSearch(searchText: string) {
        await this.searchTextBox.sendKeys(searchText);
        await browser.wait(ExpectedConditions.visibilityOf(element(by.css('.container-user'))), 10000, 'Timeout');
        return this;
    }
}