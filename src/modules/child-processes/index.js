const { spawn, exec, execFile, fork } = require("node:child_process");

const ls = spawn("ls", ["-al"], { shell: true });

ls.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on("data", (data) => {
  console.error(`stderr: ${data}`);
});

ls.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});

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

execFile("node", ["--version"], (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  if (stderr) {
    console.log(stderr);
  }
  console.log(stdout);
});

const child = fork("./fork.js", { cwd: __dirname });
child.send(30000000);
child.on("message", (data) => {
  console.log(data);
});
