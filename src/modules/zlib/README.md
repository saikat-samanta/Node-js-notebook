# Zlib

The zlib module in Node.js provides compression and decompression functionalities using the Zlib library. This module supports various compression algorithms such as Gzip, Deflate, and Brotli.

Here is some commonly used methods

## Compression

### `zlib.gzip()`

Compresses a `string | buffer | ArrayBuffer` using Gzip compression.

```js
const zlib = require("zlib");

const inputBuffer = Buffer.from("Hello, zlib!");

zlib.gzip(inputBuffer, (err, compressedBuffer) => {
  if (!err) {
    // Handle compressed data
    console.log(compressedBuffer.toString("base64"));
  }
});
```

### `zlib.deflate()`

Compresses a `string | buffer | ArrayBuffer` using Deflate compression.

```js
const zlib = require("zlib");
const inputBuffer = Buffer.from("Hello, zlib!");

zlib.deflate(inputBuffer, (err, compressedBuffer) => {
  if (!err) {
    // Handle compressed data
    console.log(compressedBuffer.toString("base64"));
  }
});
```

### `zlib.brotliCompress()`

Compresses a `string | buffer | ArrayBuffer` using Brotli compression.

```js
const zlib = require("zlib");
const inputBuffer = Buffer.from("Hello, zlib!");

zlib.brotliCompress(inputBuffer, (err, compressedBuffer) => {
  if (!err) {
    // Handle compressed data
    console.log(compressedBuffer.toString("base64"));
  }
});
```

## Decompression

### `zlib.gunzip()`

Decompresses a Gzip compressed buffer.

```js
const zlib = require("zlib");

const originalData = "Hello, World!";

// Compress the data using Gzip
zlib.gzip(originalData, (err, compressedBuffer) => {
  if (err) {
    console.log(err);
    return;
  }

  // Decompress the buffer using Gzip
  zlib.gunzip(compressedBuffer, (err, decompressedBuffer) => {
    if (err) {
      console.log(err);
      return;
    }

    // Handle decompressed data
    console.log("Compress Data:", compressedBuffer.toString("base64"));
    console.log("Decompressed Data:", decompressedBuffer.toString("utf-8"));
  });
});
```

### `zlib.inflate()`

Decompresses a Deflate compressed buffer.

```js
const zlib = require("zlib");

zlib.inflate(compressedBuffer, (err, decompressedBuffer) => {
  // Handle decompressed data
  console.log(decompressedBuffer.toString("utf-8"));
});
```

### `zlib.brotliDecompress()`

Decompresses a Brotli compressed buffer.

```js
const zlib = require("zlib");

zlib.brotliDecompress(compressedBuffer, (err, decompressedBuffer) => {
  // Handle decompressed data
  console.log(decompressedBuffer.toString("utf-8"));
});
```

## There is also synchronous method to compress and decompress file

- ### `gzipSync`

- ### `deflateSync`

- ### `brotliCompressSync`

- ### `gunzipSync`

- ### `inflateSync`

- ### `brotliDecompressSync`

## Create instance

The `create` functions likely create instances of different compression or decompression classes with specific options.

```js
// Create a Gzip instance with compression level 6
const gzipInstance = zlib.createGzip({ level: 6 });

// Buffer to store the compressed data
let compressedData = Buffer.from("");

// Listen for the 'data' event to capture compressed chunks
gzipInstance.on("data", (chunk) => {
  compressedData = Buffer.concat([compressedData, chunk]);
});

// Listen for the 'end' event to know when the compression is complete
gzipInstance.on("end", () => {
  console.log("Compression complete.");

  // Handle the compressed data
  console.log("Compressed Data:", compressedData.toString("base64"));
});

// Write the original data to the Gzip stream
gzipInstance.write("Hello, World!");
gzipInstance.end();
```

### Compress and decompress

```js
const zlib = require("zlib");
const { Readable } = require("stream");

// Create a Gzip instance with compression level 6
const gzipInstance = zlib.createGzip({ level: 6 });

// Create a Gunzip instance
const gunzipInstance = zlib.createGunzip();

// Buffer to store the compressed data
let compressedData = Buffer.from("");

// Listen for the 'data' event to capture compressed chunks
gzipInstance.on("data", (chunk) => {
  compressedData = Buffer.concat([compressedData, chunk]);
});

// Listen for the 'data' event to capture decompressed chunks
gunzipInstance.on("data", (chunk) => {
  console.log("Decompress data", chunk.toString("utf-8"));
});

// Listen for the 'end' event to know when the decompression is complete
gunzipInstance.on("end", () => {
  console.log("Decompression complete.");
});

// Listen for the 'end' event to know when the compression is complete
gzipInstance.on("end", () => {
  console.log("Compression complete.");

  // Handle the compressed data
  console.log("Compressed Data:", compressedData.toString("base64"));
  const readStream = Readable.from(compressedData);

  // Pipe the Gzip data through the Gunzip stream
  readStream.pipe(gunzipInstance);
});

// Write the original data to the Gzip stream
gzipInstance.write("Hello, World!");
gzipInstance.end();
```

