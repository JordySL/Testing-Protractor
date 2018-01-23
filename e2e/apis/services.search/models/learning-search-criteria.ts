export class LearningSearchCriteria {
  public SearchDomain: string;

  //both curriculums and courses
  public OrderBy: Array<string>;
  public EnrollmentTypeDescription: string;
  public IsSortDesc: boolean;
  public Offset: number;
  public PerPage: number;
  public Query: string;
  public AuthorIds: Array<string>;
  public CustomFilters: Array<string>;
  public ExcludeFilterData: boolean;
  public FolderIds: Array<string>;
  public TagIds: Array<string>;
  public IncludePrior: boolean;
  public IncludeCurrent: boolean;
  public IncludeOnlyIncomplete: boolean;
  public IncludeOnlyEnrolled: boolean;
  public IncludeOnlyViewedLast30Days: boolean;

  //public bool? ExcludePriorEnrollment { get; set; }
  public IncludeOnlyOpenEnrollment: boolean;

  //course specific
  public ExcludeFolders: Array<string>;
  public GroupId: number;

  constructor() {}
}

export class SearchDomain {
  public static Core = 'Core';
  public static Portal = 'Portal';
  public static Published = 'Published';
  public static LearningReports = 'LearningReports';
  public static Reports = 'Reports';
  public static NetworkedReports = 'NetworkedReports';
  public static LearningEnrollments = 'LearningEnrollments';
  public static LearningCatalog = 'LearningCatalog';
  public static PortalTitle = 'PortalTitle';
  public static Slideshark = 'Slideshark';
  public static ManagePresentations = 'ManagePresentations';
}
