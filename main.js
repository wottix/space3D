import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

// Vytvoření scény
const scene = new THREE.Scene();

// Kamera
const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.set(0, 1.6, 3); // Výška kamery jako u člověka

// Renderer s VR podporou
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);

// Přidání VR tlačítka
document.body.appendChild(VRButton.createButton(renderer));

// Světlo
const light = new THREE.AmbientLight(0xffffff, 2);
scene.add(light);

// Ovládání myší
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Načtení 3D modelu
const loader = new GLTFLoader();
loader.load('models/scene.gltf', function (gltf) {
    gltf.scene.scale.set(2, 2, 2);
    scene.add(gltf.scene);
});

// Animace
function animate() {
    controls.update();
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
