exports.config = {

    directConnect: true,

    baseUrl: 'http://www.google.com',

    capabilities: {
        'browserName': (process.env.TEST_BROWSER_NAME || 'chrome')
        , 'version': (process.env.TEST_BROWSER_VERSION || 'ANY')
    , },

    onPrepare: function () {

        browser.ignoreSynchronization = true;
        browser.manage().window().maximize();

    },

    framework: 'custom'
    , frameworkPath: require.resolve('protractor-cucumber-framework'),

    specs: [
    '../Features/*.feature'
  ]
    , exclude: '../Features/database.feature'
    , cucumberOpts: {

        monochrome: true
        , strict: true
        , plugin: ["pretty"]
        , require: ['../StepDefinitions/*.js', '../Support/*.js']
        , tags: '@AllureScenario,@Regression,@ProtractorScenario,~@DatabaseTest' // @DatabaseTest scenario can be included when the username & password of DB have been configured in Support/database.js

    }
};