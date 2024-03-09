// Create an edible `Food` class that inherits from the `Item` class
const { Item } = require("./item");
class Food extends Item {
    constructor(name, description, room, isFood) {
        super(name, description, room);
        this.isFood = isFood;
    }
}
// Your code here

module.exports = { Food };
