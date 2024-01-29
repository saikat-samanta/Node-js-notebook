process.on("message", (data) => {
  function myLongTask() {
    // # this is our log execution task in this example
    let out;
    for (let i = 0; i <= data; i++) {
      out = `Loop executed ${i} times`;
    }
    return out;
  }
  process.send(myLongTask());
});
