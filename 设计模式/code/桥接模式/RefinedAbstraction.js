const Abstraction = require('./Abstraction')

class RefinedAbstraction extends Abstraction {
    constructor() {
        super()
        console.log('RefinedAbstraction Class 被创建');
    }
    //  保持对 Implementor 类的引用
    setImp(imp) {  
        console.log('RefinedAbstraction.setImp 使用');
        this.imp = imp
    }
}

module.exports = RefinedAbstraction