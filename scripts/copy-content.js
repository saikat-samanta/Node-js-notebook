const fs = require("fs");
const path = require("path");

const __root = process.cwd();
const regex = /\.md$/;

fs.readdir(path.join(__root, "src"), { recursive: true }, (err, files) => {
  if (err) {
    console.log("Unable to find `src`: \n", err);
  }

  files.forEach((file) => {
    if (regex.test(file)) {
      const _directoryName = path.dirname(file);
      const destDir = path.dirname(`${_directoryName}.md`);
      const destFile = path.basename(`${_directoryName}.md`);

      const isPresent = fs.existsSync(path.join(__root, "docs", destDir));
      if (!isPresent) {
        fs.mkdirSync(path.join(__root, "docs", destDir));
      }

      fs.copyFile(
        path.join(__root, "src", file),
        path.join(__root, "docs", destDir, destFile),
        (err) => {
          if (err) {
            console.log("Failed to copy \n", err);
            return;
          }
          console.log(
            `Copied ${path.join(__root, "src", file)} --> ${path.join(__root, "docs", destDir, destFile)}`
          );
        }
      );
    }
  });
});
