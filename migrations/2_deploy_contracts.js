const RewardToken = artifacts.require('RewardToken')
const FGTToken = artifacts.require('FGTToken')
const TokenFarm = artifacts.require('TokenFarm')

module.exports = async function(deployer, network, accounts) {
  // Deploy FGT Tokens
  await deployer.deploy(FGTToken)
  const fgtToken = await FGTToken.deployed()

  // Deploy Rewards token
  await deployer.deploy(RewardToken)
  const rewardToken = await RewardToken.deployed()

  // Deploy TokenFarm
  await deployer.deploy(TokenFarm, rewardToken.address, fgtToken.address)
  const tokenFarm = await TokenFarm.deployed()

  // Transfer all tokens to TokenFarm (1 million)
  await rewardToken.transfer(tokenFarm.address, '1000000000000000000000000')

  // Transfer 100 FGT tokens to investor
  await fgtToken.transfer(accounts[1], '100000000000000000000')
}
