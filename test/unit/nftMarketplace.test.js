const { expect, assert } = require("chai");
const { network, ethers, getNamedAccounts, deployments } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");

!developmentChains.includes(network.name)
	? describe.skip
	: describe("NftMarketPlace unit tests", function () {
			let deployer, basicNft, nftMarketplace, player;
			const PRICE = ethers.utils.parseEther("0.1");
			const TOKEN_ID = 0;
			beforeEach(async function () {
				deployer = (await getNamedAccounts()).deployer;
				// player = (await getNamedAccounts()).player;
				const accounts = await ethers.getSigners();
				player = accounts[1];
				await deployments.fixture(["all"]);
				basicNft = await ethers.getContract("BasicNft"); // this goes for default deployer
				// nftMarketplace = await nftMarketplace.connect(player) if we want to connect to some other account
				nftMarketplace = await ethers.getContract("NftMarketplace");
				await basicNft.mintNft();
				await basicNft.approve(nftMarketplace.address, TOKEN_ID);
			});

      it("lists and can be bought", async function () {
        // await nftMarketplace.listItem(basicNft.address, TOKEN_ID, PRICE);
        expect(await nftMarketplace.listItem(basicNft.address, TOKEN_ID, PRICE)).to.emit(nftMarketplace,
          "ItemListed");
        const playerConnectedNftMarketplace = nftMarketplace.connect(player);
        await playerConnectedNftMarketplace.buyItem(
          basicNft.address,
          TOKEN_ID,
          {
            value: PRICE,
          }
        );
        const newOwner = await basicNft.ownerOf(TOKEN_ID);
        const deployerProceeds = await nftMarketplace.getProceeds(deployer);
        assert(newOwner.toString() == player.address);
        assert(deployerProceeds.toString() == PRICE.toString());
      });

			describe("list item", function () {
				it("reverts when price is less than equal to zero", async function () {
					await expect(
						nftMarketplace.listItem(basicNft.address, TOKEN_ID, 0)
					).to.be.revertedWith("NftMarketplace__PriceMustBeAboveZero");
				});
				it("nftmarketplace not approved", async function () {
					await basicNft.approve(player.address, TOKEN_ID); // deployer has approval as it creates the NFT
					await expect(
						nftMarketplace.listItem(basicNft.address, TOKEN_ID, PRICE)
					).to.be.revertedWith("NftMarketplace__NotApprovedForMarketPlace");
				});
			});

      decribe("buy item", function (){
        it("reverts if enough money not sent", async function(){
          expect()
        } )
      })
	  });
