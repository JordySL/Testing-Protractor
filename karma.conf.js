// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: './',
    frameworks: ['jasmine', 'karma-typescript'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-phantomjs-launcher'),
      require('karma-typescript'),
    ],
    baseUrl: 'https://wwwqa.brainshark.com/',
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    files: [{
      pattern: 'e2e/**/*api.spec.ts',
      included: true
    }],
    angularCli: {
      environment: 'dev'
    },
    karmaTypescriptConfig: {
      compilerOptions: {
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        jsx: "react",
        module: "commonjs",
        sourceMap: true,
        target: "ES6"
      },
      exclude: ["node_modules"]
    },
    preprocessors: {
      "e2e/**/*.ts": ["karma-typescript"], // *.tsx for React Jsx
    },
    browserNoActivityTimeout: 60000,
    reporters: ['progress', 'kjhtml', 'karma-typescript'],
    //trxReporter: { outputFile: 'test-results.trx', shortTestName: false },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: true
  });
};
