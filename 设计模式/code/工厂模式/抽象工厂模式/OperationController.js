/**
 * AbstractProduct 类
 * 操作控制器接口    
 */
class OperationController {
    controlOperation(){
        throw new Error("此方法必须复写")
    }
}

module.exports = OperationController