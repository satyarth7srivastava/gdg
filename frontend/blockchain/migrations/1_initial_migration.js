var Voting = artifacts.require("Voting")

module.exports = function(deployer) {
  try {
    deployer.deploy(Voting)
    //saving the contract address to a file
    const fs = require('fs')
    const path = require('path')
    const contractAddress = Voting.address
    const contractName = Voting.contractName
    const filePath = path.join(__dirname, '..', 'contractAddress.json')
    const contractData = {
      [contractName]: contractAddress
    }
    fs.writeFileSync(filePath, JSON.stringify(contractData, null, 2))
  } catch (error) {
    console.error("Error deploying Voting contract:", error); 
  }
}
