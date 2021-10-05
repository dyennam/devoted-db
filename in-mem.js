const HashMap = require("hashmap");
let databaseMap = new HashMap();
let transactionMap = new HashMap();

class Database {
  constructor() {
    this.transactionsStoreStore = [];
  }

  // Set the key of the inMemDB entry
  set(key, value) {
    if (transactionMap.size) {
      transactionMap.set(key, value);
    } else {
      // if it doesn't exist add it to the original databaseMap
      databaseMap.set(key, value);
    }
  }

  // Get the value of the key
  get(key) {
    if (transactionMap.size) {
      console.log(transactionMap.get(key));
    } else if (databaseMap.get(key)) {
      console.log(databaseMap.get(key));
    } else {
      console.log("NULL");
    }
  }

  // Counts the number of times the value occurs in the DB
  count(value) {
    const temp = databaseMap.values();
    // Big O(n) = since its iterating over entire obj.
    const filter = temp.filter((x) => x == value).length;
    console.log(filter);
  }

  // Delete the key from the map
  delete(key) {
    if (databaseMap.has(key)) {
      databaseMap.delete(key);
    } else {
      console.log("Nothing to delete");
    }
  }

  // Begins a transaction
  begin() {
    // create a copy of existing hash, and add new transactions to it.
    transactionMap.copy(databaseMap);
  }

  // Rollback the transaction
  rollback() {
    if (transactionMap.size) {
      transactionMap.clear();
    } else {
      console.log("Nothing to Rollback");
    }
  }

  // Commit a transaction
  commit() {
    databaseMap.copy(transactionMap);
    transactionMap.clear();
  }

  // Handle User Input for Various inMemDB Commands
  handleInput(input) {
    const inputRaw = input.split(" ");
    const [cmd, ...args] = inputRaw;
    switch (cmd.toUpperCase()) {
      case "SET":
        {
          const [key, value] = args;
          if (key && value) {
            this.set(key, value);
          } else {
            console.log("SET command should include a key and a value.");
          }
        }
        break;
      // Get Value Given key
      case "GET":
        {
          const [key] = args;
          if (key) {
            this.get(key);
          } else {
            console.log("GET command should include a key.");
          }
        }
        break;
      case "DELETE":
        {
          const [key] = args;
          if (key) {
            this.delete(key);
          } else {
            console.log("DELETE command should include a key.");
          }
        }
        break;
      case "COUNT":
        {
          const [value] = args;
          if (value) {
            this.count(value);
          } else {
            console.log("COUNT command requires a value to search for.");
          }
        }
        break;
      case "BEGIN":
        this.begin();
        break;
      case "ROLLBACK":
        this.rollback();
        break;
      case "COMMIT":
        this.commit();
        break;
      case "END":
        return true;
      default:
        console.log("Enter a valid input.");
    }
  }
}

const db = new Database();

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

var recursiveAsyncReadLine = function () {
  readline.question(">> ", function (cmd) {
    const split_cmd = cmd.split(" ");
    if (split_cmd[0].toUpperCase() === "END") return readline.close();
    db.handleInput(cmd);
    recursiveAsyncReadLine(); //Calling this function again to ask new question
  });
};

console.log("ENTER A VALID COMMAND");
recursiveAsyncReadLine();
