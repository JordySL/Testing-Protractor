(() => {
  var colors = require('colors/safe');
  var dotenv = require('dotenv');

  class EnviromentConfiguration {
    constructor() {

    }

    static configureFromCommandArguments(){
      const conf = require('./environment-configuration.js').enviromentConfiguration;
      const argv = require('yargs').argv
      const environment = process.env.npm_config_server || argv.server
      this.configure(environment);
    }

    static configure(envName) {
      const envPath = envName ? `./.env.${envName}` : null;
      console.log(colors.yellow('using: '),envPath);
      dotenv.config({
        path: envPath
	  });
	  dotenv.config({
        path: './.env.common'
      });
      this.printBskConfiguration();
    }

   static printBskConfiguration() {
      console.log(colors.yellow.underline('Loaded environment configuration:'));
      for (var propertyName in process.env) {
        var isBSK = propertyName.includes("BSK");
        if (isBSK) console.log(propertyName, process.env[propertyName])
      }
    }
  }

  exports.enviromentConfiguration = EnviromentConfiguration;
})()
