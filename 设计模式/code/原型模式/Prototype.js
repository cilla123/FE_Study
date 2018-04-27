class Prototype {
    constructor(prototype) {
        console.log("原型类被创建");
    }
    
    setFeature(key, val) {
        this[key] = val
    }

    clone() {
        throw new Error("此方法必须重写");
    }
}

module.exports = Prototype