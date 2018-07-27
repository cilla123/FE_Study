/**
 * pragma：版本声明
 * solidity：开发语言
 * 0.4.4：当前合约的版本，0.4代表主版本，.4代表修复bug的升级版
 * ^: 代表向上兼容
 */
pragma solidity ^0.4.4;

// contract Person 类比 class Person extends Contract
contract Person {

    uint _height; // 身高
    uint _age;  // 年龄
    address _owner; // 合约的拥有者

    // 构造方法
    constructor() public {
        _height = 186;
        _age = 23;
        _owner = msg.sender;
    }

    function owner() public view returns(address) {
        return _owner;
    }

    function setHeight(uint height) public{
        _height = height;
    }

    // view代表只读
    function height() public view returns(uint) {
        return _height;
    }

    function setAge(uint age) public {
        _age = age;
    }

    function age() public view returns(uint) {
        return _age;
    }

    function kill() public{
        if(_owner == msg.sender){
            // 析构函数
            selfdestruct(msg.sender);
        }
    }

}