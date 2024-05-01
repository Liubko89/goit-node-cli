const fs = require("fs/promises");

fs.readFile("./db/contacts.json", { encoding: "utf-8" })
  .then((res) => console.log(res))
  .catch((error) => console.error(error));
