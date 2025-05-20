// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./vendor/@openzeppelin/security/ReentrancyGuard.sol";
import "./vendor/@openzeppelin/access/Ownable.sol";

contract FreelanceEscrow is ReentrancyGuard, Ownable {
    enum State { AWAITING_FUND, AWAITING_DELIVERY, COMPLETE, REFUNDED }
    
    struct Job {
        address client;
        address freelancer;
        uint256 amount;
        State state;
        uint256 createdAt;
    }
    
    mapping(uint256 => Job) public jobs;
    
    event JobCreated(uint256 indexed jobId, address client, address freelancer, uint256 amount);
    event WorkSubmitted(uint256 indexed jobId, address freelancer);
    event PaymentReleased(uint256 indexed jobId, address freelancer, uint256 amount);
    event JobRefunded(uint256 indexed jobId, address client, uint256 amount);
    
    // No constructor needed since Ownable sets deployer as owner by default

    function createJob(uint256 jobId, address freelancer) external payable {
        require(msg.value > 0, "Must fund escrow");
        require(freelancer != address(0), "Invalid freelancer address");
        require(jobs[jobId].client == address(0), "Job ID already exists");
        
        jobs[jobId] = Job({
            client: msg.sender,
            freelancer: freelancer,
            amount: msg.value,
            state: State.AWAITING_DELIVERY,
            createdAt: block.timestamp
        });
        
        emit JobCreated(jobId, msg.sender, freelancer, msg.value);
    }
    
    function submitWork(uint256 jobId) external {
        Job storage job = jobs[jobId];
        require(msg.sender == job.freelancer, "Only freelancer can submit");
        require(job.state == State.AWAITING_DELIVERY, "Invalid state");
        
        emit WorkSubmitted(jobId, msg.sender);
    }
    
    function releasePayment(uint256 jobId) external nonReentrant {
        Job storage job = jobs[jobId];
        require(msg.sender == job.client, "Only client can release");
        require(job.state == State.AWAITING_DELIVERY, "Invalid state");
        
        job.state = State.COMPLETE;
        emit PaymentReleased(jobId, job.freelancer, job.amount);
        
        (bool success, ) = job.freelancer.call{value: job.amount}("");
        require(success, "Transfer failed");
    }
    
    function refundClient(uint256 jobId) external onlyOwner nonReentrant {
        Job storage job = jobs[jobId];
        require(job.state == State.AWAITING_DELIVERY, "Invalid state");
        
        job.state = State.REFUNDED;
        emit JobRefunded(jobId, job.client, job.amount);
        
        (bool success, ) = job.client.call{value: job.amount}("");
        require(success, "Transfer failed");
    }
    
    function getJob(uint256 jobId) external view returns (Job memory) {
        return jobs[jobId];
    }
}
