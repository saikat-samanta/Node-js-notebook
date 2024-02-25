# Cluster

Javascript is single threaded language. It doesn't matter how many cpu core your system have Javascript by default always use only one. So, If you have a long execution task then, it will block the other task. In this scenario node.js Cluster module come into play.

Clusters can be used to run multiple instances of Node.js that can distribute workloads among their application threads. When process isolation is not needed, use the worker_threads module instead, which allows running multiple application threads within a single Node.js instance.

## Let's understand the problem

```js
const http = require("node:http");

http
  .createServer((req, res) => {
    if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text" });
      res.end("Hello from home page");
    }
    if (req.url === "/long-process") {
      // # this is our log execution task in this example
      for (let i = 0; i <= 5000000000; i++) {}
      // # end task

      res.writeHead(200, { "Content-Type": "text" });
      res.end("Hello from long process page");
    }
  })
  .listen(3000, () => {
    console.log(`Listening port 3000`);
  });
```

**Read the above code carefully.**

Here we have two endpoint `/` and `/long-process`, on `/` endpoint, there is nothing CPU intensive, so, it will send back response within `6 - 10 ms`. But, on `/long-process` endpoint we have a long CPU intensive execution. So, it will take around `6 - 10 second` to send back the response.

### But what will happen if you visit `/long-process` first and then `/` Simultaneously?

#### So, in that case long process will block the execution, hence `/` endpoint will take approx

**`6 - 10 second`(time taken by `/long-process`) + `6 - 10 ms` (time taken by `/`)**

## Let's solve the problem

We are going to use cluster module to get rid of this issue.

**The cluster way:**

- **create cluster master first (only responsible to handle the workers. Like, start, stop, restart etc)**
  - **fork the worker (has own memory, event loop and v8 instance and responsible for code execution)**

<br/>

```js
const http = require("node:http");
const cluster = require("node:cluster");
const os = require("node:os");

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // # determine number of CPU core available in your system
  const numCPUs = os.availableParallelism(); // return 10 as my CPU has ony 10 core

  // # Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    // Note: You can only create worker less or equal to the number of your CPU cores.
    cluster.fork();
  }

  // # Run when worker are not used any more
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // # Workers can share any TCP connection, In this case it is an HTTP server

  // # Like same code we have before
  http
    .createServer((req, res) => {
      if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text" });
        res.end("Hello from home page");
      }
      if (req.url === "/long-process") {
        // # this is our log execution task in this example
        for (let i = 0; i <= 5000000000; i++) {}
        // # end task

        res.writeHead(200, { "Content-Type": "text" });
        res.end("Hello from long process page");
      }
    })
    .listen(3000, () => {
      console.log(`Listening port 3000`);
    });

  console.log(`Worker ${process.pid} started`);
}
```

### NOTE: This we are achieving by the help of `cluster` module. But, there is a easy we to do that. We can take help of one NPM package named `pm2`. Which can do the same with almost no extra code

#### Steps

1. Install `pm2` in your `package.json` by running `npm install pm2`;
2. Adding the same code

```js
const http = require("node:http");
http
  .createServer((req, res) => {
    if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text" });
      res.end("Hello from home page");
    }
    if (req.url === "/long-process") {
      // # this is our log execution task in this example
      for (let i = 0; i <= 5000000000; i++) {}
      // # end task

      res.writeHead(200, { "Content-Type": "text" });
      res.end("Hello from long process page");
    }
  })
  .listen(3000, () => {
    console.log(`Listening port 3000`);
  });
```

3. Run it by `pm2 start filename.js`
