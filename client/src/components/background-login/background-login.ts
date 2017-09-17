import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'background-login',
  templateUrl: 'background-login.html'
})
export class BackgroundLoginComponent {

  c2: any;
  ctx2: any;
  twopi = Math.PI * 2;
  parts = [];
  sizeBase;
  cw;
  ch;
  opt;
  hue;
  count;

  constructor() {
  }

  rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  hsla(h, s, l, a) {
    return 'hsla(' + h + ',' + s + '%,' + l + '%,' + a + ')';
  }

  create() {
    this.sizeBase = this.cw + this.ch;
    this.count = Math.floor(this.sizeBase * 0.3);
    this.hue = this.rand(0, 360);
    this.opt = {
      radiusMin: 1,
      radiusMax: this.sizeBase * 0.04,
      blurMin: 10,
      blurMax: this.sizeBase * 0.04,
      hueMin: this.hue,
      hueMax: this.hue + 100,
      saturationMin: 10,
      saturationMax: 70,
      lightnessMin: 20,
      lightnessMax: 50,
      alphaMin: 0.1,
      alphaMax: 0.5
    };

    this.parts.length = 0;
    for (var i = 0; i < Math.floor((this.cw + this.ch) * 0.03); i++) {
      this.parts.push({
        radius: this.rand(1, this.sizeBase * 0.03),
        x: this.rand(0, this.cw),
        y: this.rand(0, this.ch),
        angle: this.rand(0, this.twopi),
        vel: this.rand(0.1, 0.5),
        tick: this.rand(0, 10000)
      });
    }
  }

  loop = () => {
    requestAnimationFrame(this.loop);
    this.ctx2.clearRect(0, 0, this.cw, this.ch);
    this.ctx2.globalCompositeOperation = 'source-over';
    this.ctx2.shadowBlur = 0;
    this.ctx2.globalCompositeOperation = 'lighter';

    var i = this.parts.length;
    this.ctx2.shadowBlur = 15;
    this.ctx2.shadowColor = '#fff';
    while (i--) {
      var part = this.parts[i];

      part.x += Math.cos(part.angle) * part.vel;
      part.y += Math.sin(part.angle) * part.vel;
      part.angle += this.rand(-0.05, 0.05);

      this.ctx2.beginPath();
      this.ctx2.arc(part.x, part.y, part.radius, 0, this.twopi);
      this.ctx2.fillStyle = this.hsla(0, 0, 100, 0.075 + Math.cos(part.tick * 0.02) * 0.05);
      this.ctx2.fill();

      if (part.x - part.radius > this.cw) { part.x = -part.radius }
      if (part.x + part.radius < 0) { part.x = this.cw + part.radius }
      if (part.y - part.radius > this.ch) { part.y = -part.radius }
      if (part.y + part.radius < 0) { part.y = this.ch + part.radius }

      part.tick++;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.cw = this.c2.width = window.innerWidth;
    this.ch = this.c2.height = window.innerHeight;

    this.create();
  }


  ngAfterViewInit() {
    this.c2 = document.querySelectorAll('.c1')[document.querySelectorAll('.c1').length - 1],
      this.ctx2 = this.c2.getContext('2d');

    this.cw = this.c2.width = window.innerWidth;
    this.ch = this.c2.height = window.innerHeight;

    this.create();
    this.loop();
  }

}
