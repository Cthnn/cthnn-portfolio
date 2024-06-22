import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
// Global Vars

// Define constants
var PRIMARY = 0x3760a7; //dark blue
var SECONDARY = 0xffffff;
var NAVCOLOR = 0xffffff;
var THEME = "home";
var spawnCounter = 0;
var loader = new FontLoader();
var textMesh = null;

// Define Scene
var scene = new THREE.Scene();
scene.background = null;

// Define Camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(-3.5,0,5);

// Define Renderer
var renderer = new THREE.WebGLRenderer( {alpha: true} );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x000000, 0);
renderer.setAnimationLoop( animate );
document.querySelector('#content').appendChild(renderer.domElement);

// Define a texture loader
var textureloader = new THREE.TextureLoader();

// Define main geos
// Define Cube Textures
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
// Define Cube Mesh
var cube = new THREE.Mesh(cubeGeometry, cubeTexture);
cube.geoType = "cube";

// Lighting
var cameralight = new THREE.RectAreaLight( 0xffffff, 1, 30, 30 );
cameralight.position.set(-10,10,5);
cameralight.lookAt(10,0,0);
scene.add( cameralight );

spawnObjects();

document.addEventListener('DOMContentLoaded', () => {
    var logo = document.getElementById('logo');
    var home = document.getElementById('home');
    var about = document.getElementById('about');
    var projects = document.getElementById('projects');
    var contact = document.getElementById('contact');
    home.addEventListener('mousedown',() => {
        changeTheme(0x3760a7, 0xffffff, 0xffffff, 'home');
        clearObjects();
        spawnObjects();
        var aboutBox = document.getElementById('about-box');
        if (aboutBox) {
            aboutBox.remove();
        }
    });
    about.addEventListener('mousedown',() => {
        changeTheme(0x858585, 0xe6e600, 0xe6e600, 'about');
        clearObjects();
        spawnObjects();
        if (!document.getElementById('about-box')) {
            // Create a new div element
            var aboutBox = document.createElement('div');
            aboutBox.id = 'about-box';
            var innerAbout = document.createElement('div');
            innerAbout.id = "inner-about";
            var maskImage = document.createElement('img');
            maskImage.src = 'assets/masked.jpg';
            maskImage.id = "mask-image";
            var aboutMe = document.createElement('div');
            aboutMe.id = "about-me";
            var aboutMeTxt = document.createElement('h1');
            aboutMeTxt.textContent = "About Me"
            var bioTxt1 = document.createElement('p');
            bioTxt1.textContent = "Hello! My name is Ethan Cheung and welcome to my portfolio. Firstly, let me introduce myself as a Software Developer. I have experience building industry leading software in Cloud Infrastructure, MLOps, Cybersecurity & Privacy, Data Science, and AI & Machine Learning. Most recently, I am working as a Platform Engineer at Agility Robotics."
            var bioTxt2 = document.createElement('p');
            bioTxt2.textContent = "Now for the interesting part. You're probably wondering \"What's up with the clouds\". Well that's simple, my Chinese name means Smiling Cloud. As you continue to explore my portfolio, I want to share an experience that represents myself and to share a mix of my passions. I'm excited about creating impactful software and like to make it fun along the way. On my freetime you'll catch me keeping up with the latest in AR/VR & Graphics Technology, taking pictures, running with my Husky and Machine Learning. I'm excited to be sharing a piece of my journey and deliver an amazing experience through my portfolio showcasing my passion and creativity for building software."
            var bioTxt3 = document.createElement('p');
            bioTxt3.textContent = "-Ethan Cheung";
            var bioTxt4 = document.createElement('p');
            bioTxt4.textContent = "P.S. Press the logo to spawn some more clouds"
            aboutMe.appendChild(aboutMeTxt);
            aboutMe.appendChild(bioTxt1);
            aboutMe.appendChild(bioTxt2);
            aboutMe.appendChild(bioTxt3);
            aboutMe.appendChild(bioTxt4);
            innerAbout.appendChild(maskImage);
            innerAbout.appendChild(aboutMe);
            aboutBox.appendChild(innerAbout);
            // Append the new div to the content div
            document.getElementById('nav').appendChild(aboutBox);
        }

    });
    projects.addEventListener('mousedown',() => {
        changeTheme(0x292929, 0xffff00, 0x858585, 'projects');
        clearObjects();
        spawnObjects();
    });
    contact.addEventListener('mousedown',() => {
        changeTheme(0xaaaaee, 0xffe4b3, 0xffe4b3,'contact');
        clearObjects();
        spawnObjects();
    });
    logo.addEventListener('mousedown', () => {
        addCloud();
    });
});

function changeTheme(primary, secondary, navcolor, theme){
    // Change theme colors
    PRIMARY = primary;
    SECONDARY = secondary;
    NAVCOLOR = navcolor;
    THEME = theme;

    // Update background
    var body = document.querySelector('body');
    body.style.backgroundColor = hexToHexString(PRIMARY);
    var bgImage = null;
    if (THEME == "contact"){
        bgImage = "linear-gradient(#aaaaee 0%, #aaaaee 40%, #ff8566 50%, #ffe4b3 80%)";
        body.style.backgroundColor = null;
    }
    body.style.backgroundImage = bgImage;

    // var texts = scene.getObjectsByProperty('geoType', 'text');
    // for(let i = 0; i < texts.length; i++){
    //     texts[i].material = createTexturedMaterial({ color: SECONDARY }, THREE.MeshStandardMaterial);
    // };
    
    // Update Nav
    var logo =  document.getElementById('logo');
    logo.style.fill = hexToHexString(NAVCOLOR);
    var navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link =>{
        link.style.color = hexToHexString(NAVCOLOR);
    });
};

