export class CourseCatalogResponse {
	public TotalRows: number;
	public Filters: Filters[];
	public Items: Items[];

	constructor() { }
}

export class Filters {
	public FilterID: number;
	public FilterType: number;
	public Name: string;
	public Details: Details[];

	constructor() { }
}

export class Details {
	public Count: number;
	public Description: string;
	public FullPath: string;
	public Id: number;
	SubFilters: Details[]

	constructor() { }
}

export class Items {
	public Duration: number;
	public EstimatedDuration: number;
	public NumberOfSlides: number;
	public ThumbnailUrl?: string;
	public IsDeleted: boolean;
	public PresentationId: number;
	public UserCanEnrollInCourse: boolean;
	public AllowSetComplete: boolean;
	public AllowSetCompleteWhenOpeningUrlLink: boolean;
	public AttemptsRemaining?: string;
	public ContentType: string;
	public ViewingUrl: string;
	public IssuesCertificate: boolean;
	public PassingScore: number;
	public RequiredAudioPercentage: number;
	public RequiredSlidePercentage: number;
	public IsChallengeBasedCourse: boolean;
	public RequiredChallengeScorePercent: number;
	public Passed?: boolean;
	public ContentTypeSystemDefined: boolean;
	public Url: string;
	public StudentId: number;
	public CompanyId: number;
	public IsCourse: boolean;
	public IsCurriculum: boolean;
	public Id: number;
	public Author: Author;
	public Credits: number;
	public Title: boolean;
	public IsNew: boolean;
	public ThumbnailVersion?: number;
	public EnrollmentStatus: number;
	public EnrollmentId: number;
	public ExpirationDate: number;
	public Topic: string;
	public EnrolledDate: number;
	public EnrollmentDueDate: number;

	constructor() { }
}

export class Author {
	public Id: number;
	public FullName: string;
	constructor() { }
}