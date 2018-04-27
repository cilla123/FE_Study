const ConcretePrototype1 = require('./ConcretePrototype1')
const ConcretePrototype2 = require('./ConcretePrototype2')

const p1 = new ConcretePrototype1()
p1.setFeature('feature', "feature p1")
const c1 = p1.clone()

console.log(c1.feature) // feature p1
console.log(typeof c1)  // object
console.log(c1 === p1)  // false
