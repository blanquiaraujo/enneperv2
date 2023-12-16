let scene, camera, renderer;
let sombreroAiry;
let isAnimationPaused = false; // Variable de estado de pausa/reanudación

// Initialize Three.js scene
function init() {
    // Create a scene
    scene = new THREE.Scene();

    // Create a camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create a renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Add fog to the scene
    const fogColor = 0x000090;
    const fogNear = 2.2;
    const fogFar = 5;
    scene.fog = new THREE.Fog(fogColor, fogNear, fogFar);

    // Create the Klein surface geometry
    const geometry = new THREE.ParametricGeometry((u, v, target) => {
        const scale = 1.68;

        u = (u - 0.5) * 2 * 5;
        v = (v - 0.5) * 2 * 5;

        const x = scale * u;
        const y = scale * v;
        r = Math.sqrt(x * x + y * y); 
        const z = scale * 2 * (Math.sin(Math.PI * r) / (Math.PI * r));

        target.set(x, y, z);
    }, 200, 200);

    // Create material and mesh
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    sombreroAiry = new THREE.Mesh(geometry, material);

    // Add the Klein surface to the scene
    scene.add(sombreroAiry);

    // Add ambient light to the scene
    const ambientLight = new THREE.AmbientLight(0xff0000, 1);
    scene.add(ambientLight);

    // Add a point light below the torus
    const pointLight = new THREE.PointLight(0xff0000, 1, 10);
    pointLight.position.set(0, -0.2, 0);
    scene.add(pointLight);

    // Add event listener for window resizing
    window.addEventListener('resize', onWindowResize, false);

    // Evento de clic para pausar/reanudar la animación
    renderer.domElement.addEventListener('click', () => {
        isAnimationPaused = !isAnimationPaused; // Cambia el estado de pausa/reanudación
        if (!isAnimationPaused) {
            animate();
        }
    });
}

// Handle window resize
function onWindowResize() {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
}

// Animation loop
function animate() {
    if (!isAnimationPaused) {
        requestAnimationFrame(animate);

        sombreroAiry.rotation.x += 0.01;
        sombreroAiry.rotation.y += 0.01;

        renderer.render(scene, camera);
    }
}

// Initialize and start the animation
init();
animate();
