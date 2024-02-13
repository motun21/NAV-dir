import './style.css'

import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight); //sets size of the rendering window
camera.position.setZ(30); //sets the position of the camera moved along the z axis

renderer.render(scene , camera); //This draws the scene

const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );  //defines the geometry of the thingy
const material = new THREE.MeshBasicMaterial( { color: 0xFF6347, wireframe: true } ); //defines the materail of the thingy
const angel = new THREE.Mesh( geometry, material ); // combines those two things to make a real thing

scene.add(angel)

function animate(){
  requestAnimationFrame(animate);
  angel.rotation.x += 0.01;
  angel.rotation.z += 0.005;
  renderer.render(scene , camera);
}

animate()
