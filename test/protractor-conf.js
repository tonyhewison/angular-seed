exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'e2e/*.js'
  ],

  // There is selenium bug with selenium when using a standalone server.
  // I thought it was necessary to use a specific version (2.9) of the
  // chromedriver installed with Chrome browser version 35.0.1916.153 but,
  // setting chromeOnly: true seems to workaround the problem by itself.
  //
  // Do not start a Selenium Standalone sever - only run this using chrome.
  chromeOnly: true,
  //
  //
  // The following line does not seem necessary.
  // chromeDriver: 'path/to/my/chromedriver',
  // e.g.
//  chromeDriver: '/Users/tonyhewison/chromedriver/2.9/chromedriver',

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:8000/app/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
