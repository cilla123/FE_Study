const Prototype = require('./Prototype')

class ConcretePrototype1 extends Prototype {
    constructor() {
        super();
        console.log("ConcretePrototype1已经创建");
        this.feature = "feature 1"
    }

    // 实现深拷贝
    clone() {
        console.log('ConcretePrototype1.clone 被执行');
        let clone = new ConcretePrototype1();
        let keys = Object.keys(this);

        keys.forEach(k => clone.setFeature(k, this[k]));

        console.log("ConcretePrototype1已经被拷贝");
        return clone;
    }
}

module.exports = ConcretePrototype1