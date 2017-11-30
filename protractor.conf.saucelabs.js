// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
const { JUnitXmlReporter } = require('jasmine-reporters');

const BaseConfiguration = require('./protractor.conf.js');

var sauceLabsConfiguration = {
	sauceUser: 'jhollows',
	sauceKey: '24bc0fb0-74e2-4b01-8fd3-a2defcf5971f',
	directConnect: false,
	seleniumAddress: null
};

var finalConfiguration = Object.assign({}, BaseConfiguration.config, sauceLabsConfiguration);

exports.config = finalConfiguration;

