var socket = io()

var players = []

var myId

var idle = true

const FPS = 60

socket.on('id', (data) => {
	myId = data
})

const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

canvas.width = 480
canvas.height = 480

const keys = [];

document.body.appendChild(canvas)

var backgroundReady = false
var backgroundImg = new Image()
var sprite = new Image()

backgroundImg.src = './assets/map.png'
sprite.src = './assets/char0.gif'

backgroundImg.onload = () => {
	backgroundReady = true;
}

const player = {
	x: 7,
	y: 7,
	width: 32,
	height: 48,
	spriteX: 0,
	spriteY: 0
}

var mapX = 0
var mapY = 0


socket.on('players', (data) => {
	players = data
})

drawPlayers = () => {
	if(backgroundReady) {
		//context.drawImage(backgroundImg, mapX*32, mapY*32)
		ctx.drawImage(sprite, player.spriteX*player.width, player.spriteY*player.height, player.width, player.height, 7*32, 7*32, player.width, player.height)
		for(var i = 0; i < players.length; i++) {
			if(players[i][0] != myId) {
				ctx.drawImage(sprite, players[i][3]*32, players[i][4]*48, 32, 48, (mapX+players[i][1])*32, (mapY+players[i][2])*32, 32, 48)
			}
		}

	}
}

emitPlayerData = () => {
	socket.emit('playerData', [player.x, player.y, player.spriteX, player.spriteY])
}

gameLoop = () => {
	drawMap()
	drawPlayers()
	setTimeout(() => { requestAnimationFrame(gameLoop) }, 1000/FPS)
}

gameLoop()

moveAnimation = () => {
	idle = false
	setTimeout(() => { player.spriteX = 1; emitPlayerData() }, 80)
	setTimeout(() => { player.spriteX = 2; emitPlayerData() }, 160)
	setTimeout(() => { player.spriteX = 3; emitPlayerData() }, 240)
	setTimeout(() => { player.spriteX = 0; emitPlayerData() }, 320)
	setTimeout(() => { idle = true }, 320)
}


mapAnimation = (toX, toY) => {
	for(var i = 1; i <= 32; i++) {
		setTimeout(() => { mapX += toX/32; mapY += toY/32}, i*10)
	}
}

playerMove = (toX, toY) => {
	for(var i = 1; i <= 32; i++) {
		setTimeout(() => { player.x += toX/32; player.y +=toY/32 }, i*10)
	}
}



kbInput = (e) => {
	if(idle) {
		if(e.keyCode == 68) {
			moveAnimation()
			player.spriteY = 2
			playerMove(1, 0)
			mapAnimation(-1, 0)
		}
		else if(e.keyCode == 65) {
			moveAnimation()
			player.spriteY = 1
			playerMove(-1, 0)
			mapAnimation(1, 0)
		}
		else if(e.keyCode == 83) {
			moveAnimation()
			player.spriteY = 0
			playerMove(0, 1)
			mapAnimation(0, -1)
		}
		else if(e.keyCode == 87) {
			moveAnimation()
			player.spriteY = 3
			playerMove(0, -1)
			mapAnimation(0, 1)
		}
	}
}

document.addEventListener('keydown', kbInput)