import './style.css'
import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {TextGeometry} from 'three/addons/geometries/TextGeometry.js';
// import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';
// import {CSS2DRenderer} from 'three/addons/renderers/CSS2DRenderer.js';


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

//text geometry
// const goodWord = THREE.TextGeometry(
// )

//background

const wallpaperLoader = new THREE.TextureLoader();
const bgTexture = wallpaperLoader.load('imgs\space.jpg');
// bgTexture.colorSpace = THREE.SRGBColorSpace;
scene.background = '0xffffff';

//arrow

// words
const loader = new FontLoader();
loader.load('/examples/fonts/droid/droid_sans_bold_typeface.json', function (font){
  const geo = new THREE.TextGeometry('THIS WORKS', {
    font: font,
    size: 80,
    height: 2
  });
  // const textMesh = new THREE.Mesh(geo, [
  //   new THREE.MeshBasicMaterial(0x000000)
  // ]);
  scene.add(geo);
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


function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
