import express from 'express'
import mysql from 'mysql2/promise';
import cors from 'cors';
import https from 'https';
import fs from 'fs';

// const API_HOST = 'localhost'
const API_HOST = 'testtrtr.ru'
const API_PORT = 5001;

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: API_HOST,
  user: 'admin',
  password: '12345slK',
  database: 'ps_store',
  port: '3306'
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

// Selections
app.get('/api/selection/pupalar_new', async (req, res) => {
  try {
    const { input } = req.params;
    const [rows] = await pool.query('SELECT * FROM v_popular_new', [input]);

    if (!rows.length) {
      return res.status(404).json({ error: 'Titles not found' });
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.get('/api/selection/has_ps_plus_offer', async (req, res) => {
  try {
    const { input } = req.params;
    const [rows] = await pool.query('SELECT * FROM v_has_ps_plus_offer', [input]);

    if (!rows.length) {
      return res.status(404).json({ error: 'Titles not found' });
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.get('/api/selection/has_gta_plus_offer', async (req, res) => {
  try {
    const { input } = req.params;
    const [rows] = await pool.query('SELECT * FROM v_has_gta_plus_offer', [input]);

    if (!rows.length) {
      return res.status(404).json({ error: 'Titles not found' });
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.get('/api/selection/has_ubisoft_plus_offer', async (req, res) => {
  try {
    const { input } = req.params;
    const [rows] = await pool.query('SELECT * FROM v_has_ubisoft_plus_offer', [input]);

    if (!rows.length) {
      return res.status(404).json({ error: 'Titles not found' });
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.get('/api/selection/has_ea_access_offer', async (req, res) => {
  try {
    const { input } = req.params;
    const [rows] = await pool.query('SELECT * FROM v_has_ea_access_offer', [input]);

    if (!rows.length) {
      return res.status(404).json({ error: 'Titles not found' });
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// app.listen(API_PORT, () => {
//   console.log(
//     "Server started on", `http://${API_HOST}:${API_PORT}`);
// })

const httpsOptions = {
  key: fs.readFileSync('/etc/ssl/testtrtr_ru_private.key'),
  cert: fs.readFileSync('/etc/ssl/testtrtr_ru.crt')
};

app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    res.redirect(`https://${req.headers.host}${req.url}`);
  } else {
    next();
  }
});

https.createServer(httpsOptions, app).listen(API_PORT, () => {
  console.log("Server started on", `https://${API_HOST}:${API_PORT}`);
});

// testopajopa_ru.crt
// testopajopa_ru_private.key
// testtrtr_ru.crt
// testtrtr_ru_private.key
