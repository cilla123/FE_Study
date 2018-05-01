const BulePlane = require('./BulePlane')
const MissileDecorator = require('./Decorator/MissileDecorator')
const AtomDecorator = require('./Decorator/AtomDecorator')

let plane = new BulePlane()
plane = new MissileDecorator(plane)
plane = new AtomDecorator(plane)
plane.fire()  // 分别输出： 发射普通子弹、发射导弹、发射原子弹