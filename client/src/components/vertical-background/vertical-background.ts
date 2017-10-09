import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'vertical-background',
  templateUrl: 'vertical-background.html'
})
export class VerticalBackgroundComponent {

  canvas: any;
  context: any;
  width; 
  height;
  particles = [];
  colors = [
    'rgba(0, 255, 255, 0.3)',
    'rgba(0, 255, 255, 0.7)'
  ];

  constructor() {
  }

  rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.particles.length = 0;

    for (let i = 0; i < 200; i++) {
      this.generateParticle();
    }
  }

  ngAfterViewInit() {
    this.canvas = document.getElementById('verticalCanvas');
    this.context = this.canvas.getContext('2d');

    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;

    for (let i = 0; i < 200; i++) {
      this.generateParticle();
    }

    this.draw();
  }

  drawCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = 'rgba(0,0,0,0)';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw = () => {
    this.drawCanvas();

    for (let i = 0; i < this.particles.length; i++) {
      if (this.particles[i].dead) {
        this.particles.splice(i, 1);
      }
      
      if(this.particles[i]) {
        this.context.globalCompositeOperation = "lighter";
        this.context.beginPath();
        
        let gradient = this.context.createRadialGradient(this.particles[i].x, this.particles[i].y, 0, this.particles[i].x, this.particles[i].y, this.particles[i].size);
        gradient.addColorStop(this.particles[i].colorStop, 'transparent');
        gradient.addColorStop(0, this.particles[i].color);
  
        this.context.fillStyle = gradient;
        this.context.arc(this.particles[i].x, this.particles[i].y, this.particles[i].size, 0, Math.PI * 2, true);
        this.context.closePath();
        this.context.fill();

        //Do gravity stuff.
        this.particles[i].x += this.particles[i].Hvelocity;
        this.particles[i].y += this.particles[i].Vvelocity;

        if (this.particles[i].x + this.particles[i].size < 0 || this.particles[i].y + this.particles[i].size < 0 || this.particles[i].x - this.particles[i].size > this.width || this.particles[i].y - this.particles[i].size > this.height) {
          this.particles[i].dead = true;
        }

      }
    }

    if (this.particles.length < 200) {
      for (let i = 0; i < 10; i++) {
        this.generateParticle();
      }
    }
   
    requestAnimationFrame(this.draw);
  }

  generateParticle() {
    let color = Math.floor(Math.random() * this.colors.length) + 0;
    let isBlurred = Math.random() < 0.7 ? true : false;

    let particle = {
      x: (this.width / 2) + (Math.random() * 100) - 50,
      y: (this.height / 2),
      size: isBlurred ? Math.floor(Math.random() * 6) : Math.random() * 3,
      color: this.colors[color],
      Hvelocity: Math.random() * 0,
      Vvelocity: Math.random() * 5,
      dead: false,
      colorStop: isBlurred ? 1 : 0
    };
    
    if (Math.random() < 0.5) {
      particle.Hvelocity *= -1;
    }
    if (Math.random() < 0.5) {
      particle.Vvelocity *= -1;
    }

    this.particles.push(particle);
  }
}