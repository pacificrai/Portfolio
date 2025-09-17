const { Router } = require('express');
const contacts = require('./contacts');

const router = Router();

router.get('/', (req, res) => {
  res.send('Backend is running');
});

router.use(contacts);

module.exports = router;


