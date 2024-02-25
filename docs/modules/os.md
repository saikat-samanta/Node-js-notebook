# Operating System

Node.js `os` module provides a set of operating system-related utility methods. It allows you to retrieve information about the operating system, as well as interact with various aspects of the system environment. The `os` module is part of the core modules in Node.js.

Here are some common uses of os module:

## Retrieving Operating System Information

### Getting Platform Information

```js
// # Imports `os` module
const os = require("os");

/**
 * log:
 * 'darwin' - for macos,
 * 'win32' - for windows,
 * 'linux' - for linux
 * */
console.log("Platform:", os.platform());
```

### Operating System Version

```js
// # Imports `os` module
const os = require("os");

/**
 * This will log your operating system version
 * */
console.log("OS Version:", os.version());
```

### Operating System Architecture

```js
// # Imports `os` module
const os = require("os");

/**
 * This will log your operating system architecture
 *  'x64'- x64 is a 64-bit extension of the x86 architecture,
 *  'arm'- ARM (Acorn RISC Machine) is a family of Reduced Instruction Set Computing (RISC) architectures,
 *  'arm64'- 64-bit version of the ARM architecture,
 *  'ia32'- IA32, also known as x86, is a 32-bit architecture
 * */
console.log("Architecture:", os.arch());
```

### CPU Information

```js
// # Imports `os` module
const os = require("os");

// # Log information of CPU core's
console.log("CPU Information:", os.cpus());
```

### Information of Free Memory in system

```js
// # Imports `os` module
const os = require("os");

// # Log the information of free system memory in bytes
console.log("Free Memory:", os.freemem());
```

### Information of Total Memory in system

```js
// # Imports `os` module
const os = require("os");

// # Log the information of total system memory in bytes
console.log("Total Memory:", os.totalmem());
```

### Average CPU Load

```js
// # Imports `os` module
const os = require("os");

// # Returns an array representing the average load on the system over the last 1, 5, and 15 minutes.
const loadAverage = os.loadavg();
console.log("Average CPU Load:", loadAverage);
```

## Retrieving Environment Information

### Home Directory

```js
// # Imports `os` module
const os = require("os");

// # Returns the path to the home directory of the current user.
const homeDirectory = os.homedir();
console.log("Home Directory:", homeDirectory);
```

### Temp Directory

```js
// # Imports `os` module
const os = require("os");

// # Returns the operating system's default directory for temporary files.
const tempDir = os.tmpdir();
console.log("Temp Directory:", tempDir);
```

### User's Info

```js
// # Imports `os` module
const os = require("os");

// # Returns an object containing information about the current user.
const userName = os.userInfo().username;
console.log("User Name:", userName);
```

## Utility Methods

### Hostname

```js
// # Imports `os` module
const os = require("os");

// # Returns the hostname of the operating system.
const hostname = os.hostname();
console.log("Hostname:", hostname);
```

### Network Interfaces

```js
// # Imports `os` module
const os = require("os");

// # Returns an object that represents the network interfaces on the system.
const networkInterfaces = os.networkInterfaces();
console.log("Network Interfaces:", networkInterfaces);
```

### Uptime

```js
// # Imports `os` module
const os = require("os");

// # Returns the system uptime in seconds.
const uptime = os.uptime();
console.log("Uptime (in seconds):", uptime);
```

## These features can be valuable for performance monitoring, resource management, and adapting your application behavior based on the system environment. Always refer to the official documentation for detailed information and additional features: [Node.js - os Module](https://nodejs.org/api/os.html).
