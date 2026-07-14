'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { groupColors, techNodes } from '@/content/tech-stack';
import type { TechNode } from '@/types/content';

interface PositionedNode extends TechNode {
  position: THREE.Vector3;
}

/** Distribute nodes on a sphere with a Fibonacci lattice — even, organic spread. */
function useNodePositions(radius: number): PositionedNode[] {
  return useMemo(() => {
    const golden = Math.PI * (3 - Math.sqrt(5));
    return techNodes.map((node, i) => {
      const y = 1 - (i / (techNodes.length - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      return {
        ...node,
        position: new THREE.Vector3(
          Math.cos(theta) * r * radius,
          y * radius,
          Math.sin(theta) * r * radius
        )
      };
    });
  }, [radius]);
}

function Node({
  node,
  hovered,
  onHover
}: {
  node: PositionedNode;
  hovered: boolean;
  onHover: (id: string | null) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const color = groupColors[node.group];

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const target = hovered ? 1.9 : 1;
    const s = meshRef.current.scale.x + (target - meshRef.current.scale.x) * Math.min(1, delta * 8);
    meshRef.current.scale.setScalar(s);
  });

  return (
    <group position={node.position}>
      <mesh
        ref={meshRef}
        onPointerOver={e => {
          e.stopPropagation();
          onHover(node.id);
        }}
        onPointerOut={() => onHover(null)}
      >
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 1.4 : 0.5}
          roughness={0.35}
        />
      </mesh>
      {hovered ? (
        <Html center distanceFactor={8} className="pointer-events-none">
          <span className="glass-strong rounded-full px-3 py-1.5 font-mono text-[0.65rem] whitespace-nowrap text-white">
            {node.label}
          </span>
        </Html>
      ) : null}
    </group>
  );
}

/** Lines connecting each node to its nearest neighbours. */
function Connections({ nodes }: { nodes: PositionedNode[] }) {
  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    nodes.forEach(node => {
      const nearest = [...nodes]
        .filter(other => other.id !== node.id)
        .sort((a, b) => a.position.distanceTo(node.position) - b.position.distanceTo(node.position))
        .slice(0, 2);
      nearest.forEach(other => {
        points.push(node.position, other.position);
      });
    });
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [nodes]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#3b82f6" transparent opacity={0.18} />
    </lineSegments>
  );
}

function NetworkScene() {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const nodes = useNodePositions(3);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // Slow idle spin, pausing while the visitor inspects a node
    groupRef.current.rotation.y += delta * (hoveredId ? 0.02 : 0.12);
    groupRef.current.rotation.x +=
      (state.pointer.y * 0.15 - groupRef.current.rotation.x) * Math.min(1, delta * 2);
  });

  return (
    <group ref={groupRef}>
      <Connections nodes={nodes} />
      {nodes.map(node => (
        <Node key={node.id} node={node} hovered={hoveredId === node.id} onHover={setHoveredId} />
      ))}
    </group>
  );
}

/** Interactive 3D technology network; rendering pauses off-screen. */
export default function TechNetwork({ still = false }: { still?: boolean }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      entries => setInView(entries[0]?.isIntersecting ?? false),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="h-[26rem] w-full md:h-[32rem]" aria-hidden="true">
      <Canvas
        frameloop={still ? 'demand' : inView ? 'always' : 'never'}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 7.5], fov: 50 }}
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={30} color="#60a5fa" />
        <pointLight position={[-5, -3, 2]} intensity={20} color="#8b5cf6" />
        <NetworkScene />
      </Canvas>
    </div>
  );
}
