const db = require('../config/db');

// Insert users (with table creation if needed)
exports.insertData = async (users) => {
    const conn = await db;
    
    // Drop old table and recreate with correct columns
    await conn.execute('DROP TABLE IF EXISTS users');
    await conn.execute(`
        CREATE TABLE users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            external_id INT NOT NULL,
            name VARCHAR(255) NOT NULL,
            username VARCHAR(100),
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(50),
            website VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_name (name),
            INDEX idx_email (email)
        )
    `);
    
    // Clear existing users before inserting
    await conn.execute('DELETE FROM users');
    
    // Insert each user
    const query = 'INSERT INTO users (external_id, name, username, email, phone, website) VALUES (?,?,?,?,?,?)';
    for (const user of users) {
        await conn.execute(query, [
            user.id,        // external_id from JSONPlaceholder
            user.name,
            user.username,
            user.email,
            user.phone,
            user.website
        ]);
    }
}

// Fetch users with pagination, sorting, and filtering
exports.fetchData = async (page = 1, limit = 10, sortBy = 'id', order = 'asc', name = null, email = null) => {
    const conn = await db;
    const offset = (page - 1) * limit;
    
    // Validate sortBy to prevent SQL injection
    const allowedColumns = ['id', 'name', 'email', 'username', 'created_at'];
    const safeSortBy = allowedColumns.includes(sortBy) ? sortBy : 'id';
    const safeOrder = order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
    
    // Build WHERE clause for filtering
    let whereConditions = [];
    let values = [];
    
    if (name) {
        whereConditions.push('name LIKE ?');
        values.push(`%${name}%`);
    }
    if (email) {
        whereConditions.push('email LIKE ?');
        values.push(`%${email}%`);
    }
    
    // Build SQL query
    let sql = 'SELECT * FROM users';
    let countSql = 'SELECT COUNT(*) as total FROM users';
    
    if (whereConditions.length > 0) {
        const whereClause = ' WHERE ' + whereConditions.join(' AND ');
        sql += whereClause;
        countSql += whereClause;
    }
    
    sql += ` ORDER BY ${safeSortBy} ${safeOrder} LIMIT ? OFFSET ?`;
    values.push(limit, offset);
    
    // Get users
    const [rows] = await conn.query(sql, values);
    
    // Get total count (for pagination)
    const countValues = values.slice(0, -2); // Remove limit and offset
    const [countResult] = await conn.query(countSql, countValues);
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);
    
    return {
        users: rows,
        pagination: {
            page,
            limit,
            total,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1
        }
    };
}
