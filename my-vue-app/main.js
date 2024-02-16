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
camera.position.setZ(40);
const controls = new OrbitControls(camera, renderer.domElement); //adds the orbit controls I really dont know how this works but yolo

renderer.render(scene , camera); //This draws the scene

const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );  //defines the geometry of the thingy
const material = new THREE.MeshBasicMaterial( { color: 0xFF6347, wireframe: true } ); //defines the materail of the thingy
const angel = new THREE.Mesh( geometry, material ); // combines those two things to make a real thing




const geo = new THREE.PlaneGeometry(50,25);
const floor = new THREE.Mesh( geo, material );
//floor that the builldings are going to be placed on
floor.position.setY(0);
floor.rotation.x = 99

const gridHelper = new THREE.GridHelper(200, 50);
const hlp = new THREE.AxesHelper(100);

scene.add( floor ,gridHelper, hlp)
function animate(){
  requestAnimationFrame(animate);
  angel.rotation.x += 0.01;
  angel.rotation.z += 0.005;

  controls.update();
  renderer.render(scene , camera);
}

animate()
