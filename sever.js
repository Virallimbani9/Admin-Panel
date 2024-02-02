const express = require('express')
const app = express()
const port = 3000
const db = require('./config/db');
const dotenv = require('dotenv');
const testingrouter=require('./router/testing/testing')
const cookieParser = require('cookie-parser');
const employeeRouter=require('./router/employee/employee')

app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();
db()

//------------------ TESTING ----------------------
app.use('/testing', testingrouter)


//------------------ EMPLOYEE ---------------------
app.use('/employee', employeeRouter)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))


