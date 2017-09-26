import { Session } from './apis/session.model';
import { Apibase } from './../src/app/apibase/apibase.component';
import { LogginPage } from './pages/loggin.po';
import { browser, by, element, WebElement, ElementFinder, ExpectedConditions } from 'protractor';


describe('protractor-test App', () => {
	let page: LogginPage;

  beforeEach(() => {
	jasmine.DEFAULT_TIMEOUT_INTERVAL = 80000;
	setTimeout(() => console.log('inside time out'), 500);
	page = new LogginPage();
	const sessionUrl = 'https://nsullivan-t460.hq.brainshark.com/brainshark/webservices_mobile/session.ashx?';
	var queryParams = {
		username: 'admin',
		password: 'admin',
		login_dir: 'nolan'
	}
	let response: Session = Apibase.httpPost(sessionUrl, Session, null, queryParams, false);
	console.log('Will this ever have data? Lets see: ' + JSON.stringify(response));
  });

  it('should fail', () => {
	  
    const homePage = page.login('admin', 'admin');
	const num: number = 5;
    expect(num).toEqual(3);
  });

});
