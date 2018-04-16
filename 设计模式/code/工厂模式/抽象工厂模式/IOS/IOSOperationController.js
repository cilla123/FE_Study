const OperationController = require('../OperationController')

class IOSOperationController extends OperationController {
    controlOperation() {
        console.log("使用IOS系统操作控制")
    }
}

module.exports = IOSOperationController