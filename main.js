import * as THREE from 'three'; 
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import { Font, FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TTFLoader } from 'three/addons/loaders/TTFLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
// Initialization
var initThreeOutputs = initThree();
var scene = initThreeOutputs[0];
var camera = initThreeOutputs[1];
var loader = initThreeOutputs[2];
var renderer = initThreeOutputs[3];
var textureloader = initThreeOutputs[4];
var pointer = new THREE.Vector2();
var raycaster = new THREE.Raycaster();
var selected = null;
var incrementor = 0.001;
function updateSize() {
    // Update camera
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
};
updateSize();
window.addEventListener('resize', updateSize);
createNavEventListeners();


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
    camera.position.set(0,0,0);

    //Define FontLoader
    var loader = new TTFLoader();

    // Define Renderer
    var renderer = new THREE.WebGLRenderer( {alpha: true} );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(0x000000, 0);
    renderer.setAnimationLoop( animate );
    document.querySelector('#content').appendChild(renderer.domElement);

    // Define a texture loader
    var textureloader = new THREE.TextureLoader();

    // Lighting
    var cameralight = new THREE.RectAreaLight( 0xffffff, 0.8, 100, 100 );
    cameralight.position.set(10,10,5);
    cameralight.lookAt(0,-6,-25);
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
            bioTxt2.textContent = "Now for the interesting part. You're probably wondering \"What's up with the clouds?\". Well that's simple, my Chinese name means Smiling Cloud. As you continue to explore my portfolio, I want to share an experience that represents myself and to share a mix of my passions. I'm excited about creating impactful software and like to make it fun along the way. On my freetime you'll catch me keeping up with the latest in AR/VR & Graphics technology, taking pictures, running with my Husky or practicing my juggling skills with the Diabolo. I'm excited to be sharing an experience through my portfolio showcasing my passion and creativity for building software."
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
        var form = document.createElement('form');
        contactBox.appendChild(form);
        var h1 = document.createElement('h2');
        h1.textContent = "Send Me A Message"
        var name = document.createElement('input');
        name.type = "text";
        name.placeholder = "Name*"
        name.required = true;
        var email = document.createElement('input');
        email.type = "text";
        email.placeholder = "Email*"
        email.required = true;
        var message = document.createElement('textarea');
        message.placeholder = "Your Message*"
        message.rows = 6;
        message.required = true;
        var send = document.createElement('div');
        send.id = "send";
        var sendbutton = document.createElement('button');
        sendbutton.id = "send-button"
        sendbutton.type = "submit";
        sendbutton.textContent = "Send";
        send.appendChild(sendbutton);
        form.appendChild(h1);
        form.appendChild(name);
        form.appendChild(email);
        form.appendChild(message);
        form.appendChild(send);
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
    loader.load( 'node_modules/three/examples/fonts/ttf/kenpixel.ttf',(json) =>{
        var font = new Font(json);
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
        textgeo.translate(0,0,0);
        textgeo1.translate(0,-1.5,0);
        var introgeo = BufferGeometryUtils.mergeGeometries([textgeo, textgeo1]);
        var textMaterial = createTexturedMaterial({ color: 0xffffff, transparent: true, opacity:0.75 }, THREE.MeshStandardMaterial);
        var introText = new THREE.Mesh(introgeo,textMaterial);
        introText.geoType = "text";
        introText.position.set(-8.5,0,-6);
        textMesh = introText;
    });
    cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
    cube.geoType = "cube";
    cube.position.set(3,0,-5);  
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
    sphereGeo.translate(0,0,-0.4);
    
    var sphere1Geo = new THREE.SphereGeometry(.50,30,30);
    sphere1Geo.translate(0,0,0.4);

    var sphere2Geo = new THREE.SphereGeometry(.50,32,32);
    sphere2Geo.translate(0,0.5,0);

    var sphere3Geo = new THREE.SphereGeometry(.50,32,32);
    sphere3Geo.translate(-0.4,0,0);

    var sphere4Geo = new THREE.SphereGeometry(.50,32,32);
    sphere4Geo.translate(0.4,0,0);

    var cloudGeo = BufferGeometryUtils.mergeGeometries([sphereGeo, sphere1Geo, sphere2Geo, sphere3Geo, sphere4Geo]);
    sphereGeo.dispose();
    sphere1Geo.dispose();
    sphere2Geo.dispose();
    sphere3Geo.dispose();
    sphere4Geo.dispose();
    var x = getRandomArbitrary(8,15);
    var y= getRandomArbitrary(-3,3);
    var z = getRandomArbitrary(-10,-2);

    var cloudMaterial = createTexturedMaterial({ color: 0xffffff, transparent: true, opacity: 0.75 }, THREE.MeshStandardMaterial);

    var resCloud = new THREE.Mesh(cloudGeo, cloudMaterial);
    resCloud.position.set(x,y,z);
    resCloud.geoType = 'cloud';
    return resCloud;
};

function addCloud(){
    var cloud = createCloud();
    cloud.speed = 0.01*getRandomArbitrary(1,5);
    cloud.move = true;
    scene.add(cloud);
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
    document.addEventListener('mousemove', (event) =>{
        pointer.x = (event.clientX/window.innerWidth)*2 - 1;
        pointer.y = -(event.clientY/window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        if(selected){
            var intersects = new THREE.Vector3();
            var plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -selected.position.z);
            raycaster.ray.intersectPlane(plane,intersects);
            selected.position.set(intersects.x,intersects.y,intersects.z);
        }
    });
    document.addEventListener('mousedown', (event)=>{
        pointer.x = (event.clientX/window.innerWidth)*2 - 1;
        pointer.y = -(event.clientY/window.innerHeight) * 2 + 1;
        if(selected == null){
            var intersects = raycaster.intersectObjects(scene.children);
            var cloud = null;
            var i = 0;
            while (cloud == null && i < intersects.length){
                if(intersects[i].object.geoType == 'cloud'){
                    cloud = intersects[i].object;
                    cloud.material.opacity = 1;
                    cloud.move = false;
                    selected = cloud;
                    break;
                };
                i+=1;
            };
        };
        
    });
    document.addEventListener('mouseup', (event)=>{
        if(selected){
            var tempSelected = selected;
            selected = null;
            tempSelected.material.opacity = 0.75;
            tempSelected.move = true;    
        }
    });
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
    spawnCounter -= 0;
    if(textMesh){
        textMesh.position.z += incrementor;
        if(textMesh.position.z <= -6.05){
            incrementor = 0.001;
        };
        if(textMesh.position.z >= -5.95){
            incrementor = -0.001;
        };
    }
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
        if (currentCloud.move){
            currentCloud.position.x -= currentCloud.speed;
        }

        if (currentCloud.position.x <= -30){
            despawnCloud(currentCloud);
        };

    };

	renderer.render( scene, camera );

};
