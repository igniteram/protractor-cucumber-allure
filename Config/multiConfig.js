var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

exports.config = {

    directConnect: true,

    baseUrl: 'http://www.google.com',

    multiCapabilities: [{
        'browserName': 'chrome',
        shardTestFiles: true,
        maxInstances: 2
    }, {
            'browserName': 'firefox',
            shardTestFiles: true,
            maxInstances: 2
        }],

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    suites: {
        allureFeature: ['../Features/allure.feature'],
        cucumberFeature: ['../Features/cucumber.feature'],
        protractorFeature: ['../Features/protractor.feature']
    },

    onPrepare: function () {
        browser.ignoreSynchronization = true;
        browser.manage().window().maximize();
        global.expect = chai.expect;
    },
    setDefaultTimeout: 60 * 1000,

    cucumberOpts: {

        monochrome: true
        , strict: true
        , plugin: ["pretty"]
        , require: ['../StepDefinitions/*.js', '../Support/*.js']
        , tags: '@CucumberScenario,@ProtractorScenario,@AllureScenario,~@DatabaseTest'

    }
};