const { network } = require("hardhat");
const { verify } = require("../utils/verify");
const { developmentChains } = require("../helper-hardhat-config");

module.exports = async function ({ getNamedAccounts, deployments }) {
	const { deployer } = await getNamedAccounts();
	const { deploy, log } = deployments;

	const args = [];
	const basicNft = await deploy("BasicNft", {
		from: deployer,
		log: true,
		args: args,
		waitConfirmations: network.config.blockConfirmations || 1,
	});
	log("-----------------------");
	console.log(`NftMarketPlace deployed at ${basicNft.address}`);

	if (
		!developmentChains.includes(network.name) &&
		process.env.ETHERSCAN_API_KEY
	) {
		log("Verifying...");
		await verify(basicNft.address, args);
	}
	log("-------------------");
};

module.exports.tags = ["all", "basicnft"];
