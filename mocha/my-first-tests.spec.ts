import { expect } from 'chai';
import 'mocha';

import { Session } from '../e2e/apis/webservices-mobile/models/session-response.model';
import { SessionApi } from '../e2e/apis/session-api';
import { ChallengeResponse } from '../e2e/apis/services.coaching/models/challenge-response';
import { User } from '../e2e/apis/services.coaching/models/challenge-payload.model';
import { ChallengeApi } from '../e2e/apis/services.coaching/challenge-api';
import { TestUtils } from '../e2e/test-utilities/test-utils';
import { WsErrorResponse } from '../e2e/apis/common/wserror-response.model';

describe('Create and Delete challenge Api test', async () => {
  let session: Session;
  const title = 'New Challenge Title' + TestUtils.timestamp();
  let challengeId: number;

  beforeEach((async () => {
    session = await SessionApi.getSession('admin', 'admin', 'nolan');
  }));

  it('should return hello world', async () => {
    const user1: User = { userId: session.UId };
    const challenge: ChallengeResponse = await ChallengeApi.createChallengeGeneric(session, title, [user1], [user1]);

    expect(challenge.id).to.not.be.null;
    expect(challenge.id).to.be.greaterThan(0);
    challengeId = challenge.id;
  });


  afterEach((async () => {
    const response: WsErrorResponse = await ChallengeApi.deleteChallenge(session, challengeId);
  }));

});




