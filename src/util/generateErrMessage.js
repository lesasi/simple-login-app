const generateErrMessage = (key, message) => {
    return JSON.stringify({
        key,
        message
    });
};

module.exports = generateErrMessage;