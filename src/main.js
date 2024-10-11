import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';

//renderer
const canvas = document.querySelector('#three-canvas');
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
renderer.shadowMap.enabled = true;

//scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('White');

//camera
const camera = new THREE.PerspectiveCamera(
    60,//fove
    window.innerWidth / window.innerHeight,//aspect
    0.1,//near
    1000//far
);
//camera x,y,z
camera.position.set(0, 0, 800);

//mesh
//box
const box = new THREE.Mesh(
    new THREE.BoxGeometry(80, 80, 80),//gemoetry
    //new THREE.MeshBasicMaterial({color: 'blue'})//materials test
    new THREE.MeshBasicMaterial({
        color: 'blue',
    })
);

//bg
const bg = new THREE.Mesh(
    new THREE.PlaneGeometry(800, 800),
    //new THREE.MeshBasicMaterial({color: 'red'})//material basic
    new THREE.MeshLambertMaterial({
        color: 'black',
    })
);
bg.position.z = -10;

scene.add(box, bg);//all meshes

camera.lookAt(bg.position);

//the hard part

const clock = new THREE.Clock();
function draw() {

    const delta = clock.getDelta(); //timer reference

    box.position.x += 1;

    if (box.position.x > 335) {
        box.position.x = 1;
    }


    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
}

draw();

//events
window.addEventListener( 'resize', setLayout);
