import { SessionApi } from './apis/session-api';
import { Session } from './apis/webservices-mobile/models/session-response.model';
import { Apibase } from './../src/app/apibase/apibase.component';
import { LogginPage } from './pages/loggin.po';
import { browser, by, element, WebElement, ElementFinder, ExpectedConditions } from 'protractor';


describe('protractor-test App', () => {
	let page: LogginPage;

  beforeEach(async () => {
	jasmine.DEFAULT_TIMEOUT_INTERVAL = 80000;
	setTimeout(() => console.log('inside time out'), 500);

	const session: Session = await SessionApi.getSession('admin', 'admin', 'nolan');
	
	// let s: Session = await Apibase.httpPost(sessionUrl, Session, null, queryParams, false);
	 console.log('Will this ever have data? Lets see: ' + JSON.stringify(session));

  });

  it('should fail', () => {
	  console.log('I hope this is the last message in the console');
    const homePage = page.login('admin', 'admin');
	const num: number = 5;
    expect(num).toEqual(3);
  });

});
