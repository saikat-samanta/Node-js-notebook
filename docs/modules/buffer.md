# Buffer

Buffer in Node.js is a built-in module that provides a way to work with binary data directly in memory. It is particularly useful when dealing with I/O operations, such as reading from or writing to files, network communication, or interacting with binary data in general.

## Buffers and Character Encodings

When dealing with text-based data, it's important to consider character encodings. A character encoding is a system that assigns a unique number to each character in a character set, allowing computers to represent and manipulate text.

```js
const { Buffer } = require("node:buffer");

// Creating a Buffer from a string using the UTF-8 encoding.
const buffer = Buffer.from("Hello, World!", "utf-8");

// Converts the Buffer back to a string using the UTF-8 encoding.
const text = buffer.toString("utf-8");

console.log(buffer); // Outputs: <Buffer 48 65 6c 6c 6f 2c 20 57 6f 72 6c 64 21>
console.log(text); // Outputs: Hello, World!
```

## Buffers and TypedArrays

Buffers and TypedArrays provide similar functionalities for handling binary data, but they have some differences in terms of memory management and usage. Buffers are often used for network operations, while TypedArrays are used in the browser environment for working with binary data in the context of the HTML5 canvas and WebGL.

```js
const { Buffer } = require("node:buffer");

const typedArray = new Uint8Array([72, 101, 108, 108, 111]); // ASCII values for 'Hello'

const bufferFromTypedArray = Buffer.from(typedArray);
console.log(bufferFromTypedArray.toString()); // Outputs: Hello
```

## Buffers and Iteration

Buffers can be iterated using various methods like `entries()`, `keys()`, and `values()`.

```js
const { Buffer } = require("node:buffer");

const buffer = Buffer.from("Hello, World!", "utf-8");

for (const [index, value] of buffer.entries()) {
  console.log(`Index: ${index}, Value: ${String.fromCharCode(value)}`);
}
```

## Blob Class

In web development, particularly in browsers, the Blob (Binary Large Object) class is used to represent binary data as a single large object. It is commonly used for handling and manipulating binary data, such as images, audio, or other types of files.

### Creating a Blob

```js
const { Blob } = require("node:buffer");

const textBlob = new Blob(["Hello, World!"], { type: "text/plain" });
const imageBlob = new Blob([imageData], { type: "image/jpeg" });
```

The Blob constructor takes an array of data as its first argument and an optional configuration object as its second argument.

## Blob methods

### `blob.arrayBuffer()`

Returns a promise that resolves with an `ArrayBuffer` containing the entire content of the `Blob`.

```js
const { Blob } = require("node:buffer");

const textBlob = new Blob(["Hello, World!"], { type: "text/plain" });
textBlob.arrayBuffer().then((buffer) => {
  const bufferFromTypedArray = Buffer.from(buffer);
  console.log(bufferFromTypedArray.toString()); // Hello, World!
});
```

### `blob.size`

Returns the size (in bytes) of the Blob.

```js
const textBlob = new Blob(["Hello, World!"], { type: "text/plain" });
console.log(textBlob.size); // Outputs the size of the Blob
```

### `blob.slice(start, end, type)`

Creates and returns a new Blob containing a subset of this Blob objects data. The original Blob is not altered.

| Parameters | Description                       |
| ---------- | --------------------------------- |
| start      | The starting index.               |
| end        | The ending index.                 |
| type       | The content-type for the new Blob |

```js
const { Blob } = require("node:buffer");

const textBlob = new Blob(["Hello, World!"], { type: "text/plain" });

// Slice the blob content to `Hello`
const slicedBlob = textBlob.slice(0, 5, "text/plain");

slicedBlob.arrayBuffer().then((buffer) => {
  console.log(Buffer.from(buffer).toString()); // Hello
});
```

### `blob.stream()`

Returns a new ReadableStream that allows the content of the Blob to be read.

```js
const { Blob } = require("node:buffer");

const textBlob = new Blob(["Hello, World!"], { type: "text/plain" });

const writableStream = new WritableStream({
  write(chunk) {
    console.log(Buffer.from(chunk).toString()); // "Hello, World!"
  },
});

const stream = textBlob.stream();
stream.pipeTo(writableStream);
```

### `blob.text()`

Returns a promise that resolves with a string representing the contents of the `Blob`.

```js
const { Blob } = require("node:buffer");

const textBlob = new Blob(["Hello, World!"], { type: "text/plain" });

textBlob.text().then((text) => {
  console.log(text); // "Hello, World!"
});
```

### `blob.type`

Returns the MIME type of the `Blob`.

```js
const { Blob } = require("node:buffer");

const textBlob = new Blob(["Hello, World!"], { type: "text/plain" });

console.log(textBlob.type); // Outputs the MIME type of the Blob
```

## Buffer methods

### `Buffer.from(data[, encoding])`

Creates a new buffer from various data sources, such as strings, arrays, or array-like objects.

```js
const { Buffer } = require("node:buffer");

// # Create buffer from a String
const bufferFromString = Buffer.from("Hello, World!", "utf-8");

// # Create buffer from a ArrayBuffer
const arrayBuffer = new ArrayBuffer(8);
const bufferFromArrayBuffer = Buffer.from(arrayBuffer);
```

### `Buffer.alloc(size[, fill[, encoding]])`

Allocates a new buffer of the specified size. Optionally, we can fill the buffer with a specific value.

```js
const { Buffer } = require("node:buffer");

const buffer = Buffer.alloc(5);

buffer.write("Hello", "utf-8");
console.log(buffer.toString()); // Output: Hello
```

### `buffer.toString([encoding[, start[, end]]])`

Converts the buffer to a string. The encoding parameter is optional and determines how the binary data should be interpreted.

```js
const { Buffer } = require("node:buffer");

// Creating a Buffer
const buffer = Buffer.from("Hello, Buffer!", "utf-8");

console.log("Buffer Content:", buffer.toString()); // 'Hello, Buffer!'
```

### `buffer.length`

Returns the size of the buffer.

```js
const { Buffer } = require("node:buffer");

// Creating a Buffer
const buffer = Buffer.from("Hello, Buffer!", "utf-8");

console.log("Buffer Content:", buffer.length);
```

### `buffer.subarray([start[, end]])`

Creates and returns a new buffer containing a subset of original buffer. The original buffer is not altered.

```js
const { Buffer } = require("node:buffer");

// Creating a Buffer
const buffer = Buffer.from("Hello, Buffer!", "utf-8");

console.log("Buffer Content:", buffer.subarray(0, 5)); // Return buffer of `Hello`
```

### `Buffer.compare(buf1, buf2)`

Compare two buffer

```js
const { Buffer } = require("node:buffer");

const buf1 = Buffer.from("1234");
const buf2 = Buffer.from("0123");
const arr = [buf1, buf2];

console.log(arr.sort(Buffer.compare));
// Prints: [ <Buffer 30 31 32 33>, <Buffer 31 32 33 34> ]
```

### `Buffer.concat(list[, totalLength])`

Returns a new Buffer which is the result of concatenating all the Buffer instances in the list together.

```js
const { Buffer } = require("node:buffer");

// Create a single `Buffer` from a list of three `Buffer` instances.

const buf1 = Buffer.alloc(10);
const buf2 = Buffer.alloc(14);
const buf3 = Buffer.alloc(18);

const bufA = Buffer.concat([buf1, buf2, buf3]);

console.log(bufA);
// Prints: <Buffer 00 00 00 00 ...>
```
