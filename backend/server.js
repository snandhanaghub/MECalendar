const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRouter = require('./routes/auth');
const db = require('./db');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);

app.get('/', (req, res) => res.json({ status: 'ok', version: '1.0' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Auth server listening on ${PORT}`));

// warm up DB in background (non-blocking)
db.ensureInit()
	.then(() => console.log('DB initialized in background'))
	.catch(err => console.error('DB background init failed', err));
