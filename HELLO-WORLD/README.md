In normal JAVASCRIPT we are not able to do such kind of operations this flexibilty is given by nodejs

The new way to perform these file operations in Node.js is by using the `fs/promises` module, which provides promise-based methods for better async handling. Here's the modern approach:

### 1. **Writing to a File**
```js
import { writeFile } from 'fs/promises';

await writeFile("./test.txt", "Hello World");
await writeFile("./test.txt", "HELLO SACHIN"); // Overwrites previous content
```

### 2. **Reading a File**
#### **Sync Alternative (Avoided in modern async environments)**
```js
import { readFile } from 'fs/promises';

try {
    const data = await readFile("./contact.txt", "utf-8");
    console.log(data);
} catch (err) {
    console.error("Error:", err);
}
```

### 3. **Appending to a File**
```js
import { appendFile } from 'fs/promises';

await appendFile("./test.txt", `${new Date().toLocaleString()}\n`);
await appendFile("./test.txt", "Hi\n");
```

### 4. **Copying a File**
```js
import { copyFile } from 'fs/promises';

await copyFile("./test.txt", "./copy.txt");
```

### 5. **Deleting a File**
```js
import { unlink } from 'fs/promises';

await unlink("./copy.txt");
```

### 6. **New Way (Async)**
```js
import { stat } from 'fs/promises';

try {
    const stats = await stat("./test.txt");
    console.log(stats);
} catch (err) {
    console.error("Error:", err);
}
```
