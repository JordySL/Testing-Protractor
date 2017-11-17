// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
const { JUnitXmlReporter } = require('jasmine-reporters');

const BaseConfiguration = require('./protractor.conf.js');

var browserStackConfiguration = {
	browserstackUser: 'brianshark',
	browserstackKey: 'sDW8y52boodzSU0CNiCr',
	directConnect: false,
	seleniumAddress: null
};

var finalConfiguration = Object.assign({}, BaseConfiguration.config ,browserStackConfiguration);

exports.config = finalConfiguration;

