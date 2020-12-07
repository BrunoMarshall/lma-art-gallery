require("dotenv").config();
const { Harmony } = require("@harmony-js/core");
const { ChainID, ChainType } = require("@harmony-js/utils");
const hmy = new Harmony(
  // let's assume we deploy smart contract to this end-point URL
  "https://api.s0.b.hmny.io",
  {
    chainType: ChainType.Harmony,
    chainId: ChainID.HmyTestnet,
  }
);
const contractJson = require("../build/contracts/HarmonyArt.json");
const contractAddr = "0x0Fc3269F1ED6807aD96C62b66fAfdE2C02f9a76b";

const soccerPlayers = hmy.contracts.createContract(
  contractJson.abi,
  contractAddr
);

const options = {
  gasPrice: process.env.GAS_PRICE,
  gasLimit: process.env.GAS_LIMIT,
};
const instance = soccerPlayers.methods;

async function display() {
  let total = await instance.totalSupply().call(options);
  console.log("total arts: " + total.toString());
  for (i = 0; i < total; i++) {
    let res = await instance.getPlayer(i).call(options);
    console.log("========== Art info (index: " + i + ")==========");
    console.log("name", res.playerName);
    console.log("internalPlayerId", res.internalPlayerId);
    console.log("sellingPrice", res.sellingPrice);
    console.log("owner", res.owner);
    console.log("transactions", res.transactionCount);
  }
}
display().then(() => {
    process.exit(0);
});