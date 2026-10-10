import 'dotenv/config';

const PORT = process.env.PORT;

const DATABASE_URL = process.env.DATABASE_URL;

const hashSalt = parseInt(process.env.HASH_SALT!);

const JWT_SECRET = process.env.JWT_SECRET!;

const NODE_DEV = process.env.NODE_DEV;

export { PORT, DATABASE_URL, hashSalt, JWT_SECRET, NODE_DEV };
