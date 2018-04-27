const SimplePlayerBuilder = require('./ConcreteBuilder/SimplePlayerBuilder')
const FullPlayerBuilder = require('./ConcreteBuilder/FullPlayerBuilder')
const PlayerController = require('./PlayerController')

const builder1 = new SimplePlayerBuilder()
const controller1 = new PlayerController()
const player1 = controller1.construct(builder1)
console.log( player1 )

const builder2 = new FullPlayerBuilder()
const controller2 = new PlayerController()
const player2 = controller2.construct(builder2)
console.log( player2 )