## Piping Streams

The zlib module also allows you to easily compress or decompress streams using the pipe method.

```js
const zlib = require("zlib");
const fs = require("fs");
const path = require("path");

const gzip = zlib.createGzip();

const srcDir = path.join(__dirname, "input.txt");
const destDir = path.join(__dirname, "output.txt.gz");

// Compress a file using Gzip and save it to another file
const readStream = fs.createReadStream(srcDir);
const writeStream = fs.createWriteStream(destDir);

readStream.pipe(gzip).pipe(writeStream);
```

## `zlib.unzip and zlib.unzipSync`

These functions likely handle decompression of zip-format data.

```js
const zlib = require("zlib");

// Example: Asynchronous unzip
zlib.unzip(buffer, { finishFlush: zlib.constants.Z_FINISH }, (err, result) => {
  if (!err) {
    console.log("Unzipped data:", result);
  }
});
```

## `zlib.createUnzip`

Creates an instance for decompressing zip-format data.

```js
const zlib = require("zlib");

// Example: Creating an Unzip instance
const unzipInstance = zlib.createUnzip();
```

## `zlib.flush`

This function likely allows developers to flush any buffered data during compression or decompression, ensuring that all data is processed up to that point.

```js
const zlib = require("zlib");
const fs = require("fs");

// Example: Flushing compressed data
zlib.deflate("Hello, ", (err, compressed1) => {
  zlib.deflate("World!", (err, compressed2) => {
    zlib.flush(zlib.constants.Z_SYNC_FLUSH, () => {
      // Both compressed1 and compressed2 are now fully compressed
      const compressedData = Buffer.concat([compressed1, compressed2]);
      fs.writeFile("compressed_data.gz", compressedData, (err) => {
        if (err) {
          console.error("Error writing compressed data to file:", err);
          return;
        }
        console.log("Compressed data written to file.");
      });
    });
  });
});
```

## `zlib.reset`

This function likely resets the internal state of the zlib stream, allowing for reuse or reinitialization.

```js
const zlib = require("zlib");

// Example: Resetting the zlib stream
zlib.deflate("Hello, World!", (err, compressed1) => {
  zlib.reset();
  zlib.deflate("Another string", (err, compressed2) => {
    // compressed1 and compressed2 are independent
  });
});
```

## `zlib.flush() Vs. zlib.reset()`

`zlib.reset()`: Resets the compression state, clearing any internal state related to compression. It ensures that subsequent compression operations start fresh without any lingering state from previous compressions.

`zlib.flush()`: Flushes the compression buffer, forcing any pending data to be output immediately. It's typically used to control the output of compressed data, such as when you want to ensure that data is transmitted or written to disk before the compression process is complete.

In many cases, you might not need to use zlib.flush() alongside zlib.reset(), as they serve different purposes:

Use `zlib.reset()` when you want to reset the compression state entirely between independent compression operations.

Use `zlib.flush()` when you want to control the output of compressed data, such as when streaming data or writing compressed data to disk or a network socket.

However, there might be scenarios where you need to use them together, such as when you want to reset the compression state and immediately flush any pending data. For example:

```js
// Compress two strings independently
zlib.deflate("Hello, World!", (err, compressed1) => {
  if (err) {
    console.error("Error compressing string 1:", err);
    return;
  }
  console.log("Compressed string 1:", compressed1.toString("base64"));

  // Reset compression state before compressing the second string
  zlib.reset();

  // Flush the compression buffer before compressing the second string
  zlib.flush(zlib.constants.Z_SYNC_FLUSH, () => {
    zlib.deflate("Another string", (err, compressed2) => {
      if (err) {
        console.error("Error compressing string 2:", err);
        return;
      }
      console.log("Compressed string 2:", compressed2.toString("base64"));
    });
  });
});
```

In this example, zlib.flush() is used to ensure that any pending compressed data from the first string is output immediately before resetting the compression state and compressing the second string. This can be useful in scenarios where you want to control the timing of compressed data output or ensure that data is transmitted or written promptly.

## `zlib.ZlibBase`

This class could serve as a base class for other zlib-related classes, providing common functionalities and properties.

```js
const zlib = require("zlib");

// Example: Using zlib.ZlibBase as a base class
class MyCustomCompressor extends zlib.ZlibBase {
  // Implement custom compression logic
}
```
