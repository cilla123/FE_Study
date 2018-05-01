const PlaneDecorator = require('./PlaneDecorator')

/**
 * 导弹装饰器
 */
class MissileDecorator extends PlaneDecorator {

  constructor(plane) {
    super()
    this.plane = plane;
  }
  
  fire() {
    this.plane.fire();
    console.log('发射导弹');
  }
}

module.exports = MissileDecorator