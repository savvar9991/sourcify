import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, "..", "..", "..", "environments/.env") });

const ETHERSCAN_REGEX = (/at txn\s+<a href='\/tx\/(.*?)'/).source; // save as string to be able to return the txRegex in /chains response. If stored as RegExp returns {}
const ETHERSCAN_SUFFIX = "address/${ADDRESS}";
const BLOCKSCOUT_REGEX = "transaction_hash_link\" href=\"${BLOCKSCOUT_PREFIX}/tx/(.*?)\"";
const BLOCKSCOUT_SUFFIX = "address/${ADDRESS}/transactions";
const TELOS_SUFFIX = "v2/evm/get_contract?contract=${ADDRESS}";
const METER_SUFFIX="api/accounts/${ADDRESS}"

type ChainGroup = "eth" | "polygon" | "arb" | "opt";

function buildAlchemyURL(chainName: string, chainGroup: ChainGroup, useOwn=false) {
    if (useOwn) {
        const port = process.env[`NODE_PORT_${chainName.toUpperCase()}`];
        const url = `${process.env.NODE_ADDRESS}:${port}`;
        return url;
    }

    const id = process.env["ALCHEMY_ID"];
    const domain = {
        eth: "alchemyapi.io",
        polygon: "g.alchemy.com",
        arb: "g.alchemy.com",
        opt: "g.alchemy.com"
    }[chainGroup];
    return `https://${chainGroup}-${chainName}.${domain}/v2/${id}`;
}
// replaces INFURA_API_KEY in https://networkname.infura.io/v3/{INFURA_API_KEY}
function replaceInfuraID(infuraURL: string) {
    return infuraURL.replace("{INFURA_API_KEY}", process.env.INFURA_ID)
}
function getBlockscoutRegex(blockscoutPrefix="") {
    return BLOCKSCOUT_REGEX.replace("${BLOCKSCOUT_PREFIX}", blockscoutPrefix);
}

