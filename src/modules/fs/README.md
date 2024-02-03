# File system

The Node.js fs (file system) module provides an interface for working with the file system. It allows you to perform various operations related to reading from and writing to files, creating and deleting directories, and more.

## 📝 Working with Files

## Read File Synchronously

```js
// # Import `fs` and `path` module
const fs = require("node:fs");
const path = require("node:path");

try {
  // # Construct file path
  const filePath = path.join(__dirname, "file.txt");

  // # Reading the contents of `file.txt` synchronously
  const data = fs.readFileSync(filePath, "utf8");

  // # Logging file content
  console.log(data);
} catch (err) {
  // # Log error if there is any
  console.error(`Error reading file: ${err.message}`);
}
```

Here `readFileSync` will read the file (`file.txt`) synchronously. So, it will block the JS execution until it got the result or encounter error.

In case of large file, `readFileSync` will be very much inefficient, Because, this will slow down the other task. That's why there is an asynchronous way to do it.

## Asynchronous File Read

```js
// # Import `fs` and `path` module
const fs = require("node:fs");
const path = require("node:path");

// # Construct file path
const filePath = path.join(__dirname, "file.txt");

// # Reading the contents of `file.txt` asynchronously
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    // # Log error if there is any
    console.error(`Error reading file: ${err.message}`);
    return;
  }

  // # Logging file content
  console.log(data);
});
```

- Here, `readFile` will asynchronously read the contents of `file.txt`.
- The callback function will call once the operation is complete, passing any error or the data read.

## Writing to File Synchronously

```js
// # Import `fs` and `path` module
const fs = require("node:fs");
const path = require("node:path");

try {
  // # Construct file path
  const filePath = path.join(__dirname, "file.txt");

  // # Writing `Hello, world!` to `file.txt` synchronously
  fs.writeFileSync(filePath, "Hello, world!", "utf8");

  // # This will log after file got written
  console.log("File written successfully.");
} catch (err) {
  // # Log error if there is any
  console.error(`Error writing to file: ${err.message}`);
}
```

Here `writeFileSync`, Synchronously writes the specified content to `file.txt`. But, again this will block the js execution. So, we need the asynchronous way also.

## Writing to File Asynchronously

```js
// # Import `fs` and `path` module
const fs = require("node:fs");
const path = require("node:path");

// # Construct file path
const filePath = path.join(__dirname, "file.txt");

// # Writing `Hello, world!` to `file.txt` asynchronously
fs.writeFile(filePath, "Hello, world!", "utf8", (err) => {
  if (err) {
    // # Log error if there is any
    console.error(`Error writing to file: ${err.message}`);
    return;
  }
  // # This will log after file got written
  console.log("File written successfully.");
});
```

- Here `writeFile` Asynchronously writes the specified content to 'file.txt'.
- The callback function will call once the operation is complete, passing any error.

<br/>

---

## 📁 Working with Directories

## Create Directory

```js
// # Import `fs` and `path` module
const fs = require("node:fs");
const path = require("node:path");

// # Construct the path where the directory will be created
const dirPath = path.join(__dirname, "my_directory");

// # Asynchronously create `my_directory` inside our current directory
fs.mkdir(dirPath, (err) => {
  if (err) {
    // # Log error if there is any
    console.error(`Error creating directory: ${err.message}`);
    return;
  }

  // # This will log after directory created successfully
  console.log("Directory created successfully.");
});
```

- Here `mkdir`, asynchronously creates a directory named 'my_directory'.
- The callback function is called once the operation is complete, passing any error.

- ### To create directory synchronously we can use `mkdirSync` method

## Read Directory

```js
// # Import `fs` and `path` module
const fs = require("node:fs");
const path = require("node:path");

// # Construct the path from where the directory will be read
const dirPath = path.join(__dirname, "my_directory");

// # Asynchronously reads the contents of `my_directory`
fs.readdir(dirPath, (err, files) => {
  if (err) {
    // # Log error if there is any
    console.error(`Error reading directory: ${err.message}`);
    return;
  }

  // # This will log after directory read successfully
  console.log("Files in the directory:", files);
});
```

