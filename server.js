const express = require('express');
const http = require('http');
const path  = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const moment = require('moment');
const {adduser,getuser,returnuser , removeuser} = require('./utils/users')
const msg = require('./utils/messages');


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

    socket.on('start',(messagaga) => {
        let user = adduser(socket.id,roomname,username);
        socket.join(user.room);
        socket.emit('roomname',roomname);
        socket.emit('message',msg('super-chat-bot',`Welcome to the room ${username}`));
        socket.to(user.room).broadcast.emit('message',msg('super-chat-bot',`${username} has joined this room`));
        emituser(user.room,socket.id);
    })
    
    // socket.broadcast.emit('message','A user has joined the room');

    function emituser (room) {
        io.to(room).emit('numusers',returnuser(room));
    }



    socket.on('disconnect',() => {
        let user=getuser(socket.id);
        io.to(user.room).emit('message',msg('super-chat-bot',`${user.username} has left this room`));
        removeuser(socket.id);
        emituser(user.room);
    })
    socket.on('chatmsg',(message) => {
        // console.log(msg);
        let user=getuser(socket.id);
        io.to(user.room).emit('message',msg(user.username,message));
    })
});


const PORT = 5000 || process.env.PORT;

server.listen(PORT , () => console.log('Server started on port ' + PORT));