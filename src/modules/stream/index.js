const {
  Readable,
  Writable,
  Duplex,
  Transform,
  PassThrough,
} = require("stream");
const fs = require("fs");
const path = require("path");

// // # Readable stream
// let index = 1;

// const myEbook = new Readable({
//   read(size) {
//     // Producing data
//     if (index <= 10) {
//       // # data are streaming one after another
//       this.push(`content of page number ${index} with size ${size}`);
//       index++;
//     } else {
//       this.push(null);
//     }
//   },
// });

// myEbook.on("data", (chunk) => {
//   console.log(chunk.toString());
// });

// // # Reading data from array

// const bookNames = [
//   "To Kill a Mockingbird",
//   "1984",
//   "The Great Gatsby",
//   "One Hundred Years of Solitude",
//   "Brave New World",
//   "The Catcher in the Rye",
//   "Animal Farm",
//   "Fahrenheit 451",
//   "The Lord of the Rings",
//   "The Hobbit",
//   "Harry Potter and the Sorcerer's Stone",
//   "Pride and Prejudice",
//   "The Chronicles of Narnia",
//   "The Hunger Games",
//   "The Da Vinci Code",
//   "The Alchemist",
//   "The Shining",
//   "The Kite Runner",
//   "The Road",
//   "The Hitchhiker's Guide to the Galaxy",
// ];

// class StreamFromArray extends Readable {
//   constructor(array) {
//     super({ objectMode: true });
//     this.array = array;
//     this.index = 0;
//   }

//   _read() {
//     if (this.index < this.array.length) {
//       const chunk = {
//         data: this.array[this.index],
//         index: this.index,
//       };
//       this.push(chunk);
//       this.index += 1;
//     } else {
//       this.push(null);
//     }
//   }
// }

// const bookStream = new StreamFromArray(bookNames);

// bookStream.on("data", (chunk) => console.log(chunk));

// bookStream.on("end", () => console.log("done!"));

// // # Readable file stream

// const videoPath = path.join(__dirname, "sample-video.mp4");

// const readStream = fs.createReadStream(videoPath);

// readStream.on("data", (chunk) => {
//   console.log("size: ", chunk.length);
// });

// readStream.on("end", () => {
//   console.log("read stream finished");
// });

// readStream.on("error", (error) => {
//   console.error("an error has occured.", error);
// });

// readStream.pause();
// process.stdin.on("data", (chunk) => {
//   if (chunk.toString().trim() === "finish") {
//     readStream.resume();
//   }
//   readStream.read();
// });

// // # Non flowing stream
// process.stdin.on("data", (chunk) => {
//   const input = chunk.toString();
//   console.log("echo: ", input);
// });

// process.stdin.on("end", () => {
//   console.log("Input stream end");
// });

// // # writable stream

// // Custom writable stream
// const myWritableStream = new Writable({
//   write(chunk, encoding, callback) {
//     // Implementation to consume data
//     console.log(
//       `Received data: ${chunk.toString()} \n`,
//       `encoding: ${encoding}`
//     );
//     callback();
//   },
// });

// myWritableStream.write("hey");
// myWritableStream.write("this is");
// myWritableStream.write("writable stream");

// myWritableStream.end();

// // # writeable file stream

// const { createReadStream, createWriteStream } = require("fs");

// const filePath = path.join(__dirname, "sample-video.mp4");
// const destinationPath = path.join(__dirname, "copy.mp4");

// const readStream = createReadStream(filePath);
// const writeStream = createWriteStream(destinationPath);

// readStream.on("data", (chunk) => {
//   writeStream.write(chunk);
// });

// readStream.on("error", (error) => {
//   console.log("an error occurred", error.message);
// });

// readStream.on("end", () => {
//   writeStream.end();
// });

// writeStream.on("close", () => {
//   process.stdout.write("file copied\n");
// });

// // # Backpressure
// const { createReadStream, createWriteStream } = require("fs");

// const filePath = path.join(__dirname, "sample-video.mp4");
// const destinationPath = path.join(__dirname, "copy.mp4");

// const readStream = createReadStream(filePath);
// const writeStream = createWriteStream(destinationPath, {
//   /**
//    * By increasing the highWaterMark value we are increasing the buffer memory to hold a large amount of data. But, again it will increase system memory consumption.
//    */
//   highWaterMark: 16389,
// });

// readStream.on("data", (chunk) => {
//   const result = writeStream.write(chunk);
//   // # It there is a backpressure `writeStream` will unable to write. So, the `result` will be empty
//   if (!result) {
//     console.log("backpressure");
//     // # `pause` readStream when there is a backpressure
//     readStream.pause();
//   }
// });

// readStream.on("error", (error) => {
//   console.log("an error occurred", error.message);
// });

// readStream.on("end", () => {
//   writeStream.end();
// });

// // # `drain` event will fire when all the data in `writeStream` is drained.
// writeStream.on("drain", () => {
//   console.log("drained");
//   // # When `writeStream` got drained, we `resume` the `readStream` again.
//   readStream.resume();
// });

// writeStream.on("close", () => {
//   process.stdout.write("file copied\n");
// });

// // # Pipe

// const { createReadStream, createWriteStream } = require("fs");

// const filePath = path.join(__dirname, "sample-video.mp4");
// const destinationPath = path.join(__dirname, "copy.mp4");

// const readStream = createReadStream(filePath);
// const writeStream = createWriteStream(destinationPath);

// readStream
//   .pipe(writeStream)
//   .on("close", () => {
//     process.stdout.write("file copied\n");
//   })
//   .on("error", (error) => {
//     console.log("an error occurred", error.message);
//   });

// const myStream = new Duplex({
//   read(size) {
//     // # Producing data
//     this.push("Some data");
//   },
//   write(chunk, encoding, callback) {
//     // # Consuming data
//     console.log(`Received data: ${chunk}`);
//     callback();
//   },
//   objectMode: true,
// });

// myStream.pipe(myStream);

// const myStream = new Duplex({
//   read(size) {
//     // # Producing data
//     this.push("Some data");
//   },
//   write(chunk, encoding, callback) {
//     // # Consuming data
//     console.log(`Received data: ${chunk}`);
//     callback();
//   },
//   objectMode: true,
// });

// const transformStream = new Transform({
//   transform(chunk, encoding, callback) {
//     // Modifying data
//     const modifiedData = chunk.toString().toUpperCase();
//     this.push(modifiedData);
//     callback();
//   },
// });

// myStream.pipe(transformStream).pipe(myStream);

const myStream = new Duplex({
  read(size) {
    // # Producing data
    this.push("Some data");
  },
  write(chunk, encoding, callback) {
    // # Consuming data
    console.log(`Received data: ${chunk}`);
    callback();
  },
});

const report = new PassThrough();

let totalDataFlow = 0;
report.on("data", (chunk) => {
  totalDataFlow += chunk.length;
  console.log(`Total data flow till now: ${totalDataFlow}`);
});

myStream.pipe(report).pipe(myStream);
