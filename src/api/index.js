import 'dotenv/config';
import express from 'express';
import pkg from 'pg';
import config from './config.js';

const { Pool } = pkg;
const app = express();
const port = process.env.PORT || 3003;

const pool = new Pool({
  connectionString: config.connection,
});

app.get('/', (req, res) => {
  res.send('API Working!');
});

app.get('/search', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM v_titles WHERE title ILIKE $1', [`%${req.query.title}%`]);
    const rows = result.rows;

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Titles no found' });
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.use(express.json());

app.listen(port, () => {
  console.log(`API started on http://localhost:${port}`);
});
