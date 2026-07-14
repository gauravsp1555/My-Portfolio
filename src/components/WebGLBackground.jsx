import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

const WebGLBackground = () => {
  const containerRef = useRef(null);
  const [isDark, setIsDark] = useState(false);

  // 1. Theme Detection
  useEffect(() => {
    if (typeof document === 'undefined') return;

    setIsDark(document.documentElement.classList.contains('dark'));

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // 2. Three.js Galaxy Scene Setup
  useEffect(() => {
    if (!containerRef.current) return;

    // Dimensions
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    
    // Perspective camera tilted slightly down
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 4.5, 7.5);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Clear old canvases
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);

    // Generate circular texture programmatically
    const createParticleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext('2d');
      
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
      return new THREE.CanvasTexture(canvas);
    };

    const particleTexture = createParticleTexture();

    // Galaxy Math Properties
    const count = 16000;
    const radius = 6.0;
    const branches = 3;
    const spin = 1.3;
    const randomness = 0.45;
    const randomnessPower = 4;

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    // Dynamic Colors based on Dark/Light Theme
    const currentDark = document.documentElement.classList.contains('dark');
    const colorInside = new THREE.Color(currentDark ? '#ffe29a' : '#7c3aed'); // Gold (Dark) vs Deep Purple (Light)
    const colorOutside = new THREE.Color(currentDark ? '#06b6d4' : '#0284c7'); // Cyan (Dark) vs Sky Blue (Light)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const r = Math.random() * radius;

      // Position along one of the branches
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;
      const spinAngle = r * spin;

      // Cubic-like dispersion: clustering heavily near the arm spine
      const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;
      const randomY = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;
      const randomZ = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;

      positions[i3] = Math.cos(branchAngle + spinAngle) * r + randomX;
      positions[i3 + 1] = randomY * 0.6; // Slightly flatter galaxy profile
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

      // Color Interpolation (Inside -> Outside)
      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, r / radius);

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Material with transparent custom circle texture
    const material = new THREE.PointsMaterial({
      size: 0.035,
      sizeAttenuation: true,
      depthWrite: false,
      blending: currentDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      vertexColors: true,
      transparent: true,
      map: particleTexture
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Parallax Interaction State
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) - 0.5;
      mouseY = (e.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Render loop
    const clock = new THREE.Clock();
    let animationId;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Spin the galaxy slowly
      points.rotation.y = elapsedTime * 0.06;

      // Smooth camera parallax based on mouse
      const targetCamX = mouseX * 2.5;
      const targetCamY = -mouseY * 2.5 + 4.5;
      
      camera.position.x += (targetCamX - camera.position.x) * 0.05;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, [isDark]); // Re-create scene if isDark changes to adapt blending & colors properly

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        zIndex: -10,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        backgroundColor: isDark ? '#000000' : '#F7F3EB',
        transition: 'background-color 0.5s ease'
      }}
    />
  );
};

export default WebGLBackground;
