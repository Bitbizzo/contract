// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract VideoLiquidityPool {
    IERC20 public bitbuzzToken;

    struct Video {
        address creator;
        uint256 stake;
        uint256 engagement;
    }

    mapping(bytes32 => Video) public videos;
    mapping(address => uint256) public viewerRewards;

    event VideoContributed(bytes32 indexed videoId, address indexed creator, uint256 amount);
    event VideoEngaged(bytes32 indexed videoId, address indexed viewer);
    event RewardsDistributed(bytes32 indexed videoId, uint256 reward);
    event ViewerRewardClaimed(address indexed viewer, uint256 reward);

    constructor(IERC20 _bitbuzzToken) {
        bitbuzzToken = _bitbuzzToken;
    }

    function contributeVideo(bytes32 videoId, uint256 amount) external {
        require(amount > 0, "Cannot stake 0 tokens");
        bitbuzzToken.transferFrom(msg.sender, address(this), amount);
        videos[videoId] = Video(msg.sender, amount, 0);
        emit VideoContributed(videoId, msg.sender, amount);
    }

    function engageVideo(bytes32 videoId) external {
        Video storage video = videos[videoId];
        require(video.stake > 0, "Video not found");
        video.engagement += 1;
        viewerRewards[msg.sender] += 10; // Example reward per engagement
        emit VideoEngaged(videoId, msg.sender);
    }

    function distributeRewards(bytes32 videoId) external {
        Video storage video = videos[videoId];
        require(video.stake > 0, "Video not found");
        uint256 reward = video.stake * video.engagement / 100; // Example reward calculation
        bitbuzzToken.transfer(video.creator, reward);
        video.engagement = 0; // Reset engagement after distribution
        emit RewardsDistributed(videoId, reward);
    }

    function claimViewerReward() external {
        uint256 reward = viewerRewards[msg.sender];
        require(reward > 0, "No rewards to claim");
        bitbuzzToken.transfer(msg.sender, reward);
        viewerRewards[msg.sender] = 0;
        emit ViewerRewardClaimed(msg.sender, reward);
    }
}
