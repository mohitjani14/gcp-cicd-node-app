const express = require('express');
const app = express();
const morgan = require('morgan');
const chalk = require('chalk');

const PORT = process.env.PORT || 8080;
const VERSION = 'v1';

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Sample data
let users = [
  { id: 1, name: 'Alice DevOps', role: 'Engineer' },
  { id: 2, name: 'Bob Cloud', role: 'Admin' }
];

// Root Route
app.get('/', (req, res) => {
  res.status(200).json({
    message: chalk.green('🚀 Welcome to GCP CI/CD Demo API!'),
    version: VERSION,
    time: new Date().toISOString()
  });
});

// Health Check
app.get('/health', (req, res) => {
  res.status(200).send(chalk.blue('OK'));
});

// Get Users
app.get(`/api/${VERSION}/users`, (req, res) => {
  res.status(200).json(users);
});

// Get Single User
app.get(`/api/${VERSION}/users/:id`, (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: chalk.red('User not found') });
  res.status(200).json(user);
});

// Add User
app.post(`/api/${VERSION}/users`, (req, res) => {
  const { name, role } = req.body;
  if (!name || !role) return res.status(400).json({ error: chalk.yellow('Name and role are required') });

  const newUser = { id: users.length + 1, name, role };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Fallback
app.use((req, res) => {
  res.status(404).json({ error: chalk.gray('Route not found') });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(chalk.red('Unhandled Error:'), err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
  console.log(chalk.cyanBright(`🚀 Server running on http://localhost:${PORT}`));
});
