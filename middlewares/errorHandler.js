module.exports = (req, res) => {
    process.on('unhandledRejection', reason => {
        res.send(reason);
    });
    process.on('uncaughtException', err => {
        console.log('error', JSON.stringify(err));
        res.send(err);
    });
};
