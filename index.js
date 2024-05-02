import { program } from "commander";
import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      try {
        const allContacts = await listContacts();
        console.log(allContacts);
      } catch (error) {
        console.error(error);
      }
      break;
    case "get":
      try {
        const contact = await getContactById(id);
        console.log(contact);
      } catch (error) {
        console.error(error);
      }
      break;

    case "add":
      try {
        const addedContact = await addContact(name, email, phone);
        console.log(addedContact);
      } catch (error) {
        console.error(error);
      }
      break;

    case "remove":
      try {
        const removedContact = await removeContact(id);
        console.log(removedContact);
      } catch (error) {
        console.error(error);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
