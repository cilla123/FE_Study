/**
 * AbstractFactory 类
 * 抽象工厂接口
 */
class SysFactory {
    createInterface(){
        throw new Error("此方法必须复写");
    }
    createOperation(){
        throw new Error("此方法必须复写");
    }
}

module.exports = SysFactory