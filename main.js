import './style.css'

import * as THREE from 'three'
// use mouse to interact with the scene
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// essential elements for Three.js: 
// 1. Scene 2. Camera 3. Renderer
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000)
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)

renderer.render(scene, camera)
// ------------------------ setup end ----------------------------------


// shape
const geometry = new THREE.TorusGeometry(6, 2.5, 40, 100)
const material = new THREE.MeshStandardMaterial({
  color: 0xa972f7
})
const torus = new THREE.Mesh(geometry, material)
scene.add(torus)


// Lighting
const pointLight = new THREE.PointLight(0x4b42ed) // 0x stand for hexidecimal literal
pointLight.position.set(20, 20, 20)

const ambientLight = new THREE.AmbientLight(0xf7d2b7)
scene.add(pointLight, ambientLight)

// light helper
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper)

// mouse controls
const controls = new OrbitControls(camera, renderer.domElement);

// random position stars
function addStar() {
  const geometry = new THREE.SphereGeometry(.25)
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

  star.position.set(x, y, z)
  scene.add(star)
}
Array(200).fill().forEach(addStar)

//add texture to Background
const spaceTexture = new THREE.TextureLoader().load('space.jpeg')
scene.background = spaceTexture;

// Avatar
const legoTexture = new THREE.TextureLoader().load('lego2.gif');

const lego = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: legoTexture }));

scene.add(lego);

// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpeg');
const normalTexture = new THREE.TextureLoader().load('normal.jpeg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 40;
moon.position.setX(-5);
torus.position.y = -20;

lego.position.z = -1;
lego.position.x = 5;

torus.position.z = 5;
torus.position.x = -5;
torus.position.y = -4;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  lego.rotation.y += 0.01;
  lego.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();



function animate() {
  requestAnimationFrame(animate)

  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.y += 0.007

  controls.update();

  renderer.render(scene, camera)
}

animate()