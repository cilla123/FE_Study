const RefinedAbstraction = require('./RefinedAbstraction')
const ConcreteImplementorA = require('./ConcreteImplementorA')
const ConcreteImplementorB = require('./ConcreteImplementorB')

const abstraction = new RefinedAbstraction();
// 设置颜料A
abstraction.setImp(new ConcreteImplementorA());
abstraction.operation();

// 设置颜料B
abstraction.setImp(new ConcreteImplementorB());
abstraction.operation();