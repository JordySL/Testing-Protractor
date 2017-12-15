import { Apibase } from './../apibase/apibase';
import { WsErrorResponse } from './../common/wserror-response.model';
import { User } from './../misc/models/user.model';
import { Session } from './../webservices-mobile/models/session-response.model';
import { PresentationsSearchResponse } from './models/presentations-search-response';
import { CurriculumsSearchResponse } from './models/curriculums-search-response';
import { LearningSearchResponse } from './models/learning-search-response';
import { LearningSearchCriteria } from './models/learning-search-criteria';

export class SearchApi extends Apibase {
	private static getPresentationsSearchUrl(apiVersion: string): string {
		//https://wwwqa.brainshark.com/brainshark/brainshark.services.search/api/v1/search/presentations
		return super.getBaseUrl() + 'brainshark/brainshark.services.search/api/' + apiVersion + '/search/presentations';
	}

	private static getCurriculumsSearchUrl(apiVersion: string): string {
		//https://wwwqa.brainshark.com/brainshark/brainshark.services.search/api/v1/search/curriculums
		return super.getBaseUrl() + 'brainshark/brainshark.services.search/api/' + apiVersion + '/search/curriculums';
	}

	private static getCoursesSearchUrl(apiVersion: string): string {
		//https://wwwqa.brainshark.com/brainshark/brainshark.services.search/api/v2/search/courses
		return super.getBaseUrl() + 'brainshark/brainshark.services.search/api/' + apiVersion + '/search/courses';
	}

	private static getLearningCatalogSearchUrl(apiVersion: string): string {
		//https://wwwqa.brainshark.com/brainshark/brainshark.services.learning/api/v1/training/student/catalog
		return super.getBaseUrl() + 'brainshark/brainshark.services.learning/api/' + apiVersion + '/training/student/catalog';
	}

	public static async searchPresentations(session: Session, apiVersion: string, queryParams: Object): Promise<PresentationsSearchResponse> {
		const url = this.getPresentationsSearchUrl(apiVersion);
		queryParams = !queryParams ? {} : queryParams;
		return await Apibase.httpPost(session, url, PresentationsSearchResponse, queryParams, null, null, true);
	}

	public static async searchCurriculums(session: Session, apiVersion: string, queryParams: Object): Promise<CurriculumsSearchResponse> {
		const url = this.getCurriculumsSearchUrl(apiVersion);
		queryParams = !queryParams ? {} : queryParams;
		return await Apibase.httpPost(session, url, CurriculumsSearchResponse, queryParams, null, null);
	}

	public static async searchCourses(session: Session, apiVersion: string, queryParams: LearningSearchCriteria): Promise<LearningSearchResponse> {
		const url = this.getCoursesSearchUrl(apiVersion);
		queryParams = !queryParams ? new LearningSearchCriteria() : queryParams;
		return await Apibase.httpPost(session, url, LearningSearchResponse, queryParams, null, null);
	}

	public static async searchLearningCatalog(session: Session, apiVersion: string, queryParams: LearningSearchCriteria): Promise<LearningSearchResponse> {
		const url = this.getLearningCatalogSearchUrl(apiVersion);
		queryParams = !queryParams ? new LearningSearchCriteria() : queryParams;
		return await Apibase.httpPost(session, url, LearningSearchResponse, queryParams, null, null, true);
	}
}
