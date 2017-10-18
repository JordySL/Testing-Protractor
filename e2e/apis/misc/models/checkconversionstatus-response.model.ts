export class CheckConvertStatusResponse {

	public status: number;
	public percentComplete: number;
	public jobId: number;
	public stateId: number;
	public importMask: number;
	public stateType: number;
	public desc: string;
	public aspectRation: number;

	public isComplete(): boolean {
		return (this.percentComplete === 100) && (this.desc && this.desc === 'Complete');
	}

}