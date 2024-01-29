# Child process

The `child_process` module in Node.js allows you to create and manage child processes. A child process is a separate process that runs concurrently with the parent process. The parent process can create, monitor, and communicate with child processes.

#### NOTE: This module use event driven and callback pattern

## child_process.spawn

This function creates a new process that runs the specified command (can execute `shell` commands). The parent process can communicate with the child process through its standard input, output, and error streams.

| Parameters | type                                                           |
| :--------- | :------------------------------------------------------------- |
| command    | `<string>` The command to run, with space-separated arguments. |
| args?      | `readonly <string[]>`                                          |
| options    | `<Object>`                                                     |

- **options** `<Object>`

  - **cwd**: `<string> | <URL>` Current working directory of the child process. Default: process.cwd().
  - **env**: `<Object>` Environment key-value pairs. Default: process.env.
  - **encoding**: `<string>` Default: 'utf8'
  - **shell**: `<string>` Shell to execute the command with. See Shell requirements and Default Windows shell. Default: '/bin/sh' on Unix, process.env.ComSpec on Windows.
  - **signal**: `<AbortSignal>` allows aborting the child process using an AbortSignal.
  - **timeout**: `<number>` Default: 0
  - **maxBuffer**: `<number>` Largest amount of data in bytes allowed on stdout or stderr. If exceeded, the child process is terminated and any output is truncated. See caveat at maxBuffer and Unicode. Default: 1024 \* 1024.
  - **killSignal**: `<string> | <integer>` Default: 'SIGTERM'
  - **uid**: `<number>` Sets the user identity of the process.
  - **gid**: `<number>` Sets the group identity of the process.
  - **windowsHide**: `<boolean>` Hide the subprocess console window that would normally be created on Windows systems. Default: false.

<br/>

```js
const { spawn } = require("node:child_process");

// # Executing shell command
const ls = spawn("ls", ["-al"]); // same as `ls -al` command in terminal, which will return all direct file and directory name inside root.

ls.stdout.on("data", (data) => {
  // # This will fire when process successfully execute
  console.log(`stdout: ${data}`);
});

ls.stderr.on("data", (data) => {
  // # This will fire when error occur
  console.error(`stderr: ${data}`);
});

ls.on("close", (code) => {
  // # This will fire when process will close
  console.log(`child process exited with code ${code}`);
});
```

## child_process.exec

This function executes the specified script or command and returns the output of the command. The parent process cannot communicate with the child process.

NOTE: This function will spawns a shell then executes the command within that shell

| Parameters | type                                                            |
| :--------- | :-------------------------------------------------------------- |
| command    | `<string>` The command to run, with space-separated arguments.  |
| options?   | `<Object>`                                                      |
| callback?  | `(error: ExecException , stdout: string, stderr: string)=>void` |

- **options** `<Object>`

  - **cwd**: `<string> | <URL>` Current working directory of the child process. Default: process.cwd().
  - **env**: `<Object>` Environment key-value pairs. Default: process.env.
  - **encoding**: `<string>` Default: 'utf8'
  - **shell**: `<string>` Shell to execute the command with. See Shell requirements and Default Windows shell. Default: '/bin/sh' on Unix, process.env.ComSpec on Windows.
  - **signal**: `<AbortSignal>` allows aborting the child process using an AbortSignal.
  - **timeout**: `<number>` Default: 0
  - **maxBuffer**: `<number>` Largest amount of data in bytes allowed on stdout or stderr. If exceeded, the child process is terminated and any output is truncated. See caveat at maxBuffer and Unicode. Default: 1024 \* 1024.
  - **killSignal**: `<string> | <integer>` Default: 'SIGTERM'
  - **uid**: `<number>` Sets the user identity of the process.
  - **gid**: `<number>` Sets the group identity of the process.
  - **windowsHide**: `<boolean>` Hide the subprocess console window that would normally be created on Windows systems. Default: false.

<br/>

```js
const { exec } = require("node:child_process");

// # This will execute `test.sh` file present in this folder.
exec("sh ./test.sh", { cwd: __dirname }, (error, stdout, stderr) => {
  if (error) {
    // # It will log any execution error.
    console.error(`exec error: ${error}`);
    return;
  }
  if (stderr) {
    // # This will log the error if there is any inside `test.sh`.
    console.error(`stderr: ${stderr}`);
    return;
  }
  // # This will log the result after successful execution
  console.log(`stdout: ${stdout}`);
});
```

## child_process.execFile

The `child_process.execFile()` function is similar to `child_process.exec()` except that it does not spawn a shell by default. Rather, the specified executable file is spawned directly as a new process making it slightly more efficient than `child_process.exec()`.

NOTE: Since a shell is not spawned, behaviors such as I/O redirection and file globbing are not supported.

