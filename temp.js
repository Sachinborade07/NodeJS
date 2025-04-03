// let promise = new Promise((resolve, reject) => {
//     setTimeout(() => resolve("Success!"), 2000);
// });

// promise.then((message) => console.log(message)); // Logs "Success!" after 2 seconds


// fetchData()
//     .then(data => console.log(data))
//     .catch(error => console.error(error));


// function greet(name, callback) {
//     console.log(`Hello, ${name}`);
//     callback();
// }

// function done() {
//     console.log("Callback executed!");
// }

// greet("Alice", done);


// async function processData() {
//     try {
//         let x = y + 10; // ❌ ReferenceError (synchronous error)
//         let response = await fetch('invalid-url'); // ❌ Fetch error (asynchronous error)
//         let data = await response.json();
//         console.log(data);
//     } catch (error) {
//         console.error('Caught an error:', error.message);
//     }
// }

// processData();


// fetch('https://api.example.com')
//     .then(response => response.json())  // Might fail if response is not JSON
//     .then(data => console.log(data))
//     .catch(error => console.error('Error:', error));











// // Node.js event loop example with various phases and async operations

// const fs = require("fs");

// console.log("🔵 1. Start of script");

// // Timer: setTimeout
// setTimeout(() => {
//     console.log("🟢 4. setTimeout 0ms");

//     process.nextTick(() => {
//         console.log("🟡 5. nextTick inside setTimeout");
//     });

//     Promise.resolve().then(() => {
//         console.log("🟡 6. Promise inside setTimeout");
//     });
// }, 0);

// // Timer: setInterval (runs repeatedly, shown once here)
// const interval = setInterval(() => {
//     console.log("🟢 7. setInterval");
//     clearInterval(interval); // Only show once for demo
// }, 0);

// // I/O Async (will go into the poll phase)
// fs.readFile("file.txt", () => {
//     console.log("🟣 10. fs.readFile (I/O)");

//     setImmediate(() => {
//         console.log("🟣 11. setImmediate inside fs.readFile");
//     });

//     setTimeout(() => {
//         console.log("🟣 12. setTimeout inside fs.readFile");
//     }, 0);
// });

// // Custom async-style callback
// function customAsyncCallback(cb) {
//     setTimeout(() => {
//         cb("🔴 13. Custom callback after async work");
//     }, 10);
// }

// customAsyncCallback((message) => {
//     console.log(message);
// });

// console.log("🔵 14. End of script");

// // Microtask: process.nextTick
// process.nextTick(() => {
//     console.log("🟡 2. process.nextTick");
// });

// // Microtask: Promise
// Promise.resolve().then(() => {
//     console.log("🟡 3. Promise.then");
// });

// // Check phase: setImmediate
// setImmediate(() => {
//     console.log("🟢 8. setImmediate");

//     process.nextTick(() => {
//         console.log("🟡 9. nextTick inside setImmediate");
//     });
// });




// Node.js event loop example with various phases and async operations
const fs = require("fs");

console.log("🔵 1. Start of script");

// Microtask queue
process.nextTick(() => {
    console.log("🟡 2. process.nextTick (microtask)");
});

// setImmediate
setImmediate(() => {
    console.log("🟢 10. setImmediate");
});

Promise.resolve().then(() => {
    console.log("🟡 3. Promise.then (microtask)");
});

setTimeout(() => {
    console.log("🟢 6. setTimeout 0ms");

    // Nested async inside timeout
    async function nestedAsync() {
        console.log("🔵 7. Nested async before await (in setTimeout)");
        await Promise.resolve();
        console.log("🟡 8. Nested async after await (in setTimeout)");
    }
    nestedAsync();

    // Recursive timer (like interval)
    let count = 0;
    function recursiveTimeout() {
        if (count < 2) {
            console.log(`🟢 9. Recursive timeout ${count + 1}`);
            count++;
            setTimeout(recursiveTimeout, 0);
        }
    }
    recursiveTimeout();
}, 0);

// Async/await function
async function asyncExample() {
    console.log("🔵 4. Inside async function (before await)");
    await Promise.resolve();
    console.log("🟡 5. After await inside async function (microtask)");
}
asyncExample();

// I/O operation
fs.readFile(__filename, () => {
    console.log("🟣 11. fs.readFile callback");

    process.nextTick(() => {
        console.log("🟡 12. nextTick inside fs.readFile");
    });

    Promise.resolve().then(() => {
        console.log("🟡 13. Promise inside fs.readFile");
    });

    setImmediate(() => {
        console.log("🟣 14. setImmediate inside fs.readFile");
    });
});

console.log("🔵 15. End of script");
