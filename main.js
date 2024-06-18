import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
// Global Vars

// Define constants
var BGCOLOR = 0x3760a7; //dark blue
var spawnCounter = 0;
var clouds = [];

// Define Scene
var scene = new THREE.Scene();
scene.background = new THREE.Color( BGCOLOR );

// Define Camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(-3.5,0,5);

// Define Renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// Define a texture loader
var textureloader = new THREE.TextureLoader();

// Lighting
var cameralight = new THREE.RectAreaLight( 0xffffff, 1, 20, 20 );
cameralight.position.set(0,5,0);
cameralight.lookAt(0,0,0);
scene.add( cameralight );

// Define Textures
var me = loadTexture(textureloader, "assets/me.jpg");
var bean = loadTexture(textureloader, "assets/bean.png");
var headshot = loadTexture(textureloader, "assets/headshot.jpg");
var doja = loadTexture(textureloader, "assets/doja.jpg");
var masked = loadTexture(textureloader, "assets/masked.jpg");
var art = loadTexture(textureloader, "assets/art.jpg");

var cubeGeometry = new THREE.BoxGeometry( 2.5, 2.5, 2.5 );
var cubeTexture = [
    createTexturedMaterial({map: bean}, THREE.MeshBasicMaterial),
    createTexturedMaterial({map: me}, THREE.MeshBasicMaterial),
    createTexturedMaterial({map: doja}, THREE.MeshBasicMaterial),
    createTexturedMaterial({map: art}, THREE.MeshBasicMaterial),
    createTexturedMaterial({map: headshot}, THREE.MeshBasicMaterial),
    createTexturedMaterial({map: masked}, THREE.MeshBasicMaterial),
];
var cube = new THREE.Mesh(cubeGeometry, cubeTexture);
scene.add( cube );

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
};

function loadTexture(textureloader, textureName){
    const texture = textureloader.load(textureName);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
};

function createTexturedMaterial(texture, MaterialFunction){
    return new MaterialFunction(texture);
};

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
    sphereGeo.dispose();
    sphere1Geo.dispose();
    sphere2Geo.dispose();
    sphere3Geo.dispose();
    const x = getRandomArbitrary(10,15);
    const y= getRandomArbitrary(-3,3);
    const z = getRandomArbitrary(-5,4);
    cloudGeo.translate(x,y,z);
    const cloudMaterial = createTexturedMaterial({ color: 0xffffff }, THREE.MeshStandardMaterial);

    const resCloud = new THREE.Mesh(cloudGeo, cloudMaterial);
    
    return resCloud;
};

function addCloud(){
    var cloud = createCloud();
    clouds.push([cloud.uuid,0.01*getRandomArbitrary(1,5)]);
    scene.add(cloud);
};

function despawnCloud(cloud){
    cloud.geometry.dispose();
    cloud.material.dispose();
    scene.remove(cloud);
};

function animate() {

    // Rotate Cube (Turn this into a function)
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
    
    // Spawn Cloud when counter is 0
    if (spawnCounter <= 0){
        spawnCounter = getRandomArbitrary(100,500);
        addCloud();
    };
    spawnCounter -= 1;

    // Move Clouds
    var newClouds = [];
    for(let i = 0; i < clouds.length; i++){

        var currentCloud = scene.getObjectByProperty('uuid', clouds[i][0]);
        var push = true;
        currentCloud.position.x -= clouds[i][1];

        if (currentCloud.position.x <= -30){
            despawnCloud(currentCloud);
            push = false;
        };

        if (push){
            newClouds.push(clouds[i]);
        };

    };
    clouds = newClouds;

	renderer.render( scene, camera );

};