exports.getUsers = async (req, res) => {
    try {
        res.status(200).json({
            message: 'Data fetched successfully',
            data: []
        });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch users',
            message: error.message
        });
    }
};