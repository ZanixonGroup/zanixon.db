const path = require("path");
const fs = require("fs");
const Lodash = require("lodash");

// variables temporary storage
const Variables = new Map();

class ZanixonDB {
  constructor(options){
    const defaultOptions = {
      directory: options.directory || "./database",
      tables: { "main": "/main/database.json" },
      showLogs: options.showLogs || false
    };
    this.options = {
      ...options,
      ...defaultOptions,
      tables: Lodash.merge(defaultOptions.tables, options.tables)
    };
    this.tables = this.options.tables;
    this.Variables = Variables;
    
    if(this.options.directory && !fs.existsSync(this.options.directory)) {
      // create database directory
      fs.mkdir(this.options.directory, {
        recursive: true
      }, (err) => {
        if(err) throw new Error();
        this.sendLogs(`Success create "${this.options.directory}" directory`);
      });
    }
    // create database files
    const tables = this.tables;
    for(let table in tables) {
      const filePath = path.join(__dirname, this.options.directory, tables[table]);
      const isCreated = fs.existsSync(filePath);
      if(!isCreated) {
        if(!filePath.endsWith(".json")) throw new Error(`Invalid database file at ${table} ${tables[table]}`);
        const fileDirectorPath = filePath.split("/").slice(0, -1).join("/");
        fs.mkdirSync(fileDirectorPath, { recursive: true });
        fs.writeFileSync(filePath, "{}", { recursive: true });
        this.sendLogs(`Success create "${table}" table on path: ${filePath}`);
      }
    }
  }
  
  isEmpty(value) {
    if(value === null) return false
    return !value || value === undefined || (typeof value === 'string' && value.trim().length === 0) || typeof value !== "boolean";
  }
  
  async isExists(table) {
    if(!table) throw new Error(`Failed check the table, table name is not defined!`);
    return await fs.existsSync(path.join(__dirname, this.options.directory, `${this.tables[table]}`));
  }
  
  variables(data, table = "main") {
    if(!this.tables[table]) throw new Error(`Invalid table, table with name "${table}" is not found!`);
    const currentData = this.Variables.get(table);
    this.Variables.set(table, Lodash.merge(currentData, data));
  }
  
  async setKey(oldKey, newKey, table = "main") {
    if(!this.tables[table]) throw new Error(`Invalid table, table with name "${table}" is not found!`);
    const filePath = path.join(__dirname, this.options.directory, this.tables[table]);
    
    // checking params
    if(!this.isEmpty(oldKey)) throw new Error(`oldKey parameter value is undefined!`)
    if(!this.isEmpty(newKey)) throw new Error(`newKey parameter value is undefined!`)
    if(!this.isExists(table)) throw new Error(`Table with name "${table}" at ${this.tables[table]} is not exists!`);
    if(!await this.has(oldKey)) return false;
    
    let content = await this.getContent(filePath);
    content = Lodash.set(content, newKey, Lodash.get(content, oldKey));
    Lodash.unset(content, oldKey);
    
    await this.setContent(filePath, content)
    return true;
  }
  
  async set(key, value, table = "main") {
    if(!this.tables[table]) throw new Error(`Invalid table, table with name "${table}" is not found!`);
    const filePath = path.join(__dirname, this.options.directory, this.tables[table]);
    
    if(!this.isEmpty(key)) throw new Error(`Key parameter value is undefined`)
    if(!this.isEmpty(value)) throw new Error(`Value parameter value is undefined`)
    if(!this.isExists(table)) throw new Error(`Table with name "${table}" at ${this.tables[table]} is not exists!`);
    
    let content = await this.getContent(filePath);
    content = Lodash.set(content, key, value);
    console.log(content)
    await this.setContent(filePath, content)
    return Lodash.get(content, key);
  }
  
  async get(key, table = "main") {
    if(!this.tables[table]) throw new Error(`Invalid table, table with name "${table}" is not found!`);
    const filePath = path.join(__dirname, this.options.directory, this.tables[table]);
    
    if(!this.isEmpty(key)) throw new Error(`Key parameter value is undefined`)
    if(!this.isExists(table)) throw new Error(`Table with name "${table}" at ${this.tables[table]} is not exists!`);
    
    let content = await this.getContent(filePath);
    let data = Lodash.get(content, key);
    return data || JSON.stringify(this.Variables.get(table)[key.split(".").slice(-1)[0]]);
  }
  
