import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * NeuralNebula — 3D Interactive Visualization
 *
 * A particle-based neural network constellation.
 * ~240 glowing nodes float in volumetric space,
 * connected by faint synaptic pathways. The whole
 * structure pulses, slowly rotates, and follows
 * the user's cursor — like a living mind map of
 * skills and ideas connecting in real time.
 */
export default function NeuralNebula() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    /* ── Scene & Camera ── */
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, mount.clientWidth / mount.clientHeight, 0.1, 3000);
    camera.position.z = 620;

    /* ── Soft-circle sprite texture ── */
    const spriteCv = document.createElement('canvas');
    spriteCv.width = spriteCv.height = 64;
    const sCtx = spriteCv.getContext('2d');
    const grad = sCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0,   'rgba(255,255,255,1)');
    grad.addColorStop(0.35,'rgba(255,255,255,0.85)');
    grad.addColorStop(0.7, 'rgba(255,255,255,0.3)');
    grad.addColorStop(1,   'rgba(255,255,255,0)');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, 64, 64);
    const sprite = new THREE.CanvasTexture(spriteCv);

    /* ── Groups ── */
    const autoGroup  = new THREE.Group();   // continuous Y rotation
    const mouseGroup = new THREE.Group();   // mouse-driven tilt
    autoGroup.add(mouseGroup);
    scene.add(autoGroup);

    /* ── Helper: random point in sphere (volumetric) ── */
    const rndInSphere = (radius) => {
      const r = radius * Math.cbrt(Math.random());
      const theta = Math.acos(2 * Math.random() - 1);
      const phi   = 2 * Math.PI * Math.random();
      return [
        r * Math.sin(theta) * Math.cos(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(theta),
      ];
    };

    /* ── Cyan particles ── */
    const CYAN_COUNT = 180;
    const cyanPos = new Float32Array(CYAN_COUNT * 3);
    for (let i = 0; i < CYAN_COUNT; i++) {
      const [x, y, z] = rndInSphere(230);
      cyanPos[i*3]=x; cyanPos[i*3+1]=y; cyanPos[i*3+2]=z;
    }
    const cyanGeo = new THREE.BufferGeometry();
    cyanGeo.setAttribute('position', new THREE.BufferAttribute(cyanPos, 3));
    const cyanMat = new THREE.PointsMaterial({
      size: 5.5, map: sprite, color: 0x00c8ff,
      blending: THREE.AdditiveBlending, transparent: true,
      opacity: 0.75, depthWrite: false, sizeAttenuation: true,
    });
    mouseGroup.add(new THREE.Points(cyanGeo, cyanMat));

    /* ── Purple particles ── */
    const PURP_COUNT = 70;
    const purpPos = new Float32Array(PURP_COUNT * 3);
    for (let i = 0; i < PURP_COUNT; i++) {
      const [x, y, z] = rndInSphere(195);
      purpPos[i*3]=x; purpPos[i*3+1]=y; purpPos[i*3+2]=z;
    }
    const purpGeo = new THREE.BufferGeometry();
    purpGeo.setAttribute('position', new THREE.BufferAttribute(purpPos, 3));
    const purpMat = new THREE.PointsMaterial({
      size: 4.5, map: sprite, color: 0x8b5cf6,
      blending: THREE.AdditiveBlending, transparent: true,
      opacity: 0.65, depthWrite: false, sizeAttenuation: true,
    });
    mouseGroup.add(new THREE.Points(purpGeo, purpMat));

    /* ── Hub nodes (larger, brighter anchors) ── */
    const hubs = [
      { pos: [0, 195, 0],     color: 0x00ffff },
      { pos: [-165, -75, 40], color: 0xaa77ff },
      { pos: [165, -75, 40],  color: 0x00e5ff },
      { pos: [0, -80, -185],  color: 0xcc99ff },
    ];
    hubs.forEach(({ pos, color }) => {
      const hGeo = new THREE.BufferGeometry();
      hGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pos), 3));
      const hMat = new THREE.PointsMaterial({
        size: 20, map: sprite, color,
        blending: THREE.AdditiveBlending, transparent: true,
        opacity: 0.95, depthWrite: false,
      });
      mouseGroup.add(new THREE.Points(hGeo, hMat));
    });

    /* ── Connection lines ── */
    const allPos = [...Array.from(cyanPos), ...Array.from(purpPos)];
    const TOTAL  = CYAN_COUNT + PURP_COUNT;
    const THRESH = 88;
    const lineVerts = [];
    for (let i = 0; i < TOTAL; i++) {
      for (let j = i + 1; j < TOTAL; j++) {
        const dx = allPos[i*3]   - allPos[j*3];
        const dy = allPos[i*3+1] - allPos[j*3+1];
        const dz = allPos[i*3+2] - allPos[j*3+2];
        if (Math.sqrt(dx*dx + dy*dy + dz*dz) < THRESH) {
          lineVerts.push(
            allPos[i*3], allPos[i*3+1], allPos[i*3+2],
            allPos[j*3], allPos[j*3+1], allPos[j*3+2]
          );
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(lineVerts), 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00c8ff, transparent: true, opacity: 0.1,
      blending: THREE.AdditiveBlending,
    });
    mouseGroup.add(new THREE.LineSegments(lineGeo, lineMat));

    /* ── Mouse tracking ── */
    let tiltX = 0, tiltY = 0, curX = 0, curY = 0;
    const onMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      const nx = (e.clientX - rect.left)  / rect.width  - 0.5;
      const ny = (e.clientY - rect.top)   / rect.height - 0.5;
      tiltX = -ny * 0.55;
      tiltY =  nx * 0.55;
    };
    window.addEventListener('mousemove', onMouseMove);

    /* ── Resize ── */
    const onResize = () => {
      if (!mount) return;
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    /* ── Animation loop ── */
    let raf, t = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      t += 0.012;

      // Auto rotate
      autoGroup.rotation.y += 0.0018;
      autoGroup.rotation.x += 0.0004;

      // Mouse tilt (smooth lerp)
      curX += (tiltX - curX) * 0.045;
      curY += (tiltY - curY) * 0.045;
      mouseGroup.rotation.x = curX;
      mouseGroup.rotation.y = curY;

      // Gentle scale pulse
      const s = 1 + Math.sin(t * 1.2) * 0.018;
      mouseGroup.scale.set(s, s, s);

      renderer.render(scene, camera);
    };
    animate();

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
      [cyanGeo, purpGeo, lineGeo].forEach(g => g.dispose());
      [cyanMat, purpMat, lineMat].forEach(m => m.dispose());
      sprite.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '100%', cursor: 'crosshair' }}
      title="Interactive neural constellation — move your cursor to interact"
    />
  );
}
