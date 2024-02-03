const fs = require("node:fs");
const path = require("node:path");

// // # Synchronous File Read
// try {
//   const filePath = path.join(__dirname, "file.txt");
//   const data = fs.readFileSync(filePath, "utf8");
//   console.log(data);
// } catch (err) {
//   console.error(`Error reading file: ${err.message}`);
// }

// // # Asynchronous File Read
// const filePath = path.join(__dirname, "file.txt");
// fs.readFile(filePath, "utf8", (err, data) => {
//   if (err) {
//     console.error(`Error reading file: ${err.message}`);
//     return;
//   }
//   console.log(data);
// });

// // # Synchronous Write File
// try {
//   const filePath = path.join(__dirname, "file.txt");
//   fs.writeFileSync(filePath, "Hello, world!", "utf8");
//   console.log("File written successfully.");
// } catch (err) {
//   console.error(`Error writing to file: ${err.message}`);
// }

// // # Asynchronous Write File
// const filePath = path.join(__dirname, "file.txt");
// fs.writeFile(filePath, "Hello, world!", "utf8", (err) => {
//   if (err) {
//     console.error(`Error writing to file: ${err.message}`);
//     return;
//   }
//   console.log("File written successfully.");
// });

const dirPath = path.join(__dirname, "my_directory");
// fs.mkdir(dirPath, (err) => {
//   if (err) {
//     console.error(`Error creating directory: ${err.message}`);
//     return;
//   }
//   console.log("Directory created successfully.");
// });

// fs.access(dirPath, fs.constants.F_OK, (err) => {
//   if (err) {
//     console.error("File does not exist.");
//     return;
//   }
//   console.log("File exists.");
// });

// fs.readdir(dirPath, (err, files) => {
//   if (err) {
//     console.error(`Error reading directory: ${err.message}`);
//     return;
//   }
//   console.log("Files in the directory:", files);
// });

// fs.rm(dirPath, { recursive: true }, (err) => {
//   if (err) {
//     console.error(`Error deleting file: ${err.message}`);
//     return;
//   }
//   console.log("File deleted successfully.");
// });

fs.rename(dirPath, path.join(__dirname, "new_name"), (err) => {
  if (err) {
    console.error(`Error renaming file: ${err.message}`);
    return;
  }
  console.log("File renamed successfully.");
});
