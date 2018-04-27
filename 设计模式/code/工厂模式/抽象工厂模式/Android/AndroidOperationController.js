const OperationController = require('../OperationController')

class AndroidOperationController extends OperationController {
    controlOperation() {
        console.log("使用Android系统操作控制")
    }
}

module.exports = AndroidOperationController