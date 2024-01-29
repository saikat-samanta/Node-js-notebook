const { Readable } = require("stream");

let index = 1;

const myEbook = new Readable({
  read(size) {
    // Producing data
    if (index <= 10) {
      // # data are streaming one after another
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

// # Reading data from array

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

class StreamFromArray extends Readable {
  constructor(array) {
    super({ objectMode: true });
    this.array = array;
    this.index = 0;
  }

  _read() {
    if (this.index < this.array.length) {
      const chunk = {
        data: this.array[this.index],
        index: this.index,
      };
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
