const IOSSysFactory = require('./IOS/IOSSysFactory')
const AndroidFactory = require('./Android/AndroidSysFactory')
const WindowFactory = require('./windows/WindowsSysFactory')

let iosSysFactory = new IOSSysFactory()
let IOSInterfaceController = iosSysFactory.createInterface()
let IOSOperationController = iosSysFactory.createOperation()
IOSInterfaceController.controlInterface()  // 使用IOS系统游戏界面控制
IOSOperationController.controlOperation()  // 使用IOS系统操作控制

let androidFactory = new AndroidFactory()
let AndroidInterfaceController = androidFactory.createInterface()
let AndroidOperationController = androidFactory.createOperation()
AndroidInterfaceController.controlInterface()  // 使用android系统游戏界面控制
AndroidOperationController.controlOperation()  // 使用android系统操作控制

let windowFactory = new WindowFactory()
let WindowsInterfaceController = windowFactory.createInterface()
let WindowsOperationController = windowFactory.createOperation()
WindowsInterfaceController.controlInterface()  // 使用windows系统游戏界面控制
WindowsOperationController.controlOperation()  // 使用windows系统操作控制

