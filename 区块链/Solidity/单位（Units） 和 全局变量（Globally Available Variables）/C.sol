pragma solidity ^0.4.4;

contract C {
    
    uint a = 1 ether;
    uint b = 10 ** 18 wei;
    uint c = 1000 finney;
    uint d = 1000000 szabo;
    
    function isTrueAEquleToB() view public returns (bool) {
        return a == b;
    }
    
    function isTrueAEquleToC() view public returns (bool) {
        return a == c;
    }
    
    function isTrueAEquleToD() view public returns (bool) {
        return a == d;
    }

}