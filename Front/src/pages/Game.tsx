import { useEffect, Suspense, useState } from 'react';
import Navigation from '../components/Navigation';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/actions/users.actions';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Canvas } from '@react-three/fiber'
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

	//SCENE
	const scene = new THREE.Scene();
	scene.background = new THREE.Color(0xa8def0);
	
	//CAMERA
	const cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	cam.position.x = 0;
	cam.position.y = 5;
	cam.position.z = 5;

	//RENDERER
	const renderer = new THREE.WebGLRenderer({ antialias: true });
	if (elem)
		renderer.setSize(elem.offsetWidth - 5, elem.offsetHeight - 5);
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

	let mixer: THREE.AnimationMixer;
	const animationActions: THREE.AnimationAction[] = [];
	let activeAction: THREE.AnimationAction;
	let lastAction: THREE.AnimationAction;
	const clock = new THREE.Clock();

	new GLTFLoader().load('http://localhost:3000/assets/models/Ball3/scene.gltf', function ( gltf ) {

		gltf.scene.translateY(2);
		mixer = new THREE.AnimationMixer(gltf.scene);
        const animationAction = mixer.clipAction((gltf as any).animations[0]);
		console.log(animationAction);
        animationActions.push(animationAction);
        activeAction = animationActions[0];
		console.log(activeAction);
		activeAction.play();
		mixer.update(clock.getDelta());
		scene.add( gltf.scene );

	} );

	const setAction = (toAction: THREE.AnimationAction) => {
		if (toAction != activeAction) {
			lastAction = activeAction
			activeAction = toAction
			//lastAction.stop()
			lastAction.fadeOut(1)
			activeAction.reset()
			activeAction.fadeIn(1)
			activeAction.play()
		}
	}

	function animate() {
		orbitControls.update();
		renderer.render(scene, cam);
		requestAnimationFrame(animate);
	};
	
	useEffect(() => {
		window.addEventListener("beforeunload", function() {dispatch(updateUser(user.id, {online: false}));});
		console.log("lol");
		if (elem)
			elem.appendChild(renderer.domElement);
		animate();
	}, [elem]);
	
	//animate();

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