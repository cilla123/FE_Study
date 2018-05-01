const Plane = require('./Plane.js')

/**
 * 蓝色的飞机
 */
class BulePlane extends Plane {

  fire() {
    console.log('发射普通子弹');
  }
}

module.exports = BulePlane