class Canvas
	constructor: (@ctx, @width, @height) ->

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

class PaddleGame extends Canvas
	constructor: (ctx, width, height, @players) ->
		super(ctx, width, height)
		@x = 150
		@y = 150
		@dx = 2
		@dy = 4
		@savedX = 0
		@savedY = 0
		@savedNote = ""

	draw: =>
		flash = false
		if (@x + @dx > @width-40)
			@savedX = @x+20
			@savedY = @y
			@dx = -@dx
			flash = true

		if (@x + @dx < 30)
			@savedX = @x-20
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
			indx = Math.floor(Math.random() * 6) + 1
			setTimeout(@players[indx].player.play, 0)
			@savedNote = @players[indx].note
			setTimeout(@fillText, 0)
			setTimeout(@clearText, 300)

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

class AudioPlayer
  constructor: (@sampleRate, @samplesLength, freq) ->
    @audio = new Audio()
    @audio.mozSetup(1, @sampleRate)
    
    @samples = new Float32Array(@samplesLength)
    k = 2 * Math.PI * freq / @sampleRate
    i = 0
    currentSoundSample = 0
    while i < @samplesLength
      @samples[i++] = 0.5 * Math.sin(k * currentSoundSample++)

  play: => 
	  @audio.mozWriteAudio(@samples)

$ ->
	setTimeout($('body').addClass('onload'), 5)

	players = []
	players.push(	{ player: new AudioPlayer(44100, 7050, 523.26), note: "#C4"	} )
	players.push(	{ player: new AudioPlayer(44100, 7050, 1174.66), note: "#D6"	} )
	players.push(	{ player: new AudioPlayer(44100, 7050, 1318.51), note: "#E6"	} )
	players.push(	{ player: new AudioPlayer(44100, 7050, 830.61), note: "#G4"	} )
	players.push(	{ player: new AudioPlayer(44100, 7050, 932.33), note: "#A#5"	} )
	players.push(	{ player: new AudioPlayer(44100, 7050, 987.77), note: "#B5"	} )
	players.push(	{ player: new AudioPlayer(44100, 7050, 880), note: "#A5"	} )
		
	ctx = $("#canvas")[0].getContext("2d")
	width = $("#canvas").width()
	height = $("#canvas").height()
	ctx.font = "bold 10pt Calibri"
	ctx.textAlign = "center"
	ctx.textBaseline = "middle"
	paddleGame = new PaddleGame(ctx, width, height, players)
	intervalID = setInterval(paddleGame.draw, 15)
