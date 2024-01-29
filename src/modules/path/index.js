const http = require("node:http");
const path = require("node:path");

http
  .createServer((req, res) => {
    // console.log(__dirname); // name of current folder
    // console.log(__filename); // name of current file

    console.log(path.dirname(__filename)); // directory name of the file
    console.log(path.extname(__filename)); // only extension of file
    console.log(path.basename(__filename)); // file name with extension
    console.log(path.basename(__filename, ".js")); // file name without extension
    console.log(
      path.format({
        root: "/root",
        dir: "/home/user/dir",
        base: "file.txt",
      })
    ); // if dir is there root will be ignored. /home/user/dir/file.txt
    path.parse("/home/user/dir/file.txt");
    console.log(path.isAbsolute("/foo/bar")); // return true or false based on weather path is absolute or not.
    path.relative("/data/orandea/test/aaa", "/data/orandea/impl/bbb"); // generate relative path
    path.resolve("/foo/bar", "./baz");

    console.log(path.join("/foo", "bar", "//baz/asdf", "quux"));

    res.writeHead(200, { "Content-Type": "text" });
    res.end("Basic GET API");
  })
  .listen(3000, () => {
    console.log(`Listening port 3000`);
  });
