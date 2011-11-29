(function() {
  var Canvas, Player;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Canvas = (function() {
    function Canvas(ctx, width, height, player) {
      this.ctx = ctx;
      this.width = width;
      this.height = height;
      this.player = player;
      this.draw = __bind(this.draw, this);
      this.x = 150;
      this.y = 150;
      this.dx = 2;
      this.dy = 4;
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
      if ((this.x + this.dx > this.width - 40) || (this.x + this.dx < 30)) {
        this.dx = -this.dx;
        flash = true;
      }
      if ((this.y + this.dy > this.height - 40) || (this.y + this.dy < 30)) {
        this.dy = -this.dy;
        flash = true;
      }
      if (flash) {
        indx = this.x % 6;
        setTimeout(this.player.play, 0, indx);
      }
      this.x += this.dx;
      this.y += this.dy;
      return this.circle(10, flash);
    };
    return Canvas;
  })();
  Player = (function() {
    function Player() {
      this.play = __bind(this.play, this);      var data, i, middleC, note, params, waves;
      middleC = 261.6260;
      this.notes = [];
      waves = [];
      waves[0] = ["sine", 0.0000, 0.1000, 0.0000, 2.0000, 1.0000, 1.0000, 20.0000, middleC, 2400.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 1.0000, 0.0000, 0.0000, 0.0000, 0.0000];
      waves[1] = ["sine", 0.0000, 0.1000, 0.0000, 2.0000, 1.0000, 1.0000, 20.0000, middleC * 2, 2400.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 1.0000, 0.0000, 0.0000, 0.0000, 0.0000];
      waves[2] = ["sine", 0.0000, 0.1000, 0.0000, 2.0000, 1.0000, 1.0000, 20.0000, middleC * 3, 2400.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 1.0000, 0.0000, 0.0000, 0.0000, 0.0000];
      waves[3] = ["sine", 0.0000, 0.1000, 0.0000, 2.0000, 1.0000, 1.0000, 20.0000, middleC * 4, 2400.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 1.0000, 0.0000, 0.0000, 0.0000, 0.0000];
      waves[4] = ["sine", 0.0000, 0.1000, 0.0000, 2.0000, 1.0000, 1.0000, 20.0000, middleC * 5, 2400.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 1.0000, 0.0000, 0.0000, 0.0000, 0.0000];
      waves[5] = ["sine", 0.0000, 0.1000, 0.0000, 2.0000, 1.0000, 1.0000, 20.0000, middleC * 6, 2400.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 1.0000, 0.0000, 0.0000, 0.0000, 0.0000];
      i = 0;
      while (i < waves.length) {
        note = {};
        params = jsfxlib.arrayToParams(waves[i]);
        data = jsfx.generate(params);
        note.data = audio.make(data);
        this.notes.push(note);
        i++;
      }
    }
    Player.prototype.play = function(i) {
      return this.notes[i].data.play();
    };
    return Player;
  })();
  $(function() {
    var canvas, ctx, height, player, width;
    setTimeout($('body').addClass('onload'), 5);
    ctx = $("#canvas")[0].getContext("2d");
    width = $("#canvas").width();
    height = $("#canvas").height();
    ctx.font = "bold 10pt Calibri";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    player = new Player;
    canvas = new Canvas(ctx, width, height, player);
    return setInterval(canvas.draw, 15);
  });
}).call(this);
