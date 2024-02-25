# Process

- The Node.js process module provides information about the Node.js process and allows you to control its behavior.
- The process object is a global object that can be accessed from anywhere in your code without requiring it explicitly.
- It has many properties and methods that can be used to get information about the current process, such as its ID, title, memory usage, and CPU usage. You can also use the process object to send signals to the process, such as SIGINT (interrupt) or SIGKILL (kill).

#### NOTE: Here we will discuss about most commonly used properties and methods only

## process

The process object is a global object in Node.js, and you can access it without requiring it explicitly.

```js
console.log(process); // It will give you a huge information about curren node process, Including process info, system info, system ENV etc.
```

## process.env

Return an object containing the environment variables that are set for the Node.js process.

```js
console.log(process.env.NODE_ENV); // It will tell you about node environment. Like, 'development','production' etc
```

## process.argv

Return an array containing the command-line arguments that were passed to the Node.js process.

```js
// # let's suppose you start your node application by the terminal command
`node index.js arg`;

console.log(process.argv);
/*
output: [
path_to_node,
path_to_executable_directory,
'arg'
] 

So, you can access the command-line argument `arg` as `process.argv[2]`
*/
```

## process.cwd

Return the `current working directory (cwd)` of the Node.js process.

```js
console.log(process.cwd()); // Return root directory path of your node project
```

## Standard Input/Output Streams

This will help to access standard input, output, and error streams.

```js
// # Taking input direct from command-line
process.stdin.on("data", (data) => {
  console.log(`User input: ${data}`);
});

// # Send output to command-line
process.stdout.write("Hello, World!\n");

// # Will fire to show a error
process.stderr.write("Error occurred!\n");
```

## process.exit

This will immediately exits the Node.js process. You can simply consider it as `return;` keyword inside a function, So, after this command current `process` will be unreachable.

```js
// # Taking input direct from command-line
process.stdin.on("data", (data) => {
  console.log(`User input: ${data}`);
});

// # Send output to command-line
process.stdout.write("Hello, World!\n");

process.exit(); // this will exit the current process

// process.cwd(); // # this line is unreachable
```

## process.kill

This method sends the signal to the process identified by `pid`. If the target `pid` does not exist this method will throw an `error`.

Even though the name of this function is `process.kill()`, it is really just a signal sender. The signal sent may do something other than kill the target process.😅😅😅

```js
// # Fired on 'SIGHUP' signal
process.on("SIGHUP", () => {
  console.log("Got SIGHUP signal.");
  // # Exit the process after 1000 ms.
  setTimeout(() => {
    console.log("Exiting.");
    process.exit(0);
  }, 1000);
});

// # Sending 'SIGHUP' signal to current process
process.kill(process.pid, "SIGHUP");
```

## process.nextTick

This will Execute a callback function in the next iteration of the event loop.

```js
process.nextTick(() => {
  console.log("Callback executed in the next tick");
});
```

## Event Emitter

As the process object is an instance of the EventEmitter class. You can use it to emit and listen for custom events.

```js
// # Capturing custom event
process.on("customEvent", (arg) => {
  console.log(`Custom event received with argument: ${arg}`);
});

// # Emitting custom event
process.emit("customEvent", "example");
```

---

## Process module is not only this much, It's a huge module, There is so much to discuss. I will suggest to go through the Docs: [node process module](https://nodejs.org/docs/latest/api/process.html)
