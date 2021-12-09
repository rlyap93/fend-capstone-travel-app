const fetch = require('cross-fetch')
const dotenv = require('dotenv');
dotenv.config();

const GEONAMES_USERAME = process.env.GEONAMES_API_USERNAME;
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
let projectData = {};


var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');

const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
const cors = require('cors');
const { response } = require('express');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

app.use(express.static('dist'));

console.log(__dirname);

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function listening() {
    console.log('Example app listening on port 8081!')
});

app.get('/test', function (req, res) {
    res.send("mockAPIResponse")
});

// Callback function to complete GET '/all'
app.get('/all', getData);

function getData (request, response) {
  response.send(projectData);
};

app.post('/addAPIData', addAPIData);

function addAPIData(request,response){
  projectData["temperature"] = request.body.temp;
  projectData["url"] = request.body.photoURL;
  projectData["destination"] = request.body.destination;
  response.send(projectData);
  console.log(projectData);
};
  
