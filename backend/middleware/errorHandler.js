const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.message);
    console.error(err.stack);

    res.status(500).json({
        status: 'error',
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
};

module.exports = errorHandler;