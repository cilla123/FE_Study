const Component = require('./Component')

class Folder extends Component {
    
    constructor(name) {
        super()        
        this.name = name;
        this.files = [];
    }

    add(file) {
        this.files.push(file);
    }

    remove(Component) {
        for (var i in this.files) {
            if (this.files[i] === Component) {
                this.files.splice(i, 1);
            }
        }
    }

    scan() {
        console.log(`开始扫描文件夹: ${this.name}`);
        for (let i = 0, file, files = this.files; file = files[i++];) {
            file.scan();
        }
    }
}

module.exports = Folder