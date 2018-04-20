/**
 * 抽象毛笔（抽象部分）
 */
class Abstraction {
    constructor() {
        console.log('抽象类被创建');
    }

    operation() {   
        console.log('Abstraction.operation使用');
        this.imp.operationImp();
    }
}

module.exports = Abstraction