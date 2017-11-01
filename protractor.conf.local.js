// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
const { JUnitXmlReporter } = require('jasmine-reporters');

const BaseConfiguration = require('./protractor.conf.js');

var localConfiguration = {
	params: {
		baseUrl: 'https://nsullivan-t460.hq.brainshark.com/'
	},
	directConnect: true,
	baseUrl: 'https://nsullivan-t460.hq.brainshark.com/',
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

		return global.browser.getProcessedConfig().then(function(config) {
            //it is ok to be empty
        });
	}
};

var finalConfiguration = Object.assign({},  BaseConfiguration.config ,localConfiguration);
exports.config = finalConfiguration;
