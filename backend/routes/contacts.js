const { Router } = require('express');
const { requireAdmin } = require('../utils/auth');
const { addContact, getAllContacts } = require('../services/contactsService');

const router = Router();

// Submit contact
router.post('/contact', async (req, res, next) => {
  try {
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) {
      const err = new Error('All fields are required.');
      err.statusCode = 400;
      err.publicMessage = 'All fields are required.';
      throw err;
    }
    await addContact({ name, email, message });
    res.status(201).json({ success: true, message: 'Message received!' });
  } catch (err) {
    next(err);
  }
});

// Admin: list contacts
router.get('/admin/contacts', requireAdmin, async (req, res, next) => {
  try {
    const list = await getAllContacts();
    res.json(list);
  } catch (err) {
    next(err);
  }
});

module.exports = router;


