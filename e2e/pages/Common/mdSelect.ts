import { TestUtils } from './../../test-utilities/test-utils';
import { browser, by, element, WebElement, ElementFinder, ExpectedConditions } from 'protractor';

export class MdSelect {

	constructor(public mdSelect: WebElement) {
		
	}
	
	public async selectByText(textToSelect: string) {
		await this.mdSelect.click();
		await browser.wait(ExpectedConditions.presenceOf(element(by.className('mat-select-panel-done-animating'))));
		const content: WebElement = await browser.findElement(by.className("mat-select-content"));
		let options: WebElement[] = await content.findElements(by.className("mat-option"));

		let option =options[-1];
		for (var i = 0, len = options.length; i < len; i++) {
			const element: WebElement = options[i];
			if((await element.getText()) === textToSelect) {
				option = element;
				break;
			}
		};
		await option.click();
	}

}