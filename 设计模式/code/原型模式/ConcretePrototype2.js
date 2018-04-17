const Prototype = require('./Prototype')

class ConcretePrototype2 extends Prototype {
    constructor() {
        super();
        console.log("ConcretePrototype2 已经创建");
        this.feature = "feature 2"
    }

    // 实现深拷贝
    clone() {
        console.log('ConcretePrototype2.clone 被执行');
        let clone = new ConcretePrototype2();
        let keys = Object.keys(this);

        keys.forEach(k => clone.setFeature(k, this[k]));
        console.log("ConcretePrototype2已经被拷贝");
        return clone;
    }
}

module.exports = ConcretePrototype2