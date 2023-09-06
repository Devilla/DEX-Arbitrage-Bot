const hre = require("hardhat");
const fs = require("fs");
require("dotenv").config();

let config, arb, owner, inTrade, balances;
const network = hre.network.name;
if (network === 'aurora') config = require('./../config/aurora.json');
if (network === 'fantom') config = require('./../config/fantom.json');

console.log(`Loaded ${config.routes.length} routes`);

const main = async () => {
  await setup();
  await lookForTriangularTrade();
}

const searchForRoutes = () => {
  const targetRoute = {};
  targetRoute.router1 = config.routers[Math.floor(Math.random()*config.routers.length)].address;
  targetRoute.router2 = config.routers[Math.floor(Math.random()*config.routers.length)].address;
  targetRoute.router3 = config.routers[Math.floor(Math.random()*config.routers.length)].address;
  targetRoute.token1 = config.baseAssets[Math.floor(Math.random()*config.baseAssets.length)].address;
  targetRoute.token2 = config.tokens[Math.floor(Math.random()*config.tokens.length)].address;
  targetRoute.token3 = config.tokens[Math.floor(Math.random()*config.tokens.length)].address;
  return targetRoute;
}

const lookForTriangularTrade = async () => {
  let targetRoute;
  if (config.routes.length > 0) {
    targetRoute = useGoodRoutes();
  } else {
    targetRoute = searchForRoutes();
  }
  try {
    // Code for estimating trade and checking if profitable
    if (amtBack.gt(profitTarget)) {
      await triangularTrade(targetRoute.router1, targetRoute.router2, targetRoute.router3, targetRoute.token1, targetRoute.token2, targetRoute.token3, tradeSize);
    } else {
      await lookForTriangularTrade();
    }
  } catch (e) {
    console.log(e);
    await lookForTriangularTrade();
  }
}

const triangularTrade = async (router1, router2, router3, baseToken, token2, token3, amount) => {
  if (inTrade === true) {
    await lookForTriangularTrade();
    return false;
  }
  try {
    inTrade = true;
    console.log('> Making triangularTrade...');
    const tx = await arb.connect(owner).triangularTrade(router1, router2, router3, baseToken, token2, token3, amount); //{ gasPrice: 1000000000003, gasLimit: 500000 }
    await tx.wait();
    inTrade = false;
    await lookForTriangularTrade();
  } catch (e) {
    console.log(e);
    inTrade = false;
    await lookForTriangularTrade();
  }
}

const setup = async () => {
  [owner] = await ethers.getSigners();
  console.log(`Owner: ${owner.address}`);
  const IArb = await ethers.getContractFactory('Arb');
  arb = await IArb.attach(config.arbContract);
  balances = {};
  // Code for initializing balances
  setTimeout(() => {
    setInterval(() => {
      logResults();
    }, 600000);
    logResults();
  }, 120000);
}

const logResults = async () => {
  console.log(`############# LOGS #############`);
  for (let i = 0; i < config.baseAssets.length; i++) {
    const asset = config.baseAssets[i];
    // Code for updating balances and calculating basis points
    console.log(`#  ${asset.sym}: ${basisPoints.toString()}bps`);
  }
}

process.on('uncaughtException', function(err) {
  console.log('UnCaught Exception 83: ' + err);
  console.error(err.stack);
  fs.appendFile('./critical.txt', err.stack, function(){ });
});

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: '+p+' - reason: '+reason);
});

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
