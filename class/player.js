const { Food } = require("./food");
const { Item } = require("./item");

class Player {
    constructor(name, startingRoom) {
        this.name = name;
        this.currentRoom = startingRoom;
        this.items = [];
    }

    move(direction) {
        const nextRoom = this.currentRoom.getRoomInDirection(direction);

        // If the next room is valid, set the player to be in that room
        if (nextRoom) {
            this.currentRoom = nextRoom;

            nextRoom.printRoom(this);
        } else {
            console.log("You cannot move in that direction");
        }
    }

    printInventory() {
        if (this.items.length === 0) {
            console.log(`${this.name} is not carrying anything.`);
        } else {
            console.log(`${this.name} is carrying:`);
            for (let i = 0; i < this.items.length; i++) {
                console.log(`  ${this.items[i].name}`);
            }
        }
    }

    takeItem(itemName) {
        // Picks up an item from the current room into the player's inventory
        // Your code here
        let names = [];
        for (let ele of this.currentRoom.items) {
            names.push(ele.name);
        }
        let itemIndex = names.indexOf(itemName);
        let item = this.currentRoom.items[itemIndex];
        let copy = [
            ...this.currentRoom.items.slice(0, itemIndex),
            ...this.currentRoom.items.slice(
                itemIndex + 1,
                this.currentRoom.items.length - 1
            ),
        ];
        this.currentRoom.items = copy;

        this.items.push(item);

        // this.items.push(item);
    }

    dropItem(itemName) {
        // Drops an item the player is holding into their current room
        // Your code here
        let names = [];
        for (let ele of this.items) {
            names.push(ele.name);
        }
        let itemIndex = names.indexOf(itemName);
        let item = this.items[itemIndex];

        let copy = [
            ...this.items.slice(0, itemIndex),
            ...this.items.slice(itemIndex + 1, this.items.length - 1),
        ];
        this.items = copy;
        this.currentRoom.items.push(item);
    }

    eatItem(itemName) {
        // Allow the player to eat food items, but not non-food items
        // Your code here
        let names = [];
        for (let ele of this.items) {
            names.push(ele.name);
        }
        let itemIndex = names.indexOf(itemName);
        let item = this.items[itemIndex];
        if (item instanceof Food) {
            let copy = [
                ...this.items.slice(0, itemIndex),
                ...this.items.slice(itemIndex + 1, this.items.length - 1),
            ];
            this.items = copy;
        }
    }

    getItemByName(name) {
        // Retrieves an item from a player's inventory by item name
        // Your code here
        let names = [];
        for (let ele of this.items) {
            names.push(ele.name);
        }
        let itemIndex = names.indexOf(name);
        return this.items[itemIndex];
    }
}

module.exports = {
    Player,
};
