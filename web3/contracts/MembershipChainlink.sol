// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Membership {
    IERC20 public bitbuzzToken;

    enum MembershipLevel { Bronze, Silver, Gold, Platinum }

    mapping(address => MembershipLevel) public memberships;

    event MembershipSet(address indexed user, MembershipLevel level);
    event MembershipUpgraded(address indexed user, MembershipLevel newLevel);

    constructor(IERC20 _bitbuzzToken) {
        bitbuzzToken = _bitbuzzToken;
    }

    function setMembership(address user, MembershipLevel level) external {
        memberships[user] = level;
        emit MembershipSet(user, level);
    }

    function getMembership(address user) external view returns (MembershipLevel) {
        return memberships[user];
    }

    function upgradeMembership() external {
        require(bitbuzzToken.balanceOf(msg.sender) >= 1000 * 10 ** 18, "Insufficient tokens for upgrade");
        memberships[msg.sender] = MembershipLevel.Platinum;
        emit MembershipUpgraded(msg.sender, MembershipLevel.Platinum);
    }
}
