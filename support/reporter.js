var reporter = require("cucumberjs-allure-reporter");
var fs = require("fs");
var mkdirp = require("mkdirp");
var xmlReports = process.cwd() + "/reports/xml";

var createXmlDir = (function() {
  if (!fs.existsSync(xmlReports)) {
    mkdirp.sync(xmlReports);
  }
})();

reporter.config({
  targetDir: xmlReports
});
module.exports = reporter;
