
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { Font } from 'three/examples/jsm/loaders/FontLoader.js';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';

var loader = new TTFLoader();
var font = null;
loader.load('kenpixel.ttf', (json)=>font= new Font(json));
var incrementor = 0.001;

function createTexture(style, materialFunction){
  return new materialFunction(style);
};

export function generateText(){
  var textgeo = new TextGeometry( 'HI,', {
    size: 1,
    depth: 0.1,
    font: font,
    bevelEnabled: false,
    curveSegments:2,
  } );
  var textgeo1 = new TextGeometry( 'IM ETHAN', {
    size: 1,
    depth: 0.1,
    font: font,
    bevelEnabled: false,
    curveSegments: 2,
  } );
  textgeo.translate(0,0,0);
  textgeo1.translate(0,-1.5,0);
  const textMesh = new THREE.Mesh(textgeo,createTexture({color: 0xffffff}, THREE.MeshPhongMaterial));
  const textMesh1 = new THREE.Mesh(textgeo1,createTexture({color: 0xffffff}, THREE.MeshPhongMaterial));
  const text_group = new THREE.Group();
  text_group.add(textMesh);
  text_group.add(textMesh1);
  text_group.position.set(-8.5,0,-6);
  return text_group;
};

export const Text = ({ ...props }) => {
    const mesh = useRef(null);
    const { textdepth } = props;
    var textgeo = new TextGeometry( 'HI,', {
      size: 1,
      depth: 0.1,
      font: font,
      bevelSize: 1,
      bevelThickness: 1,
    } );
    var textgeo1 = new TextGeometry( 'IM ETHAN', {
      size: 1,
      depth: 0.1,
      font: font,
      bevelSize: 1,
      bevelThickness: 1,
    } );
    textgeo.translate(0,0,0);
    textgeo1.translate(0,-1.5,0);
    var introgeo =  mergeGeometries([textgeo,textgeo1]);
    useFrame((state, delta) => {
      mesh.current.position.z += incrementor;
      if(mesh.current.position.z <= textdepth-0.06){
        incrementor = 0.001;
      };
      if(mesh.current.position.z >= textdepth+0.06){
        incrementor = -0.001;
      };
    });
    return (
      <group ref={mesh} {...props}>
        <mesh geometry={introgeo}>
          <meshStandardMaterial color="white" transparent opacity={0.75}/>
        </mesh>
      </group>
    );
};

export default Text;