# ZanixonDB
A simple JSON database with ease use, You can use this database for your small games based on nodejs or you can use this database for other usage.

The write and read speed is depending on the device you use, this module using fs to write and read data on JSON.

![GitHub last commit (branch)](https://img.shields.io/github/last-commit/zanixongroup/zanixon.db/main?style=for-the-badge) ![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/zanixongroup/zanixon.db?style=for-the-badge) ![GitHub repo size](https://img.shields.io/github/repo-size/zanixongroup/zanixon.db?style=for-the-badge) ![Static Badge](https://img.shields.io/badge/Author-ZTRdiamond-blue?style=for-the-badge&logo=github&color=01bdff)

# Module Installation
Install the module using `npm` command on your terminal.
 
 ### On your terminal
 ```bash
 npm i zanixon.db
 ```
 ### Then import and setup the module
 ```js
 const zn = require("zanixon.db");

zn.storageInit({
    "dir":"./data/main"
})
zn.storage();
 ```
 
Now you can use this module to save and get your data from local database, this module must have write and read permission in device that running the module.

Check [documentation here](https://ztrdiamond.github.io/zndb-docs).
