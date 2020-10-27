const express = require('express');
const http = require('http');
const path  = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const socketio = require('socket.io');


const app=express();

const server = http.createServer(app);

const io = socketio(server);


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/",(req,res) => {
    res.sendFile(path.join(__dirname,'./public/start.html'));
})
app.post("/chat",(req,res) => {
    console.log('username = '+req.body.usrname+'  room = '+req.body.room);
    res.sendFile(path.join(__dirname,'./public/chat.html'));
})

io.on('connection',(socket) => {
    console.log('New socketio connection');
});


const PORT = 5000 || process.env.PORT;

server.listen(PORT , () => console.log('Server started on port ' + PORT));