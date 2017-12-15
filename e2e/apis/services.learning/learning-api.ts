import { Apibase } from './../apibase/apibase';
import { WsErrorResponse } from './../common/wserror-response.model';
import { Session } from './../webservices-mobile/models/session-response.model';

export class LearningApi extends Apibase {
	private static getCourseEnrollmentsUrl(apiVersion: string): string {
    //https://wwwqa.brainshark.com/brainshark/brainshark.services.learning/api/v1/training/student/courseEnrollments
		return super.getBaseUrl() + 'brainshark/brainshark.services.learning/api/' + apiVersion + '/training/student/courseEnrollments';
	}

  private static getCurriculumEnrollmentsUrl(apiVersion: string): string {
    //https://wwwqa.brainshark.com/brainshark/brainshark.services.learning/api/v1/training/student/curriculumEnrollments
		return super.getBaseUrl() + 'brainshark/brainshark.services.learning/api/' + apiVersion + '/training/student/curriculumEnrollments';
	}

	public static async getCourseEnrollments(session: Session, apiVersion: string, queryParams: Object): Promise<any> {
		const url = this.getCourseEnrollmentsUrl(apiVersion);
		return await Apibase.httpGet(session, url, null, queryParams, true, true);
	}

  public static async getCurriculumEnrollments(session: Session, apiVersion: string, queryParams: Object): Promise<any> {
		const url = this.getCurriculumEnrollmentsUrl(apiVersion);
		return await Apibase.httpGet(session, url, null, queryParams, true, true);
	}
}
