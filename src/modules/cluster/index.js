const http = require("node:http");
const cluster = require("node:cluster");
const os = require("node:os");

/* http
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
 */

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // # determine number of CPU core available in your system
  const numCPUs = os.availableParallelism(); // return 10 as my CPU has ony 10 core

  // # Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    // Note: You can only create worker less or equal to the number of your CPU cores.
    cluster.fork();
  }

  // # Fired when worker has exited or been killed
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // # Workers can share any TCP connection, In this case it is an HTTP server
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
