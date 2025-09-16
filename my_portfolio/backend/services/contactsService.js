const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');

function ensureStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(CONTACTS_FILE)) {
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify([]), 'utf8');
  }
}

function readContacts() {
  ensureStore();
  try {
    const raw = fs.readFileSync(CONTACTS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (_e) {
    return [];
  }
}

function writeContacts(list) {
  ensureStore();
  const tempFile = CONTACTS_FILE + '.tmp';
  fs.writeFileSync(tempFile, JSON.stringify(list, null, 2), 'utf8');
  fs.renameSync(tempFile, CONTACTS_FILE);
}

async function addContact(entry) {
  const list = readContacts();
  const toSave = {
    name: String(entry.name),
    email: String(entry.email),
    message: String(entry.message),
    date: new Date().toISOString(),
  };
  list.push(toSave);
  writeContacts(list);
}

async function getAllContacts() {
  return readContacts();
}

module.exports = { addContact, getAllContacts };


