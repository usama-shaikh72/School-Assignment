// test-db-connection.js
require('dotenv').config();
const mysql = require('mysql2/promise');

(async () => { 
  try {
    const pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'schooldb',
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
      waitForConnections: true,
      connectionLimit: 2
    });

    const [rows] = await pool.query('SELECT NOW() as now');
    console.log('✅ DB connected. Server time:', rows[0].now);
    await pool.end();
    process.exit(0);
  } catch (err) {
    console.error('❌ DB connection failed:', err.message);
    process.exit(1);
  }
})();
