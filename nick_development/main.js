import './style.css'
import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {TextGeometry} from 'three/addons/geometries/TextGeometry.js';



//scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

//camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, .1, 1000);
camera.position.z = 45;
camera.position.y = 20;
camera.position.x = 3;

//renderers
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
  antialias: true
});
renderer.getPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//orbital controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target = new THREE.Vector3(0, 0 , -40);
controls.update();

//plane
const plane = new THREE.Mesh(new THREE.PlaneGeometry(200,200), new THREE.MeshPhongMaterial({ color: 0x07d15, side: THREE.DoubleSide}));
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

//light
scene.add(new THREE.AmbientLight(0xffffff, 1));

//helpers
scene.add(new THREE.GridHelper(200,200));
scene.add(new THREE.AxesHelper(15));

//word making
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
context.fillStyle = 'blue';
context.font = '50px serif';
context.fillText('Hello World!', 0, 60);
const texture = new THREE.Texture(canvas);
texture.needsUpdate = true;
var material = new THREE.MeshBasicMaterial({
  map: texture,
  side: THREE.DoubleSide,
});
material.transparent = true;
var mesh = new THREE.Mesh(new THREE.PlaneGeometry(100,100), material);
scene.add(mesh);

//background

const wallpaperLoader = new THREE.TextureLoader();
const bgTexture = wallpaperLoader.load('imgs\space.jpg');
// bgTexture.colorSpace = THREE.SRGBColorSpace;
scene.background = '0xffffff';

//arrow

//words
const loader = new FontLoader();
loader.load('src/fonts/Work_Sans_Medium_Regular.json', function (font){
  const geo = new TextGeometry('THIS WORKS', {
    font: font,
    size: 50,
    height: 20
  });
  const textMesh = new THREE.Mesh(geo, [
    new THREE.MeshBasicMaterial(0xffffff)
  ]);
  // textMesh.position.x = 0;
  // textMesh.position.y = 0;
  // textMesh.position.z = 0;
 
  // textMesh.rotation.x = 0;
  // textMesh.rotation.y = Math.PI * 2;
  scene.add(textMesh);
});

// const fontLoader = new FontLoader();
// fontLoader.load("node_modules/three/exapmles/fonts/droid/droid_seriff_regular.typeface.json",
//   (droidFont) => {
//     const tgem = new THREE.TextGeometry('This is not Rad', {
//       font: droidFont,
//       size: 6,
//       height: 2
//     });
//     const textMaterial = new THREE.MeshBasicMaterial();
//     const textMesh = new THREE.Mesh(tgem, textMaterial);
//     textMesh.position.x = 100
//     textMesh.position.x = 100
//     scene.add(textMesh);
//   }
// );

//arrows
//implementation 1
//first create the cylinder
let radius = 1;
let height = 15;
let rseg = 64;
const cyl = new THREE.Mesh((new THREE.CylinderGeometry(radius, radius, height, rseg)), new THREE.MeshBasicMaterial({color: 0xffaf00}));

let arrowlocationx = 0;
let arrowlocationz = 0;
cyl.position.set(arrowlocationx, height/2, arrowlocationz);

//next create the cone at the top of the cylinder
let coneheight = height/5;
const cone = new THREE.Mesh((new THREE.ConeGeometry(radius, coneheight, rseg)), (new THREE.MeshBasicMaterial({color: 0xffaf00})));
cone.position.set(arrowlocationx, height + coneheight/2, arrowlocationz);
//add the two pieces
scene.add(cyl);
scene.add(cone);

//implementation 2
//
// const triangleGeometry = new THREE.Geometry();
// triangleGeometry.vertices.push(
//   new THREE.Vector3(0, 1, 0),
//   new THREE.Vector3(-1, -1, 0),
//   new THREE.Vector3(1, -1, 0)
// );

//triangleGeometry.faces.push(new THREE.Face3(0, 1, 2));
//const triangle = new THREE.Mesh(triangleGeometry, new THREE.Mesh({color: 0x00ff00, side: THREE.DoubleSide}));
//scene.add(triangle);

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();