function spawnObjects(){
    if (THEME == 'home'){
        spawnHomeObjects();
    }
}

function spawnHomeObjects(){
    // Load Font
    scene.add( cube );
    if(!scene.getObjectByProperty("geoType","text")){
        if(!textMesh){
            loader.load( 'node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json',(font) =>{
                var textgeo = new TextGeometry( 'HI,', {
                    size: 1,
                    height: 1,
                    depth: 0.1,
                    font: font,
                    bevelSize: 1,
                    bevelThickness: 1,
                } );
                var textgeo1 = new TextGeometry( 'IM ETHAN', {
                    size: 1,
                    height: 1,
                    depth: 0.1,
                    font: font,
                    bevelSize: 1,
                    bevelThickness: 1,
                } );
                textgeo.translate(-12.5,1,-1);
                textgeo1.translate(-12.5,-0.5,-1);
                var introgeo = BufferGeometryUtils.mergeGeometries([textgeo, textgeo1]);
                var textMaterial = createTexturedMaterial({ color: SECONDARY }, THREE.MeshStandardMaterial);
                var introText = new THREE.Mesh(introgeo,textMaterial);
                introText.geoType = "text";
                textMesh = introText;
                scene.add(introText);
            });
        }else{
            scene.add(textMesh);
        }
    }
    // var triangle1 = new THREE.Shape();
    // triangle1.moveTo(0,-5);
    // triangle1.moveTo(5,-5);
    // triangle1.moveTo(0,0);
    var x = 0, y = 0;

    var heartShape = new THREE.Shape();

    heartShape.moveTo(x , y - .5);
    heartShape.moveTo(x + .5, y - .5);
    heartShape.moveTo(x,y);

    var triangle1Geo = new THREE.ShapeGeometry(heartShape);
    triangle1Geo.translate(-5,0,0);
    var triangle1Mesh = new THREE.Mesh(triangle1Geo, createTexturedMaterial({ color:0x000000 }, THREE.MeshStandardMaterial));
    scene.add(triangle1Mesh);
    console.log(triangle1Mesh.position);
    


};

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
};

function loadTexture(textureloader, textureName){
    var texture = textureloader.load(textureName);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
};

function createTexturedMaterial(texture, MaterialFunction){
    return new MaterialFunction(texture);
};
function hexToHexString(hexValue){
    if (hexValue === 0){
        return "#000000";
    }
    var hexString = hexValue.toString(16);
    hexString.slice(2);
    return "#" + hexString;
}
function createCloud(){
    var sphereGeo = new THREE.SphereGeometry(.50,30,30);
    sphereGeo.translate(-4,0,0);
    
    var sphere1Geo = new THREE.SphereGeometry(.50,30,30);
    sphere1Geo.translate(-3.4,0,0);

    var sphere2Geo = new THREE.SphereGeometry(.50,32,32);
    sphere2Geo.translate(-3.7,0.4,0.2);

    var sphere3Geo = new THREE.SphereGeometry(.50,32,32);
    sphere3Geo.translate(-3.7,0,0.4);

    var cloudGeo = BufferGeometryUtils.mergeGeometries([sphereGeo, sphere1Geo, sphere2Geo, sphere3Geo]);
    sphereGeo.dispose();
    sphere1Geo.dispose();
    sphere2Geo.dispose();
    sphere3Geo.dispose();
    var x = getRandomArbitrary(10,15);
    var y= getRandomArbitrary(-3,3);
    var z = getRandomArbitrary(-5,4);
    cloudGeo.translate(x,y,z);
    var cloudMaterial = createTexturedMaterial({ color: 0xffffff }, THREE.MeshStandardMaterial);

    var resCloud = new THREE.Mesh(cloudGeo, cloudMaterial);
    resCloud.geoType = 'cloud';
    return resCloud;
};

function addCloud(){
    var cloud = createCloud();
    cloud.speed = 0.01*getRandomArbitrary(1,5);
    scene.add(cloud);
    console.log(scene.children);
};

function despawnCloud(cloud){
    cloud.geometry.dispose();
    cloud.material.dispose();
    scene.remove(cloud);
};
function clearObjects(){
    var clouds = scene.getObjectsByProperty('geoType', 'cloud');
    clouds.forEach(cloud =>{
        despawnCloud(cloud);
    })
    scene.remove(cube);
    if(textMesh){
        scene.remove(textMesh);
    }
    scene.remove()
    var aboutBox = document.getElementById('about-box');
    if (aboutBox) {
        aboutBox.remove();
    }
}
function animate() {

    // Spawn Cloud when counter is 0
    if (spawnCounter <= 0){
        spawnCounter = getRandomArbitrary(100,500);
        addCloud();
    };
    spawnCounter -= 1;

    // Rotate Cube (Turn this into a function)
    var cubes = scene.getObjectsByProperty('geoType', 'cube');
    cubes.forEach(cube =>{
        cube.rotation.x += 0.01;
	    cube.rotation.y += 0.01;
    });

    // Move Clouds
    var clouds = scene.getObjectsByProperty('geoType', 'cloud');
    for(let i = 0; i < clouds.length; i++){

        var currentCloud = clouds[i];
        currentCloud.position.x -= currentCloud.speed;

        if (currentCloud.position.x <= -30){
            despawnCloud(currentCloud);
        };

    };

	renderer.render( scene, camera );

};