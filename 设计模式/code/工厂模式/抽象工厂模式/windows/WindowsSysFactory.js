const SysFactory = require('../SysFactory')
const WindowsInterfaceController = require('./WindowsInterfaceController')
const WindowsOperationController = require('./WindowsOperationController')

class WindowsSysFactory extends SysFactory {
    createInterface() {
        return new WindowsInterfaceController();
    }
    createOperation() {
        return new WindowsOperationController();
    }
}

module.exports = WindowsSysFactory