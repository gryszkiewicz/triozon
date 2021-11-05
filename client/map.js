drawMap = (data) => {
	for(var j = -100; j < 100; j++) {
		for(var i = -100; i < 100; i++) {
			if(i%2 == 0 && j%2 == 0) {
				ctx.fillStyle = '#777777'
			}
			else if(i%2 == 1 && j%2 == 1) {
				ctx.fillStyle = '#777777'
			}
			else {
				ctx.fillStyle = '#aaaaaa'
			}
			ctx.fillRect((i+mapX)*32, (j+mapY)*32, 32, 32)
			ctx.stroke()
		}
	}
}
