let scene, camera, renderer;
let botellaKlein;
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

    // Create the Klein surface geometry
    const geometry = new THREE.ParametricGeometry((u, v, target) => {
        const scale = 1.68;

        // Limit u and v to the range (0, 2*PI) y (-1,1)
        u = (u - 0.5) * 2 * 5;
        v = (v - 0.5) * 2 * 5;

        const x = scale * u;
        const y = scale * v;
        const z = scale * 2 * (Math.sin(Math.PI * Math.sqrt(x * x + y * y)));

        target.set(x, y, z);
    }, 200, 200);

    // Create material and mesh
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    botellaKlein = new THREE.Mesh(geometry, material);

    // Add the Klein surface to the scene
    scene.add(botellaKlein);

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
        botellaKlein.rotation.x += 0.01;
        botellaKlein.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
}

// Initialize and start the animation
init();
animate();
