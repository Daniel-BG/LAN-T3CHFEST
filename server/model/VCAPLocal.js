var cfenv = require("cfenv");

class VCAPLocal {
  constructor() {
    let vcapLocal;
    try {
      vcapLocal = require('../../vcap-local.json');
      console.log("Loaded local VCAP", vcapLocal);
    } catch (e) { }

    const appEnvOpts = vcapLocal ? { vcap: vcapLocal} : {}

    const appEnv = cfenv.getAppEnv(appEnvOpts);

    if (appEnv.services['cloudantNoSQLDB'] || appEnv.getService(/cloudant/)) {
      // Load the Cloudant library.
      const Cloudant = require('cloudant');

      // Initialize database with credentials
      if (appEnv.services['cloudantNoSQLDB']) {
        // CF service named 'cloudantNoSQLDB'
        this.cloudant = Cloudant(appEnv.services['cloudantNoSQLDB'][0].credentials);
      } else {
        // user-provided service with 'cloudant' in its name
        this.cloudant = Cloudant(appEnv.getService(/cloudant/).credentials);
      }
    }
  }

  getCloudant() {
    return this.cloudant;
  }
}

module.exports = new VCAPLocal();