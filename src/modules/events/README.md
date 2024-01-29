# Event

The Node.js Events module is a built-in module that allows you to create, fire, and listen for events. It is a core part of the Node.js event-driven architecture.

An EventEmitter object can raise an event that causes the previously attached listeners of the event executed. An EventEmitter object has two main functions:

1. Emit a named event.
2. Attach and detach one or more event listeners to the named event.

```js
const EventEmitter = require("node:events");

// # Create an EventEmitter instance
const myEmitter = new EventEmitter();

// # Define event listener
myEmitter.on("greet", (name) => {
  console.log(`Hello, ${name}!`);
});

// # Emit events
myEmitter.emit("greet", "John");
```

## Trigger once

You can executed event listener only once, by the help of `once()` method of emitter class.

```js
const EventEmitter = require("node:events");

// # Create an EventEmitter instance
const myEmitter = new EventEmitter();

// # trigger only once
myEmitter.once("greetOnce", () => {
  console.log("This will only run once.");
});

myEmitter.emit("greetOnce");
myEmitter.emit("greetOnce");
myEmitter.emit("greetOnce");
```

## Error handling

The EventEmitter class also has error-handling capabilities. If an error event is emitted and there are no listeners, Node.js will terminate the process. To handle errors, you can add an 'error' event listener.

```js
const EventEmitter = require("node:events");

// # Create an EventEmitter instance
const myEmitter = new EventEmitter();

// # Define listener
myEmitter.on("greet", (name) => {
  if (name !== "Allay") {
    // # Emit error event if name not `Allay`
    myEmitter.emit("error", new Error("Name is not valid"));
    return;
  }
  console.log(`Hello, ${name}!`);
});

// # Error event listener
myEmitter.on("error", (err) => {
  console.error("An error occurred:", err.message);
});

// Emit events
myEmitter.emit("greet", "John");
```

### Also you can add event listener for in build exception to prevent the default behavior of terminating the Node.js process when an unhandled error occurs.

```js
const EventEmitter = require("node:events");

// # Create an EventEmitter instance
const myEmitter = new EventEmitter();

// # To avoid process termination on uncaught Exception
process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err.message);
});

// # To avoid process termination on unhandled Promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

// # Define listener
myEmitter.on("greet", (name) => {
  if (name !== "Allay") {
    // # Throw error if name not `Allay`
    throw new Error("Name is not valid");
  }
  console.log(`Hello, ${name}!`);
});

// Emit events
myEmitter.emit("greet", "John");
```

## Remove a listener

The `removeListener` or `off` method is used to remove a specific listener for a given event. It takes two parameters:

- **eventName**: The name of the event for which you want to remove a listener.
- **listenerFunction**: The function that was originally added as a listener for the specified event.

```js
const EventEmitter = require("node:events");

// # Create an EventEmitter instance
const myEmitter = new EventEmitter();

// # Define a listener function
const myListener = () => {
  console.log("Listener executed");
};

// # Add the listener
myEmitter.on("myEvent", myListener);

// # Fire `myEvent`
myEmitter.emit("myEvent");

// # Remove the listener
myEmitter.removeListener("myEvent", myListener);
/**
 * or, you can do
 * myEmitter.off("myEvent", myListener);
 */

// # Emit the event (listener is no longer active)
myEmitter.emit("myEvent");
```

## Remove all listeners

The `removeAllListeners` method is used to remove all listeners for a specified event. If no event name is provided, it removes all listeners for all events. It takes two parameters:

- **eventName**: The name of the event for which you want to remove a listener.

```js
const EventEmitter = require("node:events");

// # Create an EventEmitter instance
const myEmitter = new EventEmitter();

// # Define listener functions
const listener1 = () => {
  console.log("Listener 1 executed");
};

const listener2 = () => {
  console.log("Listener 2 executed");
};

// # Add listeners
myEmitter.on("myEvent", listener1);
myEmitter.on("myEvent", listener2);

// # Fire both the listener
myEmitter.emit("myEvent");

// # Remove all listeners for 'myEvent'
myEmitter.removeAllListeners("myEvent");

// # Emit the event (no listeners are active)
myEmitter.emit("myEvent");
```

In this example, both listener1 and listener2 are added as listeners for the 'myEvent' event, and then removeAllListeners is used to remove all listeners for 'myEvent'. When the last event is emitted, no listeners are active, and no functions will be executed.

## Inheriting from EventEmitter

You can create your own class by inheriting EventEmitter and that will help you yo make your own event driven system. Here is a simple example

```js
const { EventEmitter } = require("node:events");

class ChatRoom extends EventEmitter {
  constructor() {
    super();
    this.chats = {};
  }

  join(user) {
    this.chats[user] = [];
    this.emit("userJoin", user);
  }

  sendMessage(user, message) {
    const formattedMessage = `${user}: ${message}`;
    this.chats[user].push(message);
    this.emit("newMessage", formattedMessage);
  }

  getAllChats() {
    return this.chats;
  }

  getIndividualChats(user) {
    return this.chats?.[user] ?? [];
  }
}

// Create an instance of the custom class
const chatRoom = new ChatRoom();

// Event listener for user joins
chatRoom.on("userJoin", (user) => {
  console.log(`${user} has joined the chat.`);
  console.log(`Welcome, ${user}!`);
});

// Event listener for new messages
chatRoom.on("newMessage", (message) => {
  console.log(`New Message: ${message}`);
});

// Simulate user interactions
chatRoom.join("UserA");
chatRoom.sendMessage("UserA", "Hello, everyone!");
chatRoom.join("UserB");
chatRoom.sendMessage("UserB", "Hi there!");
```

## Quiz

What will be the output here?

```js
const EventEmitter = require("node:events");

const Logger = new EventEmitter();

Logger.writeLog = (message) => {
  console.log(message);
  Logger.emit("error", "Error occurred");
};

for (var i = 0; i < 11; i++) {
  Logger.on("error", function (err) {
    console.log("error writing log: " + err);
  });
  Logger.writeLog("Hello");
}
```
