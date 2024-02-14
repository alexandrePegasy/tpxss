import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Ouvre une connexion à la base de données SQLite
async function openDb() {
  return open({
    filename: './myd.sqlite',
    driver: sqlite3.Database,
  });
}
async function initDb() {
    const db = await openDb();
    await db.exec(`CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      comment TEXT NOT NULL
    );`);
  }
  initDb();
export default async function handler(req, res) {
  const db = await openDb();

  if (req.method === 'GET') {
    const comments = await db.all('SELECT * FROM comments');
    res.status(200).json(comments);
  } else if (req.method === 'POST') {
    // Ajoute un nouveau commentaire sans sanitisation
    const { comment } = req.body;
    await db.run('INSERT INTO comments (comment) VALUES (?)', comment);
    res.status(201).json({ message: 'Commentaire ajouté' });
  }
}
