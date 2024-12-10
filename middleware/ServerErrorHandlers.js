const ServerErrorHandlers = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
};

module.exports = ServerErrorHandlers;