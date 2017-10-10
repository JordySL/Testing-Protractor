export class TestUtils {

	public static log(message: string): void {
		let logMessage = '[' + new Date(new Date().getTime()).toLocaleTimeString() + '] ' + message;
		console.log(logMessage);
		console.log();
	}

	public static timestamp(): number {
		return Math.floor(Date.now() / 1000);
	}

	public static sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	  }

}