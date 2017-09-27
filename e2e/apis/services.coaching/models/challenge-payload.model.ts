
export class ChallengePayload {
	public allowManagersToReview: boolean;
	public courseId?: string;
	public daysUntilSendReviewerReminder: number;
	public displayMachineScoreToParticipants: boolean;
	public displayScoresInLeaderboard: boolean;
	public enableAutomaticReviewerReminders: boolean;
	public includeInLeaderboard: boolean;
	public instructions: InstructionItem[];
	public invitedUsers: User[];
	public machineScoringEnabledForChallenge: boolean;
	public name: string;
	public peersMaySubmitFeedback: boolean;
	public reviewers: any[];
	public scoreCriteriaEnabled: boolean;

	constructor() { }

	public static createGenericChallengeInput(title: string, invitedUsers: User[], reviewers: any[]): ChallengePayload {
		
		const instructionItem: InstructionItem = {
			order: 0,
			text: "New Insctructions Text"
		}

		let challengePayload: ChallengePayload = new ChallengePayload();
		challengePayload.allowManagersToReview = false;
		challengePayload.courseId = '';
		challengePayload.daysUntilSendReviewerReminder = 5;
		challengePayload.displayMachineScoreToParticipants = false;
		challengePayload.displayScoresInLeaderboard = true;
		challengePayload.enableAutomaticReviewerReminders = true;
		challengePayload.includeInLeaderboard = true;
		challengePayload.instructions = [instructionItem];
		challengePayload.invitedUsers = invitedUsers;
		challengePayload.machineScoringEnabledForChallenge = false;
		challengePayload.name = title;
		challengePayload.peersMaySubmitFeedback = true;
		challengePayload.reviewers = reviewers;
		challengePayload.scoreCriteriaEnabled = true;

		return challengePayload;
	}


}

export class User {

	public userId;

	constructor() { }

}

export class InstructionItem {

	public challengeId?: number;
	public order: number; 
	// Need text or presentation Id. Never both.
	public presentationId?: number; 
	public text?: string;

	constructor() {}
}