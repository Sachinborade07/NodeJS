// The below code represents the old version to write up the code but you can refer 
// the README.md file to check the newer style to write the code verison 


// import { readFile, appendFileSync } from "fs";
const fs = require("fs");
// The above are two methods to append an file 

// The below is an Synchronous call to an file
// Sync.........
// fs.writeFileSync("./test.txt", "Hello World");
// // If I change the text into the file it will overwrite the above sentence
// fs.writeFileSync("./test.txt", "HELLO SAHCIN");

// You can see the output in "text.txt" file.

// Async........
// fs.writeFile("./test.txt", "Hello World Async", (err) => { });


// Read the File
// Sync Reading 
// const result = fs.readFileSync("./contact.txt", "utf-8");
// console.log(result);

// Async Reading with an error call 
fs.readFile("./contact.txt", "utf-8", (err, result) => {
    if (err) {
        console.log("Error", err);
    }
    else {
        console.log(result);
    }
});


// Appending the DATA
fs.appendFileSync("./test.txt", new Date().getDate().toLocaleString());
// here you can see that the date is getting appended on the DATA 
fs.appendFileSync("./test.txt", "\n Hii");
// the values are getting appended at the next line 



// you can copy a file 
fs.cpSync("./test.txt", "./copy.txt");

// you can delte a file 
fs.unlinkSync("./copy.txt");
//          :)  The file is getting created and delted   (:


// We can also see the logs of the file 
console.log(fs.statSync("./test.txt"));
/* 
Stats {
  dev: 0,
  mode: 33206,
  nlink: 1,
  uid: 0,
  gid: 0,
  rdev: 0,
  blksize: 4096,
  ino: 25332747904102416,
  size: 64,
  blocks: 0,
  atimeMs: 1742928284726.7913,
  mtimeMs: 1742928284726.7913,
  ctimeMs: 1742928284726.7913,
  birthtimeMs: 1742926081520.8943
}
*/