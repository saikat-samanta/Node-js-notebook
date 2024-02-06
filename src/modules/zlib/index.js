const zlib = require("zlib");
const fs = require("fs");
const path = require("path");
const { Readable } = require("stream");

// const inputBuffer = Buffer.from("Hello, zlib!");

// zlib.gzip(inputBuffer, (err, compressedBuffer) => {
//   // Handle compressed data
//   console.log("888", compressedBuffer.toString("base64"));
// });

// zlib.deflate(inputBuffer, (err, compressedBuffer) => {
//   // Handle compressed data
//   console.log(compressedBuffer.toString("base64"));
// });

// zlib.brotliCompress(inputBuffer, (err, compressedBuffer) => {
//   // Handle compressed data
//   console.log(compressedBuffer.toString("base64"));
// });

// // # compress and decompress

// // Compress the data using Gzip
// zlib.gzip(inputBuffer, (err, compressedBuffer) => {
//   if (err) {
//     console.log(err);
//     return;
//   }

//   // Decompress the buffer using Gzip
//   zlib.gunzip(compressedBuffer, (err, decompressedBuffer) => {
//     if (err) {
//       console.log(err);
//       return;
//     }

//     // Handle decompressed data
//     console.log("Compress Data:", compressedBuffer.toString("base64"));
//     console.log("Decompressed Data:", decompressedBuffer.toString("utf-8"));
//   });
// });

// # //////////
// zlib.inflate(compressedBuffer, (err, decompressedBuffer) => {
//   // Handle decompressed data
//   console.log(decompressedBuffer.toString("utf-8"));
// });

// zlib.brotliDecompress(compressedBuffer, (err, decompressedBuffer) => {
//   // Handle decompressed data
//   console.log(decompressedBuffer.toString("utf-8"));
// });

// // # //////////
// const gzip = zlib.createGzip();

// const srcDir = path.join(__dirname, "input.txt");
// const destDir = path.join(__dirname, "output.txt.gz");

// // Compress a file using Gzip and save it to another file
// const readStream = fs.createReadStream(srcDir);
// const writeStream = fs.createWriteStream(destDir);

// readStream.pipe(gzip).pipe(writeStream);

// // # ////////////////
// // Create a Gzip instance with compression level 6
// const gzipInstance = zlib.createGzip({ level: 6 });

// // Buffer to store the compressed data
// let compressedData = Buffer.from("");

// // Listen for the 'data' event to capture compressed chunks
// gzipInstance.on("data", (chunk) => {
//   compressedData = Buffer.concat([compressedData, chunk]);
// });

// // Listen for the 'end' event to know when the compression is complete
// gzipInstance.on("end", () => {
//   console.log("Compression complete.");

//   // Handle the compressed data
//   console.log("Compressed Data:", compressedData.toString("base64"));
// });

// // Write the original data to the Gzip stream
// gzipInstance.write("Hello, World!");
// gzipInstance.end();

// ## ///////

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
