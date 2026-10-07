import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface CyberCanvas3DProps {
  theme: 'dark' | 'light';
  className?: string;
}

export const CyberCanvas3D: React.FC<CyberCanvas3DProps> = ({ theme, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let animFrameId: number;

    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.z = 4.2;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      const handleContextLost = (event: Event) => {
        event.preventDefault();
        cancelAnimationFrame(animFrameId);
      };

      const handleContextRestored = () => {};

      renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false);
      renderer.domElement.addEventListener('webglcontextrestored', handleContextRestored, false);

      // Core Group
      const coreGroup = new THREE.Group();
      scene.add(coreGroup);

      // 90% Charcoal / Graphite / Dark Gray - Monochromatic Wireframe
      const outerGeo = new THREE.IcosahedronGeometry(1.65, 2);
      const outerMat = new THREE.MeshStandardMaterial({
        color: theme === 'dark' ? 0x3f3f46 : 0xa1a1aa, // graphite
        wireframe: true,
        transparent: true,
        opacity: theme === 'dark' ? 0.35 : 0.4,
        roughness: 0.3,
        metalness: 0.8,
      });
      const outerMesh = new THREE.Mesh(outerGeo, outerMat);
      coreGroup.add(outerMesh);

      // Inner Futuristic Torus Knot - Obsidian / Dark Graphite Core
      const innerGeo = new THREE.TorusKnotGeometry(0.85, 0.22, 120, 16);
      const innerMat = new THREE.MeshPhysicalMaterial({
        color: theme === 'dark' ? 0x141416 : 0x27272a, // dark graphite
        emissive: theme === 'dark' ? 0x1e3a8a : 0x1d4ed8, // subtle 2% electric blue whisper
        emissiveIntensity: theme === 'dark' ? 0.18 : 0.12,
        roughness: 0.2,
        metalness: 0.95,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      coreGroup.add(innerMesh);

      // Subtle Monochromatic Orbital Rings
      const ringGeo = new THREE.TorusGeometry(1.95, 0.012, 16, 120);
      const ringMat = new THREE.MeshBasicMaterial({
        color: theme === 'dark' ? 0x52525b : 0x71717a, // neutral graphite
        transparent: true,
        opacity: 0.45,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 3;
      coreGroup.add(ringMesh);

      const ringGeo2 = new THREE.TorusGeometry(2.1, 0.01, 16, 120);
      const ringMat2 = new THREE.MeshBasicMaterial({
        color: theme === 'dark' ? 0x3b82f6 : 0x2563eb, // subtle single accent line
        transparent: true,
        opacity: 0.35,
      });
      const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
      ringMesh2.rotation.y = Math.PI / 4;
      coreGroup.add(ringMesh2);

      // Monochromatic Particle Field (White / Soft Gray with rare subtle blue dot)
      const particleCount = 220;
      const particlePositions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i += 3) {
        const radius = 1.8 + Math.random() * 1.3;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        particlePositions[i] = radius * Math.sin(phi) * Math.cos(theta);
        particlePositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        particlePositions[i + 2] = radius * Math.cos(phi);
      }

      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      const particleMat = new THREE.PointsMaterial({
        color: theme === 'dark' ? 0xd4d4d8 : 0x52525b, // soft gray / white
        size: 0.035,
        transparent: true,
        opacity: 0.6,
      });
      const particles = new THREE.Points(particleGeo, particleMat);
      coreGroup.add(particles);

      // Controlled Cinematic Studio Lights (No Rainbows, No Color Overload)
      const ambientLight = new THREE.AmbientLight(0xffffff, theme === 'dark' ? 0.7 : 1.0);
      scene.add(ambientLight);

      // Key rim light: soft white
      const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
      keyLight.position.set(4, 3, 4);
      scene.add(keyLight);

      // Subtle fill light: soft graphite/neutral
      const fillLight = new THREE.DirectionalLight(0x94a3b8, 1.2);
      fillLight.position.set(-4, -2, -3);
      scene.add(fillLight);

      // 2% Subtle Blue Accent Highlight (low intensity, localized)
      const blueAccentLight = new THREE.PointLight(0x3b82f6, 1.4, 6);
      blueAccentLight.position.set(0, 2.5, 2);
      scene.add(blueAccentLight);

      // Mouse Parallax
      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        mouseRef.current.targetX = x * 0.4;
        mouseRef.current.targetY = y * 0.3;
      };

      window.addEventListener('mousemove', handleMouseMove);

      const resizeObserver = new ResizeObserver(() => {
        if (!container) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        if (width === 0 || height === 0) return;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      });
      resizeObserver.observe(container);

      let clock = new THREE.Clock();

      const animate = () => {
        animFrameId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

        coreGroup.rotation.y = elapsedTime * 0.18 + mouseRef.current.x;
        coreGroup.rotation.x = Math.sin(elapsedTime * 0.12) * 0.12 + mouseRef.current.y;

        innerMesh.rotation.x = elapsedTime * 0.28;
        innerMesh.rotation.y = elapsedTime * 0.2;

        outerMesh.rotation.y = -elapsedTime * 0.1;
        ringMesh.rotation.z = elapsedTime * 0.15;
        ringMesh2.rotation.z = -elapsedTime * 0.12;
        particles.rotation.y = elapsedTime * 0.06;

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        resizeObserver.disconnect();
        cancelAnimationFrame(animFrameId);
        renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
        renderer.domElement.removeEventListener('webglcontextrestored', handleContextRestored);
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    } catch {
      setWebGlSupported(false);
    }
  }, [theme]);

  if (!webGlSupported) {
    return (
      <div className={`relative flex items-center justify-center rounded-2xl bg-neutral-900 border border-neutral-800 p-8 ${className}`}>
        <div className="text-center">
          <div className="mx-auto mb-3 h-12 w-12 rounded-full border border-neutral-700 bg-neutral-800 flex items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-blue-500" />
          </div>
          <p className="text-xs uppercase tracking-widest text-neutral-400 font-mono-code">Neural Engine Core Active</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[360px] cursor-grab active:cursor-grabbing ${className}`}
      aria-label="Interactive 3D Neural Automation Core"
    />
  );
};

