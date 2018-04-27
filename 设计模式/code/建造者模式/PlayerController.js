/**
 * 播放器控制
 */
class PlayerController {
    construct( pb ) {
        pb.buildType()
        pb.buildMenu()
        pb.buildPlayerList()
        pb.buildMainWindows()
        pb.buildControlStrip()
        pb.buildCollectionList()
        return pb.createPlayer()
    }
}

module.exports = PlayerController