'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/** Drifting particle field distributed in a flat ellipsoid behind the type. */
function ParticleField({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#60a5fa"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** A few floating wireframe solids catching the colored lights. */
function FloatingGeometry() {
  return (
    <>
      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh position={[4.5, 1.2, -2]}>
          <icosahedronGeometry args={[1.1, 0]} />
          <meshStandardMaterial color="#0d0d0d" roughness={0.25} metalness={0.9} flatShading />
        </mesh>
      </Float>
      <Float speed={0.9} rotationIntensity={0.4} floatIntensity={1}>
        <mesh position={[-5.2, -1.6, -3]}>
          <octahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial color="#101014" roughness={0.3} metalness={0.85} flatShading />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.8}>
        <mesh position={[2.8, -2.2, -1.5]}>
          <torusGeometry args={[0.45, 0.14, 16, 48]} />
          <meshStandardMaterial color="#0d0d12" roughness={0.2} metalness={0.95} />
        </mesh>
      </Float>
    </>
  );
}

/** Whole scene leans gently toward the pointer. */
function ParallaxRig({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const damp = Math.min(1, delta * 2.5);
    ref.current.rotation.y += (state.pointer.x * 0.12 - ref.current.rotation.y) * damp;
    ref.current.rotation.x += (-state.pointer.y * 0.08 - ref.current.rotation.x) * damp;
  });

  return <group ref={ref}>{children}</group>;
}

interface HeroSceneProps {
  /** Render a single static frame (reduced motion). */
  still?: boolean;
}

/**
 * Hero background: particles, floating geometry, two colored lights and a
 * pointer-parallax rig. Rendering pauses when the hero leaves the viewport.
 */
export default function HeroScene({ still = false }: HeroSceneProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [particleCount, setParticleCount] = useState(0);

  useEffect(() => {
    setParticleCount(window.innerWidth < 768 ? 320 : 800);
    const el = wrapperRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      entries => setInView(entries[0]?.isIntersecting ?? true),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const frameloop = still ? 'demand' : inView ? 'always' : 'never';

  return (
    <div ref={wrapperRef} aria-hidden="true" className="absolute inset-0">
      <Canvas
        frameloop={frameloop}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 9], fov: 45 }}
        gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[6, 4, 4]} intensity={40} color="#3b82f6" />
        <pointLight position={[-6, -3, 2]} intensity={26} color="#8b5cf6" />
        <ParallaxRig>
          {particleCount > 0 ? <ParticleField count={particleCount} /> : null}
          <FloatingGeometry />
        </ParallaxRig>
      </Canvas>
    </div>
  );
}
