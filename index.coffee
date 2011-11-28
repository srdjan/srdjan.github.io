class Canvas
	constructor: (@ctx, @width, @height, @players) ->
		@x = 150
		@y = 150
		@dx = 2
		@dy = 4
		@savedX = 0
		@savedY = 0
		@savedNote = ""

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
		if (@x + @dx > @width-40)
			@savedX = @x+20
			@savedY = @y
			@dx = -@dx
			flash = true

		if (@x + @dx < 30)
			@savedX = @x-30
			@savedY = @y
			@dx = -@dx
			flash = true

		if (@y + @dy > @height-40)
			@savedX = @x
			@savedY = @y+30
			@dy = -@dy
			flash = true

		if (@y + @dy < 30)	
			@savedX = @x
			@savedY = @y-20
			@dy = -@dy
			flash = true

		if flash
			indx = @x % 7 #Math.floor(Math.random() * 6) + 1
			#setTimeout(@players[indx].player.play, 0)
			@savedNote = @players[indx].note
			setTimeout(@fillText, 0)
			setTimeout(@clearText, 500)

		@x += @dx
		@y += @dy
		@circle(10, flash)

	fillText: =>
		@ctx.fillStyle = "blue"
		@ctx.fillText(@savedNote, @savedX, @savedY)

	clearText: =>
		@ctx.clearRect(0, 0, 20, @height)
		@ctx.clearRect(0, 0, @width, 20)
		@ctx.clearRect(@width-20, 0, 20, @height)
		@ctx.clearRect(0, @height-20, @width, 20)

class Note
  constructor: (@samplesLength, freq) ->
    @audio = new Audio()
    @audio.mozSetup(1, 44100)
    
    @samples = new Float32Array(@samplesLength)
    k = 2 * Math.PI * freq / 44100
    i = 0
    while i < @samplesLength
      @samples[i++] = 0.5 * Math.sin(k * i++)

  #play: => @audio.mozWriteAudio(@samples)

$ ->
	players = [
		{ player: new Note(7050, 440), note: "#A4"	},
		{ player: new Note(7050, 493.883), note: "#B4"	},
		{ player: new Note(7050, 523.26), note: "#C4"	},
		{ player: new Note(7050, 830.61), note: "#G4"	},
		{ player: new Note(7050, 880), note: "#A5"	},
		{ player: new Note(7050, 987.77), note: "#B5"	},
		{ player: new Note(7050, 1046.50), note: "#C6"	}
	]

	setTimeout($('body').addClass('onload'), 5)

	ctx = $("#canvas")[0].getContext("2d")
	width = $("#canvas").width()
	height = $("#canvas").height()
	ctx.font = "bold 10pt Calibri"
	ctx.textAlign = "left"
	ctx.textBaseline = "middle"
	canvas = new Canvas(ctx, width, height, players)
	setInterval(canvas.draw, 15)
