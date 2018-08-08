pragma solidity ^0.4.4;
import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract BloggerCoin is StandardToken {

    string public name = "珏豪币";
    string public symbol = "BLC";
    uint8 public decimals = 4;
    uint256 public INITIAL_SUPPLY = 666666;

    constructor () {
        totalSupply = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
    }

    

}
