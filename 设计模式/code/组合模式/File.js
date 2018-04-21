const Component = require('./Component')

class File extends Component {
    
    constructor(name) {
        super()
        this.name = name;
    }

    add(file) {
        throw new Error('文件下面不能再添加文件');
    }

    remove() {
        throw new Error('文件下不能进行删除操作');
    }

    scan() {
        console.log(`开始扫描文件: ${this.name}`);
    }
}

module.exports = File