const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

// Simple root route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: '🚀 Welcome to My GCP CI/CD Demo App!',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.send('OK');
});

// Versioned API route
app.get('/api/v1/info', (req, res) => {
  res.json({
    app: 'GCP Node.js Demo',
    version: '1.0.0',
    author: 'Mohit'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ App running on http://localhost:${PORT}`);
});
