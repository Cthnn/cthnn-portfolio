import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';

// Define Scene, Camera, and Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x3760a7 );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(-3.5,0,5);
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// Define a texture loader 
const textureloader = new THREE.TextureLoader();

const me = loadTexture(textureloader, "assets/me.jpg");
const bean = loadTexture(textureloader, "assets/bean.png");
const headshot = loadTexture(textureloader, "assets/headshot.jpg");
const doja = loadTexture(textureloader, "assets/doja.jpg");
const masked = loadTexture(textureloader, "assets/masked.jpg");
const art = loadTexture(textureloader, "assets/art.jpg");

const cubeGeometry = new THREE.BoxGeometry( 2.5, 2.5, 2.5 );
const cubeTexture = [
    createTexturedMaterial({map: bean}, THREE.MeshBasicMaterial),
    createTexturedMaterial({map: me}, THREE.MeshBasicMaterial),
    createTexturedMaterial({map: doja}, THREE.MeshBasicMaterial),
    createTexturedMaterial({map: art}, THREE.MeshBasicMaterial),
    createTexturedMaterial({map: headshot}, THREE.MeshBasicMaterial),
    createTexturedMaterial({map: masked}, THREE.MeshBasicMaterial),
];
const cube = new THREE.Mesh(cubeGeometry, cubeTexture);

function createCloud(){
    const sphereGeo = new THREE.SphereGeometry(.50,32,32);
    sphereGeo.translate(-4,0,0);
    
    const sphere1Geo = new THREE.SphereGeometry(.50,32,32);
    sphere1Geo.translate(-3.4,0,0);

    const sphere2Geo = new THREE.SphereGeometry(.50,32,32);
    sphere2Geo.translate(-3.7,0.4,0.2);

    const sphere3Geo = new THREE.SphereGeometry(.50,32,32);
    sphere3Geo.translate(-3.7,0,0.4);

    const cloudGeo = BufferGeometryUtils.mergeGeometries([sphereGeo, sphere1Geo, sphere2Geo, sphere3Geo]);
    const x = 5;
    const y= getRandomArbitrary(-3,3);
    const z = getRandomArbitrary(-5,4);
    cloudGeo.translate(x,y,z);
    const cloudMaterial = createTexturedMaterial({ color: 0xffffff }, THREE.MeshStandardMaterial);

    const resCloud = new THREE.Mesh(cloudGeo, cloudMaterial);
    
    return resCloud;
}
// Lighting
// const pointLight1 = new THREE.PointLight(0xffffff);
// pointLight1.position.set(0,2,0);
// const pointLight2 = new THREE.PointLight(0xffffff);
// pointLight2.position.set(0,-2,0);
// const pointLight3 = new THREE.PointLight(0xffffff);
// pointLight3.position.set(2,0,0);
// const pointLight4 = new THREE.PointLight(0xffffff);
// pointLight4.position.set(-2,0,0);
// const pointLight5 = new THREE.PointLight(0xffffff);
// pointLight5.position.set(0,0,2);
// const pointLight6 = new THREE.PointLight(0xffffff);
// pointLight6.position.set(0,0,-2);
// scene.add(pointLight1);
// scene.add(pointLight2);
// scene.add(pointLight3);
// scene.add(pointLight4);
// scene.add(pointLight5);
// scene.add(pointLight6);
//Camera light
// const cameralight = new THREE.HemisphereLight( 0xffffff, 0x080820, 1 );
const cameralight = new THREE.RectAreaLight( 0xffffff, 1, 20, 20 );
cameralight.position.set(0,2,0);
cameralight.lookAt(0,0,0);

scene.add( cameralight );
//ambient light
// const ambientlight = new THREE.AmbientLight( 0xffffff ); // soft white light
// scene.add( ambientlight );
scene.add( cube );

console.log(camera.position);
console.log(cameralight.position);
var clouds = [];

function loadTexture(textureloader, textureName){
    const texture = textureloader.load(textureName);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
}
function createTexturedMaterial(texture, MaterialFunction){
    return new MaterialFunction(texture);
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
var spawnCounter = 0;
function animate() {

    // Rotate Cube (Turn this into a function)
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
    if (spawnCounter == 0){
        spawnCounter = 300;
        addCloud();
    };

    spawnCounter -= 1;

    for(let i = 0; i < clouds.length; i++){
        clouds[i].position.x -= 0.01;
    }

	renderer.render( scene, camera );

}
function addCloud(){
    const cloud = createCloud();
    clouds.push(cloud);
    scene.add(cloud);
}