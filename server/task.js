const Web3 = require('web3');
const cron = require('node-cron');
const NODE_URL = process.env.NODE_URL;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const CONTRACT_ABI = require('./abi.json');

// Create a new Web3 instance to connect to Ethereum network
const web3 = new Web3(NODE_URL);

// Create a new contract instance using the ABI and address
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

// Function to get past events from the contract and process them
async function getEvents() {
    const latestBlock = await web3.eth.getBlockNumber(); // Get the latest block number
    const historicalBlock = latestBlock - 10000; // Calculate the block number to start looking for events

    console.log(`Latest block: ${latestBlock} - Historical block: ${historicalBlock}`);

    // Get all 'setValue' events from the historical block to the latest block
    const events = await contract.getPastEvents('setValue', { fromBlock: historicalBlock, toBlock: 'latest' });
}

const startJob = () => {
    try {
        cron
            .schedule("*/5 * * * * *", getEvents)
            .start();
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    startJob,
};
