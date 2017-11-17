import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

class Globals {
	constructor() {
		this.expect = chai.expect;
		chai.use(chaiAsPromised);
	}
}

export default Globals;
