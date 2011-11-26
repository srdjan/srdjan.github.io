class Canvas
	constructor: (@ctx, @width, @height) ->

	circle: (r, flash) ->
		@ctx.clearRect(0, 0, @width, @height)
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

	draw: =>
		flash = false
		if (@x + @dx > @width || @x + @dx < 0)
			@dx = -@dx
			indx = Math.floor(Math.random() * 6) + 1
	#		setTimeout(@players[indx].play, 0)
			flash = true

		if (@y + @dy > @height || @y + @dy < 0)
			@dy = -@dy
			indx = Math.floor(Math.random() * 6) + 1
		#	setTimeout(@players[indx].play, 0)
			flash = true

		@x += @dx
		@y += @dy
		@circle(10, flash)

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
	players.push(new AudioPlayer(44100, 7050, 1046.50)) #C6
	players.push(new AudioPlayer(44100, 7050, 1174.66)) #D6
	players.push(new AudioPlayer(44100, 7050, 1318.51)) #E6
	players.push(new AudioPlayer(44100, 7050, 1396.91)) #F6
	players.push(new AudioPlayer(44100, 7050, 1567.98)) #G6
	players.push(new AudioPlayer(44100, 7050, 1760.00)) #A6
	players.push(new AudioPlayer(44100, 7050, 1975.53)) #B6
		
	ctx = $("#canvas")[0].getContext("2d")
	width = $("#canvas").width()
	height = $("#canvas").height()
	paddleGame = new PaddleGame(ctx, width, height, players)

	intervalID = setInterval(paddleGame.draw, 10)
