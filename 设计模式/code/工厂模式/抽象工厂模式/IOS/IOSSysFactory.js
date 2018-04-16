const SysFactory = require('../SysFactory')
const IOSInterfaceController = require('./IOSInterfaceController')
const IOSOperationController = require('./IOSOperationController')

class IOSSysFactory extends SysFactory {
    createInterface() {
        return new IOSInterfaceController();
    }
    createOperation() {
        return new IOSOperationController();
    }
}

module.exports = IOSSysFactory