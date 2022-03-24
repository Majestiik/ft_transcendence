import { useEffect, Suspense, useState } from 'react';
import Navigation from '../components/Navigation';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/actions/users.actions';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Canvas, dispose } from '@react-three/fiber'
import { Physics, useBox } from '@react-three/cannon'
import { setgroups } from 'process';
import { CubeCamera, Vector3 } from 'three';
import urlFloortexture from '../assets/textures/placeholder/placeholder.png'

const Game = () => {

	const dispatch = useDispatch();
	const user = useSelector((state: any) => state.userReducer);
	//const users = useSelector((state: any) => state.usersReducer);

	const elem = document.getElementById('game');

	const [pos, setPos] = useState([0, 2, 0]);
	
	/*var loader = new THREE.TextureLoader();
    var texture = loader.load( urlFloortexture );*/
	var ball: any;

	//SCENE
	const scene = new THREE.Scene();
	scene.background = new THREE.Color(0xa8def0);
	
	//CAMERA
	const cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	cam.position.x = 0;
	cam.position.y = 10;
	cam.position.z = 5;

	//RENDERER
	const renderer = new THREE.WebGLRenderer({ antialias: true });
	//if (elem)
	//	renderer.setSize(elem.offsetWidth - 5, elem.offsetHeight - 5);
	renderer.setSize( (window.innerWidth * 90 / 100) - 20, 795);
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.shadowMap.enabled = true;

	//CONTROLS
	const orbitControls = new OrbitControls(cam, renderer.domElement);
	orbitControls.enableDamping = true;
	orbitControls.minDistance = 5;
	orbitControls.maxDistance = 15;
	orbitControls.enablePan = false;
	orbitControls.maxPolarAngle = Math.PI / 2 - 0.05;
	orbitControls.update();

	//LIGHT
	light();

	// PLANE
	generateFloor();

	/*new GLTFLoader().load('http://localhost:3000/assets/models/Soldier.glb', function (gltf) {
		const model = gltf.scene;
		model.traverse(function (object: any) {
			if (object.isMesh) object.castShadow = true;
		});
		scene.add(model);
	
		const gltfAnimations: THREE.AnimationClip[] = gltf.animations;
		const mixer = new THREE.AnimationMixer(model);
		const animationsMap: Map<string, THREE.AnimationAction> = new Map()
		gltfAnimations.filter(a => a.name != 'TPose').forEach((a: THREE.AnimationClip) => {
			animationsMap.set(a.name, mixer.clipAction(a))
		})
	});*/
	
	function _onKeyDown(e: any) {
		switch (e.keyCode) {
			case 87: // w
				console.log("w");
				ball.position.z -= 0.1;
				break;
			case 65: // a
				console.log("a");
				ball.position.x -= 0.1;
				break;
			case 83: // s
				console.log("s");
				ball.position.z += 0.1;
				break;
			case 68: // d
				console.log("d");
				ball.position.x += 0.1;
				break;
		//case 38: // up
		//case 37: // left
		//case 40: // down
		//case 39: // right
		//break;
		}
	}

	new GLTFLoader().load('http://localhost:3000/assets/models/Ball3/scene.gltf', function ( gltf ) {

		ball = gltf.scene;
		ball.translateY(1);
		ball.traverse((c: any) => {
			c.castShadow = true;
		});
		scene.add( ball );

	} );

	const [ballState, setBallState] = useState(0);

	function updateBall() {
		if (ball.position.y <= 1)
			setBallState(0);
		if (ballState === 0)
			ball.position.y += 0.1;
		if (ball.position.y >= 5)
			setBallState(1);
		if (ballState === 1)
			ball.position.y -= 0.1;
		console.log(ball.position.y);
	};

	var now, delta, then = Date.now();
	var interval = 1000/30;
	function animate() {
		requestAnimationFrame(animate);
		//now = Date.now();
		//delta = now - then;
		//orbitControls.update();
		//if (delta > interval) {
		//	if (ball)
		//		updateBall();
		//		then = now - (delta % interval);
		//	}
		if (ball)
		{
			ball.rotation.y += 0.05;
			ball.rotation.x += 0.05;
			//ball.position.y += 0.01;
			//if (ball.position.y < 1 && ballState === 1)
			//	setBallState(0);
			//if (ball.position.y > 2 && ballState === 0)
			//	setBallState(1);
			if (ballState === 0)
				ball.position.y += 0.01;
			//console.log(ball.position.y);
			//else if (ballState === 1)
			//	ball.position.y -= 0.01;
		}
		renderer.render(scene, cam);
	};

	function _OnWindowResize() {
		cam.aspect = window.innerWidth / window.innerHeight;
		cam.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	}

	useEffect(() => {
		setInterval(function() { console.log(ball.position.y); }, 1000);
		//renderer.dispose();
		window.addEventListener("beforeunload", function() {dispatch(updateUser(user.id, {online: false}));});
		window.addEventListener('resize', () => { _OnWindowResize(); }, false);
		document.addEventListener('keydown', (e) => _onKeyDown(e), false);
		console.log("game reload");
		document.getElementById('game')?.appendChild(renderer.domElement);;
		//renderer.setSize(document.getElementById('game')?.offsetWidth - 5, document.getElementById('game')?.offsetHeight - 5);
		//if (elem)
		//	elem.appendChild(renderer.domElement);
		setBallState(0);
		animate();
	}, [elem]);

	function generateFloor() {
		// TEXTURES
		const textureLoader = new THREE.TextureLoader();
		const placeholder = textureLoader.load(urlFloortexture);
		const sandBaseColor = textureLoader.load("./assets/textures/sand/Sand 002_COLOR.jpg");
		const sandNormalMap = textureLoader.load("./assets/textures/sand/Sand 002_NRM.jpg");
		const sandHeightMap = textureLoader.load("./assets/textures/sand/Sand 002_DISP.jpg");
		const sandAmbientOcclusion = textureLoader.load("./textures/sand/Sand 002_OCC.jpg");
	
		const WIDTH = 4
		const LENGTH = 4
		const NUM_X = 15
		const NUM_Z = 15
	
		const geometry = new THREE.PlaneGeometry(WIDTH, LENGTH, 512, 512);
		/*const material = new THREE.MeshStandardMaterial(
			{
				map: sandBaseColor, normalMap: sandNormalMap,
				displacementMap: sandHeightMap, displacementScale: 0.1,
				aoMap: sandAmbientOcclusion
			})*/
		const material = new THREE.MeshPhongMaterial({ map: placeholder})
	
		for (let i = 0; i < NUM_X; i++) {
			for (let j = 0; j < NUM_Z; j++) {
				const floor = new THREE.Mesh(geometry, material)
				floor.receiveShadow = true
				floor.rotation.x = - Math.PI / 2
	
				floor.position.x = i * WIDTH - (NUM_X / 2) * WIDTH
				floor.position.z = j * LENGTH - (NUM_Z / 2) * LENGTH
	
				scene.add(floor)
			}
		}
	}
	
	function light() {
		scene.add(new THREE.AmbientLight(0xffffff, 0.7))
	
		const dirLight = new THREE.DirectionalLight(0xffffff, 1)
		dirLight.position.set(- 60, 100, - 10);
		dirLight.castShadow = true;
		dirLight.shadow.camera.top = 50;
		dirLight.shadow.camera.bottom = - 50;
		dirLight.shadow.camera.left = - 50;
		dirLight.shadow.camera.right = 50;
		dirLight.shadow.camera.near = 0.1;
		dirLight.shadow.camera.far = 200;
		dirLight.shadow.mapSize.width = 4096;
		dirLight.shadow.mapSize.height = 4096;
		scene.add(dirLight);
		//scene.add( new THREE.CameraHelper(dirLight.shadow.camera))
	}

	return (
		<div>
			<Navigation userCard={user}/>
			<div id='game' className='game' />
		</div>
	);
};



export default Game;