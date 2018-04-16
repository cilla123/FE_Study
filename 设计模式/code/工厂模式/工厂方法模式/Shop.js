class Shop {
    constructor( foodsFactory ) {
        this.foodsFactory = foodsFactory ;
    }
    giveFood(){
        const food = this.foodsFactory.create();
        food.describe();
    }
}

module.exports = Shop