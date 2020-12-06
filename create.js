var SoccerPlayers = artifacts.require("SoccerPlayers");
const myAddress = "0xc162199cDaeAa5a82f00651dd4536F5d2d4277C5";

module.exports = function () {
  async function createPlayers() {
    let instance = await SoccerPlayers.deployed();
    let players = [
      "Deportation",
      "The Earth is Burning",
      "Family Portrait",
      "Full River",
      "Labour Camp",
      "Only Clover To Eat",
      "Traces of a Home",
      "Daily Registration",
      "Child Memories",
      "Lost Family",
      "War",
      "Piroschki",
      "Schuster",
      "Unfulfilled Expectations",
      "Black Soup",
      "Emigration",
      "Nationalities",
      "Integration Feeling",
      "Background-origin",
      "Mother Language",
      "Neighbours",
      "Religions",
      "Home",
    ];
    for (i = 0; i < players.length; i++) { //players.length
      let res = await instance.createPromoPlayer(myAddress, players[i], 0, i)
      console.log("created player: " + players[i] + ", tx hash: " + res.tx);
    }
  }
  async function display() {
    let instance = await SoccerPlayers.deployed();
    let total = await instance.totalSupply();
    console.log("total players: " + total.toString());
    for (i = 0; i < total; i++) {
      let res = await instance.getPlayer(i);
      console.log("========== Player info (index: " + i + ")==========");
      console.log("name", res.playerName);
      console.log("internalPlayerId", res.internalPlayerId);
      console.log("sellingPrice", res.sellingPrice);
      console.log("owner", res.owner);
      console.log("transactions", res.transactionCount);
    }
  }
  createPlayers().then(() => {
    display().then(() => {
      console.log("done!!!");
      process.exit(0);
    });
  });
};
