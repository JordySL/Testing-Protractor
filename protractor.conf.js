// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
const { JUnitXmlReporter } = require('jasmine-reporters');

exports.config = {
	allScriptsTimeout: 60000,
	specs: [
		'./e2e/**/*.e2e-spec.ts'
	],
	capabilities: {
		'browserName': 'chrome' //chrome, firefox, MicrosoftEdge
	},
	params: {
		baseUrl: 'https://wwwqa.brainshark.com/'
	},
	directConnect: false, // When set to true, will run the local browser cirectly. Currently only works for chrome.
						  // FOR DEBUGGING OTHER BROWSER LOCALLY: set this to false, verify the config field 'seleniumAddress', and run the command in the comment first
	SELENIUM_PROMISE_MANAGER: false,
	getPageTimeout: 60000,//change it based on your app response time
	baseUrl: 'https://wwwqa.brainshark.com/',
	seleniumAddress: 'http://127.0.0.1:4444/wd/hub', // run 'npm run webdriver-start' to start the server
	framework: 'jasmine',
	jasmineNodeOpts: {
		showColors: true,
		defaultTimeoutInterval: 30000,
		print: function () { }
	},
	onPrepare() {
		require('ts-node').register({
			project: 'e2e/tsconfig.e2e.json'
		});
		jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));

		jasmine.getEnv().addReporter(
			new JUnitXmlReporter('test-results/JUnitXML/', true, true)
		);
		browser.manage().timeouts().implicitlyWait(5000);
	}
};
