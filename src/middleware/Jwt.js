const jwt = require('jsonwebtoken');

const authenticationToken = (req, res, next) => {
    // Retrieve the Authorization header
    const authHeader = req.headers['authorization'];

    // Check if the header exists and follows the Bearer token format
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send("Access denied. No token provided.");
    }

    // Extract the token by splitting the 'Bearer' prefix
    const token = authHeader.split(' ')[1];

    try {
        // Verify the token using JWT_SECRET
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach verified user payload to request
        next(); // Move to the next middleware
    } catch (error) {
        res.status(400).send("Invalid token");
    }
};

module.exports = {
    authenticationToken
};
