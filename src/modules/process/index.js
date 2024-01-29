const process = require("node:process");

// console.log(process);

console.log(process.env.NODE_ENV);

console.log(process.argv);

console.log(process.pid);

console.log(`Current directory: ${process.cwd()}`);

process.stdin.on("data", (data) => {
  console.log(`User input: ${data}`);
});

process.stdout.write("Hello, World!\n");

process.stderr.write("Error occurred!\n");

// process.exit();

// process.cwd() // # this line is unreachable

process.on("SIGHUP", () => {
  console.log("Got SIGHUP signal.");
  setTimeout(() => {
    console.log("Exiting.");
    process.exit(0);
  }, 1000);
});

process.kill(process.pid, "SIGHUP");

process.nextTick(() => {
  console.log("Callback executed in the next tick");
});
