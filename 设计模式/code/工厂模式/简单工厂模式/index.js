const FoodsFactory = require('./FoodsFactory')
const Shop = require('./Shop')

const foods = new FoodsFactory()
const shop = new Shop(foods)
shop.giveFood('meat')

shop.giveFood('vegetables')
