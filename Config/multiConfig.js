exports.config = {

    directConnect: true,

    baseUrl: 'http://www.google.com',

    multiCapabilities: [{
        'browserName': 'chrome'
  }, {
        'browserName': 'firefox'
  }],

    maxSessions: 1,

    onPrepare: function () {
        browser.ignoreSynchronization = true;
        browser.manage().window().maximize();
    },

    framework: 'custom'
    , frameworkPath: require.resolve('protractor-cucumber-framework'),

    specs: [
    '../Features/*.feature'
  ],

    cucumberOpts: {

        monochrome: true
        , strict: true
        , plugin: ["pretty"]
        , require: ['../StepDefinitions/*.js', '../Support/*.js']
        , tags: '@Regression,@ProtractorScenario,@AllureScenario,~@DatabaseTest'

    }
};