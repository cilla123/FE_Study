/**
 * 播放器
 */
class MusicPlayer {

	constructor(){
		this._type = ''
		this._menu = ''
		this._playerList = []
		this._mainWindows = ''
		this._controlStrip = ''
		this._collectionList = []
	}
	
	get type(){
		return this._type
	}
	
	set type(type){
		this._tpye = type
	}
    
    get menu(){
        return this._menu
    }

    set menu(menu){
        this._menu = menu
    }

    get playerList(){
        return this._playerList
    }

    set playerList(playerList){
        this._playerList = playerList
    }

    get mainWindows(){
        return this._mainWindows
    }

    set mainWindows(mainWindows){
        this._mainWindows = mainWindows
    }

    get controlStrip(){
        return this._controlStrip
    }

    set controlStrip(controlStrip){
        this._controlStrip = controlStrip
    }

    get collectionList(){
        return this._collectionList
    }

    set collectionList(collectionList){
        this._collectionList = collectionList
    }

	// 省略其他get和set方法，其他语言也差不多，套路写法
}

module.exports = MusicPlayer
