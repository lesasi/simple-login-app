const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const path = require("path")

const userRouter = require('./src/routers/user');
require('./src/db/mongoose');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());

// for deployment
app.use(express.static(path.join(__dirname, "client", "build")))

// routers here
app.use(userRouter);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
    console.log('Server listening at port ' + port);
});