const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const userRouter = require("./routes/userRouter")
const router = require('./routes/Router');
const app = express();

app.set('port', process.env.PORT || 3008);
app.use(cors());
app.use(express.json());

app.use('/api', router);
app.use('/api', userRouter);

module.exports = app;
