const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');

const DB_FILE = path.join(__dirname, 'data.sqlite');

let SQL;
let db;
let initPromise = null;

// debounce writes to avoid blocking on every insert
let writeTimer = null;
const WRITE_DEBOUNCE_MS = 200; // batch writes within 200ms

async function ensureInit() {
  if (db) return;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    // locate local wasm for faster startup
    const wasmPath = (() => {
      try {
        return require.resolve('sql.js/dist/sql-wasm.wasm');
      } catch (e) {
        return path.join(__dirname, 'node_modules', 'sql.js', 'dist', 'sql-wasm.wasm');
      }
    })();

    SQL = await initSqlJs({ locateFile: () => wasmPath });

    if (fs.existsSync(DB_FILE)) {
      const filebuffer = fs.readFileSync(DB_FILE);
      db = new SQL.Database(filebuffer);
    } else {
      db = new SQL.Database();
      // create users table with email as primary key
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          email TEXT PRIMARY KEY,
          fullName TEXT NOT NULL,
          year INTEGER,
          class TEXT,
          passwordHash TEXT NOT NULL,
          role TEXT DEFAULT 'student',
          createdAt TEXT DEFAULT (datetime('now'))
        );
      `);
      await persist();
    }
  })();

  return initPromise;
}

function schedulePersist() {
  if (writeTimer) clearTimeout(writeTimer);
  writeTimer = setTimeout(async () => {
    try {
      await persist();
    } catch (err) {
      console.error('Error persisting DB', err);
    }
  }, WRITE_DEBOUNCE_MS);
}

async function persist() {
  if (!db) return;
  const data = db.export();
  const buffer = Buffer.from(data);
  return fs.promises.writeFile(DB_FILE, buffer);
}

async function getUserByEmail(email) {
  await ensureInit();
  const stmt = db.prepare('SELECT email, fullName, year, class, role, passwordHash, createdAt FROM users WHERE email = :email');
  try {
    stmt.bind({ ':email': email });
    if (!stmt.step()) return null;
    return stmt.getAsObject();
  } finally {
    stmt.free();
  }
}

async function insertUser(user) {
  await ensureInit();
  const stmt = db.prepare('INSERT INTO users (email, fullName, year, class, passwordHash, role, createdAt) VALUES (:email, :fullName, :year, :class, :passwordHash, :role, :createdAt)');
  try {
    stmt.run({
      ':email': user.email,
      ':fullName': user.fullName,
      ':year': user.year,
      ':class': user.class,
      ':passwordHash': user.passwordHash,
      ':role': user.role || 'student',
      ':createdAt': user.createdAt || new Date().toISOString()
    });
  } finally {
    stmt.free();
  }
  schedulePersist();
}

module.exports = { ensureInit, getUserByEmail, insertUser };
