import { LogginPage } from './pages/loggin.po';
import { browser, by, element, WebElement, ElementFinder, ExpectedConditions } from 'protractor';


describe('protractor-test App', () => {

  beforeEach(() => {
	jasmine.DEFAULT_TIMEOUT_INTERVAL = 80000;
    setTimeout(() => console.log('inside time out'), 500);
  });

  it('should fail', () => {
	const num: number = 5;
    expect(num).toEqual(3);
  });



});
