# 🚀 Blowmaggy - 3D Pitch Presentation

A premium **3D interactive pitch deck** for Blowmaggy, the 6-department e-commerce super-app.

## What It Is

An immersive, full-screen 3D presentation that showcases Blowmaggy's business pitch with:
- **10 interactive 3D models** rotating and orbiting in a cinematic space
- **Smooth camera choreography** that moves through the scene as you navigate slides
- **Pop-in text animations** with staggered delays for dramatic effect
- **Particle effects**, metallic reflections, and dynamic lighting
- **GSAP-powered** smooth transitions between slides

## How to Run

### Option 1: Direct Browser (Simplest)
Since this loads 3D models via GLTF, you need a local server:

```bash
# Using Python
cd Blowmaggy-Presentation
python -m http.server 8080

# Then open: http://localhost:8080
```

### Option 2: Using Node.js
```bash
cd Blowmaggy-Presentation
npx serve .
```

### Option 3: VS Code Live Server
1. Open `Blowmaggy-Presentation` folder in VS Code
2. Install "Live Server" extension
3. Right-click `index.html` → Open with Live Server

## Navigation

| Control | Action |
|---------|--------|
| `↑` / `↓` arrows | Navigate slides |
| `Space` | Next slide |
| Mouse scroll | Scroll to navigate |
| Touch swipe | Mobile navigation |
| Right dots | Jump to specific slide |
| `Home` | Go to first slide |
| `End` | Go to last slide |

## Slide Breakdown

| # | Slide | 3D Model | Camera Action |
|---|-------|----------|---------------|
| 0 | **Hero** | Central Golden Orb | Wide establishing shot |
| 1 | **Vision** | Aerospace | Orbit right, model reveals |
| 2 | **Problem** | Helmet | Left orbit, dramatic reveal |
| 3 | **Solution** | Robot | Center focus, hero angle |
| 4 | **Departments** | Bottle | Medium shot, product showcase |
| 5 | **Features** | Flashback | Dynamic angle, action pose |
| 6 | **Revenue** | Cannon | Power angle, bold composition |
| 7 | **Technology** | Horse | Lifestyle framing, warm angle |
| 8 | **CTA** | Duck | Wide closing shot |

## 3D Scene Features

- **Central Golden Orb** — Animated icosahedron with wireframe shell and orbiting spheres
- **10 GLB Models** — Helmet, Robot, Flashback, Aerospace, Duck, Bottle, Cannon, Horse, Glitch, Backrooms
- **2000 Particles** — Gold and white floating particles
- **20 Floating Shapes** — Boxes, octahedrons, tori orbiting in background
- **Dynamic Lighting** — 5 light sources that orbit and pulse
- **Reflective Ground** — Dark metallic ground with golden rings
- **Atmospheric Fog** — Depth-enhancing exponential fog

## Tech Stack

- **Three.js r128** — 3D rendering engine
- **GSAP 3.12** — Animation library (loaded)
- **Vanilla JS** — No framework dependencies
- **WebGL** — Hardware-accelerated rendering
- **GLTF/GLB** — 3D model format

## Customization

### Change Camera Positions
Edit `modelConfig` array in `app.js`:
```javascript
{slide:0, model:null, camPos:new THREE.Vector3(0,4,14), lookAt:new THREE.Vector3(0,0,0)}
```

### Add New Models
Add to `modelDefs` array and `modelConfig`:
```javascript
{name:'myModel', url:'models/myModel.glb'}
```

### Change Colors
- **Gold accent**: `#d4ac1b` / `#ffc414`
- **Background**: `#0a0a0f`
- **Blue accent**: `#4488ff`

### Adjust Animation Speed
In the `animate()` function, modify the `time` multipliers:
```javascript
centralOrb.rotation.y = time * 0.5;  // Change 0.5 to speed up/slow down
```

## File Structure

```
Blowmaggy-Presentation/
├── index.html          # Main presentation HTML + CSS
├── app.js              # Three.js 3D scene & animation logic
├── models/             # 3D GLB model files
│   ├── helmet.glb      (3.7MB)
│   ├── robot.glb
│   ├── flashback.glb
│   ├── aerospace.glb
│   ├── duck.glb
│   ├── bottle.glb
│   ├── cannon.glb
│   ├── horse.glb
│   ├── glitch.glb
│   └── backrooms.glb
└── public/
```

## Performance

- Loads all 10 models simultaneously (~5MB total)
- Targets 60 FPS on modern hardware
- Uses PCFSoft shadow maps for quality
- ACES Filmic tone mapping for cinematic look
- Pixel ratio capped at 2x for retina displays
