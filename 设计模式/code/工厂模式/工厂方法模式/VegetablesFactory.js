const FoodsFactory = require('./FoodsFactory')
const Vegetables = require('./Vegetables')

class VegetablesFactory extends FoodsFactory {
	create(){
		return new Vegetables()
	}
}

module.exports = VegetablesFactory