class Implementor {
    constructor() {
        console.log('Implementor Class 被创建');
    }

    operationImp() {
        throw new Error("此方法必须重写");
    }
}

module.exports = Implementor