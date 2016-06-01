var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

var World = function World() {
  chai.use(chaiAsPromised);
  this.expect = chai.expect;
  
}

module.exports = World;