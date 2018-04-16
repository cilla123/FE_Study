const SysFactory = require('../SysFactory')
const AndroidInterfaceController = require('./AndroidInterfaceController')
const AndroidOperationController = require('./AndroidOperationController')

class AndroidSysFactory extends SysFactory {
    createInterface() {
        return new AndroidInterfaceController();
    }
    createOperation() {
        return new AndroidOperationController();
    }
}

module.exports = AndroidSysFactory