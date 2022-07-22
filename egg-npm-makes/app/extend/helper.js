
module.exports = {
    //@test getMd5Code
    getMd5Code(str) {
        return str + '250';
    },
    //@test loggerInfo
    loggerInfo(msg) {
        const { app } = this;
        app.logger.info(msg);
        console.log(`${new Date().toLocaleString()}: ${msg}`);
    },
};
