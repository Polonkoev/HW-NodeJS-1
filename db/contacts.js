const Generator = require("id-generator");
const colors = require("colors");

const fs = require("fs").promises;

const path = require("path");
const contactsPath = path.resolve(__dirname, "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const result = JSON.parse(data);
    console.log("List of all contacts:".yellow);
    console.table(result);
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const result = JSON.parse(data);

    const contact = result.find((evt) => evt.id === contactId);
    console.log(`Received contact by id ${contactId}`.yellow);
    console.table(contact);
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const result = JSON.parse(data);
    const contact = result.filter((evt) => evt.id !== contactId);

    await fs.writeFile(contactsPath, JSON.stringify(contact), "utf8");

    console.log(`Removed contact by ID = ${contactId}`.red);
    console.table(contact);
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  const data = await fs.readFile(contactsPath, "utf8");
  const g = new Generator();
  const result = JSON.parse(data);
  const newContact = {
    id: g.newId(),
    name,
    email,
    phone,
  };
  result.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(result), "utf8");
  console.log(`Added contact with name: ${name}`.yellow);
  console.table(result);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
