# Node-js-notebook

Notebook for Node.Js

## Before going to individual module, let me tell you, about the node js basic GET API

This is a most basic GET API, which we will use in almost all of the modules to describe their functionality.

```js
// # import default `http` module from node.js
const http = require("node:http");

// # create a server instance, which is listing port 3000.
http
  .createServer((req, res) => {
    // # Creating response header with 200 status code.
    res.writeHead(200, { "Content-Type": "text" });
    // # Sent this string as API response
    res.end("Basic GET API");
  })
  .listen(3000, () => {
    console.log(`Listening port 3000`);
  });

// # You can check this API on your browser 3000 port.
```
