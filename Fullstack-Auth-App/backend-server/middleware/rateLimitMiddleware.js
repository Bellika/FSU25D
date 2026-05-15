import rateLimit from 'express-rate-limit'

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 5,
    message: {
        success: false,
        error: 'Too many login attempts'
    },
    standardHeaders: true
})