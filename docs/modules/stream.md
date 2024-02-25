# Stream

## ❗️❗️❗️ This is the most largest module to work with ❗️❗️❗️

- This is the most important module to work with a large set of data.
- `stream` module in Node.js provides a foundation for implementing streaming functionality, allowing you to work with data in a more efficient and scalable way, especially for large datasets. Streams are a sequence of data made available over time, rather than loaded into memory all at once.
- Streams can be readable, writable, or both. All streams are instances of `EventEmitter`.

---

## NOTE: Please read the `fs` and `event` module first

## Readable stream

Readable streams provide a way to read data piece by piece. Think of it like reading a book one page at a time.

```js
const { Readable } = require("stream");

let index = 1;

const myEbook = new Readable({
  read(size) {
    // Producing data
    if (index <= 10) {
      // # data are pushing one after another
      this.push(`content of page number ${index} with size ${size}`);
      index++;
    } else {
      this.push(null);
    }
  },
});

myEbook.on("data", (chunk) => {
  console.log(chunk.toString());
});
```

So, what is happening here. Suppose you have a ebook of 10 pages, and which page number you are currently in that is `index` variable. Now when your ebook loaded the first page get loaded, and then after that next pages are loaded serially one by one. When the end of the page is reached, `this.push(null)` is used to signal the end of the stream.

## Let's take it one step farther

Now, we have an array and we will read it in chunk.

```js
const { Readable } = require("stream");

// # List of books
const bookNames = [
  "To Kill a Mockingbird",
  "1984",
  "The Great Gatsby",
  "One Hundred Years of Solitude",
  "Brave New World",
  "The Catcher in the Rye",
  "Animal Farm",
  "Fahrenheit 451",
  "The Lord of the Rings",
  "The Hobbit",
  "Harry Potter and the Sorcerer's Stone",
  "Pride and Prejudice",
  "The Chronicles of Narnia",
  "The Hunger Games",
  "The Da Vinci Code",
  "The Alchemist",
  "The Shining",
  "The Kite Runner",
  "The Road",
  "The Hitchhiker's Guide to the Galaxy",
];

// # create our own class to read the array
class StreamFromArray extends Readable {
  constructor(array) {
    /**
     * There is two mode to stream the data object mode and binary mode(default).
     * in object mode we stream any object type data
     */
    super({ objectMode: true });
    this.array = array;
    this.index = 0;
  }

  _read() {
    if (this.index < this.array.length) {
      // # Next line can be stream in binary mode
      // const chunk = this.array[this.index]

      // # This need object mode to stream
      const chunk = {
        data: this.array[this.index],
        index: this.index,
      };

      // # Pushing object as a data chunk
      this.push(chunk);
      this.index += 1;
    } else {
      this.push(null);
    }
  }
}

const bookStream = new StreamFromArray(bookNames);

bookStream.on("data", (chunk) => console.log(chunk));

bookStream.on("end", () => console.log("done!"));
```

So, What's happening here,

- Define the Custom Readable Stream Class `StreamFromArray`
- The `StreamFromArray` class extends `Readable` and takes an array as a parameter.
- The `objectMode: true` option is set to indicate that the stream will emit objects rather than strings or buffers.
- The `_read` method is implemented to push chunks of data into the stream. It reads from the array and pushes an object containing the book name (`data`) and its index (`index`)
- When the end of the array is reached, `this.push(null)` is used to signal the end of the stream.

### Instead of creating our own stream class, we mostly work with node inbuilt stream methods in this tutorial

## Readable file stream

Let's see how we can implement a stream reader to read a file in chunk. This is very important when you work with a large file.

Advantages:

- This approach allows for the asynchronous processing of data, making it suitable for large files that might exceed available memory.
- By working with smaller chunks of data, streams enhance performance, particularly in scenarios where only parts of the file need to be processed, contributing to a more network-efficient and scalable solution for handling I/O operations.

<br/>

