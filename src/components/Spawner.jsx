import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useEffect, useState, useRef } from 'react';
import { getRandomArbitrary, createCloud, createThunder, Cloud } from './Cloud';
import { useLocation } from 'react-router-dom';
import { useTexture } from '@react-three/drei';

function spawnCloud( isThunderCloud ){

  var x = getRandomArbitrary(8,15);
  var y= getRandomArbitrary(-3,3);
  var z = getRandomArbitrary(-10,-2);
  var speed = 0.005*getRandomArbitrary(1,10);
  var resCloud = new THREE.Group();

  var cloud_geo = createCloud();
  var cloud_color = { color: 0xffffff, transparent: true, opacity: 0.75 };
  if( isThunderCloud ){
    var thunder_geo = createThunder();
    var thunder_mat = new THREE.MeshPhongMaterial({color: 0xffff00});
    var thunder_mesh = new THREE.Mesh(thunder_geo,thunder_mat);
    cloud_color.color = 0x484848;
    resCloud.add(thunder_mesh);
  };
  var cloud_mat = new THREE.MeshPhongMaterial(cloud_color);
  var cloud_mesh = new THREE.Mesh(cloud_geo,cloud_mat);
  resCloud.add(cloud_mesh);

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
  const { clicks, isThunderCloud, mouseDown, pointerX, pointerY } = props;
  const [ prevCount, setPrevCount ] = useState(0);
  const [ currentPage, setCurrentPage ] = useState('/');
  const [ selected, setSelected] = useState(null);
  const [cd, setCd] = useState(1);

  // const pointerUp = (event) =>{
  //   if(selected){
  //     var tempSelected = selected;
  //     setSelected(null);
  //     tempSelected.children[tempSelected.children.length-1].material.opacity = 0.75;
  //     tempSelected.move = true;
  //   }  
  // }

  // const pointerDown = (event) =>{
  //   console.log("pointer down");
  //   if(selected == null){
  //     var intersects = raycaster.intersectObjects(scene.getObjectsByProperty('geoType',"cloud"));
  //     var cloud = null;
  //     var i = 0;
  //     while (cloud == null && i < intersects.length){
  //       cloud = intersects[i].object.parent
  //       if(cloud.geoType == 'cloud'){
  //         cloud.children[cloud.children.length-1].material.opacity = 1;
  //         cloud.move = false;
  //         setSelected(cloud);
  //         break;
  //       };
  //       i+=1;
  //     };
  //   }
  // }
  // const pointerMove = (event) =>{
  //   if(selected){
  //     var intersects = new THREE.Vector3();
  //       var plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -selected.position.z);
  //       raycaster.ray.intersectPlane(plane,intersects);
  //       selected.position.set(intersects.x,intersects.y,intersects.z);
  //   }
  // }
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
        scene.add(spawnCloud(isThunderCloud));
        setPrevCount(prevCount+1);
        diff -=1;
      };
    };
    if(mouseDown){
      if(selected == null){
        var pointer = new THREE.Vector2();
        pointer.x = pointerX;
        pointer.y = pointerY;
        raycaster.setFromCamera(pointer, camera);
        var intersects = raycaster.intersectObjects(event.scene.getObjectsByProperty('geoType',"cloud"));
        var cloud = null;
        var i = 0;
        while (cloud == null && i < intersects.length){
          cloud = intersects[i].object.parent
          if(cloud.geoType == 'cloud'){
            cloud.children[cloud.children.length-1].material.opacity = 1;
            cloud.move = false;
            setSelected(cloud);
            break;
          };
          i+=1;
        };
      }else{
        var pointer = new THREE.Vector2();
        pointer.x = pointerX;
        pointer.y = pointerY;
        console.log("moving cloud");
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
        tempSelected.children[tempSelected.children.length-1].material.opacity = 0.75;
        tempSelected.move = true;
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
      setCd(getRandomArbitrary(350,500));
      scene.add(spawnCloud(isThunderCloud));
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
// export const CloudSpawner = ({ ...props }) =>{
//     const { clicks } = props;
//     const [ prevCount, setPrevCount ] = useState(0);
//     const [ clouds, setClouds ] = useState([]);
//     const [cd, setCd] = useState(1);
//     useFrame(() => {
//         if(clicks > prevCount){
//             var diff = clicks - prevCount
//             while (diff > 0){
//                 setClouds([...clouds,<Cloud {...props}></Cloud>])
//                 setPrevCount(prevCount+1)
//                 diff -= 1
                
//             }
//         }
//         setCd(cd-1);
//         if (cd <= 0){
//                 setCd(getRandomArbitrary(350,500))
//                 setClouds([...clouds,<Cloud {...props}></Cloud>])
//         }
//     })
//     return(
//       <>
//         {...clouds}
//       </>
//     )
//   }