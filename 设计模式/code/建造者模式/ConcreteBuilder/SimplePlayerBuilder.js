const PlayerBuilder = require('../PlayerBuilder')

class SimplePlayerBuilder extends PlayerBuilder{

    buildType() {
        this._player.type = "精简模式"
    }
    
    buildMenu() {
        this._player.menu = null
    }
    
    buildPlayerList() {
        this._player.playerList = []
    }
    
    buildMainWindows() {
        this._player.mainWindows = "主界面"
    }
    
    buildControlStrip() {
        this._player.controlStrip = "控制条"
    }
    
    buildCollectionList() {
        this._player.collectionList = []
    }
}

module.exports = SimplePlayerBuilder
