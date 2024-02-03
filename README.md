# Node-js-notebook

![node.js](https://img.shields.io/badge/Build%20With%20Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![prettier](https://img.shields.io/badge/Formatted%20With%20prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)

Notebook for Node.Js

<img src='https://nodejs.org/static/images/logo.svg' style='width:40vw; background-color:#0d1116;'/>

## Contents

- [Nodejs Modules](https://github.com/saikat-samanta/Node-js-notebook/tree/main/src/modules)
  - [http](https://github.com/saikat-samanta/Node-js-notebook/tree/main/src/modules/http)
  - [path](https://github.com/saikat-samanta/Node-js-notebook/tree/main/src/modules/path)
  - [event](https://github.com/saikat-samanta/Node-js-notebook/tree/main/src/modules/events)
  - [process](https://github.com/saikat-samanta/Node-js-notebook/tree/main/src/modules/process)
  - [file system](https://github.com/saikat-samanta/Node-js-notebook/tree/main/src/modules/fs)
  - [child-processes](https://github.com/saikat-samanta/Node-js-notebook/tree/main/src/modules/child-processes)
  - [stream](https://github.com/saikat-samanta/Node-js-notebook/tree/main/src/modules/stream)
  - [cluster](https://github.com/saikat-samanta/Node-js-notebook/tree/main/src/modules/cluster)
  - [worker-threads](https://github.com/saikat-samanta/Node-js-notebook/tree/main/src/modules/worker-threads)

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
    // # Listing port 3000
    console.log(`Listening port 3000`);
  });

// # You can check this API on your browser 3000 port.
```
