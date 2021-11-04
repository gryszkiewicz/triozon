var map = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,1],
[1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
[1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
[1,0,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,0,1],
[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
[1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,0,1],
[1,0,0,0,0,1,0,0,1,1,1,1,0,0,1,0,0,0,0,1],
[1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
[1,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]

drawMap = (data) => {
	for(var j = 0; j < map.length; j++) {
		for(var i = 0; i < map[j].length; i++) {
			if(map[j][i] == 0) {
				ctx.fillStyle = '#777777'
			}
			else if(map[j][i] == 1) {
				ctx.fillStyle = '#aaaaaa'
			}
			ctx.fillRect((i+mapX)*32, (j+mapY)*32, 32, 32)
			ctx.stroke()
		}
	}
}