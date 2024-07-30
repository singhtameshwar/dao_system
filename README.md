### DAO smart contract
This Project is deployed on the Rimix..

proposal-Smart contract address: 0xdeC0B13007FcC3fd8C7275cA6c006364b0a77bb9

## Usage
How to clone and run this project

Clone this repository : git clone git@github.com:singhtameshwar/dao_system.git
Installing dependencies : npm install
Compile the smart contracts with Hardhat : npx hardhat compile
Run the tests : npx hardhat test
Deploy contract to network : npx hardhat run --network rinkeby scripts/deploy.ts
## About
The proposal smart contract is used to add some proposals and vote on them, this contract is controlled by the require smart contract which is responsible for all the controlling actions. This smart contract decide weather user can submit proposal or vote for any proposal. The controller smart contract is also protect users with the time lock e.g. if any proposal is accepted only admin can execute that proposal and admin can only execute after 1 week of acceptance so the users can be ready for the implementation of new proposal.

Governance smart contract will be created after the creation of ERC20 token (Voting Token) because the DAO smart contract (governance) need parameters of token address in its constructor.

constructor(VotingToken _token) {}

## Roles
Voter : Must have at least 1 nft token
Proposer : Must have at least 1 nft Tokens
How to add Proposal
In proposal smart contract function createProposal() is used to add proposal.

this function has following arguments:

string memory _title : It is name of the proposal.
string memory _description : It is the description of the proposal.
uint256 _votingtimePeriod : Voting Time in weeks
How to Vote for Proposal
The votingProposal() function is used to complete the process of voting

This function need two arguments:

uint256 _proposalId - Proposal Id
 votechoice _votechoice- where VoteFor is an enum which has two values {YES(0) and NO(1)}
In require  contract there are few more functions