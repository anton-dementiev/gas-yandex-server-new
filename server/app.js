//Load env variables (Don't use USER!)
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('./src/routes/auth');
const routes = require('./src/routes/router');


//create app
const app = express();


//set up port
const port = process.env.PORT || 3000;


//allow cross-origin access
app.use(cors({
    origin: "*"
}));


//parse request of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//parse requests of content-type - application/json
app.use(bodyParser.json());



//Define routes
app.use('/api/', auth,  routes);


//listen for requests
app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
})