const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(express.json());

// Leaderboard storage
const LEADERBOARD_FILE = path.join(__dirname, 'leaderboard.json');
const USERS_FILE = path.join(__dirname, 'users.json');

// Initialize files
if (!fs.existsSync(LEADERBOARD_FILE)) {
  fs.writeFileSync(LEADERBOARD_FILE, JSON.stringify([]));
}
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify({}));
}

// Get leaderboard
app.get('/api/leaderboard', (req, res) => {
  const leaderboard = JSON.parse(fs.readFileSync(LEADERBOARD_FILE, 'utf8'));
  res.json(leaderboard.sort((a, b) => b.score - a.score).slice(0, 100));
});

// Check if name exists
app.post('/api/check-name', (req, res) => {
  const { name } = req.body;
  const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
  res.json({ exists: !!users[name] });
});

// Register name with password
app.post('/api/register', (req, res) => {
  const { name, password } = req.body;
  
  if (!name || !password) {
    return res.status(400).json({ error: 'Name and password required' });
  }
  
  const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
  
  if (users[name]) {
    return res.status(400).json({ error: 'Name already taken' });
  }
  
  users[name] = password;
  fs.writeFileSync(USERS_FILE, JSON.stringify(users));
  res.json({ success: true });
});

// Submit score
app.post('/api/leaderboard', (req, res) => {
  const { name, score, password } = req.body;
  
  if (!name || typeof score !== 'number') {
    return res.status(400).json({ error: 'Invalid data' });
  }
  
  const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
  
  // Verify password if name is registered
  if (users[name] && users[name] !== password) {
    return res.status(403).json({ error: 'Wrong password' });
  }
  
  const leaderboard = JSON.parse(fs.readFileSync(LEADERBOARD_FILE, 'utf8'));
  leaderboard.push({ name, score, date: new Date().toISOString() });
  fs.writeFileSync(LEADERBOARD_FILE, JSON.stringify(leaderboard));
  
  res.json({ success: true });
});

// Delete leaderboard entry (admin)
app.post('/api/delete-entry', (req, res) => {
  const { name, password, adminPassword } = req.body;
  
  // Admin password check
  if (adminPassword === 'CHARLIE2026') {
    const leaderboard = JSON.parse(fs.readFileSync(LEADERBOARD_FILE, 'utf8'));
    const filtered = leaderboard.filter(entry => entry.name !== name);
    fs.writeFileSync(LEADERBOARD_FILE, JSON.stringify(filtered));
    return res.json({ success: true });
  }
  
  res.status(403).json({ error: 'Unauthorized' });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