- Here `readdir`, asynchronously reads the contents of `my_directory`.
- The callback function is called once the operation is complete, passing any error or an array of file names.

- ### To read directory synchronously we can use `readdirSync` method

## Check if File or Directory Exists

To check if the file or directory exists or not, we can use `access` method. If this method successfully execute without any error that means file or directory already exists.

### File access constants

The following constants are meant for use as the mode parameter passed to `fs.access()` and `fs.accessSync()`.

| Constant | Description                                                                                                                                                                                |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| F_OK     | Flag indicating that the file is visible to the calling process. This is useful for determining if a file exists, but says nothing about rwx permissions. Default if no mode is specified. |
| R_OK     | Flag indicating that the file can be read by the calling process.                                                                                                                          |
| W_OK     | Flag indicating that the file can be written by the calling process.                                                                                                                       |
| X_OK     | Flag indicating that the file can be executed by the calling process. This has no effect on Windows (will behave like fs.constants.F_OK).                                                  |

<br/>

```js
// # Import `fs` and `path` module
const fs = require("node:fs");
const path = require("node:path");

// # Construct the path from where the directory will be read
const dirPath = path.join(__dirname, "my_directory");

/**
 * - Uses the `access` method to check the existence of the directory named `my_directory`.
 *
 * - `fs.constants.F_OK` is a constant indicating the check for the existence of the file.
 *
 * - Checks if the err parameter in the callback is truthy, indicating that an error occurred during the file access check.
 */
fs.access(dirPath, fs.constants.F_OK, (err) => {
  if (err) {
    // # If an error is present, indicating that the Directory does not exist.
    console.error("Directory does not exist.");
    return;
  }

  // # If there is no error, that means the Directory exists.
  console.log("Directory exists.");
});
```

- Here `access`, asynchronously check the existence of `my_directory`.
- The callback function is called once the operation is complete, passing any error if present.

- ### To check the existence of a directory or file synchronously we can use `accessSync` method

## Delete file or directory

```js
// # Import `fs` and `path` module
const fs = require("node:fs");
const path = require("node:path");

// # Construct the path from where the directory will be read
const dirPath = path.join(__dirname, "my_directory");

/**
 * Asynchronously removes files and directories
 * recursive `true` will delete nested directory or files also
 * Checks if the err parameter in the callback is truthy, indicating that an error occurred during deleting.
 */
fs.rm(dirPath, { recursive: true }, (err) => {
  if (err) {
    // # If an error is present, indicating that the unable to delete directory or file.
    console.error(`Error deleting file: ${err.message}`);
    return;
  }

  // # If there is no error, that means the directory or file deleted successfully.
  console.log("File deleted successfully.");
});
```

- Here `rm`, asynchronously remove the file or directory named `my_directory`.
- The callback function is called once the operation is complete, passing any error if present.

- ### To remove file or directory synchronously we can use `rmSync` method

## Rename file or directory

```js
// # Import `fs` and `path` module
const fs = require("node:fs");
const path = require("node:path");

// # Construct the path from where the directory will be read
const dirPath = path.join(__dirname, "my_directory");
// # Construct the path with new name
const renamedPath = path.join(__dirname, "new_name");

fs.rename(dirPath, renamedPath, (err) => {
  if (err) {
    // # If an error is present, indicating that the unable to rename directory or file.
    console.error(`Error renaming file: ${err.message}`);
    return;
  }

  // # If there is no error, that means the directory or file renamed successfully.
  console.log("File renamed successfully.");
});
```

- Here `rename`, asynchronously rename the file or directory from `my_directory` to `new_name`.
- The callback function is called once the operation is complete, passing any error if present.

- ### To rename file or directory synchronously we can use `renameSync` method

---

## These are the common methods we used from `fs` module along with `streaming` methods.

## Refer to the [`Streaming`]('file://../../stream') module for more details
