const inherit = require('./src/inherit');
const EventEmitter = require('./src/EventEmitter');
const Client = require('./src/clientGenerator');

const client = inherit(EventEmitter, Client);
const bob = new client("Bob");

console.log("Client: " , Client);
console.log("client: " , client)
console.log("new client(): ", bob);

bob.on("hi", () => {console.log("success")} );
bob.emit('hi')