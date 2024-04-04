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
scene.add(new THREE.GridHelper(500,500));
scene.add(new THREE.AxesHelper(100));//orange is x axis, green is y, and blue is z

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

//words
const loader = new FontLoader();
loader.load('src/fonts/Work_Sans_Medium_Regular.json', function (font){
  const geo = new TextGeometry('THIS WORKS', {
    font: font,
    size: 5,
    height: 20
  });
  const textMesh = new THREE.Mesh(geo, [
    new THREE.MeshBasicMaterial(0xffffff)
  ]);
  scene.add(textMesh);
});



// loader.load('src/fonts/Work_Sans_Medium_Regular.json' , function (font){
//   const gem = new TextGeometry('This is not Rad', {
//     font: font,
//     size: 40,
//     height: 40,
//     curveSegments: 12,
//     bevelEnabled: true,
//     bevelThickness: 10,
//     bevelSize: 8,
//     bevelOffset: 0,
//     bevelSegments: 5
//   })
 
//   const textMesh1 = new THREE.Mesh(gem, [
//     new THREE.MeshPhongMaterial({ color: 0x89CFEF }), //front
//     new THREE.MeshPhongMaterial({color: 0x57A0D2}) //side
//   ])
//   console.log(textMesh1)
//   textMesh1.position.x = 0;
//   textMesh1.position.y = 0;
//   textMesh1.position.z = 0;
 
//   textMesh1.rotation.x = 0;
//   textMesh1.rotation.y = Math.PI * 2;
 
//   scene.add(textMesh1);
// });

//background
const wallpaperLoader = new THREE.TextureLoader();
const bgTexture = wallpaperLoader.load('imgs\space.jpg');
// bgTexture.colorSpace = THREE.SRGBColorSpace;
scene.background = '0xffffff';
export const global_array = []
//Tall Building Function
export function tall_builds(xpos = 0 , zpos = 0, ypos = 21){
  const geom = new THREE.BoxGeometry( 10, 40, 10 );
  const mat = new THREE.MeshBasicMaterial( { color: 0xFF6347, wireframe: true } );
  const tall_build = new THREE.Mesh( geom, mat );
  tall_build.position.set(xpos, ypos, zpos);
  scene.add(tall_build);
}

//Small Building Function
export function small_buildings(xpos = 0 , zpos = 0, ypos = 11){
  const geom = new THREE.BoxGeometry( 10, 20, 10 );
  const mat = new THREE.MeshBasicMaterial( { color: 0xFF6347, wireframe: true } );
  const small_buildings = new THREE.Mesh( geom, mat );
  small_buildings.position.set(xpos, ypos, zpos);
  scene.add(small_buildings);
}

//Reed Stadium
export function area_builds(xpos = 0 , zpos = 0, ypos = 1 ){
  const geom = new THREE.DodecahedronGeometry(40 ,0);
  const mat = new THREE.MeshBasicMaterial( { color: 0xFF6347, wireframe: true } );
  const area_buildings = new THREE.Mesh( geom, mat );
  area_buildings.position.set(xpos, ypos, zpos);
  scene.add(area_buildings);
}

//Words Functions
export function build_words(xpos = 0 , zpos = 0, sentence = "Nothing placed", ypos = 60){
  loader.load('src/fonts/Work_Sans_Medium_Regular.json', function (font){
    const geo = new TextGeometry(sentence, {
      font: font,
      size: 5,
      height: 20
    });
    const textMesh = new THREE.Mesh(geo, [
      new THREE.MeshBasicMaterial(0xffffff)
    ]);
    textMesh.position.set(xpos, ypos, zpos)
    global_array.push(textMesh);
    scene.add(textMesh);
  });
}


///area 1
tall_builds(-150,100);
tall_builds(-170,80);
tall_builds(-140,80);
small_buildings(-150,60);
build_words(-150,70,"area1")

//read area 1
area_builds(60, -60);
build_words(45,-60,"reed arena")

//area 3
small_buildings(150,65)
small_buildings(170,50)
small_buildings(155,50)
tall_builds(170 ,65 )
small_buildings(180,30)
build_words(160,55,"area2")

//keybaord listener and hopefully arrow stuff
document.addEventListener("keydown", onDocumentKeyDown, false);




function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  for (let i = 0; i < global_array.length; i++) {
    global_array[i].quaternion.copy(camera.quaternion);
  }
  }

animate()