  async delete(key, table = "main") {
    if(!this.tables[table]) throw new Error(`Invalid table, table with name "${table}" is not found!`);
    const filePath = path.join(__dirname, this.options.directory, this.tables[table]);
    
    if(!this.isEmpty(key)) throw new Error(`Key parameter value is undefined`)
    if(!this.isExists(table)) throw new Error(`Table with name "${table}" at ${this.tables[table]} is not exists!`);
    
    let content = await this.getContent(filePath);
    Lodash.unset(content, key);
    
    await this.setContent(filePath, content)
    return true
  }
  
  async has(key, table = "main") {
    if(!this.tables[table]) throw new Error(`Invalid table, table with name "${table}" is not found!`);
    const filePath = path.join(__dirname, this.options.directory, this.tables[table]);
    
    if(!this.isEmpty(key)) throw new Error(`Key parameter value is undefined`)
    if(!this.isExists(table)) throw new Error(`Table with name "${table}" at ${this.tables[table]} is not exists!`);
    
    let content = await this.getContent(filePath);
    let data = Lodash.get(content, key);
    if(!data) return false;
    return true;
  }
  
  async all(table = "main") {
    if(!this.tables[table]) throw new Error(`Invalid table, table with name "${table}" is not found!`);
    const filePath = path.join(__dirname, this.options.directory, this.tables[table]);
    return await this.getContent(filePath);
  }
  
  abbreviate(number, format = "0.00a") {
    const SI_SYMBOL = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "O", "N", "D", "UD", "UD", "DD", "TD", "QaD", "QiD", "SxD", "SpD", "OD", "ND", "V", "UV", "DV", "TV", "QaV", "QiV", "SxV", "SpV", "OV", "NV", "DT", "UDT", "DDT", "TDT", "QaDT", "QiDT", "SxDT", "SpDT", "ODT", "NDT", "DQa", "UDQa", "DDQa", "TDQa", "QaDQa", "QiDQa", "SxDQa", "SpDQa", "ODQa", "NDQa", "DQi", "UDQi", "DDQi", "TDQi", "QaDQi", "QiDQi", "SxDQi", "SpDQi", "ODQi", "NDQi", "DSx", "UDSx", "DDSx", "TDSx", "QaDSx", "QiDSx", "SxDSx", "SpDSx", "ODSx", "NDSx", "DSp", "UDSp", "DDSp", "TDSp", "QaDSp", "QiDSp", "SxDSp", "SpDSp", "ODSp", "NDSp", "DO", "UDO", "DDO", "TDO", "QaDO", "QiDO", "SxDO", "SpDO", "ODO", "NDO", "DN", "UDN", "DDN", "TDN", "QaDN", "QiDN", "SxDN", "SpDN", "ODN", "NDN", "C"];
    if (!isNaN(number)) {
      if (number < 1000) {
        return number;
      }

      const exponent = Math.floor(Math.log10(number) / 3);
      const exponentCheck = Math.log10(number);
      const suffix = SI_SYMBOL[exponent];
      const cvtdNum = number / Math.pow(10, exponent * 3);
      let dec = 0;
      if (format.startsWith("0.")) {
        dec = format.slice(3).length;
      }
      const roundNum = cvtdNum.toFixed(dec);
      const decSep = format.includes(",") ? "," : ".";
      if (exponentCheck > 306) {
        const result = roundNum.replace(".", decSep) + suffix;
        return result;
      } else {
        const result = roundNum.replace(".", decSep) + suffix;
        return result;
      }
    } else {
      throw new Error(`ZanixonDB: invalid number on abbreviate() function at "number" parameter.`);
      return undefined;
    }
  }
  
  // write file
  async getContent(filePath) {
    if(!this.isExists(filePath)) throw new Error(`Database file at path "${filePath}" is not exists!`);
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  }
  
  // read file
  async setContent(filePath, content) {
    if(!this.isExists(filePath)) throw new Error(`Database file at path "${filePath}" is not exists!`);
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    return JSON.stringify(content, null, 2);
  }
  
  sendLogs(text) {
    // send logs
    this.options.showLogs ? console.log("ZanixonDB:", text) : null;
  }
}

module.exports = { ZanixonDB };