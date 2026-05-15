import db from '../config/database.js';
import bcrypt from 'bcrypt';

class User {
    static async findAll() {
        const [rows] = await db.query('SELECT id, username, created_at, updated_at FROM users');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT id, username, created_at, updated_at FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    static async findByUsername(username) {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0];
    }

    static async create(username, password, role = 'user') {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, role]);
        return { id: result.insertId, username };
    }

    static async updateRefreshToken(userId, refreshToken) {
        await db.query('UPDATE users SET refresh_token = ? WHERE id = ?', [refreshToken, userId])
    }

    static async findByRefreshToken(refreshToken) {
        const [rows] = await db.query('SELECT * FROM users WHERE refresh_token = ?', [refreshToken])
        return rows[0]
    }

    static async clearRefreshToken(userId) {
        await db.query('UPDATE users SET refresh_token = NULL WHERE id = ?', [userId])
    }

    static async update(id, username, password) {
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const [result] = await db.query('UPDATE users SET username = ?, password = ? WHERE id = ?', [username, hashedPassword, id]);
            return result.affectedRows > 0 ? await this.findById(id) : null;
        }
        const [result] = await db.query('UPDATE users SET username = ? WHERE id = ?', [username, id]);
        return result.affectedRows > 0 ? await this.findById(id) : null;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }

    static async verifyPassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}

export default User;
