(() => {
  var colors = require('colors/safe');
  var dotenv = require('dotenv');

  dotenv.config({
    path: './mocha/.env'
  });

  console.log(colors.yellow.underline('Loaded environment configuration:'));

  for (var propertyName in process.env) {
    var isBSK = propertyName.includes("BSK");
    if (isBSK) console.log(propertyName, process.env[propertyName])
  }
})()
