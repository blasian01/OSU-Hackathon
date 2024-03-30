import React, { useEffect } from 'react';
import p5 from 'p5';

const Background = () => {
    useEffect(() => {
        new p5(Sketch);
        // Cleanup function to remove sketch on component unmount
        return () => {
            let canvas = document.getElementById('perlin-background-canvas');
            if (canvas) {
                canvas.remove();
            }
        };
    }, []);
    
    const Sketch = (p) => {
        let inc = 0.05;
        let scl = 50;
        let cols, rows;
        let zoff = 0;
        let particles = [];
        let flowfield = [];

        p.windowResized = () => {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
            cols = p.floor(p.windowWidth / scl);
            rows = p.floor(p.windowHeight / scl);
            flowfield = new Array(cols * rows);
        
            p.background(0); // Redraw background on resize
            // Reinitialize particles or other necessary elements here
        };
        

        p.setup = () => {
            let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.id('perlin-background-canvas');        
            canvas.style('position', 'fixed');
            canvas.style('top', '0');
            canvas.style('left', '0');
            canvas.style('z-index', '-1');

            cols = p.floor(p.width / scl);
            rows = p.floor(p.height / scl);
            flowfield = new Array(cols * rows);

            p.colorMode(p.HSB, 360, 100, 100, 100); 

            for (var i = 0; i < 200; i++) { 
                particles[i] = new Particle(p, i, 200);
            }

            p.background(0);
        };

        p.draw = () => {
            let yoff = 0;
            for (let y = 0; y < rows; y++) {
                let xoff = 0;
                for (let x = 0; x < cols; x++) {
                    let index = x + y * cols;
                    let angle = p.noise(xoff, yoff, zoff) * p.TWO_PI * 4;
                    let v = p5.Vector.fromAngle(angle);
                    v.setMag(1.5);
                    flowfield[index] = v;
                    xoff += inc;
                    p.stroke(0, 50);
                    p.strokeWeight(1);
                    let px = x * scl;
                    let py = y * scl;
                    p.point(px, py);
                }
                yoff += inc;
                zoff += 0.0005;
            }

            for (let i = 0; i < particles.length; i++) {
                particles[i].follow(flowfield);
                particles[i].update();
                particles[i].edges();
                particles[i].show();
            }
        };

        function Particle(p, index, totalParticles) {
            this.pos = p.createVector(p.random(p.width), p.random(p.height));
            this.vel = p5.Vector.random2D().mult(2); // Increased initial velocity
            this.acc = p.createVector(0, 0);
            let hue = p.random(11, 40); // For orange color
            this.color = p.color(hue, 100, 100, 9);
            this.maxspeed = 5; // Increased max speed
            this.prevPos = this.pos.copy();
        
                
            // Update the particle's velocity and position
            this.update = function() {
                this.vel.add(this.acc);
                this.vel.limit(this.maxspeed);
                this.pos.add(this.vel);
                this.acc.mult(0);
            };
        
            // Apply a force to the particle
            this.applyForce = function(force) {
                this.acc.add(force);
            };
        
            // Draw the particle on the canvas
            this.show = function() {
                p.stroke(this.color);
                p.strokeWeight(1);
                p.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
                this.updatePrev();
            };
        
            // Update the previous position for drawing
            this.updatePrev = function() {
                this.prevPos.x = this.pos.x;
                this.prevPos.y = this.pos.y;
            };
        
            // Handle the edges of the canvas
            this.edges = function() {
                if (this.pos.x > p.width) {
                    this.pos.x = 0;
                    this.updatePrev();
                }
                if (this.pos.x < 0) {
                    this.pos.x = p.width;
                    this.updatePrev();
                }
                if (this.pos.y > p.height) {
                    this.pos.y = 0;
                    this.updatePrev();
                }
                if (this.pos.y < 0) {
                    this.pos.y = p.height;
                    this.updatePrev();
                }
            };
        
            // Make the particle follow a vector
            this.follow = function(vectors) {
                let x = p.floor(this.pos.x / scl);
                let y = p.floor(this.pos.y / scl);
                let index = x + y * cols;
                let force = vectors[index];
                this.applyForce(force);
            };
        }
        
    };

    return null;
};

export default Background;
