import { useEffect, useRef } from "react"
import * as THREE from "three"

const NOISE_VERTEX = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`

const NOISE_FRAGMENT = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uResolution;
uniform float uIntensity;
uniform float uMouseX;
uniform float uMouseY;

// Simplex 2D noise (Ashima Arts / Stefan Gustavson)
vec3 permute(vec3 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / max(uResolution.y, 0.001);
  vec2 p = vec2(uv.x * aspect, uv.y);

  float t = uTime * 0.035;

  float n1 = snoise(p * 1.1 + vec2(t, t * 0.8));
  float n2 = snoise(p * 2.3 - vec2(t * 0.7, -t * 0.5) + 12.0);
  float n3 = snoise(p * 4.1 + vec2(-t * 0.3, t * 1.1) + 37.0);

  float noise = n1 * 0.55 + n2 * 0.3 + n3 * 0.15;

  // flow distortion based on mouse
  vec2 mouse = vec2(uMouseX, uMouseY) - 0.5;
  float md = smoothstep(0.0, 1.2, length(p - 0.5 - mouse * 0.4));
  noise += snoise(p * 3.0 + mouse * 0.6 + t * 0.6) * (1.0 - md) * 0.35;

  float n = noise * 0.5 + 0.5;

  // color palette - near-black with purple/blue nebula
  vec3 base = vec3(0.043, 0.043, 0.047);          // #0B0B0C
  vec3 c1 = vec3(0.475, 0.325, 0.784);             // accent purple
  vec3 c2 = vec3(0.376, 0.647, 0.980);             // accent-2 blue
  vec3 c3 = vec3(0.784, 0.522, 0.980);             // lighter purple

  float b1 = smoothstep(0.30, 0.55, n);
  float b2 = smoothstep(0.50, 0.75, n + 0.08 * n2);
  float b3 = smoothstep(0.70, 0.95, n + 0.12 * n3);

  vec3 color = base;
  color = mix(color, c1 * 0.18, b1 * uIntensity);
  color = mix(color, c2 * 0.12, b2 * uIntensity);
  color = mix(color, c3 * 0.10, b3 * uIntensity);

  // vignette
  vec2 q = uv - 0.5;
  float vig = smoothstep(0.9, 0.1, dot(q, q) * 2.0);
  color *= mix(0.7, 1.05, vig);

  // subtle grain
  float grain = fract(sin(dot(uv * uResolution, vec2(12.9898, 78.233))) * 43758.5453);
  color += (grain - 0.5) * 0.015;

  gl_FragColor = vec4(color, 1.0);
}
`

interface Props {
  particleCount?: number
  intensity?: number
}

