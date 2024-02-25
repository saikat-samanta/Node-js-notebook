# Steaming

```js
/**
 * Let's see how video streaming works with node.
 * Here we check only how video streaming work, for more about stream please check stream module
 */

const { Router } = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

// # Create multer middleware instance with destination and file name format rule to upload file
const upload = multer({
  storage: multer.diskStorage({
    destination: path.join(__dirname, "uploads"),
    filename: (req, file, next) => {
      next(null, `upload${path.extname(file.originalname)}`);
    },
  }),
});

const app = Router();

// GET http://localhost:3000/streaming/upload
app.get("/upload", (req, res) => {
  res.send(`
    <form enctype="multipart/form-data" method="POST" action="/streaming/upload">
        <!-- // # "my-file" key is used to send the file in multer -->
        <input type="file" name="my-file" />
        <button type='submit'>Upload File</button>
    </form>
    `);
});

// # Native way to upload buffer
// app.post("/upload", (req, res) => {
// const writableStream = fs.createWriteStream(path.join(__dirname, 'uploads'))
// req.pipe(writableStream);
// req.pipe(res)
// });

// # Used multer middleware for file upload
// # `upload.single` responsible to upload single file
// # `my-file` is the key where we get the file. It use inside form.
app.post("/upload", upload.single("my-file"), (req, res) => {
  res.json(req.file);
});

/**
 * # Here we are streaming the uploaded video.
 * # We implement range-request here, otherwise this API will not works for `safari` browser. Also we will not able to go forward or backward in video.
 * GET http://localhost:3000/streaming/video
 */
app.get("/video", (req, res) => {
  const range = req.headers.range;

  const filePath = path.join(__dirname, "uploads/upload.mp4");

  const fileStat = fs.statSync(filePath);
  const fileSize = fileStat.size;

  let start = 0;
  let end = fileSize - 1;

  if (range) {
    const [_start, _end] = range.replace("bytes=", "").split("-");
    start = Number.parseInt(_start, 10);
    end = _end ? Number.parseInt(_end, 10) : fileSize - 1;
  }

  const readStream = fs.createReadStream(filePath, { start, end });

  res.writeHead(206, {
    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": end - start + 1,
    "Content-Type": "video/mp4",
  });
  readStream.pipe(res);
});

module.exports = app;
```
