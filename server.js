const express = require('express');
const http = require('http');
const path  = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const moment = require('moment');


const app=express();

const server = http.createServer(app);

const io = socketio(server);


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/",(req,res) => {
    res.sendFile(path.join(__dirname,'./public/start.html'));
})

var username,roomname;

app.post("/chat",(req,res) => {
    // console.log('username = '+req.body.usrname+'  room = '+req.body.room);
    username = req.body.usrname;
    roomname = req.body.room;
    res.sendFile(path.join(__dirname,'./public/chat.html'));
})

io.on('connection',(socket) => {
    // console.log('New socketio connection');
    let o1={
        username,
        roomname
    }
    let o2 = {
        username : 'super-chat-bot',
        msg : 'Welcome to Superchat '+username+' !!',
        time : moment().format('h:mm a')
    }
    socket.emit('joinmember',o1);
    socket.emit('message',o2);
    // socket.broadcast.emit('message','A user has joined the room');
    let o11 ={
        username : 'super-chat-bot',
        msg : `${username} has joined this room`,
        time : moment().format('h:mm a')
    }
    socket.broadcast.emit('message',o11);
    socket.on('disconnect',() => {
        let o3 = {
            username : 'super-chat-bot',
            msg : 'A user has left this room',
            time : moment().format('h:mm a')
        }
        io.emit('message',o3);
    })
    socket.on('chatmsg',(message) => {
        // console.log(msg);
        let o4 = {
            username : message.username,
            msg : message.msg,
            time : moment().format('h:mm a')
        }
        io.emit('message',o4);
    })
});


const PORT = 5000 || process.env.PORT;

server.listen(PORT , () => console.log('Server started on port ' + PORT));