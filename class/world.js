const { Room } = require("./room");
const { Item } = require("./item");
const { Food } = require("./food");

class World {
    constructor() {
        this.rooms = {};
    }

    loadWorld(worldData) {
        const roomList = worldData.rooms;
        const itemList = worldData.items;

        // Instantiate new room objects
        // Get name, id and description from room data
        for (let i = 0; i < roomList.length; i++) {
            let roomData = roomList[i];
            let newRoom = new Room(roomData.name, roomData.description);

            this.rooms[roomData.id] = newRoom;
        }

        // Connect rooms by ID
        // Note that all rooms must be created before they can be connected
        for (let i = 0; i < roomList.length; i++) {
            let roomID = roomList[i].id;
            let roomConnections = roomList[i].exits;

            for (const direction in roomConnections) {
                let connectedRoomID = roomConnections[direction];
                let roomToConnect = this.rooms[connectedRoomID];
                this.rooms[roomID].connectRooms(direction, roomToConnect);
            }
        }

        // Instantiate items using data stored in the itemList variable
        // A non-food item should be instantiated as an instance of the `Item` class
        // A food item should be instantiated as an instance of the `Food` class
        for (let ele of itemList) {
            let props = Object.getOwnPropertyNames(ele);
            let item;
            if (props.includes("isFood")) {
                item = new Food(
                    ele.name,
                    ele.description,
                    ele.room,
                    ele.isFood
                );
            } else {
                item = new Item(ele.name, ele.description, ele.room);
            }

            let room = this.rooms[item.room];

            room.items.push(item);
        }

        // Your code here
    }
}

module.exports = {
    World,
};
