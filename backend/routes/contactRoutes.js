const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all contacts
router.get('/', (req, res) => {
  db.query('SELECT * FROM contacts', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Add contact
router.post('/', (req, res) => {
  const { name, phone, email } = req.body;
  db.query(
    'INSERT INTO contacts (name, phone, email) VALUES (?, ?, ?)',
    [name, phone, email],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: result.insertId, name, phone, email });
    }
  );
});

// Delete contact
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM contacts WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(204).end();
  });
});

module.exports = router;