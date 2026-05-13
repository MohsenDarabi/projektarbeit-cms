import Database from 'better-sqlite3';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

const db = new Database('local.db');
const username = 'admin';
const password = 'password123';

async function seed() {
	try {
		const hash = await bcrypt.hash(password, 10);
		const id = randomUUID();
		
		const stmt = db.prepare('INSERT INTO user (id, username, password_hash) VALUES (?, ?, ?)');
		stmt.run(id, username, hash);
		console.log(`\n✅ User "${username}" created successfully!`);
		console.log(`🔑 Password: ${password}`);
		console.log('You can now log in at http://localhost:5173/login\n');
	} catch (error: any) {
		if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
			console.log(`\n⚠️  User "${username}" already exists.\n`);
		} else {
			console.error('\n❌ Error seeding database:', error);
		}
	} finally {
		db.close();
	}
}

seed();
