
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef } from 'react';
import { useTexture } from '@react-three/drei';

function createTexture(style, materialFunction){
  return new materialFunction(style);
};

export function generateCube(){

  const textMesh = new THREE.Mesh(textgeo,createTexture({color: 0xffffff}, THREE.MeshPhongMaterial));
  const textMesh1 = new THREE.Mesh(textgeo1,createTexture({color: 0xffffff}, THREE.MeshPhongMaterial));
  const text_group = new THREE.Group();
  text_group.add(textMesh);
  text_group.add(textMesh1);
  text_group.position.set(-8.5,0,-6);
  return text_group;
}

export const Cube = ({ ...props }) => {
    const mesh = useRef(null);
  
    
    useFrame((state, delta) => {
      const t = state.clock.getElapsedTime();
      mesh.current.rotation.y = Math.sin(t) * (Math.PI / 8);
      mesh.current.rotation.x = Math.cos(t) * (Math.PI / 8);
      mesh.current.rotation.z -= delta / 4;
    });
  
    return (
      <group ref={mesh} {...props}>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial attach="material-0" map={useTexture('/bean.png')}/>
          <meshBasicMaterial attach="material-1" map={useTexture('/doja.png')}/>
          <meshBasicMaterial attach="material-2" map={useTexture('/headshot.png')}/>
          <meshBasicMaterial attach="material-3" map={useTexture('/me.png')}/>
          <meshBasicMaterial attach="material-4" map={useTexture('/masked.png')}/>
          <meshBasicMaterial attach="material-5" map={useTexture('/art.png')}/>
        </mesh>
      </group>
    );
};
export default Cube;