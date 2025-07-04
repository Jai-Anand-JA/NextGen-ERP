
export const isAdmin = (req, res, next) => {
    const user = req.user; // Assuming user is set in authMiddleware
    if (!user || user.role !== 'Admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
}
