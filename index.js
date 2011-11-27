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
      this.ctx.clearRect(20, 20, this.width - 40, this.height - 40);
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
      this.clearText = __bind(this.clearText, this);
      this.fillText = __bind(this.fillText, this);
      this.draw = __bind(this.draw, this);
      PaddleGame.__super__.constructor.call(this, ctx, width, height);
      this.x = 150;
      this.y = 150;
      this.dx = 2;
      this.dy = 4;
      this.savedX = 0;
      this.savedY = 0;
      this.savedNote = "";
    }
    PaddleGame.prototype.draw = function() {
      var flash, indx;
      flash = false;
      if (this.x + this.dx > this.width - 40) {
        this.savedX = this.x + 20;
        this.savedY = this.y;
        this.dx = -this.dx;
        flash = true;
      }
      if (this.x + this.dx < 30) {
        this.savedX = this.x - 20;
        this.savedY = this.y;
        this.dx = -this.dx;
        flash = true;
      }
      if (this.y + this.dy > this.height - 40) {
        this.savedX = this.x;
        this.savedY = this.y + 30;
        this.dy = -this.dy;
        flash = true;
      }
      if (this.y + this.dy < 30) {
        this.savedX = this.x;
        this.savedY = this.y - 20;
        this.dy = -this.dy;
        flash = true;
      }
      if (flash) {
        indx = Math.floor(Math.random() * 6) + 1;
        setTimeout(this.players[indx].player.play, 0);
        this.savedNote = this.players[indx].note;
        setTimeout(this.fillText, 0);
        setTimeout(this.clearText, 300);
      }
      this.x += this.dx;
      this.y += this.dy;
      return this.circle(10, flash);
    };
    PaddleGame.prototype.fillText = function() {
      this.ctx.fillStyle = "blue";
      return this.ctx.fillText(this.savedNote, this.savedX, this.savedY);
    };
    PaddleGame.prototype.clearText = function() {
      this.ctx.clearRect(0, 0, 20, this.height);
      this.ctx.clearRect(0, 0, this.width, 20);
      this.ctx.clearRect(this.width - 20, 0, 20, this.height);
      return this.ctx.clearRect(0, this.height - 20, this.width, 20);
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
    players.push({
      player: new AudioPlayer(44100, 7050, 523.26),
      note: "#C4"
    });
    players.push({
      player: new AudioPlayer(44100, 7050, 1174.66),
      note: "#D6"
    });
    players.push({
      player: new AudioPlayer(44100, 7050, 1318.51),
      note: "#E6"
    });
    players.push({
      player: new AudioPlayer(44100, 7050, 830.61),
      note: "#G4"
    });
    players.push({
      player: new AudioPlayer(44100, 7050, 932.33),
      note: "#A#5"
    });
    players.push({
      player: new AudioPlayer(44100, 7050, 987.77),
      note: "#B5"
    });
    players.push({
      player: new AudioPlayer(44100, 7050, 880),
      note: "#A5"
    });
    ctx = $("#canvas")[0].getContext("2d");
    width = $("#canvas").width();
    height = $("#canvas").height();
    ctx.font = "bold 10pt Calibri";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    paddleGame = new PaddleGame(ctx, width, height, players);
    return intervalID = setInterval(paddleGame.draw, 15);
  });
}).call(this);
