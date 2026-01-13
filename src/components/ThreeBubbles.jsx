import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBubbles() {
    const containerRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const CONFIG = {
            particleCount: 80,
            colors: [0xC41E3A, 0xFF6B8A, 0x8B0000, 0xE63946],
            floatSpeed: 0.008,
            wobbleSpeed: 0.8,
            repulsionRadius: 5.0,         // Larger interaction area
            repulsionStrength: 0.25,      // Much stronger repulsion for faster response
            mouseSmoothing: 0.15          // Faster mouse following (was 0.03)
        };

        // Scene Setup
        const scene = new THREE.Scene();
        scene.background = null;

        const camera = new THREE.PerspectiveCamera(
            50,
            container.clientWidth / container.clientHeight,
            0.1,
            100
        );
        camera.position.set(0, 0, 15);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
        dirLight.position.set(5, 10, 7);
        scene.add(dirLight);

        const pointLight = new THREE.PointLight(0xFF6B8A, 0.8, 20);
        pointLight.position.set(0, 0, 5);
        scene.add(pointLight);

        // Create Bubbles
        const geometry = new THREE.SphereGeometry(0.12, 16, 16);
        const material = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: 0.1,
            roughness: 0.2,
            transmission: 0.1,
            transparent: true,
            opacity: 0.9,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1
        });

        const mesh = new THREE.InstancedMesh(geometry, material, CONFIG.particleCount);
        scene.add(mesh);

        // Particles data
        const dummy = new THREE.Object3D();
        const particles = [];

        const mouse = new THREE.Vector2(-100, -100);
        const targetMouse = new THREE.Vector2(-100, -100);
        let isInteracting = false;

        for (let i = 0; i < CONFIG.particleCount; i++) {
            const particle = {
                x: (Math.random() - 0.5) * 30,
                y: (Math.random() - 0.5) * 30,
                z: (Math.random() - 0.5) * 10 - 2,
                vy: CONFIG.floatSpeed * (0.8 + Math.random() * 0.4),
                vx: 0,
                vz: 0,
                phase: Math.random() * Math.PI * 2,
                wobbleAmp: 0.005 + Math.random() * 0.01,
                baseScale: 0.5 + Math.random() * 1.0,
                colorHex: CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)]
            };

            particles.push(particle);

            const color = new THREE.Color(particle.colorHex);
            mesh.setColorAt(i, color);
        }
        mesh.instanceColor.needsUpdate = true;

        // Animation Loop
        let time = 0;

        const animate = () => {
            animationRef.current = requestAnimationFrame(animate);
            time += CONFIG.wobbleSpeed * 0.01;

            // Faster lerp when actively interacting, slower when idle
            const lerpSpeed = isInteracting ? CONFIG.mouseSmoothing : 0.05;
            mouse.lerp(targetMouse, lerpSpeed);

            const aspect = container.clientWidth / container.clientHeight;
            const viewHeight = 2 * Math.tan((camera.fov * Math.PI / 180) / 2) * camera.position.z;
            const viewWidth = viewHeight * aspect;

            const boxMouseX = (mouse.x * viewWidth) / 2;
            const boxMouseY = (mouse.y * viewHeight) / 2;

            for (let i = 0; i < CONFIG.particleCount; i++) {
                const p = particles[i];

                // Natural Floating
                p.y += p.vy;
                p.x += Math.sin(time + p.phase) * p.wobbleAmp;

                // Reset if too high
                if (p.y > 10) {
                    p.y = -10;
                    p.x = (Math.random() - 0.5) * 30;
                }

                // Mouse Repulsion - faster and stronger
                const dx = p.x - boxMouseX;
                const dy = p.y - boxMouseY;
                const distSq = dx * dx + dy * dy;

                if (distSq < CONFIG.repulsionRadius * CONFIG.repulsionRadius) {
                    const dist = Math.sqrt(distSq);
                    // Stronger force falloff for snappier response
                    const force = Math.pow((CONFIG.repulsionRadius - dist) / CONFIG.repulsionRadius, 1.5);
                    const angle = Math.atan2(dy, dx);
                    p.x += Math.cos(angle) * force * CONFIG.repulsionStrength;
                    p.y += Math.sin(angle) * force * CONFIG.repulsionStrength;
                }

                // Update Matrix
                dummy.position.set(p.x, p.y, p.z);
                dummy.rotation.x += 0.002;
                dummy.rotation.y += 0.002;
                dummy.scale.setScalar(p.baseScale);
                dummy.updateMatrix();
                mesh.setMatrixAt(i, dummy.matrix);
            }

            mesh.instanceMatrix.needsUpdate = true;
            renderer.render(scene, camera);
        };

        animate();

        // Resize handler
        const handleResize = () => {
            if (!container) return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };

        // Mouse move handler for desktop
        const handleMouseMove = (e) => {
            isInteracting = true;
            targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
            // Reset interaction flag after delay
            clearTimeout(window.bubbleInteractionTimeout);
            window.bubbleInteractionTimeout = setTimeout(() => {
                isInteracting = false;
            }, 500);
        };

        // Touch handlers for mobile - fast response
        const handleTouchStart = (e) => {
            isInteracting = true;
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                targetMouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
                targetMouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
            }
        };

        const handleTouchMove = (e) => {
            isInteracting = true;
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                targetMouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
                targetMouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
            }
        };

        const handleTouchEnd = () => {
            // Keep interaction flag a bit longer for smooth falloff
            setTimeout(() => {
                isInteracting = false;
            }, 300);
        };

        window.addEventListener('resize', handleResize);
        document.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('touchstart', handleTouchStart, { passive: true });
        container.addEventListener('touchmove', handleTouchMove, { passive: true });
        container.addEventListener('touchend', handleTouchEnd, { passive: true });

        // Intersection Observer for performance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!animationRef.current) animate();
                } else {
                    if (animationRef.current) {
                        cancelAnimationFrame(animationRef.current);
                        animationRef.current = null;
                    }
                }
            });
        }, { threshold: 0.1 });
        observer.observe(container);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchend', handleTouchEnd);
            observer.disconnect();
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            if (window.bubbleInteractionTimeout) {
                clearTimeout(window.bubbleInteractionTimeout);
            }
            renderer.dispose();
            geometry.dispose();
            material.dispose();
            container.removeChild(renderer.domElement);
        };
    }, []);

    return <div id="wave-canvas-container" ref={containerRef}></div>;
}

