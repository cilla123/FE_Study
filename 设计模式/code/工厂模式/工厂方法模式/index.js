const MeatFactory = require('./MeatFactory')
const VegetablesFactory = require('./VegetablesFactory')
const Shop = require('./Shop')

const meatFactory = new MeatFactory()
const shop1 = new Shop(meatFactory)
shop1.giveFood()

const vegetablesFactory = new VegetablesFactory()
const shop2 = new Shop(vegetablesFactory)
shop2.giveFood()
