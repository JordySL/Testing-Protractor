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
		'src/test.ts' // entry point
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
    browsers: ['phantomjs'], // You may use 'ChromeCanary', 'Chromium' or any other supported browser
    singleRun: true
  });
};
