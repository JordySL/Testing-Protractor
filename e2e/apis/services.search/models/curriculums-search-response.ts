export class CurriculumsSearchResponse {
  public Count: number;
  public Coverage: string;
  public Facets: string;
  public Results: Array<Object>;
	public ContinuationToken: Object;

	constructor() {}
}
