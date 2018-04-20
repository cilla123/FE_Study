const Implementor = require('./Implementor')

class ConcreteImplementorA extends Implementor {
    constructor() {
        super()
        console.log('ConcreteImplementorA Class 被创建');
    }

    operationImp() {  
        console.log('ConcreteImplementorA.operationImp 使用');
    }
}

module.exports = ConcreteImplementorA