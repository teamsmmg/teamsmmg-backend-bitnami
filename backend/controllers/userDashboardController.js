const User = require('../models/userModel2'); 

// User Dashboard Data Fetch Controller
exports.getUserDashboard = async (req, res) => {
    try {
        // Token से यूजर का email निकालें
        const userEmail = req.user.email;

        // यूजर की details + projects MongoDB से email के आधार पर fetch करें
        const user = await User.findOne({ email: userEmail }).select('-password'); 

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user); // JSON response में यूजर की पूरी details भेजें
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
