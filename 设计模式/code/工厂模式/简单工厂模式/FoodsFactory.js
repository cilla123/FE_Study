const Meat = require('./Meat')
const Vegetables = require('./Vegetables')

class FoodsFactory {

	constructor(){
		this.food = new Object()
	}

	create(type) {
		if(type == 'meat') {
			this.food = new Meat()
		}else if(type == 'vegetables'){
			this.food = new Vegetables()
		}
		return this.food
	}
}

module.exports = FoodsFactory