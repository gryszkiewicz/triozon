drawMap = (data) => {
	for(var j = 0; j < map.length; j++) {
		for(var i = 0; i < map[j].length; i++) {
			if(map[j][i] == 0) {
				ctx.fillStyle = '#777777'
			}
			else if(map[j][i] == 1) {
				ctx.fillStyle = '#aa0000'
			}
			
			ctx.fillRect((i+mapX)*32, ((j+mapY)*32)+16, 32, 32)
			ctx.stroke()
		}
	}
}
