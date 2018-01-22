// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
const { JUnitXmlReporter } = require('jasmine-reporters');

const BaseConfiguration = require('./protractor.conf.js');

var sauceLabsConfiguration = {
	sauceUser: 'BNSK-Build',
	sauceKey: 'ec280468-c8e9-4d17-8499-0020c8f96c54',
	directConnect: false,
	seleniumAddress: null
};

var finalConfiguration = Object.assign({}, BaseConfiguration.config, sauceLabsConfiguration);

exports.config = finalConfiguration;

