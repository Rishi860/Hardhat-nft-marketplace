const { network } = require("hardhat");
const { verify } = require("../utils/verify");
const { developmentChains } = require("../helper-hardhat-config");
require("dotenv").config();

module.exports = async function ({ getNamedAccounts, deployments }) {
	const { deployer } = await getNamedAccounts();
	const { deploy, log } = deployments;

	const args = [];
	const nftMarketplace = await deploy("NftMarketplace", {
		from: deployer,
		log: true,
		args: args,
		waitConfirmations: network.config.blockConfirmations || 1,
	});
	log("-----------------------");
	console.log(`NftMarketPlace deployed at ${nftMarketplace.address}`);

	if (
		!developmentChains.includes(network.name) &&
		process.env.ETHERSCAN_API_KEY
	) {
		log("Verifying...");
		await verify(nftMarketplace.address, args);
	}
	log("-------------------");
};

module.exports.tags = ["all", "nftmarketplace"];
