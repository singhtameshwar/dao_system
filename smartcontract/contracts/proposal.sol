// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "./require.sol";
import "./minting.sol";

contract Proposal {
    Nfttoken public token;
    Voting private votingcontract;
    uint232 private proposalid;
    uint256 private Voteid;
    prop[] public SetProposals;

    enum votechoice {
        Yes,
        No
    }

    struct prop {
        uint256 id;
        string title;
        string description;
        uint256 Yesvote;
        uint256 Novote;
        uint256 votingtimeperiod;
        bool Iscomplete;
    }

    mapping(address => prop) public proposals;

    struct voting {
        uint256 voteid;
    }
    
    mapping(address => voting) public VoteId;

    constructor(Nfttoken _token, Voting _votingcontract) {
        token = _token;
        votingcontract = _votingcontract;
    }

    function createproposal(
        string memory _description,
        string memory _title,
        uint256 _timeperiod
    ) public {
        require(
            votingcontract.Canpropose(msg.sender) == true,
            "person cannot create the proposal"
        );

        proposalid += 1;
        
        prop memory newProposal = prop({
            id: proposalid,
            title: _title,
            description: _description,
            Yesvote: 0,
            Novote: 0,
            votingtimeperiod: block.timestamp + _timeperiod,
            Iscomplete: false
        });

        proposals[msg.sender] = newProposal;
        SetProposals.push(newProposal);
    }

    function Votingproposal(
        uint232 _proposalId,
        votechoice _votechoice
    ) external {
        require(
            votingcontract.IsVoter(msg.sender) == true,
            "person is not a voter"
        );
        require(
            votingcontract.CanVote(msg.sender) == true,
            "person is not eligible for voting"
        );
        require(
            _votechoice == votechoice.Yes || _votechoice == votechoice.No,
            "Only yes(0) or no(1) accepted"
        );

        for (uint i = 0; i < SetProposals.length; i++) {
            if (SetProposals[i].id == _proposalId) {
                if (_votechoice == votechoice.Yes) {
                    SetProposals[i].Yesvote += 1;
                } else {
                    SetProposals[i].Novote += 1;
                }
                break;
            }
        }
    }

    function totalpostedproposal() external view returns (prop[] memory) {
        return SetProposals;
    }
}
