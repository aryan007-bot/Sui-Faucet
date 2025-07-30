"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Text3D, Environment } from "@react-three/drei"
import type * as THREE from "three"

function SuiToken() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <group>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.3, 32]} />
        <meshStandardMaterial
          color="#3b82f6"
          metalness={0.8}
          roughness={0.2}
          emissive="#1e40af"
          emissiveIntensity={0.2}
        />
      </mesh>
      <Text3D font="/fonts/Inter_Bold.json" size={0.3} height={0.1} position={[-0.3, -0.1, 0.2]}>
        SUI
        <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.3} />
      </Text3D>
    </group>
  )
}

export function SuiToken3D() {
  return (
    <div className="w-full h-64 md:h-80">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
        <SuiToken />
        <Environment preset="night" />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}
