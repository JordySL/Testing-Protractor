import { InstructionItem } from './challenge-payload.model';

export class ChallengeResponse {

	public id: number;
	public userId: number; 
	public userFullName: string;
	public modifiedDate: string;
	public name: string;
	public instructions: InstructionItem[];
	public numberInvited: number;
	public numberOfEntries: number;
	public numberToReview: number;
	public numberReviewed: number;
	public enableMultipleRatingCategories: boolean;
	public folderId: number;
	public includeInLeaderboard: boolean;
	public displayScoresInLeaderboard: boolean;
	public peersMaySubmitFeedback: boolean;
	public averageScore: number;
	public reviewerCount: number;
	public isUserChallengeReviewer: boolean;
	public courseId?: number;
	public receiveSubmissionEmail: boolean;
	public createdDate: string;
	public enableAutomaticReviewerReminders: boolean;
	public daysUntilSendReviewerReminder: number;
	public allowManagersToReview: boolean;
	public manualReviewersEnabled: boolean;
	public scoreCriteriaEnabled: boolean;
	public machineScoringEnabledForChallenge: boolean;
	public displayMachineScoreToParticipants: boolean;

	constructor() {}
}