```js
/**
 * imports the fs module, which provides file system-related functionality,
 * and the path module for working with file paths.
 */
const fs = require("fs");
const path = require("path");

// # This line constructs the full path to the video file
const videoPath = path.join(__dirname, "sample-video.mp4");

/**
 * The code uses `fs.createReadStream()` to create a readable stream (`readStream`) from the video file.
 *  This stream allows for reading the file in smaller chunks, making it more memory-efficient for large files.
 */
const readStream = fs.createReadStream(videoPath);

/**
 * Set up an event listener for the "data" event on the stream.
 * Whenever a chunk of data is read from the file, the provided callback function is executed.
 * In this case, it logs the size of each chunk to the console.
 */
readStream.on("data", (chunk) => {
  console.log("size: ", chunk.length);
});

/**
 * This `end` event is triggered when the entire file has been read.
 * The callback logs a message indicating that the read stream has finished.
 */
readStream.on("end", () => {
  console.log("read stream finished");
});

/**
 * If any error occurs during the reading process,
 * the callback function logs an error message to the console.
 */
readStream.on("error", (error) => {
  console.error("an error has occured.", error);
});
```

## Non-Flowing Mode of stream

In previous example we see that data it flowing until there is no data to flow, and then it fires the `end` event. But, in this below example we will see that data it not flowing automatically one after another, instead it is asking for next data.

```js
// # Asking for data to enter
process.stdin.on("data", (chunk) => {
  const input = chunk.toString();
  console.log("echo: ", input);
});

// # As it is non-flowing mode so, this event will not fire automatically
process.stdin.on("end", () => {
  console.log("Input stream end");
});
```

## How to make Flowing mode to Non-Flowing mode?

You can `pause` a stream and start reading it again or you can `resume` the flow. So, by the help of `pause`, `read`, and `resume` method you can make a stream Flowing mode to Non-Flowing mode.

```js
// # This code is same a previous example
const fs = require("fs");
const path = require("path");

const videoPath = path.join(__dirname, "sample-video.mp4");

const readStream = fs.createReadStream(videoPath);

readStream.on("data", (chunk) => {
  console.log("size: ", chunk.length);
});

readStream.on("end", () => {
  console.log("read stream finished");
});

readStream.on("error", (error) => {
  console.error("an error has occured.", error);
});

// # This will pause the read stream until you hit enter in terminal.
readStream.pause();

process.stdin.on("data", (chunk) => {
  if (chunk.toString().trim() === "finish") {
    // # When we write `finish` in the terminal and hit `Enter`, then this read stream again go into `Flowing mode` and read rest of the data.
    readStream.resume();
  }
  // # This will read one chunk of data at a time
  readStream.read();
});
```

## Writable stream

Writable streams represent a destination to which data can be written. Data can be file, or sending HTTP response (pre rendered page)

Here is a basic implementation of a writable stream by the help of `Writable` class.

```js
const { Writable } = require("stream");

// Custom writable stream
const myWritableStream = new Writable({
  write(chunk, encoding, callback) {
    // Implementation to consume data
    console.log(
      `Received data: ${chunk.toString()} \n`,
      `encoding: ${encoding}`
    );
    callback();
  },
});

myWritableStream.write("hey");
myWritableStream.write("this is");
myWritableStream.write("writable stream");

myWritableStream.end();
```

## Writable file stream

Let's suppose you need to copy a large file to somewhere in your project programmatically. But, remember file size it very large, so, if you use `readFile` and `writeFile` method from `fs` that will make your JS execution block or either slow because of Memory overload.

In that case writable stream can, efficiently copies a large file by streaming it in chunks, ensuring non-blocking and memory-efficient file operations.

```js
// # Imports the createReadStream and createWriteStream functions from the 'fs' module.
const { createReadStream, createWriteStream } = require("fs");

// # Constructs the full file paths for the source and destination
const filePath = path.join(__dirname, "sample-video.mp4");
const destinationPath = path.join(__dirname, "copy.mp4");

// # `createReadStream` to create a readable stream (`readStream`) from the source file and `createWriteStream` to create a writable stream (`writeStream`) for the destination file.
const readStream = createReadStream(filePath);
const writeStream = createWriteStream(destinationPath);

// # A listener is set up for the `data` event on the readStream. This event is triggered whenever a chunk of data is read from the source file. The provided callback function writes each chunk to the `writeStream`.
readStream.on("data", (chunk) => {
  writeStream.write(chunk);
});

// # listener for the `error` event on the `readStream`
readStream.on("error", (error) => {
  console.log("an error occurred", error.message);
});

// # listener for the `end` event on the `readStream`
readStream.on("end", () => {
  writeStream.end();
});

// # listener for the `close` event on the `writeStream` is set up. When the writeStream is closed, the callback function prints a success message to the console.
writeStream.on("close", () => {
  process.stdout.write("file copied\n");
});
```

This code efficiently copies the content of the source file to a destination file using readable and writable streams, while handling events to ensure proper error handling and completion log.

## Backpressure

