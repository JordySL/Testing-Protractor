(() => {
  var colors = require('colors/safe');
  var dotenv = require('dotenv');

  class EnviromentConfiguration {
    constructor() {

    }

    static configure(envName) {
      const envPath = envName ? `./.env.${envName}` : null;
      console.log(colors.yellow('using: '),envPath);
      dotenv.config({
        path: envPath
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
