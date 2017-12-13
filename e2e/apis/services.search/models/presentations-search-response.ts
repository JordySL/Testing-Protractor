export class PresentationsSearchResponse {
  public Count: number;
  public Coverage: string;
  public Facets: string;
  public Results: Array<any>;
	public ContinuationToken: any;

	constructor() {}
}