Some time data coming from readable stream is to fast to writable stream to handle. It will cause overflow of data.

So, in that case we will `pause` the readable stream until writable stream got empty, then again we `resume` the readable stream. And will continue this process until all the data transfer to the destination.

How much data can be handle by writable stream is called `highWaterMark`. Remember, setting large `highWaterMark` value will consume more memory of your system.

<img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1640304889813/X1crxq_LA.jpeg?auto=compress,format&format=webp" alt="Backpressure" width="600"/>

Here is example. that, how we can handle the backpressure.

```js
const { createReadStream, createWriteStream } = require("fs");

const filePath = path.join(__dirname, "sample-video.mp4");
const destinationPath = path.join(__dirname, "copy.mp4");

const readStream = createReadStream(filePath);
const writeStream = createWriteStream(destinationPath, {
  /**
   * By increasing the highWaterMark value we are increasing the buffer memory to hold a large amount of data. But, again it will increase system memory consumption.
   */
  // highWaterMark: 163811,
});

readStream.on("data", (chunk) => {
  const result = writeStream.write(chunk);
  // # It there is a backpressure `writeStream` will unable to write. So, the `result` will be empty
  if (!result) {
    console.log("backpressure");
    // # `pause` readStream when there is a backpressure
    readStream.pause();
  }
});

readStream.on("error", (error) => {
  console.log("an error occurred", error.message);
});

readStream.on("end", () => {
  writeStream.end();
});

// # `drain` event will fire when all the data in `writeStream` is drained.
writeStream.on("drain", () => {
  console.log("drained");
  // # When `writeStream` got drained, we `resume` the `readStream` again.
  readStream.resume();
});

writeStream.on("close", () => {
  process.stdout.write("file copied\n");
});
```

## Pipe

### Let me tell you, all the code we wrote to copy the file and handling backpressure is very complex and less maintainable, and also not needed. `Pipe` method can do that for us in just one line.🤣🤣🤣

`pipe` method is a powerful feature in Node.js streams that simplifies the process of transferring data from a readable stream to a writable stream. It helps in managing data flow, handling backpressure, and simplifying code for stream-related operations.

Here is the simplified version of the same code using `pipe` method.

```js
const { createReadStream, createWriteStream } = require("fs");

const filePath = path.join(__dirname, "sample-video.mp4");
const destinationPath = path.join(__dirname, "copy.mp4");

const readStream = createReadStream(filePath);
const writeStream = createWriteStream(destinationPath);

// # Any writable stream can pipe through a readable stream
readStream
  .pipe(writeStream)
  .on("close", () => {
    process.stdout.write("file copied\n");
  })
  .on("error", (error) => {
    console.log("an error occurred", error.message);
  });
```

## Duplex stream

Duplex Streams in Node.js combine the features of both Readable and Writable Streams, allowing for bidirectional communication. Duplex Streams are implemented as instances of the Duplex class in the stream module. They have both a readable and a writable side, providing a full-duplex communication channel.

It's like a walkie-talkie – you can talk and listen at the same time.

```js
const { Duplex } = require("stream");

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
  objectMode: true,
});

// # Same stream as a read and write stream
myStream.pipe(myStream);
```

## Transform stream

Transform Streams in Node.js extend the Duplex Stream class and are designed to modify or transform the data as it is being read or written. They provide a way to perform operations on the data passing through the stream, making them useful for tasks such as compression, encryption, or any other data manipulation.

```js
const { Duplex, Transform } = require("stream");

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
  objectMode: true,
});

const transformStream = new Transform({
  transform(chunk, encoding, callback) {
    // # Implementation for transforming data. It will make the data upper case
    const modifiedData = chunk.toString().toUpperCase();
    this.push(modifiedData);
    callback();
  },
});

myStream.pipe(transformStream).pipe(myStream);
```

## PassThrough Stream

A PassThrough Stream in Node.js is a special type of Transform Stream that simply passes the input data through to the output without any modifications. It acts as a transparent conduit, allowing data to flow through it unchanged. PassThrough Streams are useful to visualize data flow, reporting and auditing.

```js
const { Duplex, PassThrough } = require("stream");

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

// # Creating instance from `PassThrough` class
const report = new PassThrough();

// # Reporting total data flow
let totalDataFlow = 0;
report.on("data", (chunk) => {
  totalDataFlow += chunk.length;
  console.log(`Total data flow till now: ${totalDataFlow}`);
});

myStream.pipe(report).pipe(myStream);
```
