class Canvas
	constructor: (@ctx, @width, @height, @player) ->
		@x = 150
		@y = 150
		@dx = 2
		@dy = 4

	circle: (r, flash) ->
		@ctx.clearRect(20, 20, @width-40, @height-40)
		@ctx.beginPath()
		@ctx.arc(@x, @y, r, 0, Math.PI*2, true)
		@ctx.closePath()
		if flash
			@ctx.fillStyle = "red"
		else
			@ctx.fillStyle = "blue"
		@ctx.fill()

	draw: =>
		flash = false
		if (@x + @dx > @width-40) or (@x + @dx < 30)
			@dx = -@dx
			flash = true

		if (@y + @dy > @height-40) or (@y + @dy < 30)
			@dy = -@dy
			flash = true

		if flash
			indx = @x % 6
			setTimeout(@player.play, 0, indx)
	
		@x += @dx
		@y += @dy
		@circle(10, flash)

class Player
	constructor: ->
	  middleC = 261.6260
	  @notes = []
	  waves = []
	  waves[0] = [ "sine", 0.0000, 0.1000, 0.0000, 2.0000, 1.0000, 1.0000, 20.0000, middleC, 2400.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 1.0000, 0.0000, 0.0000, 0.0000, 0.0000 ]
	  waves[1] = [ "sine", 0.0000, 0.1000, 0.0000, 2.0000, 1.0000, 1.0000, 20.0000, middleC * 2, 2400.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 1.0000, 0.0000, 0.0000, 0.0000, 0.0000 ]
	  waves[2] = [ "sine", 0.0000, 0.1000, 0.0000, 2.0000, 1.0000, 1.0000, 20.0000, middleC * 3, 2400.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 1.0000, 0.0000, 0.0000, 0.0000, 0.0000 ]
	  waves[3] = [ "sine", 0.0000, 0.1000, 0.0000, 2.0000, 1.0000, 1.0000, 20.0000, middleC * 4, 2400.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 1.0000, 0.0000, 0.0000, 0.0000, 0.0000 ]
	  waves[4] = [ "sine", 0.0000, 0.1000, 0.0000, 2.0000, 1.0000, 1.0000, 20.0000, middleC * 5, 2400.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 1.0000, 0.0000, 0.0000, 0.0000, 0.0000 ]
	  waves[5] = [ "sine", 0.0000, 0.1000, 0.0000, 2.0000, 1.0000, 1.0000, 20.0000, middleC * 6, 2400.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 1.0000, 0.0000, 0.0000, 0.0000, 0.0000 ]

	  i = 0
	  while i < waves.length
	    note = {}
	    params = jsfxlib.arrayToParams(waves[i])
	    data = jsfx.generate(params)
	    note.data = audio.make(data)
	    @notes.push(note)
	    i++
	
	play: (i) =>
		@notes[i].data.play()

$ ->
	setTimeout($('body').addClass('onload'), 5)

	ctx = $("#canvas")[0].getContext("2d")
	width = $("#canvas").width()
	height = $("#canvas").height()
	ctx.font = "bold 10pt Calibri"
	ctx.textAlign = "left"
	ctx.textBaseline = "middle"
	player = new  Player
	canvas = new Canvas(ctx, width, height, player)
	setInterval(canvas.draw, 15)
