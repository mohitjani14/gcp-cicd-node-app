const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 8080;
const VERSION = 'v1';

// Middleware
app.use(express.json());
app.use(morgan('combined')); // Logging middleware

// In-memory data
let users = [
  { id: 1, name: 'Alice DevOps', role: 'Engineer' },
  { id: 2, name: 'Bob Cloud', role: 'Admin' }
];

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: '🚀 Welcome to GCP CI/CD Demo API!',
    version: VERSION,
    time: new Date().toISOString()
  });
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Get all users
app.get(`/api/${VERSION}/users`, (req, res) => {
  res.status(200).json(users);
});

// Get user by ID
app.get(`/api/${VERSION}/users/:id`, (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.status(200).json(user);
});

// Create new user
app.post(`/api/${VERSION}/users`, (req, res) => {
  const { name, role } = req.body;
  if (!name || !role) {
    return res.status(400).json({ error: 'Name and role are required' });
  }

  const newUser = {
    id: users.length + 1,
    name,
    role
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
