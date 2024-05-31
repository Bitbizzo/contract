// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract StakingContract {
    IERC20 public bitbuzzToken;
    AggregatorV3Interface internal priceFeed;
    uint256 public rewardRate = 100; // Example reward rate

    struct Stake {
        uint256 amount;
        uint256 timestamp;
    }

    mapping(address => Stake) public stakes;

    event Staked(address indexed user, uint256 amount, uint256 timestamp);
    event Withdrawn(address indexed user, uint256 amount, uint256 reward);

    constructor(IERC20 _bitbuzzToken, address _priceFeed) {
        bitbuzzToken = _bitbuzzToken;
        priceFeed = AggregatorV3Interface(_priceFeed);
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Cannot stake 0 tokens");
        bitbuzzToken.transferFrom(msg.sender, address(this), amount);
        stakes[msg.sender] = Stake(amount, block.timestamp);
        emit Staked(msg.sender, amount, block.timestamp);
    }

    function withdraw() external {
        Stake memory stakeData = stakes[msg.sender];
        require(stakeData.amount > 0, "No staked tokens found");
        uint256 reward = calculateReward(stakeData.amount, stakeData.timestamp);
        bitbuzzToken.transfer(msg.sender, stakeData.amount + reward);
        emit Withdrawn(msg.sender, stakeData.amount, reward);
        delete stakes[msg.sender];
    }

    function calculateReward(uint256 amount, uint256 timestamp) internal view returns (uint256) {
        uint256 duration = block.timestamp - timestamp;
        uint256 price = getLatestPrice();
        return amount * rewardRate * duration / price;
    }

    function getLatestPrice() public view returns (uint256) {
        (,int256 price,,,) = priceFeed.latestRoundData();
        return uint256(price);
    }
}
