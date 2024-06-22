import * as THREE from 'three'; 
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
// Initialization
createNavEventListeners();
var initThreeOutputs = initThree();
var scene = initThreeOutputs[0];
var camera = initThreeOutputs[1];
var loader = initThreeOutputs[2];
var renderer = initThreeOutputs[3];
var textureloader = initThreeOutputs[4];

var THEMES = {
    "home": {primary:0x3760a7, secondary:0xffffff, navcolor:0xffffff},
    "about": {primary:0x858585, secondary:0xe6e600, navcolor:0xe6e600},
    "projects": {primary:0x292929, secondary:0xffff00, navcolor:0x858585},
    "contact": {primary:0xaaaaee, secondary:0xffe4b3, navcolor:0xffe4b3},
}
var THEME = getCurrentPage();

//Timer 
var spawnCounter = 0;
var cube = null;
var textMesh = null;

// Initialize Home Page Geometries
initHomeGeos();
changeTheme(THEME);
spawnObjects();

function initThree(){
    // Define Scene
    var scene = new THREE.Scene();
    scene.background = null;

    // Define Camera
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set(-3.5,0,5);

    //Define FontLoader
    var loader = new FontLoader();

    // Define Renderer
    var renderer = new THREE.WebGLRenderer( {alpha: true} );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(0x000000, 0);
    renderer.setAnimationLoop( animate );
    document.querySelector('#content').appendChild(renderer.domElement);

    // Define a texture loader
    var textureloader = new THREE.TextureLoader();

    // Lighting
    var cameralight = new THREE.RectAreaLight( 0xffffff, 1, 30, 30 );
    cameralight.position.set(-10,10,5);
    cameralight.lookAt(10,0,0);
    scene.add( cameralight );

    return [scene, camera, loader, renderer, textureloader];
}

function changeTheme(theme){
    // Change theme colors
    THEME = theme;

    // Update background
    var body = document.querySelector('body');
    body.style.backgroundColor = hexToHexString(THEMES[THEME].primary);
    var bgImage = null;
    if (THEME == "contact"){
        bgImage = "linear-gradient(#aaaaee 0%, #aaaaee 40%, #ff8566 50%, #ffe4b3 80%)";
        body.style.backgroundColor = null;
    }
    body.style.backgroundImage = bgImage;
    
    // Update Nav
    var logo =  document.getElementById('logo');
    logo.style.fill = hexToHexString(THEMES[THEME].navcolor);
    var navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link =>{
        link.style.color = hexToHexString(THEMES[THEME].navcolor);
    });
};

function spawnObjects(){
    if (THEME == 'home'){
        scene.add(cube);
        if(textMesh && scene.getObjectsByProperty('geoType',"text").length <= 1){
            scene.add(textMesh);
        };
    }else if(THEME =="about"){
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
            bioTxt3.textContent = "Ethan Cheung";
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
        };
    }else if(THEME == "projects"){
        console.log("test");
    }else if(THEME == "contact"){
        var contactBox = document.createElement('div');
        contactBox.id = 'contact-box';
        document.getElementById('nav').appendChild(contactBox);
    };
};

function initHomeGeos(){
    var cubeGeometry = new THREE.BoxGeometry( 2.5, 2.5, 2.5 );
    var cubeMaterial = [
        createTexturedMaterial({map: loadTexture(textureloader, "assets/bean.png")}, THREE.MeshBasicMaterial),
        createTexturedMaterial({map: loadTexture(textureloader, "assets/me.jpg")}, THREE.MeshBasicMaterial),
        createTexturedMaterial({map: loadTexture(textureloader, "assets/doja.jpg")}, THREE.MeshBasicMaterial),
        createTexturedMaterial({map: loadTexture(textureloader, "assets/art.jpg")}, THREE.MeshBasicMaterial),
        createTexturedMaterial({map: loadTexture(textureloader, "assets/headshot.jpg")}, THREE.MeshBasicMaterial),
        createTexturedMaterial({map: loadTexture(textureloader, "assets/masked.jpg")}, THREE.MeshBasicMaterial),
    ];
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
        textgeo.translate(-12,0,-1);
        textgeo1.translate(-12,-1.5,-1);
        var introgeo = BufferGeometryUtils.mergeGeometries([textgeo, textgeo1]);
        var textMaterial = createTexturedMaterial({ color: THEMES[THEME].secondary }, THREE.MeshStandardMaterial);
        var introText = new THREE.Mesh(introgeo,textMaterial);
        introText.geoType = "text";
        textMesh = introText;
    });
    cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
    cube.geoType = "cube";
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
};

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
    });
    scene.remove(cube);
    if(textMesh){
        scene.remove(textMesh);
    }
    var aboutBox = document.getElementById('about-box');
    if (aboutBox) {
        aboutBox.remove();
    }
    var contactBox = document.getElementById('contact-box');
    if (contactBox) {
        contactBox.remove();
    }
};

function createNavEventListeners(){
    document.addEventListener('DOMContentLoaded', () => {

        var logo = document.getElementById('logo');
        logo.addEventListener('mousedown', () => {
            addCloud();
        });

        var home = document.getElementById('home');
        home.addEventListener('mousedown',() => {
            changeTheme('home');
            clearObjects();
            spawnObjects();
        });
        var about = document.getElementById('about');
        about.addEventListener('mousedown',() => {
            changeTheme('about');
            clearObjects();
            spawnObjects();
        });

        var projects = document.getElementById('projects');
        projects.addEventListener('mousedown',() => {
            changeTheme('projects');
            clearObjects();
            spawnObjects();
        });

        var contact = document.getElementById('contact');
        contact.addEventListener('mousedown',() => {
            changeTheme('contact');
            clearObjects();
            spawnObjects();
        });
    });
};
function getCurrentPage() {
    let hash = window.location.hash;
    if (hash) {
      // Remove the '#' character
      return hash.substring(1).toLowerCase();
    } else {
      return 'home'; // or whatever you consider the default page
    };
  };

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
    var textMeshs = scene.getObjectsByProperty('geoType','text');
    if (THEME == "home" && textMeshs.length == 0 && textMesh){
        scene.add(textMesh);
    }

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
