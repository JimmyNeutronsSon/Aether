import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

console.log('3D Cloud Module Loading...');

let scene, camera, renderer, cloud;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

window.addEventListener('DOMContentLoaded', () => {
    init();
    animate();
});

function init() {
    console.log('3D Cloud Init...');
    const container = document.getElementById('canvas-container');
    if (!container) {
        console.error('Canvas container not found!');
        return;
    }
    console.log('Container found:', container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.z = 1000;

    scene = new THREE.Scene();
    // Background is handled by CSS to allow for gradients

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 2);
    scene.add(directionalLight);

    const loader = new OBJLoader();
    loader.load('/cloud.obj', (obj) => {
        cloud = obj;
        
        // Center the model
        const box = new THREE.Box3().setFromObject(cloud);
        const center = box.getCenter(new THREE.Vector3());
        cloud.position.sub(center);
        
        // Materials
        cloud.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshPhongMaterial({
                    color: 0x1e6cc7, // --accent
                    transparent: true,
                    opacity: 0.15,
                    shininess: 50,
                    flatShading: false
                });
            }
        });

        scene.add(cloud);
        
        // Initial scale
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 500 / maxDim;
        cloud.scale.set(scale, scale, scale);
        
    }, (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    }, (error) => {
        console.error('An error happened', error);
    });

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    document.addEventListener('mousemove', onDocumentMouseMove);
    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / 2;
    mouseY = (event.clientY - windowHalfY) / 2;
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    if (cloud) {
        // Slow auto-rotation
        cloud.rotation.y += 0.002;
        
        // Interactive rotation based on mouse
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
    }
    renderer.render(scene, camera);
}
