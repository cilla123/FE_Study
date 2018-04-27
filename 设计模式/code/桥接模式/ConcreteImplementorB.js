const Implementor = require('./Implementor')

class ConcreteImplementorB extends Implementor {
    constructor() {
        super()
        console.log('ConcreteImplementorB Class 被创建');
    }

    operationImp() {   
        console.log('ConcreteImplementorB.operationImp 使用');
    }
}

module.exports = ConcreteImplementorB
