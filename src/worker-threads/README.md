# Worker-threads

- The worker-threads module enables the use of threads that execute JavaScript in parallel.
- Code executed in a worker thread runs in a separate child process, preventing it from blocking your main application.
- The cluster module can be used to run multiple instances of Node.js that can distribute workloads.
- worker-threads module allows running multiple application threads within a single
  Node.js instance
- When process isolation is not needed, that is, no separate instances of V8, event loop and memory are needed, you should use worker.
  threads

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
      let out;
      for (let i = 0; i <= 50000000; i++) {
        out = `Loop executed ${i} times`;
      }
      // # end task

      res.writeHead(200, { "Content-Type": "text" });
      res.end(out);
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

We are going to use worker-threads module to get rid of this issue.

**The worker_threads way:**

- **create new worker**
- **we can check if is it main thread or not, by the help of `isMainThread`**
- **Load long execution task parallelly by the help of worker**

```js
const http = require("node:http");
const { Worker, isMainThread, parentPort } = require("node:worker_threads");

if (isMainThread) {
  http
    .createServer((req, res) => {
      if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text" });
        res.end("Hello from home page");
      }
      if (req.url === "/long-process") {
        // # Create new worker instance
        const worker = new Worker(__filename);

        // # onMessage event to get the data back from worker script
        worker.on("message", (data) => {
          res.writeHead(200, { "Content-Type": "text" });
          res.end(data);
        });

        // # onError event to catch the error from worker script
        worker.on("error", (error) => {
          console.log(error);
        });

        // # onExit event to exit from worker script
        worker.on("exit", (code) => {
          if (code !== 0) {
            new Error(`Worker stopped with exit code ${code}`);
          }
        });
      }
    })
    .listen(3000, () => {
      console.log(`Listening port 3000`);
    });
} else {
  // # this is our log execution task in this example
  function myLongTask() {
    let out;
    for (let i = 0; i <= 500000000; i++) {
      out = `Loop executed ${i} times`;
    }
    return out;
  }
  // # end task

  // # Sending data back to the main thread
  parentPort.postMessage(myLongTask());
}
```
