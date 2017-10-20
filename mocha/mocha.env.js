(() => {
  const conf = require('./../environment-configuration.js').enviromentConfiguration;;
  conf.configure(process.env.npm_config_server);
})()

