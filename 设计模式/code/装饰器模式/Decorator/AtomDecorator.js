const PlaneDecorator = require('./PlaneDecorator')

/**
 * 原子弹装饰器
 */
class AtomDecorator extends PlaneDecorator {
  
  constructor(plane) {
    super()
    this.plane = plane;
  }
  
  fire() {
    this.plane.fire();
    console.log('发射原子弹');
  }
}

module.exports = AtomDecorator