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
		'browserName': 'chrome',    
		shardTestFiles: true,
		maxInstances: 2
	},
	params: {
		baseUrl: 'https://wwwqa.brainshark.com/'
	},
	SELENIUM_PROMISE_MANAGER: false,
	getPageTimeout: 60000,//change it based on your app response time
	directConnect: true,
	baseUrl: 'https://wwwqa.brainshark.com/',
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
