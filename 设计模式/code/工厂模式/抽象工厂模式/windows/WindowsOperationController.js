const OperationController = require('../OperationController')

class WindowsOperationController extends OperationController {
    controlOperation() {
        console.log("使用Windows Mobile系统操作控制")
    }
}

module.exports = WindowsOperationController