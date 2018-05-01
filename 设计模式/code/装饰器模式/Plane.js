/**
 * 飞机类
 */
class Plane {

  constructor(){

  }

  fire(){
    throw new Error('此方法必须重写')
  }

}

module.exports = Plane