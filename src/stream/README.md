# Stream

- This is the most important module to work with a large set of data.
- `stream` module in Node.js provides a foundation for implementing streaming functionality, allowing you to work with data in a more efficient and scalable way, especially for large datasets. Streams are a sequence of data made available over time, rather than loaded into memory all at once.
- Streams can be readable, writable, or both. All streams are instances of `EventEmitter`.

---

## NOTE: Please read the fs and event module first

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
