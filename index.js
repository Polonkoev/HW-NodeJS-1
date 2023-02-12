const fs = require("fs");
const path = require("path");
const { Command } = require("commander");

const Func = require("./db/contacts.js");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      Func.listContacts();
      break;

    case "get":
      Func.getContactById(id);
      break;

    case "add":
      Func.addContact(name, email, phone);
      break;

    case "remove":
      Func.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);


