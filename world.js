const { Room } = require("./class/room");
const { Item } = require("./class/item");
const { Food } = require("./class/food");
const { Player } = require("./class/player");
let item = new Item("rock", "just a simple rock");
let room = new Room("Test Room", "A test room");
let player = new Player("player", room);

room.items.push(item);

player.takeItem("rock");
console.log(player.items);
console.log(player.getItemByName("rock"));
