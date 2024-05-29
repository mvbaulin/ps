import express from 'express'
import mysql from 'mysql2/promise';

const PORT = 5001;
const app = express();
app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'admin',
  password: 'admin',
  database: 'ps_test',
  port: '8889'
});

app.get('/api/concept/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('CALL get_titles_by_concept(?)', [id]);

    if (!rows.length) {
      return res.status(404).json({ error: 'Titles not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.get('/api/title/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('CALL get_title_by_id(?)', [id]);

    if (!rows.length) {
      return res.status(404).json({ error: 'Title not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.get('/api/additional/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('CALL get_title_by_id(?)', [id]);

    if (!rows.length) {
      return res.status(404).json({ error: 'Title not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.get('/api/search/:input', async (req, res) => {
  try {
    const { input } = req.params;
    const [rows] = await pool.query('CALL get_titles_by_search(?)', [input]);

    if (!rows.length) {
      return res.status(404).json({ error: 'Titles not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.listen(PORT, () => {
  console.log("Server started");
})
