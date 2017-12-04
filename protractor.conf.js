// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
const { JUnitXmlReporter } = require('jasmine-reporters');

const  conf  = require('./environment-configuration.js').enviromentConfiguration;
conf.configure(process.env.npm_config_server);

// var chai = require('chai');
// // var chaiAsPromised = require('chai-as-promised');
// // chai.use(chaiAsPromised);

// var expect = chai.expect;

exports.config = {
	plugins: [{
        package: 'protractor-screenshoter-plugin',
        screenshotPath: './REPORTS/e2e/screenshots',
        screenshotOnExpect: 'failure+success',
        screenshotOnSpec: 'none',
        withLogs: 'true',
        writeReportFreq: 'asap',
        clearFoldersBeforeTest: true
    }],
	allScriptsTimeout: 60000,
	specs: [
		'./e2e/**/*.e2e-spec.ts'
	],
	// multiCapabilities: [
	// 	{'browserName': 'firefox'},
	// 	{'browserName': 'chrome'},
	// 	{'browserName': 'microsoftedge'},
	// 	{'browserName': 'internet explorer'}
	// ],	
	multiCapabilities: [
		{'browserName': 'chrome'}
	],	
	
	params: {
		baseUrl: process.env.BSK_BASE_URL
	},
	directConnect: true, // When set to true, will run the local browser cirectly. Currently only works for chrome.
						  // FOR DEBUGGING OTHER BROWSER LOCALLY: set this to false, verify the config field 'seleniumAddress', and run the command in the comment first
	baseUrl: process.env.BSK_BASE_URL,
	SELENIUM_PROMISE_MANAGER: false,
	getPageTimeout: 60000,//change it based on your app response time
	baseUrl: process.env.BSK_BASE_URL,
	//For Edge
	//seleniumAddress: 'http://localhost:17556/', // run downloaded Edge driver to start the server

	//For Firefox & Chrome
	seleniumAddress: 'http://127.0.0.1:4444/wd/hub', // run 'npm run webdriver-start' for firefox to start the server
	framework: 'jasmine',
	jasmineNodeOpts: {
		showColors: true,
		defaultTimeoutInterval: 30000,
		print: function () { }
	},
	onPrepare: function() {
		require('ts-node').register({
			project: 'e2e/tsconfig.e2e.json'
		});

		jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));

		var junitReporter = new JUnitXmlReporter({
			savePath: './REPORTS/e2e/JUnitXML/',
			consolidateAll: true
		});
		jasmine.getEnv().addReporter(junitReporter);

		browser.manage().timeouts().implicitlyWait(5000);
	}
};
