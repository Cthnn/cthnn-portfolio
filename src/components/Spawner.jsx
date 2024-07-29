import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useEffect, useState, useRef } from 'react';
import { getRandomArbitrary, createCloud, createThunder } from './Cloud';
import { useLocation } from 'react-router-dom';
import { useTexture } from '@react-three/drei';

const cloudColors = {
  '/': { color: 0xffffff, transparent: true, opacity: 0.75 },
  '/about': { color: 0x272727, transparent: true, opacity: 0.75 },
  '/projects': { color: 0xd4af37, metalness: 1, roughness: 0.5 },
  '/contact': { color: 0x676767, transparent: true, opacity: 0.75 },
}
function selectCloud( cloud, path ){
  if(path == "/" || path == "/about" || path == "/contact"){
    cloud.children[0].material.opacity = 1;
  }else if(path == "/projects" ){
    cloud.children[0].material = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 1, roughness: 0.5,  transparent:true, opacity: 0.75});
  }
  cloud.move = false;
}
function unselectCloud( cloud, path ){
  if(path == "/" || path == "/about" || path == "/contact"){
    cloud.children[0].material.opacity = 0.75;
  }else if(path == "/projects" ){
    cloud.children[0].material = new THREE.MeshStandardMaterial(cloudColors[path]);
  }
  cloud.move = true;
}
function spawnCloud( path ){
  var x = getRandomArbitrary(8,15);
  var y= getRandomArbitrary(-3,3);
  var z = getRandomArbitrary(-10,-2);
  var speed = 0.005*getRandomArbitrary(1,10);
  var resCloud = new THREE.Group();

  var cloud_mesh = new THREE.Mesh(createCloud(), new THREE.MeshStandardMaterial(cloudColors[path]));
  resCloud.add(cloud_mesh);

  if( path == "/about" ){
    var thunder_mesh = new THREE.Mesh(createThunder(), new THREE.MeshPhongMaterial({color: 0xffff00}));
    resCloud.add(thunder_mesh);
  }
  
  resCloud.position.set(x,y,z);
  resCloud.speed = speed;
  resCloud.move = true;
  resCloud.geoType = "cloud";

  return resCloud;
};

function despawnCloud(cloud,scene){
  cloud.children.forEach(cloudMesh =>{
    cloudMesh.geometry.dispose();
    cloudMesh.material.dispose();
    scene.remove(cloud);
  });

};

export const CloudSpawner = ({ ...props }) =>{
  const mesh = useRef();
  const location = useLocation();
  const { raycaster, scene, camera } = useThree();
  const { clicks, mousedown, x, y } = props;
  const [ prevCount, setPrevCount ] = useState(0);
  const [ currentPage, setCurrentPage ] = useState('/');
  const [ selected, setSelected] = useState(null);
  const [cd, setCd] = useState(1);

  useEffect(() => {
    const path = location.pathname;
    if(currentPage != path){
      var clouds = scene.getObjectsByProperty('geoType',"cloud");
      clouds.forEach(cloud =>{
          despawnCloud(cloud, scene);
      });
    };
    setCurrentPage(path);
  }, [location]);

  useFrame((event) => {
    if(clicks > prevCount){
      var diff = clicks - prevCount
      while (diff > 0){
        scene.add(spawnCloud(currentPage));
        setPrevCount(prevCount+1);
        diff -=1;
      };
    };
    if(mousedown == 1){
      if(selected == null){
        var pointer = new THREE.Vector2();
        pointer.x = x;
        pointer.y = y;
        raycaster.setFromCamera(pointer, camera);
        var intersects = raycaster.intersectObjects(event.scene.getObjectsByProperty('geoType',"cloud"));
        var cloud = null;
        var i = 0;
        while (cloud == null && i < intersects.length){
          cloud = intersects[i].object.parent
          if(cloud.geoType == 'cloud'){
            selectCloud(cloud, currentPage);
            setSelected(cloud);
            break;
          };
          i+=1;
        };
      }else{
        var pointer = new THREE.Vector2();
        pointer.x = x;
        pointer.y = y;
        var intersects = new THREE.Vector3();
        var plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -selected.position.z);
        raycaster.setFromCamera(pointer, camera);
        raycaster.ray.intersectPlane(plane,intersects);
        selected.position.set(intersects.x,intersects.y,intersects.z);
      };
    }else{
      if(selected != null){
        var tempSelected = selected;
        setSelected(null);
        unselectCloud(tempSelected, currentPage);
      }
    }
    var clouds = scene.getObjectsByProperty('geoType',"cloud");
    clouds.forEach(cloud =>{
      cloud.position.x -= cloud.move ? cloud.speed : 0;
      if(cloud.position.x <= -30){
        despawnCloud(cloud, scene);
      };
    });

    setCd(cd-1);
    if (cd <= 0){
      setCd(getRandomArbitrary(450,600));
      scene.add(spawnCloud(currentPage));
    };
  });
  return(
    <group ref={mesh} {...props} userData={{geoType:"spawner"}} >
      <mesh name="spawner">
        <planeGeometry args={[1,1]}/>
        <meshStandardMaterial color={0xffffff} opacity={0} transparent/>
      </mesh>
    </group>
  );
};