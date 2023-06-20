import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

// Create a scene
const scene = new THREE.Scene();
// Create a renderer
const renderer = new THREE.WebGLRenderer({antialias: true, canvas: document.getElementById("canv")});
renderer.setSize(window.innerWidth, window.innerHeight);
// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const cameraZSpeed = 80;
const cameraZOffset = 5;
camera.position.set(5, 4, window.scrollY/cameraZSpeed + cameraZOffset);
camera.rotateY(Math.PI/4);
camera.rotateX(-Math.PI/4);
// Create directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Directional light
directionalLight.position.set(10, 10, 10); // Set the position of the light source
scene.add(directionalLight);
// Create grid helper
const gridHelper = new THREE.GridHelper(100, 100);
//scene.add(gridHelper);

// Create a cube
const cubeGeo = new THREE.BoxGeometry(0.3, 0.3, 0.3);
const cubeMat = new THREE.MeshPhongMaterial({ color: 0xeb4034 });
const cubeMesh = new THREE.Mesh(cubeGeo, cubeMat);
cubeMesh.position.y = 0.3;
cubeMesh.receiveShadow = true;
scene.add(cubeMesh);

// Create name text geometry
const fontLoader = new FontLoader();
fontLoader.load('https://unpkg.com/three@0.77.0/examples/fonts/helvetiker_regular.typeface.json', function(font) {
	const textGeo = new TextGeometry( 'Kyle! \nno.5', {
		font: font,
		size: 0.7,
		height: 0.2,
		curveSegments: 12,
		bevelEnabled: false,
	} );
	const textMat = new THREE.MeshPhongMaterial( 
		{ color: 0xff0000 }
	);
	
	const textMesh = new THREE.Mesh( textGeo, textMat );
	textMesh.receiveShadow = true;
	textMesh.position.set(0, 1, -2);
	textMesh.rotation.set(0, 0, 0);
	scene.add( textMesh );
} );

// Create text space
const planeGeo = new THREE.PlaneGeometry(5, 10);
const textCanvas = document.createElement('canvas');
textCanvas.width = 350;
textCanvas.height = 350;
const textContext = textCanvas.getContext('2d');
textContext.fillStyle = 'white';
textContext.fillStyle = 'black';
//textContext.fillRect(0, 0, textCanvas.width, textCanvas.height);
textContext.font = '36px Arial'; // Set the font properties
textContext.fillStyle = 'black'; // Set the text color
textContext.fillStyle = 'white';
textContext.fillText('Hello, world!', 0, 50);
textContext.fillText('Let\'s see if new', 0, 100);
const textTexture = new THREE.Texture(textCanvas);
textTexture.needsUpdate = true;
const textMat = new THREE.MeshBasicMaterial({ map: textTexture });
const textMesh = new THREE.Mesh(planeGeo, textMat);
textMesh.position.set(2.5, 0, 5);
textMesh.rotation.set(-Math.PI/2, 0, 0);
scene.add(textMesh);

// Create blue cube for debugging
const blueMat = new THREE.MeshBasicMaterial({ color: 0x4232a8 });
const blueCubeMesh = new THREE.Mesh(cubeGeo, blueMat);
blueCubeMesh.position.y = 0.3;
blueCubeMesh.receiveShadow = true;

// Listen for scrolling
function onScroll() {
	scene.add(blueCubeMesh);
	blueCubeMesh.position.z = window.scrollY/cameraZSpeed;
	blueCubeMesh.rotation.x += 0.01;
	blueCubeMesh.rotation.y += 0.01;

	camera.position.z = window.scrollY/cameraZSpeed + cameraZOffset;
}
window.addEventListener('scroll', onScroll);

// Render the scene
function animate() {
	cubeMesh.rotation.x += 0.01;
	cubeMesh.rotation.y += 0.01;
	
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

animate();
