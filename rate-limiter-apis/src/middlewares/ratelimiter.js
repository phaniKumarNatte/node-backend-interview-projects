const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    max:10,
    windowMs: 5*60*10000,  //minutes × 60 × 1000
    handler: (req,res) =>{
        res.setHeader("Retry-After", 5 * 60); // seconds
        res.status(429).json({
        success: false,
        message: "Too many requests. Please try again later."
        });
    }
});

module.exports = limiter;