var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

var World = function World() {
    "use strict";
  chai.use(chaiAsPromised);
  this.expect = chai.expect;
  this.setDefaultTimeout(60 * 1000);
  
}

module.exports = World;