# PATH module

This module is used to play with file and directory path.

## \_\_dirname

This private variable will return the relative path of current directory

```js
// My file location ./src/path/index.js

console.log(__dirname); // Output: relative_path_to_src/src/path
```

## \_\_filename

This private variable will return the relative path of current file

```js
// My file location ./src/path/index.js

console.log(__filename); // Output: relative_path_to_src/src/path/index.js
```

## path.dirname

This method will return the directory name of given path.

| Parameter | type     |
| --------- | -------- |
| path      | `string` |

| return | `string` |
| ------ | -------- |

```js
// My file location ./src/path/index.js

const path = require("node:path");

console.log(path.dirname(__filename)); // Output: relative_path_to_src/src/path
```

## path.extname

This method will return the extension of the given file path.

| Parameter | type     |
| --------- | -------- |
| path      | `string` |

| return | `string` |
| ------ | -------- |

```js
// My file location ./src/path/index.js

const path = require("node:path");

console.log(path.extname(__filename)); // Output: ".js"
```

## path.basename

This method will return the last portion of the given file path.

| Parameter | type               |
| --------- | ------------------ |
| path      | `string`           |
| suffix    | `string`(optional) |

| return | `string` |
| ------ | -------- |

```js
// My file location ./src/path/index.js

const path = require("node:path");

console.log(path.basename(__filename)); // Output: "index.js"

// # If suffix is provided then that will be removed from output string
console.log(path.basename(__filename, ".js")); // Output: "index"
```

## path.format

This method returns a path string from an object.

| Parameter |      | type                                         |
| --------- | ---- | -------------------------------------------- |
| object    | dir  | `string`(optional)                           |
|           | root | `string`(optional)(ignored if `dir` present) |
|           | base | `string`(optional)                           |
|           | name | `string`(optional)                           |
|           | ext  | `string`(optional)(ignored `base` present)   |

| return | `string` |
| ------ | -------- |

```js
// My file location ./src/path/index.js

const path = require("node:path");

console.log(
  path.format({
    root: "/root",
    dir: "/home/user/dir",
    base: "file.txt",
  })
); // output: /home/user/dir/file.txt
```

## path.parse

This method returns an object whose properties represent significant elements of the path.

| Parameter | type     |
| --------- | -------- |
| path      | `string` |

| Return |      | type     |
| ------ | ---- | -------- |
| object | dir  | `string` |
|        | root | `string` |
|        | base | `string` |
|        | name | `string` |
|        | ext  | `string` |

```js
// My file location ./src/path/index.js

const path = require("node:path");

console.log(path.parse("/home/user/dir/file.txt"));
/* output:
{
  root: "/",
  dir: "/home/user/dir",
  base: "file.txt",
  ext: ".txt",
  name: "file",
};
*/
```

## path.isAbsolute

This method determines if path is an absolute path.

| Parameter | type     |
| --------- | -------- |
| path      | `string` |

| return | `boolean` |
| ------ | --------- |

```js
// My file location ./src/path/index.js

const path = require("node:path");

console.log(path.isAbsolute("/foo/bar")); // true
console.log(path.isAbsolute("qux/")); // false
console.log(path.isAbsolute(".")); // false
```
