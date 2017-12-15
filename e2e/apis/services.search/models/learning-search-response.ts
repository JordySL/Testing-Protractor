export class LearningSearchResponse {
  public Count: number;
  public ContinuationToken: Object;
  public LearningItems: Array<LearningItem>;
  //public Filters: Array<FilterItem>; //not implemented

  constructor() {}
}

export class LearningItem {
  public PresentationId: string;
  public CourseId: string;
  public CurriculumId: string;
  public Title: string;
  public Author: string;
  public Description: string;
  public IsCourse: boolean;
  public Thumbnail: string;
  public NumberOfSlides: number;
  public CourseType: string;
  public NumberOrRequiredCourses: number;

  constructor() {}
}
