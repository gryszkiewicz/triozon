const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
const colors = require('colors')

app.use(express.static(__dirname + '/client'))

var players = []
var chat = [['',''], ['',''], ['',''], ['',''], ['',''], ['','']]

io.on('connection', (socket) => {
	players.push([socket.id, 7, 7, 0, 0])
	console.log(colors.green('player (id: %s) connected'), socket.id)
	socket.emit('id', socket.id)
	io.emit('players', players)

	socket.on('disconnect', () => {
		if(players.length == 1) {
			players = []
		}
		else {
			for(var i = 0; i < players.length; i++) {
				if(players[i][0] == socket.id) {
					players.splice(i,i)
				}
			}
		}
		console.log(colors.red('player (id: %s) disconnected'), socket.id)
		io.emit('players', players)
	})

	socket.on('chat', (data) => {
		for(var i = 1; i < 6; i++) {
			chat[i-1] = chat[i]
		}
		chat[5] = [data[0], data[1]]
		console.log(data[0]+': '+data[1])
		io.emit('msg', chat)
	})

	socket.on('playerData', (data) => {
		for(var i = 0; i < players.length; i++) {
			if(players[i][0] == socket.id) {
				players[i][1] = data[0]
				players[i][2] = data[1]
				players[i][3] = data[2]
				players[i][4] = data[3]
			}
		}
	io.emit('players', players)
	})

})

server.listen(process.env.PORT || 80, () => {
	console.log('server started on *:'+process.env.PORT)
})
