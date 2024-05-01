const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const allContacts = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(allContacts);
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  return allContacts.find(({ id }) => id === String(contactId)) || null;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const newContactsList = allContacts.filter(({ id }) => id !== contactId);
  await fs.writeFile(
    contactsPath,
    JSON.stringify(newContactsList, undefined, 2)
  );
  return allContacts.find(({ id }) => id === contactId) || null;
}

async function addContact(name, email, phone) {
  const allContacts = await listContacts();
  const newContactsList = [
    ...allContacts,
    { id: nanoid(), name, email, phone },
  ];

  await fs.writeFile(
    contactsPath,
    JSON.stringify(newContactsList, undefined, 2)
  );
  return newContactsList[newContactsList.length - 1];
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
