import * as THREE from 'three';
import { XRButton } from 'three/examples/jsm/webxr/XRButton.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Vytvoření scény
const scene = new THREE.Scene();

// Kamera
const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.set(0, 1.6, 3);

// Renderer s podporou VR
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.getElementById('sceneCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);

// Přidání VR tlačítka
document.body.appendChild(XRButton.createButton(renderer));

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

// Přidání krychle
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// Animace
function animate() {
    controls.update();
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
