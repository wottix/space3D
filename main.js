import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { FlyControls } from 'three/addons/controls/FlyControls.js';

// RANDOM
function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}
// MAP
function map(in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

// SETUP
let time = 0;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
scene.add(camera);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// SCENE GROUP
const sceneGroup = new THREE.Group();

// WEB XR
document.body.appendChild( VRButton.createButton( renderer ) );
renderer.xr.enabled = true;

// LIGHTS
const ambientLight = new THREE.AmbientLight(0xFFFFFF, .2);
scene.add(ambientLight);

function addLamp(x,y,z){
    const pl = new THREE.PointLight(0xffc379,0.6,2,0.95);
    pl.position.set(x,y,z);
    
    sceneGroup.add(pl);
}

addLamp(0,12,0);
addLamp(-10,7,5);
addLamp(-12,5,-10);
addLamp(-20,10,0);
addLamp(-25,15,5);
addLamp(-30,15,-5);
addLamp(-40,5,0);
addLamp(-30,5,10);
addLamp(-30,10,20);


        sceneGroup.add(cave);
    },
    function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    function ( error ) {
        console.log( error );
    }
);

		sceneGroup.add(gltf.scene);
        console.log(gltf.scene);
	},
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	function ( error ) {
		console.log( error );
	}
);


// HELPERS
const size = 500;
const divisions = 100;

const axesHelper = new THREE.AxesHelper( 5 );
const gridHelper = new THREE.GridHelper( size, divisions );

const flyControls = new FlyControls(camera, renderer.domElement);

flyControls.movementSpeed = 1;
flyControls.rollSpeed = .5;

flyControls.dragToLook = true;

document.addEventListener("resize", (event) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

scene.add(sceneGroup);
sceneGroup.scale.set(0.13,0.13,0.13);
sceneGroup.position.set(0,0.9,0);

camera.position.set(0,0.2,0);
camera.rotation.set(0,1/2*Math.PI,0);

function getDist(object){
    const objectPosition = new THREE.Vector3();
    object.getWorldPosition(objectPosition); // Get object's world position
    
    const cameraPosition = camera.position; // Camera's position
    const distance = cameraPosition.distanceTo(objectPosition); // Calculate distance
    
    const threshold = 1; // Define close range
    if (distance < threshold) {
        return true;
    }
    else {
        return false;
    }
}
