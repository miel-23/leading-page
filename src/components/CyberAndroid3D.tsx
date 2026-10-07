import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import cyberBustImg from '../assets/images/hero_cyber_android_3d_1791033998913.jpg';

interface CyberAndroid3DProps {
  theme: 'dark' | 'light';
  className?: string;
}

export const CyberAndroid3D: React.FC<CyberAndroid3DProps> = ({ theme, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [activeTelemetry, setActiveTelemetry] = useState(0);

  // Periodic telemetry status cycler
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTelemetry((prev) => (prev + 1) % 4);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // WebGL 3D holographic background lattice & orbital particle nebula
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let animId: number;

    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
      camera.position.z = 4.5;

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // 3D Orbital Rings (Monochromatic with subtle cobalt accent)
      const ringGroup = new THREE.Group();
      scene.add(ringGroup);

      const torus1 = new THREE.Mesh(
        new THREE.TorusGeometry(1.9, 0.008, 16, 120),
        new THREE.MeshBasicMaterial({
          color: theme === 'dark' ? 0x3b82f6 : 0x2563eb,
          transparent: true,
          opacity: theme === 'dark' ? 0.35 : 0.25,
        })
      );
      torus1.rotation.x = Math.PI / 3;
      ringGroup.add(torus1);

      const torus2 = new THREE.Mesh(
        new THREE.TorusGeometry(2.15, 0.006, 16, 120),
        new THREE.MeshBasicMaterial({
          color: theme === 'dark' ? 0x52525b : 0x71717a,
          transparent: true,
          opacity: 0.25,
        })
      );
      torus2.rotation.y = Math.PI / 4;
      ringGroup.add(torus2);

      // 3D Floating Particle Constellation
      const count = 180;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i += 3) {
        const radius = 1.6 + Math.random() * 1.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        positions[i] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = radius * Math.cos(phi);
      }
      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const particleMat = new THREE.PointsMaterial({
        color: theme === 'dark' ? 0xe4e4e7 : 0x52525b,
        size: 0.03,
        transparent: true,
        opacity: 0.5,
      });
      const particles = new THREE.Points(particleGeo, particleMat);
      ringGroup.add(particles);

      // Resize listener
      const handleResize = () => {
        if (!canvas) return;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        if (width === 0 || height === 0) return;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };

      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(canvas);

      let clock = new THREE.Clock();

      const renderLoop = () => {
        animId = requestAnimationFrame(renderLoop);
        const t = clock.getElapsedTime();
        ringGroup.rotation.y = t * 0.08;
        ringGroup.rotation.x = Math.sin(t * 0.05) * 0.1;
        torus1.rotation.z = t * 0.12;
        torus2.rotation.z = -t * 0.09;
        renderer.render(scene, camera);
      };

      renderLoop();

      return () => {
        cancelAnimationFrame(animId);
        resizeObserver.disconnect();
        renderer.dispose();
      };
    } catch {
      // Graceful fallback
    }
  }, [theme]);

  // Interactive 3D Perspective Tilt on Mouse Movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: x * 14, // degrees rotation Y
      y: -y * 14, // degrees rotation X
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-full min-h-[460px] lg:min-h-[580px] flex items-center justify-center select-none overflow-visible ${className}`}
      style={{ perspective: '1200px' }}
      aria-label="Interactive 3D Cyber Android Experience"
    >
      {/* 3D WebGL Background Canvas (Orbital Rings & Floating Particles) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Subtle Atmospheric Studio Glow behind Cybernetic Android */}
      <div className="absolute w-[80%] h-[80%] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.14)_0%,rgba(14,165,233,0.04)_45%,transparent_70%)] blur-2xl pointer-events-none z-0" />

      {/* Main 3D Cybernetic Android Bust Container with Real-Time Perspective Tilt */}
      <div
        className="relative z-10 w-full max-w-[500px] aspect-square flex items-center justify-center transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* The 3D Android Figure */}
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={cyberBustImg}
            alt="Futuristic Cybernetic Android 3D Bust — Automation Hub"
            className="w-full h-full object-contain object-center filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)] pointer-events-none select-none transition-all duration-700"
            style={{
              maskImage: 'radial-gradient(ellipse 90% 88% at 50% 48%, black 65%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 90% 88% at 50% 48%, black 65%, transparent 100%)',
            }}
          />

          {/* Dynamic Laser Visor Scanning Line (Real-time animated holographic beam across visor) */}
          <div
            className="absolute left-[28%] right-[28%] top-[34%] h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_12px_#3b82f6] opacity-80 pointer-events-none animate-pulse"
            style={{ transform: 'translateZ(30px)' }}
          />

          {/* Subtle Ambient Specular Reflection Ring */}
          <div
            className="absolute inset-x-8 top-12 bottom-12 rounded-full border border-blue-500/10 pointer-events-none"
            style={{ transform: 'translateZ(15px)' }}
          />
        </div>

        {/* 3D Holographic Telemetry HUD Node 1: Visor Lock */}
        <div
          className="absolute top-[26%] right-[6%] z-20 pointer-events-none transition-all duration-500 hidden sm:flex items-center gap-2"
          style={{ transform: 'translateZ(45px)' }}
        >
          <div className="h-2 w-2 rounded-full bg-blue-500 animate-ping opacity-75" />
          <div className="px-2.5 py-1 rounded bg-[#090a0f]/80 backdrop-blur-md border border-white/10 text-[10px] font-mono-code tracking-widest text-neutral-300">
            <span className="text-blue-400">01 //</span> VISOR.SYNC
          </div>
        </div>

        {/* 3D Holographic Telemetry HUD Node 2: Neural Core Latency */}
        <div
          className="absolute bottom-[24%] left-[4%] z-20 pointer-events-none transition-all duration-500 hidden sm:flex items-center gap-2"
          style={{ transform: 'translateZ(50px)' }}
        >
          <div className="px-2.5 py-1 rounded bg-[#090a0f]/80 backdrop-blur-md border border-white/10 text-[10px] font-mono-code tracking-widest text-neutral-300">
            <span className="text-blue-400">02 //</span> 12ms LATENCY
          </div>
          <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
        </div>

        {/* 3D Holographic Telemetry HUD Node 3: Omnichannel Protocol */}
        <div
          className="absolute bottom-[10%] right-[12%] z-20 pointer-events-none transition-all duration-500 hidden md:flex items-center gap-2"
          style={{ transform: 'translateZ(40px)' }}
        >
          <div className="px-2.5 py-1 rounded bg-[#090a0f]/80 backdrop-blur-md border border-white/10 text-[10px] font-mono-code tracking-widest text-neutral-400">
            AUTONOMOUS CORE <span className="text-blue-400">99.4%</span>
          </div>
        </div>
      </div>

      {/* Bottom Status Telemetry Footer (Pure minimal typography, faithful to reference HUD) */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.08] backdrop-blur-md pointer-events-none">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
        <span className="text-[10px] font-mono-code tracking-[0.2em] uppercase text-neutral-400">
          3D SPATIAL TELEMETRY · MOVE CURSOR TO ORBIT
        </span>
      </div>
    </div>
  );
};
