// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title OnchainMonitor
/// @notice A lightweight on-chain activity tracker with governance access control and anomaly checks.
/// @dev No external dependencies to keep deployment lean. Owner manages watchers and thresholds.
contract OnchainMonitor {
    // Simple ownership (like Ownable but minimal)
    address public owner;

    uint256 public inactivityThreshold; // number of blocks considered as inactivity

    // Watchers authorized to record activity (e.g., governance contracts, bots)
    mapping(address => bool) public isWatcher;

    // Per-address last activity tracking (block number when last seen)
    mapping(address => uint256) public lastActivityBlock;

    // Events
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event WatcherUpdated(address indexed watcher, bool enabled);
    event InactivityThresholdSet(uint256 threshold);
    event ActivityRecorded(address indexed actor, uint256 blockNumber, string reason);

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "OnchainMonitor: caller is not the owner");
        _;
    }

    constructor(uint256 _initialThreshold) {
        owner = msg.sender;
        inactivityThreshold = _initialThreshold;
        emit OwnershipTransferred(address(0), msg.sender);
        emit InactivityThresholdSet(_initialThreshold);
    }

    // Ownership-like transfer
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "OnchainMonitor: new owner is zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    // Governance/configuration helpers
    function setInactivityThreshold(uint256 newThreshold) external onlyOwner {
        inactivityThreshold = newThreshold;
        emit InactivityThresholdSet(newThreshold);
    }

    function setWatcher(address watcher, bool enabled) external onlyOwner {
        isWatcher[watcher] = enabled;
        emit WatcherUpdated(watcher, enabled);
    }

    // Core action: record activity for an actor with a reason
    function recordActivity(address actor, string calldata reason) external {
        require(isWatcher[msg.sender] || msg.sender == owner, "OnchainMonitor: not authorized");
        lastActivityBlock[actor] = block.number;
        emit ActivityRecorded(actor, block.number, reason);
    }

    // Query helper: whether an actor is considered anomalous based on inactivity
    function isAnomalous(address actor) external view returns (bool) {
        uint256 last = lastActivityBlock[actor];
        if (last == 0) return false;
        return (block.number > last) && ((block.number - last) > inactivityThreshold);
    }
}
