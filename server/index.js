const socketio = require('socket.io');
const express = require('express')
const http = require('http');
const {addUser,removeUser,getUser, getUsersInroom} = require('./users')
const PORT = process.env.PORT || 5000;
const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const cors = require('cors');

//MIDDLE WARE
app.use(router);
app.use(cors());

io.on('connect', (socket)=>{
    console.log("We have a new Connection!!!");
    socket.on('join',({ name,room }, callback)=> {    //Callback Function CB
        const {error,user} = addUser({id: socket.id, name, room});
        if (error) return callback(error);

        socket.join(user.room);
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the chat room ${user.room}.`});
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined the chat!` });//Sends to Everyone but the user
        

        // io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        callback(); // Callback Function 
    });
    socket.on('sendMessage', (message,callback)=>{
        const user = getUser(socket.id);
        io.to(user.room).emit('message', {user: user.name, text: message})
        callback(); // Callback Function Again

    })

    socket.on('disconnect', ()=> {
        console.log("User has lost connection");
      });
})

server.listen(PORT, () => console.log(`__Server is RUNNING on port ${PORT} ___`))
