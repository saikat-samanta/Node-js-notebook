const { Buffer, Blob } = require("node:buffer");

const buffer = Buffer.from("Hello, World!", "utf-8");
console.log(buffer.toString()); // Outputs: Hello, World!
for (const [index, value] of buffer.entries()) {
  console.log(`Index: ${index}, Value: ${String.fromCharCode(value)}`);
}

const typedArray = new Uint8Array([72, 101, 108, 108, 111]); // ASCII values for 'Hello'
const bufferFromTypedArray = Buffer.from(typedArray);
console.log(bufferFromTypedArray.toString()); // Outputs: Hello

const textBlob = new Blob(["Hello, World!"], { type: "text/plain" });
console.log(textBlob);
textBlob.arrayBuffer().then((buffer) => {
  const bufferFromTypedArray = Buffer.from(buffer);
  console.log(bufferFromTypedArray.toString()); // Hello, World!
});

const slicedBlob = textBlob.slice(0, 5, "text/plain");
slicedBlob.arrayBuffer().then((buffer) => {
  console.log(Buffer.from(buffer).toString());
});

const stdout = new WritableStream({
  write(chunk) {
    console.log(Buffer.from(chunk).toString());
  },
});

slicedBlob.stream().pipeTo(stdout);

slicedBlob.text().then((value) => {
  console.log(value);
});
