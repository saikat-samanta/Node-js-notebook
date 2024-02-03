const os = require("os");

console.log("Platform:", os.platform());
console.log("OS Version:", os.version());
console.log("Architecture:", os.arch());
console.log("CPU Information:", os.cpus());
console.log("Free Memory:", os.freemem());
console.log("Total Memory:", os.totalmem());

const homeDirectory = os.homedir();
console.log("Home Directory:", homeDirectory);

const userName = os.userInfo();
console.log("User Name:", userName);

const hostname = os.hostname();
console.log("Hostname:", hostname);
