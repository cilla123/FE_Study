const PlayerBuilder = require('../PlayerBuilder')

class FullPlayerBuilder extends PlayerBuilder {
	
	buildType(){
		this._player.type = "完整模式"
	}

	buildMenu(){
		this._player.menu = "菜单"
	}
	
	buildPlayerList(){
		this._player.playerList = ["哈哈", "呵呵"]
	}
	
	buildMainWindows(){
		this._player.menu = "主界面"
	}
	
	buildControlStrip(){
		this._player.controlStrip = "控制条"
	}

	buildCollectionList(){
		this._player.collectionList = ["哈哈", "呵呵"]
	}		
}

module.exports = FullPlayerBuilder