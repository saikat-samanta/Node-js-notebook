const { Router } = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: path.join(__dirname, "uploads"),
    filename: (req, file, next) => {
      next(null, `upload${path.extname(file.originalname)}`);
    },
  }),
});

const app = Router();

app.get("/upload", (req, res) => {
  res.send(`
    <form enctype="multipart/form-data" method="POST" action="/streaming/upload">
        <input type="file" name="upload" />
        <button type='submit'>Upload File</button>
    </form>
    `);
});

// app.post("/upload", upload.single("upload"), (req, res) => {
// const writableStream = fs.createWriteStream(path.join(__dirname, 'uploads'))
// req.pipe(writableStream);
// req.pipe(res)
// });

app.post("/upload", upload.single("upload"), (req, res) => {
  res.json(req.file);
});

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
