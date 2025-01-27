
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv =require('dotenv');
dotenv.config();

const conn = require('./config/db');
conn.dbConnect();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const taskRouter = require('./router/route');
app.use('/api', taskRouter);



const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
