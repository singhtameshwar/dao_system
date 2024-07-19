// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0

pragma solidity ^0.8.19;
import "./minting.sol";

contract Voting {
    Nfttoken public token;
    uint256 public  votes;

    constructor(address _tokenAddress) {
        token = Nfttoken(_tokenAddress);
    }
   
    function IsVoter(address account) public view returns (bool) {
        if (token.balanceOf(account) > 0) return true;
        else return false;
    }

    function Canpropose(address account) public view returns(bool){
   if (token.balanceOf(account) > 0) return true;
        else return false;
    }

    function CanVote(address account)public view returns(bool){
         if (token.balanceOf(account) > 0) return true;
        else return false;
    }

}
