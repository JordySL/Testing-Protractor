import { CoachingDashboardPage } from './../Coaching/dashboard.po';
import { browser, by, element, ElementFinder, ExpectedConditions } from 'protractor';

export class NavBar {
  private navbarElement: ElementFinder = element(by.id('nav-link-section'));
  private coaching: ElementFinder = this.navbarElement.element(by.id('nav-coaching'));

  navigateToCoaching() {
    this.coaching.click();
    return new CoachingDashboardPage();
  }
}
