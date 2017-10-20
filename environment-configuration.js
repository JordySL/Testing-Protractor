(() => {
  var colors = require('colors/safe');
  var dotenv = require('dotenv');


  let configureEnvironment = () => {
    dotenv.config();

    console.log(colors.yellow.underline('Loaded environment configuration:'));

    for (var propertyName in process.env) {
      var isBSK = propertyName.includes("BSK");
      if (isBSK) console.log(propertyName, process.env[propertyName])
    }
  }

  exports.configureEnvironment = configureEnvironment;
})()
