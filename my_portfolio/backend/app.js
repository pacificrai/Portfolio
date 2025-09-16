const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// Core middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ ok: true });
});

// API routes
app.use(routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Central error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // Avoid leaking internals in responses
  const status = err.statusCode || 500;
  const message = err.publicMessage || 'Internal server error';
  // Log full error for debugging
  // eslint-disable-next-line no-console
  console.error('Unhandled error:', { message: err.message, stack: err.stack });
  res.status(status).json({ error: message });
});

module.exports = app;


