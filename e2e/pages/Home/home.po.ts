import { NavBar } from './navbar';
import { browser, by, element } from 'protractor';

export class HomePage {
  public MasterNavBar: NavBar;

  constructor() {
    this.MasterNavBar = new NavBar();
  }
}
