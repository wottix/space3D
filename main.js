import * as THREE from 'three';
import { XRButton } from 'three/examples/jsm/webxr/XRButton.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Create scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.set(0, 1.6, 3);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.getElementById('sceneCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);

// VR Button
document.body.appendChild(XRButton.createButton(renderer));

// Light
const light = new THREE.AmbientLight(0xffffff, 2);
scene.add(light);

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// ✅ GLTFLoader
const loader = new GLTFLoader();

// ✅ Load your model — put the correct path to your model file here
let model; // Declare a variable to hold your loaded model
loader.load(
    'models/myModel.glb', // Replace with the actual path to your model
    function (gltf) {
        model = gltf.scene;
        model.scale.set(2, 2, 2); // Optional: resize the model
        model.position.set(0, 0, 0); // Optional: reposition the model
        scene.add(model); // Add model to scene
    },
    undefined,
    function (error) {
        console.error('An error occurred while loading the model:', error);
    }
);

// Animation loop
function animate() {
    controls.update();

    // Optional: rotate your model (if loaded)
    if (model) {
        model.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

// Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

