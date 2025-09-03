import { getPool } from '/lib/db';

export default async function handler(req, res) {
  const pool = await getPool();

  if (req.method === 'GET') {
    try {
      const [rows] = await pool.query('SELECT id, name, address, city, image FROM schools ORDER BY id DESC');
      res.status(200).json({ schools: rows });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch schools' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, address, city, state, contact, image, email_id } = req.body;
      if (!name || !address || !city || !state || !contact || !email_id) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      const [result] = await pool.query(
        'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, address, city, state, contact, image || '', email_id]
      );
      res.status(201).json({ id: result.insertId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to insert school' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
