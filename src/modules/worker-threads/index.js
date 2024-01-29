const http = require("node:http");
const { Worker, isMainThread, parentPort } = require("node:worker_threads");

/* http
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
  }); */

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
