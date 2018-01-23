import { Session } from './../../../apis/webservices-mobile/models/session-response.model';
import { SessionApi } from './../../../apis/session-api';
import { LoginPage } from '../../../pages/login.po';

import { browser } from 'protractor';

beforeEach(async () => {
}, 200000);

describe('Coaching Dashboard Tests', async () => {
        it('Pablo Test', async () => {
                expect(process.env.BRAINSHARK_COACHING_SETTINGS).toBeTruthy();
                const coachingConfig = JSON.parse(process.env.BRAINSHARK_COACHING_SETTINGS);

                const companyInfo = coachingConfig.companies.find(c => c.name === 'CoachingAngular');
                expect(companyInfo).toBeTruthy();

                const challengeCreatorUser = companyInfo.users.find(u => u.roles.indexOf('ChallengeCreator') > -1);
                expect(challengeCreatorUser).toBeTruthy();

                const challengeCreatorSession: Session = await
                        SessionApi.getSession(challengeCreatorUser.username, challengeCreatorUser.password, companyInfo.sharkive);

                let page: LoginPage = await new LoginPage();

                await browser.waitForAngularEnabled(false);

                page = await page.navigateToCompanyId(companyInfo.id);
                const homePageAsChallengeCreator = await page.login(challengeCreatorUser.username, challengeCreatorUser.password);

                const coachingDashboard = await homePageAsChallengeCreator.MasterNavBar.navigateToCoaching();
                if (await coachingDashboard.isTutorialModalWindowShown()) {
                        await coachingDashboard.closeTutorialModalWindow();
                }

                await page.logout();
        });

});

afterEach(async () => { });
