(function() {
  var Canvas, Note;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Canvas = (function() {
    function Canvas(ctx, width, height, players) {
      this.ctx = ctx;
      this.width = width;
      this.height = height;
      this.players = players;
      this.clearText = __bind(this.clearText, this);
      this.fillText = __bind(this.fillText, this);
      this.draw = __bind(this.draw, this);
      this.x = 150;
      this.y = 150;
      this.dx = 2;
      this.dy = 4;
      this.savedX = 0;
      this.savedY = 0;
      this.savedNote = "";
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
    Canvas.prototype.draw = function() {
      var flash, indx;
      flash = false;
      if (this.x + this.dx > this.width - 40) {
        this.savedX = this.x + 20;
        this.savedY = this.y;
        this.dx = -this.dx;
        flash = true;
      }
      if (this.x + this.dx < 30) {
        this.savedX = this.x - 30;
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
        indx = this.x % 7;
        this.savedNote = this.players[indx].note;
        setTimeout(this.fillText, 0);
        setTimeout(this.clearText, 500);
      }
      this.x += this.dx;
      this.y += this.dy;
      return this.circle(10, flash);
    };
    Canvas.prototype.fillText = function() {
      this.ctx.fillStyle = "blue";
      return this.ctx.fillText(this.savedNote, this.savedX, this.savedY);
    };
    Canvas.prototype.clearText = function() {
      this.ctx.clearRect(0, 0, 20, this.height);
      this.ctx.clearRect(0, 0, this.width, 20);
      this.ctx.clearRect(this.width - 20, 0, 20, this.height);
      return this.ctx.clearRect(0, this.height - 20, this.width, 20);
    };
    return Canvas;
  })();
  Note = (function() {
    function Note(samplesLength, freq) {
      var i, k;
      this.samplesLength = samplesLength;
      this.audio = new Audio();
      this.audio.mozSetup(1, 44100);
      this.samples = new Float32Array(this.samplesLength);
      k = 2 * Math.PI * freq / 44100;
      i = 0;
      while (i < this.samplesLength) {
        this.samples[i++] = 0.5 * Math.sin(k * i++);
      }
    }
    return Note;
  })();
  $(function() {
    var canvas, ctx, height, players, width;
    players = [
      {
        player: new Note(7050, 440),
        note: "#A4"
      }, {
        player: new Note(7050, 493.883),
        note: "#B4"
      }, {
        player: new Note(7050, 523.26),
        note: "#C4"
      }, {
        player: new Note(7050, 830.61),
        note: "#G4"
      }, {
        player: new Note(7050, 880),
        note: "#A5"
      }, {
        player: new Note(7050, 987.77),
        note: "#B5"
      }, {
        player: new Note(7050, 1046.50),
        note: "#C6"
      }
    ];
    setTimeout($('body').addClass('onload'), 5);
    ctx = $("#canvas")[0].getContext("2d");
    width = $("#canvas").width();
    height = $("#canvas").height();
    ctx.font = "bold 10pt Calibri";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    canvas = new Canvas(ctx, width, height, players);
    return setInterval(canvas.draw, 15);
  });
}).call(this);
