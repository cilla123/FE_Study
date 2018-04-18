const MusicePlayer = require('./MusicPlayer')

/**
 * 播放器建造者
 */
class PlayerBuilder {

	constructor(){
		this._player = new MusicePlayer()
	}
	
	buildType(){
		throw new Error('此方法必须重写')
	}

	buildMenu(){
		throw new Error('此方法必须重写')
	}
	
	buildPlayerList(){
		throw new Error('此方法必须重写')
	}
	
	buildMainWindows(){
		throw new Error('此方法必须重写')
	}
	
	buildControlStrip(){
		throw new Error('此方法必须重写')
	}

	buildCollectionList(){
		throw new Error('此方法必须重写')
	}
	
	createPlayer(){
		return this._player
	}
}

module.exports = PlayerBuilder
