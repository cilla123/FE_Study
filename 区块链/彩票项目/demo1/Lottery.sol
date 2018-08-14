pragma solidity ^0.4.17;

contract Lottery {
    
    address public manager;
    address[] public players;
    
    function Lottery() public {
        manager = msg.sender;
    }
    
    function getAllPlayers() public view returns(address[]) {
        return players;
    }
    
    function enter() public payable {
        require(msg.value > 1 ether);
        players.push(msg.sender);
    }
    
    function queryPoolMoney() public view returns (uint) {
        return this.balance;
    }
    
    function random() private view onlyManagerCanCall returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }
    
    function pickWinner() public onlyManagerCanCall {
        uint index = random() % players.length;
        players[index].transfer(this.balance);
        players = new address[](0);
    }
    
    modifier onlyManagerCanCall() {
        require(msg.sender == manager);
        _;
    }
    
    
}
