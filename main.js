import * as THREE from 'three';

// Create a scene
const scene = new THREE.Scene();
// Create a renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);
// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//const bluematerial = new THREE.MeshBasicMaterial({ color: 0x4232a8 });
//const bluecube = new THREE.Mesh(geometry, bluematerial);

// Listen for scrolling
window.addEventListener('wheel', onScroll);
function onScroll(event) {
	console.log(camera.position);
	//scene.add(bluecube);

	camera.position.set(window.scrollY/10, window.scrollY/10, 5);
  }

// Render the scene
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
