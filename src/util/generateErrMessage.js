const key_list = ['username', 'name', 'age', 'password', ]

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
        console.log(lower_message, key)
        if(lower_message.includes(key)) {
            if(err_message.includes('Custom')) {
                const message = err_message.replace('Custom:', '');
                return JSON.stringify({
                    key,
                    message
                });
            } 
            if(err_message.includes('User validation failed')) {
                const err_list = err_message.replace('User validation failed:', '').split(',');
                const err_obj = {};
                err_list.forEach(err => {
                    const splt = err.split(': ');
                    err_obj[splt[0].replace(' ', '')] = handleEdgeCases(splt[1]);
                });
                return JSON.stringify(err_obj);
            }
            return JSON.stringify({
                key,
                message: handleEdgeCases(err_message, key)
            });
        }
    }
    return err_message;
};

module.exports = generateErrMessage;