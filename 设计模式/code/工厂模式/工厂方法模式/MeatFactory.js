const FoodsFactory = require('./FoodsFactory')
const Meat = require('./Meat')

class MeatFactory extends FoodsFactory {
	create(){
		return new Meat()
	}
}

module.exports = MeatFactory