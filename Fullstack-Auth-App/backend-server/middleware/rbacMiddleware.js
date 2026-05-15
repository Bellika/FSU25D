export const requireRole = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                sucess: false,
                error: 'Authentication required'
            })
        }

        if (req.user.role !== requiredRole) {
            return res.status(403).json({
                success: false, 
                error: `Access denied. ${requiredRole} role required`
            })
        }

        next()
    }
}