export function Background3D({ particleCount = 120, intensity = 1 }: Props) {
  const mountRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const dpr = Math.min(window.devicePixelRatio || 1, reducedMotion ? 1.2 : 2)

    const scene = new THREE.Scene()

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setPixelRatio(dpr)
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setClearColor("#0B0B0B", 1)
    mount.appendChild(renderer.domElement)

    // ===== 1) Noise shader plane (background) =====
    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(mount.clientWidth, mount.clientHeight) },
      uIntensity: { value: intensity },
      uMouseX: { value: 0.5 },
      uMouseY: { value: 0.5 },
    }
    const bgMat = new THREE.ShaderMaterial({
      vertexShader: NOISE_VERTEX,
      fragmentShader: NOISE_FRAGMENT,
      uniforms,
    })
    const bgGeom = new THREE.PlaneGeometry(2, 2)
    const bgMesh = new THREE.Mesh(bgGeom, bgMat)
    scene.add(bgMesh)

    // ===== 2) Particles (constellation style) =====
    const pts: THREE.Vector3[] = []
    const aspect = mount.clientWidth / Math.max(mount.clientHeight, 1)
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() * 2 - 1) * aspect
      const y = Math.random() * 2 - 1
      const z = Math.random() * 0.8 - 0.4
      pts.push(new THREE.Vector3(x, y, z))
    }
    const pGeom = new THREE.BufferGeometry().setFromPoints(pts)
    const pMat = new THREE.PointsMaterial({
      size: 0.012,
      sizeAttenuation: false,
      color: new THREE.Color("#FAFAFA"),
      transparent: true,
      opacity: 0.55,
    })
    const points = new THREE.Points(pGeom, pMat)
    scene.add(points)

    // ===== 3) Lines between close particles =====
    const linesGeom = new THREE.BufferGeometry()
    const linePositions: number[] = []
    linesGeom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(linePositions), 3))
    const lineMat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#C084FC"),
      transparent: true,
      opacity: 0,
    })
    const lines = new THREE.LineSegments(linesGeom, lineMat)
    scene.add(lines)

    // ===== Mouse tracking =====
    let mouseX = 0.5
    let mouseY = 0.5
    let targetX = 0.5
    let targetY = 0.5
    const onMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect()
      targetX = (e.clientX - rect.left) / Math.max(rect.width, 1)
      targetY = 1 - (e.clientY - rect.top) / Math.max(rect.height, 1)
    }
    window.addEventListener("mousemove", onMove, { passive: true })

    // ===== Visibility / animation pause =====
    let running = true
    const onVis = () => {
      running = !document.hidden
    }
    document.addEventListener("visibilitychange", onVis)

    // ===== Resize =====
    const onResize = () => {
      if (!mount) return
      const w = mount.clientWidth
      const h = mount.clientHeight
      const a = w / Math.max(h, 1)
      renderer.setSize(w, h)
      uniforms.uResolution.value.set(w, h)

      // rescale points to new aspect
      const posAttr = pGeom.getAttribute("position") as THREE.BufferAttribute
      for (let i = 0; i < particleCount; i++) {
        const oldAspect = (mount as any)._prevAspect || aspect
        const x = posAttr.getX(i)
        posAttr.setX(i, (x / oldAspect) * a)
      }
      posAttr.needsUpdate = true
      ;(mount as any)._prevAspect = a
    }
    window.addEventListener("resize", onResize)
    ;(mount as any)._prevAspect = aspect

    // ===== Animation loop =====
    let raf = 0
    let clock = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!running) return
      clock += reducedMotion ? 0.0008 : 0.002

      mouseX += (targetX - mouseX) * 0.04
      mouseY += (targetY - mouseY) * 0.04
      uniforms.uMouseX.value = mouseX
      uniforms.uMouseY.value = mouseY
      uniforms.uTime.value = clock

      // Animate individual points with small sine offsets
      const posAttr = pGeom.getAttribute("position") as THREE.BufferAttribute
      const arr = posAttr.array as Float32Array
      const a = (mount as any)._prevAspect || aspect
      const threshold = 0.18
      linePositions.length = 0

      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3
        const ix = (i * 97.13) % 100
        const iy = (i * 53.7) % 100
        const s1 = Math.sin(clock * 0.6 + ix) * 0.012
        const s2 = Math.cos(clock * 0.5 + iy) * 0.012
        // normalized base positions stored as attributes in userData-less way: recompute from seed? too heavy.
        // Instead, use a small drift only.
        arr[idx] += s1 * (reducedMotion ? 0.2 : 1)
        arr[idx + 1] += s2 * (reducedMotion ? 0.2 : 1)
        // clamp within bounds
        arr[idx] = Math.min(a * 1.05, Math.max(-a * 1.05, arr[idx]))
        arr[idx + 1] = Math.min(1.05, Math.max(-1.05, arr[idx + 1]))

        // build lines for close pairs (O(n^2) but n=120 => fine)
        for (let j = i + 1; j < particleCount; j++) {
          const jdx = j * 3
          const dx = arr[idx] - arr[jdx]
          const dy = arr[idx + 1] - arr[jdx + 1]
          const d2 = dx * dx + dy * dy
          if (d2 < threshold * threshold) {
            linePositions.push(arr[idx], arr[idx + 1], arr[idx + 2])
            linePositions.push(arr[jdx], arr[jdx + 1], arr[jdx + 2])
          }
        }
      }
      posAttr.needsUpdate = true

      // update lines attribute
      const lpos = linesGeom.getAttribute("position") as THREE.BufferAttribute | undefined
      if (lpos && lpos.array.length >= linePositions.length) {
        for (let i = 0; i < linePositions.length; i++) {
          ;(lpos.array as Float32Array)[i] = linePositions[i]
        }
        lpos.needsUpdate = true
        linesGeom.setDrawRange(0, linePositions.length / 3)
        const density = Math.min(1, linePositions.length / (particleCount * 6))
        lineMat.opacity = 0.14 * density
      } else if (linePositions.length > 0) {
        linesGeom.setAttribute(
          "position",
          new THREE.BufferAttribute(new Float32Array(linePositions), 3),
        )
      }

      // small parallax on points based on mouse
      points.position.x = (mouseX - 0.5) * 0.02
      points.position.y = (mouseY - 0.5) * 0.02

      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("resize", onResize)
      document.removeEventListener("visibilitychange", onVis)
      renderer.dispose()
      bgGeom.dispose()
      bgMat.dispose()
      pGeom.dispose()
      pMat.dispose()
      linesGeom.dispose()
      lineMat.dispose()
      if (renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [particleCount, intensity])

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="fixed inset-0 z-0 h-full w-full overflow-hidden pointer-events-none"
    >
      <div className="absolute inset-0 bg-noise opacity-60 mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 mask-fade-b pointer-events-none" />
    </div>
  )
}
