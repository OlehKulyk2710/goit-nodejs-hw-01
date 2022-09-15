const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("./db/contacts.json");

function updateContactsList(contactsList) {
  fs.writeFile(contactsPath, `${JSON.stringify(contactsList, null, 2)}`);
}

async function getListContacts() {
  const listContacts = await fs.readFile(contactsPath);
  const listContactsParsed = JSON.parse(listContacts);

  return listContactsParsed || null;
}

async function getContactById(contactId) {
  const listContacts = await getListContacts();
  const [contactById] = listContacts.filter(
    ({ id }) => id === contactId.toString()
  );

  return contactById || null;
}

async function removeContact(contactId) {
  const listContacts = await getListContacts();
  const contactIndex = listContacts.findIndex(
    (contact) => contact.id === contactId.toString()
  );
  if (contactIndex === -1) {
    return null;
  }
  const [removedContact] = listContacts.splice(contactIndex, 1);
  await updateContactsList(listContacts);

  return removedContact;
}

async function addContact(name, email, phone) {
  const listContacts = await getListContacts();
  const newContact = { id: nanoid(), name, email, phone };
  listContacts.push(newContact);
  await updateContactsList(listContacts);
  return newContact;
}

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
};
