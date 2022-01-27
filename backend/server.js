const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
 });

const connection= mongoose.connection;
connection.once('open', (err) => {
    console.log(err);
    console.log("Mongodb database connection established successfully !!");
})

const usersRouter = require('./routes/users');
const formRouter = require('./routes/form');

app.use('/form', formRouter);
app.use('/users', usersRouter);
app.use('/uploads/actions', express.static(path.join(__dirname, 'uploads/actions')));
app.use('/static', express.static('public'))


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
