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
	public Id: number;
	public IsCourse: boolean;
	public IsCurriculum: boolean;
	public Title: string;
	constructor() { }
}