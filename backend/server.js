const express = require('express');
const cors = require('cors');
const path = require('path'); // 👈 required to serve frontend
require('dotenv').config();

const app = express();
const contactRoutes = require('./routes/contactRoutes');

app.use(cors());
app.use(express.json());

// Serve static files from frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Optional: serve index.html on "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.use('/api/contacts', contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
