import React, { useEffect } from 'react';
// Assuming GSAP has been correctly installed and imported
import { gsap } from 'gsap';

const ParticleBackground = () => {
    useEffect(() => {
        let width = window.innerWidth;
        let height = window.innerHeight;
        let target = { x: width / 2, y: height / 2 };
        let animateHeader = true;
        let largeHeader = document.getElementById('large-header');
        let canvas = document.getElementById('demo-canvas');
        let ctx = canvas.getContext('2d');
        let points = [];

        const initHeader = () => {
            largeHeader.style.height = height + 'px';

            canvas.width = width;
            canvas.height = height;

            // Create points
            points = createPoints(width, height);
        };

        const createPoints = (width, height) => {
            let points = [];
            for (let x = 0; x < width; x += width / 20) {
                for (let y = 0; y < height; y += height / 20) {
                    const px = x + Math.random() * width / 20;
                    const py = y + Math.random() * height / 20;
                    points.push({ x: px, originX: px, y: py, originY: py });
                }
            }
            return points;
        };

        const mouseMove = (e) => {
            let posx = 0, posy = 0;
            if (e.pageX || e.pageY) {
                posx = e.pageX;
                posy = e.pageY;
            } else if (e.clientX || e.clientY) {
                posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }
            target.x = posx;
            target.y = posy;
        };

        const scrollCheck = () => {
            animateHeader = document.body.scrollTop <= height;
        };

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            largeHeader.style.height = height + 'px';
            canvas.width = width;
            canvas.height = height;
        };

        const addListeners = () => {
            window.addEventListener('mousemove', mouseMove);
            window.addEventListener('scroll', scrollCheck);
            window.addEventListener('resize', resize);
        };

        const initAnimation = () => {
            animate();
            points.forEach(shiftPoint);
        };

        const animate = () => {
            if (animateHeader) {
                ctx.clearRect(0, 0, width, height);
                for (let i in points) {
                    // Logic to animate points
                }
            }
            requestAnimationFrame(animate);
        };

        const shiftPoint = (point) => {
            gsap.to(point, {
                x: point.originX - 50 + Math.random() * 100,
                y: point.originY - 50 + Math.random() * 100,
                ease: 'circ.out',
                duration: 1 + 1 * Math.random(),
                onComplete: () => shiftPoint(point),
            });
        };

        initHeader();
        initAnimation();
        addListeners();

        return () => {
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('scroll', scrollCheck);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <div id="large-header" className="large-header">
            <canvas id="demo-canvas"></canvas>
            <h1 className="main-title">Connect <span className="thin">Three</span></h1>
        </div>
    );
};

export default ParticleBackground;
