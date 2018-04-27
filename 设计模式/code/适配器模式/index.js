const Adaptee = require('./Adaptee')
const Adapter = require('./Adapter')

let adaptee = new Adaptee()
let adapter = new Adapter(adaptee)
adapter.small()