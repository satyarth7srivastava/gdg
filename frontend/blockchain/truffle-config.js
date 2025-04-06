//importing the private key from the .env file
require('dotenv').config();
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const END_POINT = process.env.SEPOLIA_INFURA_URL;
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    sepolia: {
      provider: () => new HDWalletProvider(PRIVATE_KEY, END_POINT),
      network_id: 11155111
    }
  }
  
}