| Parameters | type                                                            |
| :--------- | :-------------------------------------------------------------- |
| file       | `<string>` The name or path of the executable file to run`      |
| args?      | `<string[]>` List of string arguments.                          |
| options?   | `<Object>`                                                      |
| callback?  | `(error: ExecException , stdout: string, stderr: string)=>void` |

- **options** `<Object>`

  - **cwd**: `<string> | <URL>` Current working directory of the child process.
  - **env**: `<Object>` Environment key-value pairs. Default: process.env.
  - **encoding**: `<string>` Default: 'utf8'
  - **timeout**: `<number>` Default: 0
  - **maxBuffer**: `<number>` Largest amount of data in bytes allowed on stdout or stderr. If exceeded, the child process is terminated and any output is truncated. See caveat at maxBuffer and Unicode. Default: 1024 \* 1024.
  - **killSignal**: `<string> | <integer>` Default: 'SIGTERM'
  - **uid**: `<number>` Sets the user identity of the process (see setuid(2)).
  - **gid**: `<number>` Sets the group identity of the process (see setgid(2)).
  - **windowsHide**: `<boolean>` Hide the subprocess console window that would normally be created on Windows systems. Default: false.
  - **windowsVerbatimArguments**: `<boolean>` No quoting or escaping of arguments is done on Windows. Ignored on Unix. Default: false.
  - **shell**: `<boolean> | <string>` If true, runs command inside of a shell. Uses '/bin/sh' on Unix, and process.env.ComSpec on Windows. A different shell can be specified as a string. See Shell requirements and Default Windows shell. Default: false (no shell).
  - **signal**: `<AbortSignal>` allows aborting the child process using an AbortSignal.

  <br>

```js
execFile("node", ["--version"], (error, stdout, stderr) => {
  if (error) {
    // # It will log any execution error.
    throw error;
  }
  if (stderr) {
    // # This will log the error if there is any inside `test.sh`.
    console.log(stderr);
  }
  // # This will log the result after successful execution
  console.log(stdout);
});
```

## child_process.fork

This function creates a new process that is a copy of the parent process. The child process can communicate with the parent process through its standard input, output, and error streams.

**This function can run a javascript file with node.js, but in a child process (for long execution task).**

**This can also be used to create multiple instance of server, so, that if parent server going down then child will handle the request and also help to balance the load.**

| Parameters | type                                                |
| :--------- | :-------------------------------------------------- |
| modulePath | `<string> or <URL>` The module to run in the child. |
| args?      | `<string[]>` List of string arguments.              |
| options?   | `<Object>`                                          |

- **options** `<Object>`
  - **cwd**: `<string> | <URL>` Current working directory of the child process.
  - **detached**: `<boolean>` Prepare child to run independently of its parent process. Specific behavior depends on the platform.
  - **env**: `<Object>` Environment key-value pairs. Default: process.env.
  - **execPath**: `<string>` Executable used to create the child process.
  - **execArgv**: `<string[]>` List of string arguments passed to the executable. Default: process.execArgv.
  - **gid**: `<number>` Sets the group identity of the process (see setgid(2)).
  - **serialization**: `<string>` Specify the kind of serialization used for sending messages between processes. Possible values are 'json' and 'advanced'. See Advanced serialization for more details. Default: 'json'.
  - **signal**: `<AbortSignal>` Allows closing the child process using an AbortSignal.
  - **killSignal**: `<string> | <integer`> The signal value to be used when the spawned process will be killed by timeout or abort signal. Default: 'SIGTERM'.
  - **silent**: `<boolean>` If true, stdin, stdout, and stderr of the child will be piped to the parent, otherwise they will be inherited from the parent, see the 'pipe' and 'inherit' options for child_process.spawn()'s stdio for more details. Default: false.
  - **stdio**: `<Array> | <string>` See child_process.spawn()'s stdio. When this option is provided, it overrides silent. If the array variant is used, it must contain exactly one item with value 'ipc' or an error will be thrown. For instance [0, 1, 2, 'ipc'].
  - **uid**: `<number>` Sets the user identity of the process.
  - **windowsVerbatimArguments**: `<boolean>` No quoting or escaping of arguments is done on Windows. Ignored on Unix. Default: false.
  - **timeout**: `<number>` In milliseconds the maximum amount of time the process is allowed to run. Default: undefined.

```js
// ./index.js

const { fork } = require("node:child_process");

// # forking a child process
const child = fork("./fork.js", { cwd: __dirname });

// # Send data to child process
child.send(30000000);

// # Receive data from child process
child.on("message", (data) => {
  console.log(data);
});
```

```js
// ./fork.js

// # Receive data from parent process
process.on("message", (data) => {
  function myLongTask() {
    // # this is our log execution task in this example
    let out;
    for (let i = 0; i <= data; i++) {
      out = `Loop executed ${i} times`;
    }
    return out;
  }

  // # Send data back to parent
  process.send(myLongTask());
});
```

---

## NOTE: This notes is not covering all the topics relate to child_processes. Suggesting node.js documentation for more details
