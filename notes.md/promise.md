Promise is an object that represents the eventual result of an operation.
An async function always returns a Promise.
.catch() handles the error if that Promise is rejected.

Remember this distinction:
- .then() → handles successful Promise results.
- .catch() → handles rejected Promises.
- .finally() → runs after the Promise settles, whether successful or rejected.
-------------------------------------------------------------------------------------

import fs from "node:fs/promises";
   This imports Node.js's file system module, which lets you work with files and folders.
- fs = File System.
- node:fs/promises = File System module that provides Promise-based (asynchronous) methods.

It allows your backend to read, write, create, and delete files using async/await.