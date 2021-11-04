const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

app.use(express.static(__dirname + '/client'))

var players = []

io.on('connection', (socket) => {
	players.push([socket.id, 7, 7, 0, 0])
	console.log('\x1b[32mplayer (id: '+socket.id+') connected')

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
		console.log('\x1b[31mplayer (id: '+socket.id+') disconnected')
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
	socket.emit('id', socket.id)
	})

})

server.listen(process.env.PORT || 80, () => {
	console.log('server started on *:'+process.env.PORT)
})