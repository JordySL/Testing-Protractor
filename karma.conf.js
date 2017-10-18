// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: './',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
	    require('@angular/cli/plugins/karma'),
	    require('karma-phantomjs-launcher')
	],
	baseUrl: 'https://wwwqa.brainshark.com/',
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
	},
	files: [
		{pattern: 'e2e/**/*api.spec.ts', included: false},
		{pattern: 'src/**/*api.spec.ts', included: false},
		'src/test.ts'
	  ],
    angularCli: {
      environment: 'dev'
	},
	browserNoActivityTimeout: 60000,
    reporters: ['progress', 'kjhtml'],
    //trxReporter: { outputFile: 'test-results.trx', shortTestName: false },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'Chrome_without_security'], // You may use 'ChromeCanary', 'Chromium' or any other supported browser
	
		// you can define custom flags
		customLaunchers: {
		  Chrome_without_security: {
			base: 'Chrome',
			flags: ['--disable-web-security']
		  }
		},
    singleRun: true
  });
};
