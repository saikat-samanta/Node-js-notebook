const fs = require("fs");
const path = require("path");

const __root = process.cwd();

const regex = /^(?!.*_)(\D+).md$/;

fs.readdir(path.join(__root, "docs"), { recursive: true }, (err, files) => {
  if (err) {
    console.log("Unable to find `docs`: \n", err);
  }

  const contentHeader = [];

  let fileContent = `<!-- docs/_sidebar.md -->
`;

  files.forEach((file) => {
    if (regex.test(file)) {
      let destDir = path.dirname(file);
      if (destDir === ".") {
        destDir = "home";
      }
      const dirs = destDir.split("/");
      const baseName = path.basename(file, ".md");

      if (!contentHeader.includes(dirs[dirs.length - 1])) {
        fileContent += `- [${dirs[dirs.length - 1].toUpperCase()}](/${file})\n`;
        contentHeader.push(dirs[dirs.length - 1]);
      }

      if (baseName !== "README") {
        fileContent += `  - [${baseName}](/${file})\n`;
      }

      console.log(file, baseName);
    }
  });
  console.log(fileContent);
  fs.writeFile(path.join(__root, "docs", "_sidebar.md"), fileContent, (err) => {
    if (err) {
      console.log(err);
    }
  });
});
