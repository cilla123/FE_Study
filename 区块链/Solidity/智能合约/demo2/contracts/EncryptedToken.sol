pragma solidity ^0.4.4;

contract EncryptedToken {

    uint256 INITIAL_SUPPLY = 666666;
    mapping(address => uint256) balances;

    constructor () public {
        balances[msg.sender] = INITIAL_SUPPLY;
    }

    // 转账到一个指定的地址
    function transfer(address _to, uint256 _amount) public {
        assert(balances[msg.sender] >= _amount);
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
    }

    // 查看指定地址的余额
    function balanceOf(address _owner) public view returns (uint256) {
        return balances[_owner];
    }
}