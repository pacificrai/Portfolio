const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// Placeholder route
app.get('/', (req, res) => {
  res.send('Backend is running');
});


// File-based storage for contact submissions
const DATA_DIR = path.join(__dirname, 'data');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(CONTACTS_FILE)) {
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify([]), 'utf8');
}

function readContacts() {
  try {
    const raw = fs.readFileSync(CONTACTS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function writeContacts(list) {
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify(list, null, 2), 'utf8');
}

// Contact form route
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  const submission = {
    name,
    email,
    message,
    date: new Date().toISOString()
  };
  const contacts = readContacts();
  contacts.push(submission);
  writeContacts(contacts);
  res.json({ success: true, message: 'Message received!' });
});

// Simple token auth middleware for admin routes
function requireAdmin(req, res, next) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
  const expected = process.env.ADMIN_TOKEN || 'admin123';
  if (token && token === expected) return next();
  return res.status(401).json({ error: 'Unauthorized' });
}

// Get all contact submissions (admin only)
app.get('/admin/contacts', requireAdmin, (req, res) => {
  const contacts = readContacts();
  res.json(contacts);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
