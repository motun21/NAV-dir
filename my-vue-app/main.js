import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight); //sets size of the rendering window
camera.position.set(0,200, 400); //sets position of the camera to a nice space
const controls = new OrbitControls(camera, renderer.domElement); //adds the orbit controls I really dont know how this works but yolo

renderer.render(scene , camera); //This draws the scene

const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );  //defines the geometry of the thingy
const material = new THREE.MeshBasicMaterial( { color: 0xFF6347, wireframe: true } ); //defines the materail of the thingy
const angel = new THREE.Mesh( geometry, material ); // combines those two things to make a real thing




const geo = new THREE.PlaneGeometry(500,250);
const floor = new THREE.Mesh( geo, material );
//floor that the builldings are going to be placed on
floor.rotation.x = Math.PI / 2; //3JS uses stupid as radians for some reason

//Tall Building Function
function tall_builds(xpos = 0 , zpos = 0, ypos = 20){
  const geom = new THREE.BoxGeometry( 10, 40, 10 );
  const mat = new THREE.MeshBasicMaterial( { color: 0xFF6347, wireframe: true } );
  const tall_build = new THREE.Mesh( geom, mat );
  tall_build.position.set(xpos, ypos, zpos);
  scene.add(tall_build);
}

//Small Building Function
function small_buildings(xpos = 0 , zpos = 0, ypos = 10){
  const geom = new THREE.BoxGeometry( 10, 20, 10 );
  const mat = new THREE.MeshBasicMaterial( { color: 0xFF6347, wireframe: true } );
  const small_buildings = new THREE.Mesh( geom, mat );
  small_buildings.position.set(xpos, ypos, zpos);
  scene.add(small_buildings);
}

tall_builds(-150,100);
tall_builds(-170,80);
tall_builds(-140,80);
small_buildings(-150,30);

const gridHelper = new THREE.GridHelper(250, 250);
const hlp = new THREE.AxesHelper(100); //orange is x axis, green is y, and blue is z





scene.add( floor , hlp)
function animate(){
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene , camera);
}

animate()
