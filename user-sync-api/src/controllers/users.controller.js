const axios = require('axios');
const userModel = require('../models/users.model');

// GET /api/saveUsers - Sync users from JSONPlaceholder
exports.syncPosts = async (req, res) => {
    try {
        // ✅ FIX: Fetch USERS, not posts
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/users'); 
        console.log('Fetched users:', data.length);
        
        await userModel.insertData(data);
        res.json({ 
            success: true, 
            message: `Saved ${data.length} users to database` 
        });
    } catch(err) {
        console.log('error---', err.message);
        // ✅ FIX: Send error response to client
        res.status(500).json({ 
            success: false, 
            error: 'Failed to sync users',
            details: err.message 
        });
    }
}

// GET /api/getUsers - Get users with pagination
exports.getUsers = async(req, res) => {
    try {
        let { page = 1, limit = 10, sortBy = 'id', order = 'asc', name, email } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);
        
        const data = await userModel.fetchData(page, limit, sortBy, order, name, email);
        res.json({
            success: true,
            data: data.users,
            pagination: data.pagination
        });
    } catch(err) {
        console.log('error---', err.message);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to fetch users' 
        });
    }
}
