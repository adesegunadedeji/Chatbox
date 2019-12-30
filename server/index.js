const socketio = require('socket.io');
const express = require('express')
const http = require('http');
const {addUser,removeUser,getUser, getUsersInroom} = require('./users')

const PORT = process.env.PORT || 5000;
const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connect', (socket)=>{
    console.log("We have a new Connection!!!");
    socket.on('join',({ name,room }, cb)=> {    //Callback Function CB
        // console.log(name,room);
        const {error,user} = addUser({id: socket.id, name, room});

        if (error) return cb(error)

    });

    socket.on('disconnect', ()=> {
        console.log("User has lost connection");
      });
})
//MIDDLE WARE
app.use(router);
server.listen(PORT, () => console.log(`__Server is RUNNING on port ${PORT} ___`))
