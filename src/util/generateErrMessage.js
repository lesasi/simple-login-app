const key_list = ['email', 'name', 'age', 'password']

const handleEdgeCases = (message, key="") => {
    if(message.includes('Cast to Number')) {
        return `${key} must be a number!`;
    }
    if(message.includes('E11000 duplicate key error')) {
        console.log(message)
        return `${key} already exists`
    }
    if(message.includes('verifyIdToken')) {
        return `Login failed, try again`;
    }
    return message;
}

const generateErrMessage = (err_message) => {
    for(const key of key_list) {
        const lower_message = err_message.toLowerCase();
        if(lower_message.includes(key)) {
            if(err_message.includes('Custom')) {
                const message = err_message.replace('Custom:', '');
                return message;
            } 
            if(err_message.includes('User validation failed')) {
                const err_list = err_message.replace('User validation failed:', '').split(',');
                const err_obj = err_list.map(err => {
                    const splt = err.split(': ');
                    return handleEdgeCases(splt[1], key);
                });
                return err_obj[0];
            }
            return handleEdgeCases(err_message, key);
        }
    }
    return handleEdgeCases(err_message);
};

module.exports = generateErrMessage;