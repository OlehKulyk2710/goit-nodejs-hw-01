const contacts = require("./contacts");

// (async () => {
// const allConctacts = await contacts.getListContacts();
// console.log("allConctacts", allConctacts);
// const contactById = await contacts.getContactById("k0m66AwUqJ-X3EN4xfrLc");
// console.log("contactById", contactById);
// const removeContact = await contacts.removeContact(8);
// console.log("removeContact", removeContact);
// const newContact = await contacts.addContact("Vasya21", "mail", "25-26-27");
// console.log("newContact", newContact);
// })();

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await contacts.getListContacts();
      console.table(contactsList);
      break;

    case "get":
      const contactById = await contacts.getContactById(id);
      console.table(contactById);
      break;

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      console.table(newContact);
      break;

    case "remove":
      const removedContact = await contacts.removeContact(id);
      console.table(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
