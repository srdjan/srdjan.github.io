(function() {
  var AudioPlayer, Canvas, PaddleGame;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Canvas = (function() {
    function Canvas(ctx, width, height) {
      this.ctx = ctx;
      this.width = width;
      this.height = height;
    }
    Canvas.prototype.circle = function(r, flash) {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, r, 0, Math.PI * 2, true);
      this.ctx.closePath();
      if (flash) {
        this.ctx.fillStyle = "red";
      } else {
        this.ctx.fillStyle = "blue";
      }
      return this.ctx.fill();
    };
    return Canvas;
  })();
  PaddleGame = (function() {
    __extends(PaddleGame, Canvas);
    function PaddleGame(ctx, width, height, players) {
      this.players = players;
      this.draw = __bind(this.draw, this);
      PaddleGame.__super__.constructor.call(this, ctx, width, height);
      this.x = 150;
      this.y = 150;
      this.dx = 2;
      this.dy = 4;
    }
    PaddleGame.prototype.draw = function() {
      var flash, indx;
      flash = false;
      if (this.x + this.dx > this.width || this.x + this.dx < 0) {
        this.dx = -this.dx;
        indx = Math.floor(Math.random() * 6) + 1;
        setTimeout(this.players[indx].play, 0);
        flash = true;
      }
      if (this.y + this.dy > this.height || this.y + this.dy < 0) {
        this.dy = -this.dy;
        indx = Math.floor(Math.random() * 6) + 1;
        setTimeout(this.players[indx].play, 0);
        flash = true;
      }
      this.x += this.dx;
      this.y += this.dy;
      return this.circle(10, flash);
    };
    return PaddleGame;
  })();
  AudioPlayer = (function() {
    function AudioPlayer(sampleRate, samplesLength, freq) {
      var currentSoundSample, i, k;
      this.sampleRate = sampleRate;
      this.samplesLength = samplesLength;
      this.play = __bind(this.play, this);
      this.audio = new Audio();
      this.audio.mozSetup(1, this.sampleRate);
      this.samples = new Float32Array(this.samplesLength);
      k = 2 * Math.PI * freq / this.sampleRate;
      i = 0;
      currentSoundSample = 0;
      while (i < this.samplesLength) {
        this.samples[i++] = 0.5 * Math.sin(k * currentSoundSample++);
      }
    }
    AudioPlayer.prototype.play = function() {
      return this.audio.mozWriteAudio(this.samples);
    };
    return AudioPlayer;
  })();
  $(function() {
    var ctx, height, intervalID, paddleGame, players, width;
    setTimeout($('body').addClass('onload'), 5);
    players = [];
    players.push(new AudioPlayer(44100, 7050, 1046.50));
    players.push(new AudioPlayer(44100, 7050, 1174.66));
    players.push(new AudioPlayer(44100, 7050, 1318.51));
    players.push(new AudioPlayer(44100, 7050, 1396.91));
    players.push(new AudioPlayer(44100, 7050, 1567.98));
    players.push(new AudioPlayer(44100, 7050, 1760.00));
    players.push(new AudioPlayer(44100, 7050, 1975.53));
    ctx = $("#canvas")[0].getContext("2d");
    width = $("#canvas").width();
    height = $("#canvas").height();
    paddleGame = new PaddleGame(ctx, width, height, players);
    return intervalID = setInterval(paddleGame.draw, 10);
  });
}).call(this);
