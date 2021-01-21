//'use strict';

const bodyParser = require('body-parser');
const token = 'testToken'; // type here your verification token


const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')

const app = express();
const port = 3000

app.use(express.static(__dirname + '/'));
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var server = require('http').Server(app);
var io = require('socket.io')(server);
// var routes = require('./views/index')(io);

//view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('views engine', 'ejs')
//render html files
app.engine('html', require('ejs').renderFile)

//set form variables
var dataSetBody = "Null"

var _Name = "Null"
var _Address = "Null"
var _Mobile = "Null"
var _Email = "Null"
var _Instructions = "Null"


server.listen(port, () => console.log('[ChatBot] Webhook is listening : Running on port 3000'));

//socket.io

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

io.on('connection', function(socket) {

    setInterval(function(){
        socket.emit('message', { message:dataSetBody, 
                                 messageName:_Name,
                                 messageAddress:_Address,
                                 messageMobile:_Mobile,
                                 messageEmail:_Email,
                                 messageInstruction:_Instructions, 
        });
    })

}, 1000);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });


app.get('/script.js', function (req, res) {
    res.sendFile(path.join(__dirname, 'script.js'));
  });

app.post('/', (req, res) => {
    // check if verification token is correct

    // if (req.query.token !== token) {
    //     return res.sendStatus(401);
    // }

    // print request body
    console.log("Body: " + JSON.stringify(req.body))

    // console.log("First Name: " + req.body.firstName);
    // console.log("Last Name: " + req.body.lastName);
    // console.log("Address: " + req.body.formAddress);

    // var testFname = req.body.firstName
    // var testLname = req.body.lastName
    // var testAddress = req.body.formAddress

    // console.log(testFname)
    // console.log(testLname)
    // console.log(testAddress)

    dataSetfName = req.body.firstName
    dataSetlName = req.body.lastName
    dataSetAdd = req.body.formAddress
    dataSetBody = req.body

    _Name = req.body.Name
    _Address = req.body.AddressStreet + " " + req.body.AddressLine2 + " " + req.body.AddressTownCity + ", " + req.body.AddressCountry;
    _Mobile = req.body.Mobile
    _Email = req.body.Email
    _Instructions = req.body.SpecialInstructions

    console.log("Name: " + _Name)
    console.log("Address: " + _Address)
    console.log("Mobile: " + _Mobile)
    console.log("Email: " + _Email)
    console.log("Special Instructions: " + _Instructions)

    // io.on('connection', function(socket) {
    //     socket.emit('msg', { messageA: dataSetfName, messageB:dataSetlName, messageC:dataSetAdd});
    //     // socket.emit('announcements', { message: 'A new user has joined!' });
    // });

    // return a text response
    const data = {
        responses: [
            {
                type: 'Thank you!',
                elements: ['Hi', 'Hello']
            }
        ]
    };

    res.json(data);
});


