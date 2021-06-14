const mongoose = require("mongoose");

/* connection URL here is server address + db name */
mongoose.connect(process.env.MONGOOSE_DB_URL, {
    useNewUrlParser:true, 
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

console.log(process.env)