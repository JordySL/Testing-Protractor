import * as fs from 'fs';
import * as path from 'path';

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
	//'./test-resources/files/';
	private static getFiles(): string[] {
		const filesPath = path.resolve('./e2e/test-resources/files/');
		console.log(filesPath);
		const files = fs.readdirSync(filesPath);
		return files;
	}

	/*
	* Temporary utility method for getting file full paths 
	*/
	public static getFilePath(fileName: string) {
		let fileNames = this.getFiles();
		let absolutePath = '';
		for(let file of fileNames) {
			if(file === fileName) {
				const filePath = './e2e/test-resources/files/' + fileName;
				absolutePath = path.resolve(filePath);
			}
		}
		return absolutePath;
	}

}