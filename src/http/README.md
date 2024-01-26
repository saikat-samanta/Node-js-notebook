# HTTP module

HTTP module is mostly use to create API endpoints. This module is using event driven methodology.

## Create a basic HTTP server

- To create a basic server with `GET` or `POST` api we will use `createServer` method from node default `http` module.
- `createServer` expect a callback function `(incomingRequest, responseToSend) => void`

```js
const server = http.createServer((req, res) => {
  // # GET http://127.0.0.1:3000/
  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        data: "our first get endpoint.",
      })
    );
  }

  // # GET http://127.0.0.1:3000/api
  if (req.url === "/api" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        data: "our api endpoint.",
      })
    );
  }

  // # POST http://127.0.0.1:3000/api
  if (req.url === "/api" && req.method === "POST") {
    let body = "";
    req.on("error", (err) => {
      res.statusCode = 400;
      res.end(err);
    });
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", function () {
      if (!body) {
        res.statusCode = 400;
        res.end(JSON.stringify({ message: "Invalid data." }));
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(body);
    });
  }
});

server.listen(3000, () => {
  console.log(`Listening port 3000`);
});
```

## Make the HTTP server little advance

We can use event driven approach to make it cleaner

```js
const {
  defaultHandler,
  getAPIRoute,
  getHomeRoute,
  postAPIRoute,
} = require("./controller.js");

// # creating server instance
const server = http.createServer();

// # Start routing
server.on("request", (req, res) => {
  const reqURL = req.url;
  const reqMethod = req.method;

  switch (reqMethod) {
    case "POST":
      // # define `POST http://127.0.0.1:3000/api`
      if (reqURL === "/api") {
        postAPIRoute(req, res);
        break;
      }

    case "GET":
      // # define `GET http://127.0.0.1:3000/`
      if (reqURL === "/") {
        getHomeRoute(req, res);
        break;
      }
      // # define `GET http://127.0.0.1:3000/api`
      if (reqURL === "/api") {
        getAPIRoute(req, res);
        break;
      }

    default:
      defaultHandler(req, res);
  }
});
// # End routing

// # Listing server at port 3000
server.listen(3000, () => {
  console.log(`Listening port 3000`);
});
```

<br/>

```js
// ./controller.js

function defaultHandler(req, res) {
  res.statusCode = 405;
  res.end(
    JSON.stringify({
      message: "Method not found.",
    })
  );
}

function getHomeRoute(req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      data: "our '/' get endpoint.",
    })
  );
}

function getAPIRoute(req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      data: "our get api endpoint.",
    })
  );
}

function postAPIRoute(req, res) {
  let body = "";
  req.on("error", (err) => {
    res.statusCode = 400;
    res.end(err);
  });
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", function () {
    if (!body) {
      res.statusCode = 400;
      res.end(JSON.stringify({ message: "Invalid data." }));
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(body);
  });
}

module.exports = {
  defaultHandler,
  getHomeRoute,
  getAPIRoute,
  postAPIRoute,
};
```