export default {
    "1": {
        "supported": true,
        "monitored": true,
        "contractFetchAddress": "https://etherscan.io/" + ETHERSCAN_SUFFIX,
        "rpc": [
            buildAlchemyURL("mainnet", "eth", true),
            buildAlchemyURL("mainnet", "eth")
        ],
        "txRegex": ETHERSCAN_REGEX,
    },
    "3": {
        "supported": true,
        "monitored": true,
        "contractFetchAddress": "https://ropsten.etherscan.io/" + ETHERSCAN_SUFFIX,
        "rpc": [
            buildAlchemyURL("ropsten", "eth", true),
            buildAlchemyURL("ropsten", "eth")
        ],
        "txRegex": ETHERSCAN_REGEX,
    },
    "4": {
        "supported": true,
        "monitored": true,
        "contractFetchAddress": "https://rinkeby.etherscan.io/" + ETHERSCAN_SUFFIX,
        "rpc": [
            buildAlchemyURL("rinkeby", "eth", true),
            buildAlchemyURL("rinkeby", "eth")
        ],
        "txRegex": ETHERSCAN_REGEX,
    },
    "5": {
        "supported": true,
        "monitored": true,
        "contractFetchAddress": "https://goerli.etherscan.io/" + ETHERSCAN_SUFFIX,
        "rpc": [
            buildAlchemyURL("goerli", "eth", true),
            buildAlchemyURL("goerli", "eth")
        ],
        "txRegex": ETHERSCAN_REGEX,
    },
    "42": {
        "supported": true,
        "monitored": true,
        "contractFetchAddress": "https://kovan.etherscan.io/" + ETHERSCAN_SUFFIX,
        "rpc": [
            buildAlchemyURL("kovan", "eth")
        ],
        "txRegex": ETHERSCAN_REGEX,
    },
    "11155111": { // Ethereum Sepolia Testnet
        "supported": true,
        "monitored": true,
        "rpc": [
            buildAlchemyURL("sepolia", "eth", true),
        ]
    },
    "56": {
        "supported": true,
        "monitored": false,
        "contractFetchAddress": "https://bscscan.com/" + ETHERSCAN_SUFFIX,
        "txRegex": ETHERSCAN_REGEX
    },
    "77": {
        "supported": true,
        "monitored": true,
        "contractFetchAddress": "https://blockscout.com/poa/sokol/" + BLOCKSCOUT_SUFFIX,
        "txRegex": getBlockscoutRegex("/poa/sokol")
    },
    "82": {
        "supported": true,
        "monitored": false,
        "contractFetchAddress": "https://api.meter.io:8000/" + METER_SUFFIX,
    },
    "83":{
        "supported":true,
        "monitored":false,
        "contractFetchAddress":"https://api.meter.io:4000/" + METER_SUFFIX,
    },
    "97": {
        "supported": true,
        "monitored": false,
        "contractFetchAddress": "https://testnet.bscscan.com/" + ETHERSCAN_SUFFIX,
        "txRegex": ETHERSCAN_REGEX
    },
    "100": {
        "supported": true,
        "monitored": true,
        "contractFetchAddress": "https://blockscout.com/xdai/mainnet/" + BLOCKSCOUT_SUFFIX,
        "txRegex": getBlockscoutRegex("/xdai/mainnet")
    },
    "137": {
        "supported": true,
        "monitored": true,
        "contractFetchAddress": "https://polygonscan.com/" + ETHERSCAN_SUFFIX,
        "rpc": [
            buildAlchemyURL("mainnet", "polygon")
        ],
        "txRegex": ETHERSCAN_REGEX
    },
    "42220": {
        "supported": true,
        "monitored": false,
        "contractFetchAddress": "https://explorer.celo.org/" + BLOCKSCOUT_SUFFIX,
        "txRegex": getBlockscoutRegex()
    },
    "44787": {
        "supported": true,
        "monitored": false,
        "contractFetchAddress": "https://alfajores-blockscout.celo-testnet.org/" + BLOCKSCOUT_SUFFIX,
        "txRegex": getBlockscoutRegex()
    },
    "62320": {
        "supported": true,
        "monitored": false,
        "contractFetchAddress": "https://baklava-blockscout.celo-testnet.org/" + BLOCKSCOUT_SUFFIX,
        "txRegex": getBlockscoutRegex()
    },
    "80001": {
        "supported": true,
        "monitored": true,
        "contractFetchAddress": "https://mumbai.polygonscan.com/" + ETHERSCAN_SUFFIX,
        "rpc": [
            buildAlchemyURL("mumbai", "polygon")
        ],
        "txRegex": ETHERSCAN_REGEX
    },
    "421611": {
        "supported": true,
        "monitored": true,
        "graphQLFetchAddress": "https://rinkeby-indexer.arbitrum.io/graphql",
        "rpc": [
            buildAlchemyURL("rinkeby", "arb")
        ],
    },
    "42161": {
        "supported": true,
        "monitored": true,
        "contractFetchAddress": "https://arbiscan.io/" + ETHERSCAN_SUFFIX,
        "txRegex": ETHERSCAN_REGEX,
        "rpc": [
            buildAlchemyURL("mainnet", "arb")
        ],
    },
    "43113": {
        "supported": true,
        "monitored": false,
        "contractFetchAddress": "https://testnet.snowtrace.io/" + ETHERSCAN_SUFFIX,
        "txRegex": ETHERSCAN_REGEX
    },
    "43114": {
        "supported": true,
        "monitored": false,
        "contractFetchAddress": "https://snowtrace.io/" + ETHERSCAN_SUFFIX,
        "txRegex": ETHERSCAN_REGEX
    },
    "57": {
        "supported": true,
        "monitored": false,
        "contractFetchAddress": "https://explorer.syscoin.org/" + BLOCKSCOUT_SUFFIX,
        "txRegex": getBlockscoutRegex()
    },
    "5700": {
        "supported": true,
        "monitored": false,
        "contractFetchAddress": "https://tanenbaum.io/" + BLOCKSCOUT_SUFFIX,
        "txRegex": getBlockscoutRegex()
    },
    "40": {
        "supported": true,
        "monitored": false,
        "contractFetchAddress": "https://mainnet.telos.net/" + TELOS_SUFFIX,
    },
    "41": {
        "supported": true,
        "monitored": false,
        "contractFetchAddress": "https://testnet.telos.net/" + TELOS_SUFFIX,
    },
    "8": {
        "supported": true,
        "monitored": false,
        "contractFetchAddress": "https://ubiqscan.io/" + ETHERSCAN_SUFFIX,
        "txRegex": ETHERSCAN_REGEX
    },
    "4216137055": {
        "supported": true,
        "monitored": false,
        "contractFetchAddress": "https://frankenstein-explorer.oneledger.network/" + BLOCKSCOUT_SUFFIX,
        "txRegex": getBlockscoutRegex()
    },
    "10": {
        "supported": true,
        "monitored": true,
        "contractFetchAddress": "https://optimistic.etherscan.io/" + ETHERSCAN_SUFFIX,
        "txRegex": ETHERSCAN_REGEX,
        "rpc": [
            buildAlchemyURL("mainnet", "opt")
        ],
    },
    "69": {
        "supported": true,
        "monitored": true,
        "contractFetchAddress": "https://kovan-optimistic.etherscan.io/" + ETHERSCAN_SUFFIX,
        "txRegex": ETHERSCAN_REGEX,
        "rpc": [
            buildAlchemyURL("kovan", "opt")
        ],
    },
    "28": {
        "supported": true,
        "monitored": true,
        "contractFetchAddress": "https://blockexplorer.rinkeby.boba.network/" + BLOCKSCOUT_SUFFIX,
        "txRegex": getBlockscoutRegex()
    },
    "288": {
        "supported": true,
        "monitored": true,
        "contractFetchAddress": "https://blockexplorer.boba.network/" + BLOCKSCOUT_SUFFIX,
        "txRegex": getBlockscoutRegex()
    },
    "106": {
        "supported": true,
        "monitored": false,
        "contractFetchAddress": "https://evmexplorer.velas.com/" + BLOCKSCOUT_SUFFIX,
        "txRegex": getBlockscoutRegex()
    },
    "1313161554": {
        "supported": true,
        "monitored": false,
        "contractFetchAddress": "https://explorer.mainnet.aurora.dev/" + BLOCKSCOUT_SUFFIX,
        "txRegex": getBlockscoutRegex()
    },
    "1313161555": {
        "supported": true,
        "monitored": false,
        "contractFetchAddress": "https://explorer.testnet.aurora.dev/" + BLOCKSCOUT_SUFFIX,
        "txRegex": getBlockscoutRegex()
    },
    "1284": { // Moonbeam
        "supported": true,
        "monitored": false
    },
    "1285": { // Moonriver
        "supported": true,
        "monitored": false
    },
    "1287": { // Moonbase
        "supported": true,
        "monitored": false
    },
    "11297108109": { // Palm
        "supported": true,
        "monitored": false,
        "contractFetchAddress": "https://explorer.palm.io/" + BLOCKSCOUT_SUFFIX,
        "txRegex": getBlockscoutRegex(),
        "rpc": [replaceInfuraID("https://palm-mainnet.infura.io/v3/{INFURA_API_KEY}")]
    },
    "11297108099": { // Palm Testnet
        "supported": true,
        "monitored": false,
        "contractFetchAddress": "https://explorer.palm-uat.xyz/" + BLOCKSCOUT_SUFFIX,
        "txRegex": getBlockscoutRegex(),
        "rpc": [replaceInfuraID("https://palm-testnet.infura.io/v3/{INFURA_API_KEY}")]
    },
    "122": { // Fuse Mainnet
        "supported": true,
        "monitored": false,
        "contractFetchAddress": "https://explorer.fuse.io/" + BLOCKSCOUT_SUFFIX,
        "txRegex": getBlockscoutRegex()
    }
}
