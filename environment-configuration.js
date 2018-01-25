(() => {
  var colors = require('colors/safe');
  var dotenv = require('dotenv');
  var fs = require('fs');

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
      this.addConfiguration(envName);
      this.printBskConfiguration();
    }

    static addConfiguration(envName) {
      process.env.BRAINSHARK_SETTINGS = fs.readFileSync(`./configuration.${envName}.json`, 'utf8');
      console.log(colors.yellow.underline('Configuration loaded'));
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
