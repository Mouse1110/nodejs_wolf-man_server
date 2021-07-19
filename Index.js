///
/// Set Up
///
const express = require('express');
const app = express();
const http = require('http');
// Socket io For Server Game Wolf Man
const server = require('http').createServer();
const io = require('socket.io')(server);
//====================================
const cors = require('cors');
app.use(cors());

// Default Link Serer
app.get('/',(req,res)=>{
    res.send('<h1>Server Of Ba Nguyen<h1>');

})
//====================================

var users = [];
/// data type
// name:'room'
// max:10
//index:5
//member:['id','id']
var room = [{'name':'hello','max':10,'index':5}];

io.on('connection',(socket)=>{
    console.log(socket.id +' is connected')
    socket.emit('first',socket.id);

    // Login With Name and Phone
    socket.on('login',(data)=>{
        // save data: 
        // + name
        // + phone
        // + id
        console.log(data);
        users.push(data);
        // accept login to client
        socket.emit('login',true);
    })
    socket.on('room',(_)=>{
        socket.emit('room',room);
    })
    // Join Room
    socket.on('joinRoom',(data)=>{

    })

    socket.on('createRoom',(data)=>{
        var check = room.find((e)=>data['name']===e['name']);
        if (typeof(check)==='undefined'){
            var data = {'name':data['name'],'max':data['max'],'index':1,'member':[socket.id]};
            room.push(data);
            console.log(data);
            socket.emit('createRoom',true);
        }
    })

    socket.on('disconnect',()=>{
        console.log('a user disconnected');
        var i = 0;
        users.find((item)=>{
            item['id'] == socket.id ? users.splice(i,1):i++;
        })
        console.log(users);
    })
})



// Start Listenning Server With Port 3000
server.listen(3000,()=>{
    console.log('Server Starting...');
})
//=====================================

