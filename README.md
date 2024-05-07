# ZanixonDB
A simple database that you can use for your projects, supports multiple storage, uses lodash for fast reading and searching, supports nested data storage.

![GitHub last commit (branch)](https://img.shields.io/github/last-commit/zanixongroup/zanixon.db/main?style=for-the-badge) ![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/zanixongroup/zanixon.db?style=for-the-badge) ![GitHub repo size](https://img.shields.io/github/repo-size/zanixongroup/zanixon.db?style=for-the-badge) ![Static Badge](https://img.shields.io/badge/Author-ZTRdiamond-blue?style=for-the-badge&logo=github&color=01bdff)

# Table of contents
- [Installing package](#installing-package)
- [Setup database](#setup-database)
- [Create table database](#create-table-database)
- [Create variables](#create-variables)
- [setKey()](#setkey)
- [set()](#set)
- [get()](#get)
- [delete()](#delete)
- [has()](#has)
- [all()](#all)
- [abbreviate()](#abbreviate)

## Installing package
Install package using `npm i`
```js
npm i zanixon.db@latest
```

## Setup database
Import package from `node_modules`, then add directory path to your database folder
```js
// import { ZanixonDB } from "zanixon.db";
const { ZanixonDB } = require("zanixon.db");

const db = new ZanixonDB({
  directory: "./database",
  showLogs: false
})
```
This setup will create default database file on path `./database/main/db.json`

## Create table database
Tables are used to create other storage, you can use the same table to store storage files with the same category or usage.
```js
const { ZanixonDB } = require("zanixon.db");

const db = new ZanixonDB({
  directory: "./database",
  showLogs: false,
  tables: {
    "account": "/user/accounts.json"
    "user": "/user/users.json"
  }
})
```

### Parameters

| Parameter | Default | Required | Description |
| --- | --- | --- | --- |
| `directory` | `./database` | `false` | Defining database paths. |
| `showLogs` | `false` | `false` | Showing something logs into your terminal. |
| `tables` | `{ "main": "/main/db.json" }` | `false` | Used for creating custom database tables. |

With this, all tables will be created automatically by package

## Create variables
Actually you don't need this, it's just my need as the author. so this serves to create a default data value when using the `get()` function instead of returning undefined because the data is not in the `object`.
```js
// save variables to default table
db.variables({
  "username": "unknown",
  "balance": 0
});

// save variables to custom table
db.variables({
  "username": "unknown",
  "balance": 0
}, "user");
```

### Parameters

| Parameter | Default | Required | Description |
| --- | --- | --- | --- |
| `data` | `{}` | `true` | Create custom variables data. |
| `table` | `main` | `true` | Save variables to default table or custom table. |


You can access this variables using `db.Variables` or `db.Variables.values()`

## setKey
Used to update the key of a data in the database
```js
db.setKey("user.username", "name") // output: true (if user have data named username)
```
### Parameters

| Parameter | Default | Required | Description |
| --- | --- | --- | --- |
| `oldKey` | `null` | `true` | oldKey data path |
| `newKey` | `null` | `true` | newKey data name |
| `table` | `main` | `false` | database table name |

## set
Used for save or update data value
```js
// set data to table named account
db.set("totalUser", 999, "account"); // output: 999

// update data user balance
db.set("user.balance", 12000, "user"); // output: 12000
```
### Parameters

| Parameter | Default | Required | Description |
| --- | --- | --- | --- |
| `key` | `null` | `true` | key data path |
| `value` | `null` | `true` | data value |
| `table` | `main` | `false` | database table name |

## get
Used to get data from database
```js
// get data from table named account
db.get("totalUser", "account"); // output: 999

// get data user balance
db.get("user.balance", "user"); // output: 12000
```
### Parameters

| Parameter | Default | Required | Description |
| --- | --- | --- | --- |
| `key` | `null` | `true` | key data path |
| `table` | `main` | `false` | database table name |

## delete
Used to delete data from database
```js
// delete data from table named account
db.delete("totalUser", "account"); // output: true
```
### Parameters

| Parameter | Default | Required | Description |
| --- | --- | --- | --- |
| `key` | `null` | `true` | key data path |
| `table` | `main` | `false` | database table name |

## has
Used to check data in database is available or not
```js
// set data to table named account
db.has("totalUser", "account"); // output: false because the data was deleted
```
### Parameters

| Parameter | Default | Required | Description |
| --- | --- | --- | --- |
| `key` | `null` | `true` | key data path |
| `table` | `main` | `false` | database table name |

## all
Used to get all data from database
```js
// get all data of table named account
db.all("user"); // output: { ...data }
```
### Parameters

| Parameter | Default | Required | Description |
| --- | --- | --- | --- |
| `table` | `main` | `false` | database table name |

## abbreviate
Used for abbreviating number from long to short
```js
db.abbreviate(12_000_000, "0.00a"); // output: 12.00M
```

### Parameters

| Parameter | Default | Required | Description |
| --- | --- | --- | --- |
| `number` | `null` | `true` | big number |
| `format` | `0.00a` | `false` | number format output |