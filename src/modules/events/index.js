// const EventEmitter = require("node:events");

// Step 2: Create an EventEmitter instance
// const myEmitter = new EventEmitter();

// // Step 3: Define event listeners
// myEmitter.on("greet", (name) => {
//   console.log(`Hello, ${name}!`);
// });

// myEmitter.on("farewell", (name) => {
//   console.log(`Goodbye, ${name}!`);
// });

// // Step 4: Emit events
// myEmitter.emit("greet", "John");
// myEmitter.emit("farewell", "Alice");

// // # trigger once
// myEmitter.once("greetOnce", () => {
//   console.log("This will only run once.");
// });

// myEmitter.emit("greetOnce");
// myEmitter.emit("greetOnce");
// myEmitter.emit("greetOnce");

// // # The EventEmitter class also has error-handling capabilities. If an error event is emitted and there are no listeners, Node.js will terminate the process. To handle errors, you can add an 'error' event listener:

// // # Define listener
// myEmitter.on("greet", (name) => {
//   if (name !== "Allay") {
//     // # Emit error event if name not `Allay`
//     myEmitter.emit("error", new Error("Name is not valid"));
//     return;
//   }
//   console.log(`Hello, ${name}!`);
// });

// // # Error event listener
// myEmitter.on("error", (err) => {
//   console.error("An error occurred:", err.message);
// });

// // Emit events
// myEmitter.emit("greet", "John");

// // Also you can add event listener for in build exception to prevent the default behavior of terminating the Node.js process when an unhandled error occurs.

// process.on("uncaughtException", (err) => {
//   console.error("Uncaught exception:", err.message);
// });

// // To avoid process termination on unhandled Promise rejections
// process.on("unhandledRejection", (reason, promise) => {
//   console.error("Unhandled Rejection at:", promise, "reason:", reason);
// });

// // # Define listener
// myEmitter.on("greet", (name) => {
//   if (name !== "Allay") {
//     throw new Error("Name is not valid");
//   }
//   console.log(`Hello, ${name}!`);
// });

// // Emit events
// myEmitter.emit("greet", "John");

// // # Remove a listener

// // Define a listener function
// const myListener = () => {
//   console.log("Listener executed");
// };

// // Add the listener
// myEmitter.on("myEvent", myListener);

// // Fire `myEvent`
// myEmitter.emit("myEvent");

// // Remove the listener
// myEmitter.removeListener("myEvent", myListener);

// // Emit the event (listener is no longer active)
// myEmitter.emit("myEvent");

// // # Remove all listener

// // Define listener functions
// const listener1 = () => {
//   console.log("Listener 1 executed");
// };

// const listener2 = () => {
//   console.log("Listener 2 executed");
// };

// // Add listeners
// myEmitter.on("myEvent", listener1);
// myEmitter.on("myEvent", listener2);

// // Fire both the listener
// myEmitter.emit("myEvent");

// // Remove all listeners for 'myEvent'
// myEmitter.removeAllListeners("myEvent");

// // Emit the event (no listeners are active)
// myEmitter.emit("myEvent");

// myEmitter.removeAllListeners("eventName");

// // # Inheritance

// const { EventEmitter } = require("node:events");

// class ChatRoom extends EventEmitter {
//   constructor() {
//     super();
//     this.chats = {};
//   }

//   join(user) {
//     this.chats[user] = [];
//     this.emit("userJoin", user);
//   }

//   sendMessage(user, message) {
//     const formattedMessage = `${user}: ${message}`;
//     this.chats[user].push(message);
//     this.emit("newMessage", formattedMessage);
//   }

//   getAllChats() {
//     return this.chats;
//   }

//   getIndividualChats(user) {
//     return this.chats?.[user] ?? [];
//   }
// }

// // Create an instance of the custom class
// const chatRoom = new ChatRoom();

// // Event listener for user joins
// chatRoom.on("userJoin", (user) => {
//   console.log(`${user} has joined the chat.`);
//   console.log(`Welcome, ${user}!`);
// });

// // Event listener for new messages
// chatRoom.on("newMessage", (message) => {
//   console.log(`New Message: ${message}`);
// });

// // Simulate user interactions
// chatRoom.join("UserA");
// chatRoom.sendMessage("UserA", "Hello, everyone!");
// chatRoom.join("UserB");
// chatRoom.sendMessage("UserB", "Hi there!");

// // # Quiz

// const Logger = new EventEmitter();

// Logger.writeLog = (message) => {
//   console.log(message);
//   Logger.emit("error", "Error occurred");
// };

// for (var i = 0; i < 11; i++) {
//   Logger.on("error", function (err) {
//     console.log("error writing log: " + err);
//   });
//   Logger.writeLog("Hello");
// }
