
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef, useState } from 'react';
import { useDrag } from 'react-use-gesture';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
};

export function createThunder(){
  const thunder = new THREE.Shape([
    new THREE.Vector2( -0.15, 0 ),
    new THREE.Vector2( -0.15, -1 ),
    new THREE.Vector2( 0.05,-.75),
    new THREE.Vector2( 0.048, -1.75 ),
    new THREE.Vector2( 0.48,  -0.35),
    new THREE.Vector2( 0.13,  -0.5),
    new THREE.Vector2( 0.15,  0),
  ]);
  const extrudeSettings = {depth: 0.1};
  const geometry = new THREE.ExtrudeGeometry(thunder, extrudeSettings);
  return geometry;
};

export function createCloud(){
  var sphereGeo = new THREE.SphereGeometry(.50,30,30);
  sphereGeo.translate(0,0,-0.4);
  
  var sphere1Geo = new THREE.SphereGeometry(.50,30,30);
  sphere1Geo.translate(0,0,0.4);

  var sphere2Geo = new THREE.SphereGeometry(.50,32,32);
  sphere2Geo.translate(0,0.5,0);

  var sphere3Geo = new THREE.SphereGeometry(.50,32,32);
  sphere3Geo.translate(-0.4,0,0);

  var sphere4Geo = new THREE.SphereGeometry(.50,32,32);
  sphere4Geo.translate(0.4,0,0);
  var mergeGeos = [sphereGeo, sphere1Geo, sphere2Geo, sphere3Geo, sphere4Geo];
  var cloudGeo = mergeGeometries(mergeGeos);
  return cloudGeo;
};
  
export const Cloud = ({ ...props }) =>{
  const mesh = useRef(null);
  const { isThunderCloud } = props;
  var x = getRandomArbitrary(8,15);
  var y= getRandomArbitrary(-3,3);
  var z = getRandomArbitrary(-10,-2);
  const [position, setPosition] = useState([x, y, z]);
  const [isDragging, setIsDragging] = useState(false);
  const { camera } = useThree();
  const cloudColor = isThunderCloud ? "#484848" : "#ffffff";

  var speed = 0.005*getRandomArbitrary(1,10);
  useFrame(() => {
    var currentCloud = mesh.current;
    var speed = isDragging ? 0: currentCloud.speed;
    if (position[0] >= -30 && !isDragging){
      setPosition([position[0]-speed,position[1],position[2]]);
    };
    if(currentCloud.parent != null && position[0] <= -30){
      currentCloud.parent.remove(currentCloud);
      for(let i = currentCloud.children.length-1; i >=0; i--){
        currentCloud.children[i].geometry.dispose();
        currentCloud.children[i].material.dispose();
      };
    };
  });
  const bind = useDrag(
    ({ event, last }) => {
      setIsDragging(true);
      var raycaster = new THREE.Raycaster();
      var pointer = new THREE.Vector2();
      pointer.x = (event.clientX/window.innerWidth)*2 - 1;
      pointer.y = -(event.clientY/window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      var intersects = new THREE.Vector3();
      var plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -position[2]);
      raycaster.ray.intersectPlane(plane,intersects);
      setPosition([intersects.x, intersects.y, position[2]])
      if(last){
        setIsDragging(false);
      };
    },
    { pointerEvents: true }
  );
  const thunder = isThunderCloud ? <mesh geometry={createThunder()}> <meshPhongMaterial color='#ffff00' opacity={1}/></mesh> : <></>;
  return(
    <group ref={mesh} {...props} speed={speed} position={position} {...bind()}>
      <mesh geometry={createCloud()}>
        <meshPhongMaterial color={cloudColor} transparent={true} opacity={isDragging ? 1 : 0.85}/>
      </mesh>
      {thunder}
    </group>
  );
};
export default Cloud;