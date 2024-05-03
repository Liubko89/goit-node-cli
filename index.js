import { program } from "commander";
import contacts from "./contacts.js";

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
        const allContacts = await contacts.listContacts();
        console.table(allContacts);
      } catch (error) {
        console.error(error);
      }
      break;
    case "get":
      try {
        const contact = await contacts.getContactById(id);
        console.log(contact);
      } catch (error) {
        console.error(error);
      }
      break;

    case "add":
      try {
        const addedContact = await contacts.addContact(name, email, phone);
        console.log(addedContact);
      } catch (error) {
        console.error(error);
      }
      break;

    case "remove":
      try {
        const removedContact = await contacts.removeContact(id);
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
