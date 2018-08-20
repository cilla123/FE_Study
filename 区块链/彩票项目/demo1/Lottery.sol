pragma solidity ^0.4.17;

contract Lottery {
    
    address public manager;
    address[] public players;
    
    function Lottery() public {
        manager = msg.sender;
    }
    
    // 获取彩池里面的人
    function getAllPlayers() public view returns(address[]) {
        return players;
    }
    
    // 进入彩池
    function enter() public payable {
        // 断言，判断投注金额是否大于1
        require(msg.value > 1 ether);
        players.push(msg.sender);
    }
    
    // 查询彩池金额
    function queryPoolMoney() public view returns (uint) {
        return this.balance;
    }
    
    // 生成随机数
    function random() private view onlyManagerCanCall returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }
    
    // 获取中奖用户
    function pickWinner() public onlyManagerCanCall {
        uint index = random() % players.length;
        // 中奖用户获取彩池里面的金额，transfer方法是solidity的一个方法，用于交易
        players[index].transfer(this.balance);
        players = new address[](0);
    }
    
    // 只能管理者执行
    modifier onlyManagerCanCall() {
        require(msg.sender == manager);
        _;
    }
    
    
}
