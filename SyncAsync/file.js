const fs = require("fs");
const os = require("os");

console.log("This is an Sync.. Call ");
console.log("1");
// Sync... Blocking....
const result = fs.readFileSync("./contact.txt", "utf-8");
console.log(result);

console.log("2");

console.log("This is an Async.... Call");
console.log("1");
// Async... Non - Blocking....
fs.readFile("./contact.txt", "utf-8", (err, result) => {
    if (err) {
        console.log("Error", err);
    }
    else {
        console.log(result);
    }
});

console.log("2");

// Default thread pool size = 12 as per my machine 
console.log(os.cpus().length);
