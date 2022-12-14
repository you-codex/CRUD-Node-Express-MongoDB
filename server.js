// This file allows you to start the server

const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const connectDB = require('./server/database/connection');

const app = express();

dotenv.config({path:'config.env'})
const PORT = process.env.PORT ||8080 /* If config file is not available this is default value */

// morgon module allows ypu to log a request
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))

// set views engine
app.set("view engine", "ejs")
// app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))
/* By this i din't have to specify the relative path of this file in future because here i have the virtual path. 
By this you don't have to specify path in source attribute. */

// load routers
app.use('/', require('./server/routes/router'))

app.listen(PORT, () => {console.log(`Server is running on http://localhost:${PORT}`)});