const InterfaceController = require('../InterfaceController')

class IOSInterfaceController extends InterfaceController {
    controlInterface() {
         console.log("使用IOS系统游戏界面控制");
    }
}

module.exports = IOSInterfaceController