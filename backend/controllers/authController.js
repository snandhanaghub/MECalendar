const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
}

exports.signup = async (req, res) => {
  try {
    const { fullName, email, year, class: clazz, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ error: 'fullName, email and password are required' });
    }

    // enforce college email domain
    const allowedDomain = '@mec.ac.in';
    if (!email.toLowerCase().endsWith(allowedDomain)) {
      return res.status(400).json({ error: `Only ${allowedDomain} email addresses are allowed to sign up` });
    }

  const normalizedEmail = email.toLowerCase();
  const existing = await db.getUserByEmail(normalizedEmail);
  if (existing) return res.status(409).json({ error: 'User already exists' });

    const hash = await bcrypt.hash(password, 10);
  // using email as primary key
    const userObj = {
      email: normalizedEmail,
      fullName,
      year: year || null,
      class: clazz || null,
      passwordHash: hash,
      role: 'student',
      createdAt: new Date().toISOString()
    };

    await db.insertUser(userObj);
    // don't return passwordHash in response
    const { passwordHash, ...user } = userObj;

    const token = generateToken(user);
    res.json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email and password required' });

    const normalizedEmail = email.toLowerCase();
    const stored = await db.getUserByEmail(normalizedEmail);
    if (!stored) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, stored.passwordHash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const { passwordHash, ...user } = stored;
    const token = generateToken(user);
    res.json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
