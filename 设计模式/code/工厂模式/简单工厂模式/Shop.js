class Shop {
	constructor(foodsFactory){
		this.foodsFactory = foodsFactory
	}
	
	giveFood(type){
		const food = this.foodsFactory.create(type)
		food.describe()
	}
}

module.exports = Shop