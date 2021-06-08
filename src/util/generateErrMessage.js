const key_list = ['username', 'name', 'age', 'old_password', 'password']

const handleEdgeCases = (message, key="") => {
    if(message.includes('Cast to Number')) {
        return 'Age must be a number!';
    }
    if(message.includes('E11000 duplicate key error')) {
        return `${key} already exists`
    }
    return message;
}

const generateErrMessage = (err_message) => {
    for(const key of key_list) {
        const lower_message = err_message.toLowerCase();
        if(lower_message.includes(key)) {
            if(err_message.includes('Custom')) {
                const message = err_message.replace('Custom:', '');
                return [{
                    key,
                    message
                }];
            } 
            if(err_message.includes('User validation failed')) {
                const err_list = err_message.replace('User validation failed:', '').split(',');
                const err_obj = err_list.map(err => {
                    const splt = err.split(': ');
                    return {
                        key: splt[0].replace(' ', ''),
                        message: handleEdgeCases(splt[1])
                    };
                });
                return err_obj;
            }
            return [{
                key,
                message: handleEdgeCases(err_message, key)
            }];
        }
    }
    return err_message;
};

module.exports = generateErrMessage;