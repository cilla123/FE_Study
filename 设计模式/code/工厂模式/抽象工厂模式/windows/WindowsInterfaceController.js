const InterfaceController = require('../InterfaceController')

class WindowsInterfaceController extends InterfaceController {
    controlInterface() {
        console.log("使用Windows Mobile系统游戏界面控制");
    }
}

module.exports = WindowsInterfaceController