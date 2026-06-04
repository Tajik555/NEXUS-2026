/**
 * NEXUS 2026 - 3D Globe Module
 * Three.js WebGL globe with interactive logistics routes
 */

class NexusGlobe {
    constructor(canvasId) {
        this.canvas = $(canvasId);
        this.width = this.canvas.clientWidth;
        this.height = this.canvas.clientHeight;

        // Three.js components
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.globe = null;
        this.routes = [];
        this.particles = [];

        // Controls
        this.autoRotate = true;
        this.rotationSpeed = 0.001;

        // Initialize
        this.init();
        this.animate();
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0e27);

        // Camera setup
        this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 10000);
        this.camera.position.z = 2.5;

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: this.canvas, 
            antialias: true, 
            alpha: true 
        });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;

        // Lighting
        this.setupLighting();

        // Create globe
        this.createGlobe();

        // Create routes
        this.createRoutes();

        // Add event listeners
        this.setupEventListeners();

        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
    }

    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);

        // Point light (neon effect)
        const pointLight = new THREE.PointLight(0x00d9ff, 1, 100);
        pointLight.position.set(5, 5, 5);
        pointLight.castShadow = true;
        this.scene.add(pointLight);

        // Point light 2 (magenta)
        const pointLight2 = new THREE.PointLight(0xff006e, 0.5, 100);
        pointLight2.position.set(-5, -5, 5);
        this.scene.add(pointLight2);
    }

    createGlobe() {
        const geometry = new THREE.SphereGeometry(1, 64, 64);

        // Create canvas texture for globe
        const canvas = document.createElement('canvas');
        canvas.width = 2048;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');

        // Dark background
        ctx.fillStyle = '#0f1535';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw grid pattern
        ctx.strokeStyle = 'rgba(0, 217, 255, 0.2)';
        ctx.lineWidth = 1;

        // Latitude lines
        for (let i = 0; i <= 180; i += 30) {
            ctx.beginPath();
            ctx.arc(canvas.width / 2, (i / 180) * canvas.height, canvas.width / 2, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Longitude lines
        for (let i = 0; i < 360; i += 30) {
            const rad = (i * Math.PI) / 180;
            ctx.beginPath();
            ctx.moveTo(
                canvas.width / 2 + Math.cos(rad) * (canvas.width / 2),
                canvas.height / 2 + Math.sin(rad) * (canvas.width / 2)
            );
            ctx.lineTo(
                canvas.width / 2 - Math.cos(rad) * (canvas.width / 2),
                canvas.height / 2 - Math.sin(rad) * (canvas.width / 2)
            );
            ctx.stroke();
        }

        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.MeshStandardMaterial({
            map: texture,
            metalness: 0.3,
            roughness: 0.7,
            emissive: 0x1a2a4a,
        });

        this.globe = new THREE.Mesh(geometry, material);
        this.globe.castShadow = true;
        this.globe.receiveShadow = true;
        this.scene.add(this.globe);

        // Add glow effect
        const glowGeometry = new THREE.SphereGeometry(1.05, 64, 64);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0x00d9ff,
            transparent: true,
            opacity: 0.1,
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        this.scene.add(glow);
    }

    createRoutes() {
        if (!MOCK_DATA || !MOCK_DATA.logistics) return;

        MOCK_DATA.logistics.forEach((route) => {
            this.addRoute(route);
        });
    }

    addRoute(route) {
        // Convert lat/lng to 3D coordinates
        const from3D = this.latLngTo3D(route.from.lat, route.from.lng, 1);
        const to3D = this.latLngTo3D(route.to.lat, route.to.lng, 1);

        // Create curve between points
        const curve = new THREE.LineCurve3(from3D, to3D);
        const points = curve.getPoints(50);

        // Create arc effect
        const arcPoints = points.map((p, i) => {
            const t = i / points.length;
            const height = Math.sin(t * Math.PI) * 0.2;
            const direction = p.clone().normalize();
            return p.addScaledVector(direction, height);
        });

        // Create line geometry
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(arcPoints);

        // Color based on status
        let color = 0x00d9ff;
        if (route.status === 'DELAYED') color = 0xffd700;
        if (route.status === 'COMPLETED') color = 0x39ff14;

        const lineMaterial = new THREE.LineBasicMaterial({
            color: color,
            linewidth: 2,
        });

        const line = new THREE.Line(lineGeometry, lineMaterial);
        this.scene.add(line);
        this.routes.push(line);

        // Add source point
        this.addPoint(from3D, 0x00d9ff);

        // Add destination point
        this.addPoint(to3D, 0xff006e);
    }

    addPoint(position, color) {
        const geometry = new THREE.SphereGeometry(0.03, 16, 16);
        const material = new THREE.MeshBasicMaterial({ color: color });
        const point = new THREE.Mesh(geometry, material);

        point.position.copy(position);
        this.scene.add(point);

        // Add glow
        const glowGeometry = new THREE.SphereGeometry(0.05, 16, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.3,
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        glow.position.copy(position);
        this.scene.add(glow);
    }

    latLngTo3D(lat, lng, radius = 1) {
        const latRad = (lat * Math.PI) / 180;
        const lngRad = (lng * Math.PI) / 180;

        const x = radius * Math.cos(latRad) * Math.cos(lngRad);
        const y = radius * Math.sin(latRad);
        const z = radius * Math.cos(latRad) * Math.sin(lngRad);

        return new THREE.Vector3(x, y, z);
    }

    setupEventListeners() {
        this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.canvas.addEventListener('click', (e) => this.onClick(e));
    }

    onMouseMove(event) {
        // Could add interactive effects here
    }

    onClick(event) {
        // Could add click interactions here
    }

    onWindowResize() {
        this.width = this.canvas.clientWidth;
        this.height = this.canvas.clientHeight;

        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(this.width, this.height);
    }

    animate = () => {
        requestAnimationFrame(this.animate);

        // Auto-rotate globe
        if (this.autoRotate && this.globe) {
            this.globe.rotation.y += this.rotationSpeed;
        }

        // Animate route lines
        this.routes.forEach((route) => {
            route.material.opacity = 0.7 + 0.3 * Math.sin(Date.now() * 0.001);
        });

        this.renderer.render(this.scene, this.camera);
    };

    setAutoRotate(enabled) {
        this.autoRotate = enabled;
    }

    setRotationSpeed(speed) {
        this.rotationSpeed = speed;
    }

    dispose() {
        this.renderer.dispose();
        this.scene.clear();
    }
}

// Initialize globe when document is ready
let globeInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    globeInstance = new NexusGlobe('#canvas-globe');
    log('3D Globe initialized successfully', 'success');
});
