const Target = require('./Target')

/**
 * 适配器
 */
class Adapter extends Target {
    constructor(adaptee) {
        super()
        this.adaptee = adaptee
    }
    small() {
        this.adaptee.big()
    }
}

module.exports = Adapter