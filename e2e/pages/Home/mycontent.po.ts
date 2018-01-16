import { NavBar } from './navbar';
import { browser, by, element, ElementFinder, WebElement, ExpectedConditions } from 'protractor';

export class MyContentPage {
  public MasterNavBar: NavBar;

  constructor() {
    this.MasterNavBar = new NavBar();
  }
  
  async getPresentationCards(): Promise<WebElement[]> {
		await browser.wait(ExpectedConditions.presenceOf(element(by.id('pres-results-body'))), 10000, 'Timeout waiting for presentation results');
    const presentationResults = await browser.findElement(by.id('pres-results-body'));
		return await presentationResults.findElements(by.className('pres-results'));
  }
  
	async isPresentationPresent(searchString: string) {
    const presentations: WebElement[] = await this.getPresentationCards();
    let isFound: boolean;
    isFound = false;

    for( let presentation of presentations ) {
      await browser.wait(ExpectedConditions.presenceOf(element(by.className('font-title-pres'))), 10000, 'Timeout waiting for presentation titles');
      let presLink: WebElement = await presentation.findElement(by.className('font-title-pres'));
      let presName: string;
      presName = await presLink.getText();
      isFound = presName === searchString;
      if ( isFound)
        break;
    }
		return isFound;
	}  

}
