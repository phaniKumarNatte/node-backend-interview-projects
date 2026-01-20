const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const db = require('../config/pool');

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

exports.uploadCSV = (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  const filePath = req.file.path || path.join(req.file.destination || path.join(__dirname, '..', 'uploads'), req.file.filename);
  const validRows = [];
  const errors = [];
  let rowNum = 0;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      rowNum++;
      const name = (row.name || '').toString().trim();
      const email = (row.email || '').toString().trim();
      const gender = (row.gender || '').toString().trim();
      const ageRaw = (row.age || '').toString().trim();
      const age = ageRaw === '' ? null : Number(ageRaw);

      const rowErrors = [];
      if (!name) rowErrors.push('name required');
      if (!email) rowErrors.push('email required');
      else if (!isValidEmail(email)) rowErrors.push('invalid email');
      if (!gender) rowErrors.push('gender required');
      if (ageRaw === '') rowErrors.push('age required');
      else if (Number.isNaN(age) || !Number.isFinite(age) || age < 0) rowErrors.push('age must be a non-negative number');

      if (rowErrors.length) {
        errors.push({ row: rowNum, errors: rowErrors, raw: row });
      } else {
        validRows.push({ name, email, gender, age });
      }
    })
    .on('end', async () => {
      let inserted = 0;
      for (const r of validRows) {
        try {
          await db.execute('INSERT INTO users (name, email, gender, age) VALUES (?, ?, ?, ?)', [r.name, r.email, r.gender, r.age]);
          inserted++;
        } catch (err) {
          errors.push({ row: 'db-insert', error: err.message, data: r });
        }
      }

      // Optionally delete the uploaded file
      fs.unlink(filePath, (e) => {
        if (e) console.warn('Could not delete uploaded file', filePath, e.message);
      });

      res.json({ totalRows: rowNum, inserted, errors });
    })
    .on('error', (err) => {
      res.status(500).json({ message: 'Error processing CSV', error: err.message });
    });
};

12739