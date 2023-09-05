const hre = require("hardhat");
const fs = require("fs");
const dotenv = require("dotenv");

const config = require("./../config/aurora.json");
const arb = hre.ethers.contract(config.arb);
const owner = config.owner;
let inTrade = false;

async function setup() {
  arb = await arb.connect(owner);
}

async function lookForTriDexTrade() {
  const targetRoute = {};
  targetRoute.router1 = config.routers[Math.floor(Math.random() * config.routers.length)].address;
  targetRoute.router2 = config.routers[Math.floor(Math.random() * config.routers.length)].address;
  targetRoute.router3 = config.routers[Math.floor(Math.random() * config.routers.length)].address;
  targetRoute.token1 = config.baseAssets[Math.floor(Math.random() * config.baseAssets.length)].address;
  targetRoute.token2 = config.tokens[Math.floor(Math.random() * config.tokens.length)].address;
  targetRoute.token3 = config.tokens[Math.floor(Math.random() * config.tokens.length)].address;

  try {
    const amtBack = await arb.estimateTriDexTrade(targetRoute.router1, targetRoute.router2, targetRoute.router3, targetRoute.token1, targetRoute.token2, targetRoute.token3, 1);

    if (amtBack.gt(config.minBasisPointsPerTrade)) {
      return targetRoute;
    }
  } catch (e) {
    console.log(e);
  }

  return null;
}

async function triDexTrade(targetRoute) {
  if (inTrade === true) {
    return;
  }

  try {
    inTrade = true;
    console.log('> Making triDexTrade...');
    const tx = await arb.connect(owner).triDexTrade(targetRoute.router1, targetRoute.router2, targetRoute.router3, targetRoute.token1, targetRoute.token2, targetRoute.token3, 1);
    await tx.wait();
    inTrade = false;
  } catch (e) {
    console.log(e);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
