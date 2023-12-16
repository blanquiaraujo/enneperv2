let scene, camera, renderer;
let enneperSurface;
let isAnimationPaused = false; // Variable para controlar el estado de la animación

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

    // Create the Enneper surface geometry
    const geometry = new THREE.ParametricGeometry((u, v, target) => {
        const scale = 0.6;

        // Limit u and v to the range (-2, 2)
        u = (u - 0.5) * 4;
        v = (v - 0.5) * 4;

        const x = scale * (u - (u * u * u) / 3 + u * v * v);
        const y = scale * (v - (v * v * v) / 3 + v * u * u);
        const z = scale * (u * u - v * v);
        target.set(x, y, z);
    }, 100, 100);

    // Create material and mesh
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    enneperSurface = new THREE.Mesh(geometry, material);

    // Add the Enneper surface to the scene
    scene.add(enneperSurface);

    // Add event listener for window resizing
    window.addEventListener('resize', onWindowResize, false);

    // Add event listener for clicking to pause/resume the animation
    renderer.domElement.addEventListener('click', toggleAnimation);
}

// Handle window resize
function onWindowResize() {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
}

// Toggle animation pause/resume on click
function toggleAnimation() {
    isAnimationPaused = !isAnimationPaused;

    if (isAnimationPaused) {
        cancelAnimationFrame(animationId);
    } else {
        animate();
    }
}

// Animation loop
let animationId;

function animate() {
    animationId = requestAnimationFrame(animate);

    if (!isAnimationPaused) {
        enneperSurface.rotation.x += 0.01;
        enneperSurface.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
}

// Initialize and start the animation
init();
animate();
