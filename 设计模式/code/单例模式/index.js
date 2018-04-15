const Me = require('./Me');

const me = Me.getInstance();
const me2 = Me.getInstance();

if (me === me2) {
    console.log("只有一个我");
} else {
    console.log("不一样的我");
}