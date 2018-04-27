class Me {
    
    constructor() {
        this.id = "12355677777";
        this.name = "Ben";
    }

    static getInstance() {
        if (!Me.instance) {
            // 使用static来确保Me类的唯一
            Me.instance = new Me();
        }
        return Me.instance;
    }
}

module.exports = {
    getInstance() {
        return Me.getInstance();
    }
};