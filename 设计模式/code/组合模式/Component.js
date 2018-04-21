class Component {

  constructor() {
    console.log('Component Class 被创建');
  }

  add() {
    throw new Error("此方法必须复写");
  }

  remove(Component) {
    throw new Error("此方法必须复写");
  }
  
  scan() {
    throw new Error("此方法必须复写");
  }
}

module.exports = Component