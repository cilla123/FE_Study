const InterfaceController = require('../InterfaceController')

class AndroidInterfaceController extends InterfaceController {
    controlInterface() {
        console.log("使用Android系统游戏界面控制");
    }
}

module.exports = AndroidInterfaceController