var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

exports.config = {

    directConnect: true,

    baseUrl: 'http://www.google.com',

    capabilities: {
        'browserName': (process.env.TEST_BROWSER_NAME || 'firefox'),
        'version': (process.env.TEST_BROWSER_VERSION || 'ANY')  
    },

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    specs: [
        '../Features/*.feature'
    ],

    exclude: '../Features/database.feature',
    resultJsonOutputFile: './Reports/report.json',
    setDefaultTimeout: 60 * 1000,

    onPrepare: function () {

        browser.ignoreSynchronization = true;
        browser.manage().window().maximize();
        global.expect = chai.expect;

    },
    cucumberOpts: {

        monochrome: true,
        strict: true,
        plugin: ["pretty"],
        require: ['../StepDefinitions/*.js', '../Support/*.js'],
        tags: '@AllureScenario,@CucumberScenario,@ProtractorScenario,~@DatabaseTest' // @DatabaseTest scenario can be included when the username & password of DB have been configured in Support/database.js

    }
};