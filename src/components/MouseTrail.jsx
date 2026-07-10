import React, { useEffect, useRef } from "react";

function MouseTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    let mouseHistory = [];
    const maxParticles = 80; // Limit for performance
    const maxHistory = 15;   // Length of the neon line ribbon

    // Track mouse coordinates
    let mouse = { x: 0, y: 0, active: false };

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle class for the floating sparks
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        
        // Slight drift velocity
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.5 + 0.2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        
        // Sizes and shrink rates
        this.size = Math.random() * 3 + 2; // 2px to 5px
        this.shrink = Math.random() * 0.04 + 0.03;
        
        // Bright HSL color spectrum
        this.hue = Math.random() * 360;
        this.color = `hsl(${this.hue}, 100%, 65%)`;
        this.alpha = 1.0;
        this.decay = Math.random() * 0.02 + 0.015;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Slow down slightly over time
        this.vx *= 0.96;
        this.vy *= 0.96;
        
        this.size = Math.max(0, this.size - this.shrink);
        this.alpha = Math.max(0, this.alpha - this.decay);
      }

      draw(c) {
        c.save();
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fillStyle = `hsl(${this.hue}, 100%, 65%)`;
        c.shadowBlur = 8;
        c.shadowColor = `hsl(${this.hue}, 100%, 65%)`;
        c.fill();
        c.restore();
      }
    }

    // Capture mouse movement
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;

      // Add to trailing history
      mouseHistory.push({ x: mouse.x, y: mouse.y });
      if (mouseHistory.length > maxHistory) {
        mouseHistory.shift();
      }

      // Generate sparks
      if (particles.length < maxParticles) {
        particles.push(new Particle(mouse.x, mouse.y));
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw the Neon Gradient Ribbon Trail
      if (mouseHistory.length > 1) {
        ctx.save();
        // Setup shadow glow for the ribbon path
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#3b82f6";

        // Draw segmented lines that taper down in width and fade in alpha
        for (let i = 1; i < mouseHistory.length; i++) {
          const p1 = mouseHistory[i - 1];
          const p2 = mouseHistory[i];
          
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          
          // Width based on history index (tapering towards the end of trail)
          const progress = i / mouseHistory.length;
          ctx.lineWidth = progress * 6; // starts thin, ends thick (at cursor)
          
          // Gradient stroke style transitioning from Purple to Blue/Green
          const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
          grad.addColorStop(0, `hsla(${(i * 15) % 360}, 100%, 65%, ${progress * 0.15})`);
          grad.addColorStop(1, `hsla(${((i + 1) * 15) % 360}, 100%, 65%, ${progress * 0.85})`);
          
          ctx.strokeStyle = grad;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.stroke();
        }
        ctx.restore();

        // Slow decay of trail length if mouse is stationary
        if (Math.random() > 0.6) {
          mouseHistory.shift();
        }
      }

      // 2. Draw the floating Sparks
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        if (p.alpha <= 0 || p.size <= 0) {
          particles.splice(i, 1);
        } else {
          p.draw(ctx);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}

export default MouseTrail;
