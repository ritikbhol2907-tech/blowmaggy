(function(){
// ============ SETUP ============
var canvas=document.getElementById('canvas3d');
var renderer=new THREE.WebGLRenderer({canvas:canvas,antialias:true,alpha:true});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=1.2;

var scene=new THREE.Scene();
scene.background=new THREE.Color(0x0a0a0f);
scene.fog=new THREE.FogExp2(0x0a0a0f,0.015);

var camera=new THREE.PerspectiveCamera(50,window.innerWidth/window.innerHeight,0.1,200);
camera.position.set(0,4,14);

var pmrem=new THREE.PMREMGenerator(renderer);
var es=new THREE.Scene();
es.background=new THREE.Color(0x0a0a0f);
var l1=new THREE.PointLight(0xd4ac1b,3,50);l1.position.set(5,5,5);es.add(l1);
var l2=new THREE.PointLight(0x4488ff,2,50);l2.position.set(-5,3,-5);es.add(l2);
scene.environment=pmrem.fromScene(es).texture;

// ============ LIGHTING ============
scene.add(new THREE.AmbientLight(0x202030,0.5));
var dirLight=new THREE.DirectionalLight(0xffeedd,1.0);
dirLight.position.set(5,10,7);dirLight.castShadow=true;
dirLight.shadow.mapSize.width=2048;dirLight.shadow.mapSize.height=2048;
dirLight.shadow.camera.near=0.1;dirLight.shadow.camera.far=50;
dirLight.shadow.camera.left=-15;dirLight.shadow.camera.right=15;
dirLight.shadow.camera.top=15;dirLight.shadow.camera.bottom=-15;
dirLight.shadow.bias=-0.001;
scene.add(dirLight);

var fillLight=new THREE.PointLight(0xd4ac1b,1.5,30);fillLight.position.set(-5,5,-3);scene.add(fillLight);
var rimLight=new THREE.PointLight(0x4488ff,0.8,25);rimLight.position.set(5,2,-5);scene.add(rimLight);
var spotLight=new THREE.SpotLight(0xffc414,2,30,Math.PI/6,0.5);
spotLight.position.set(0,12,0);spotLight.target.position.set(0,0,0);spotLight.castShadow=true;
scene.add(spotLight);scene.add(spotLight.target);

// ============ GROUND & RINGS ============
var ground=new THREE.Mesh(new THREE.PlaneGeometry(80,80),new THREE.MeshStandardMaterial({color:0x0a0a0f,metalness:0.8,roughness:0.5}));
ground.rotation.x=-Math.PI/2;ground.position.y=-3.5;ground.receiveShadow=true;scene.add(ground);

var rMat=new THREE.MeshBasicMaterial({color:0xd4ac1b,transparent:true,opacity:0.15,side:THREE.DoubleSide});
var ring=new THREE.Mesh(new THREE.RingGeometry(3,3.1,64),rMat);
ring.rotation.x=-Math.PI/2;ring.position.y=-3.49;scene.add(ring);
var ring2=new THREE.Mesh(new THREE.RingGeometry(5,5.05,64),rMat.clone());
ring2.rotation.x=-Math.PI/2;ring2.position.y=-3.48;ring2.material.opacity=0.08;scene.add(ring2);

// ============ PARTICLES ============
var pCount=2000,pGeo=new THREE.BufferGeometry();
var pPos=new Float32Array(pCount*3),pCol=new Float32Array(pCount*3);
for(var pi=0;pi<pCount;pi++){
pPos[pi*3]=(Math.random()-0.5)*60;pPos[pi*3+1]=Math.random()*25-3;pPos[pi*3+2]=(Math.random()-0.5)*40;
if(Math.random()>0.6){pCol[pi*3]=0.83;pCol[pi*3+1]=0.67;pCol[pi*3+2]=0.11;}
else{pCol[pi*3]=1;pCol[pi*3+1]=1;pCol[pi*3+2]=1;}
}
pGeo.setAttribute('position',new THREE.BufferAttribute(pPos,3));
pGeo.setAttribute('color',new THREE.BufferAttribute(pCol,3));
var particles=new THREE.Points(pGeo,new THREE.PointsMaterial({size:0.04,vertexColors:true,transparent:true,opacity:0.5,sizeAttenuation:true}));
scene.add(particles);

// ============ CENTRAL ORB ============
var orbGroup=new THREE.Group();scene.add(orbGroup);
var centralOrb=new THREE.Mesh(new THREE.IcosahedronGeometry(1.2,3),new THREE.MeshStandardMaterial({color:0xffc414,metalness:0.7,roughness:0.15,emissive:0x443300,emissiveIntensity:0.5}));
orbGroup.add(centralOrb);
var wireShell=new THREE.Mesh(new THREE.IcosahedronGeometry(1.8,1),new THREE.MeshBasicMaterial({color:0xd4ac1b,wireframe:true,transparent:true,opacity:0.15}));
orbGroup.add(wireShell);
var orbSpheres=[];
for(var oi=0;oi<8;oi++){
var sm=new THREE.Mesh(new THREE.SphereGeometry(0.08,8,8),new THREE.MeshStandardMaterial({color:0xffc414,emissive:0x443300,emissiveIntensity:0.5}));
sm.userData={angle:(oi/8)*Math.PI*2,speed:0.01+Math.random()*0.005,radius:2+Math.random()*0.5};
orbSpheres.push(sm);orbGroup.add(sm);
}

// ============ FLOATING GEOMETRY ============
var floatingEls=[];
for(var fsi=0;fsi<20;fsi++){
var sz=0.15+Math.random()*0.35;
var gt=['box','octa','torus'][Math.floor(Math.random()*3)];
var g=gt==='box'?new THREE.BoxGeometry(sz,sz,sz):gt==='octa'?new THREE.OctahedronGeometry(sz):new THREE.TorusGeometry(sz*0.6,sz*0.15,8,16);
var m=new THREE.MeshStandardMaterial({color:new THREE.Color().setHSL(0.08+Math.random()*0.06,0.7,0.5),metalness:0.7,roughness:0.3,emissive:0x332200,emissiveIntensity:0.15});
var mesh=new THREE.Mesh(g,m);
var a=(fsi/20)*Math.PI*2,r=6+Math.random()*8;
mesh.position.set(Math.cos(a)*r,(Math.random()-0.5)*6,Math.sin(a)*r);
mesh.userData={oa:a,or:r,os:0.002+Math.random()*0.003,oy:mesh.position.y,rs:new THREE.Vector3(Math.random()*0.02,Math.random()*0.02,Math.random()*0.02)};
floatingEls.push(mesh);scene.add(mesh);
}

// ============ MODEL LOADING ============
var gltfLoader=new THREE.GLTFLoader();
var loadedModels={};
var loadedCount=0;
var totalModels=10;
var modelDefs=[
{name:'helmet',url:'models/helmet.glb'},
{name:'robot',url:'models/robot.glb'},
{name:'flashback',url:'models/flashback.glb'},
{name:'aerospace',url:'models/aerospace.glb'},
{name:'duck',url:'models/duck.glb'},
{name:'bottle',url:'models/bottle.glb'},
{name:'cannon',url:'models/cannon.glb'},
{name:'horse',url:'models/horse.glb'},
{name:'glitch',url:'models/glitch.glb'},
{name:'backrooms',url:'models/backrooms.glb'}
];

modelDefs.forEach(function(md){
gltfLoader.load(md.url,function(gltf){
var model=gltf.scene;
var box=new THREE.Box3().setFromObject(model);
var size=box.getSize(new THREE.Vector3());
var maxDim=Math.max(size.x,size.y,size.z);
var s=3.5/maxDim;
model.scale.set(s,s,s);
model.traverse(function(child){if(child.isMesh){child.castShadow=true;child.receiveShadow=true;}});
loadedModels[md.name]=model;
loadedCount++;
document.getElementById('loaderFill').style.width=(loadedCount/totalModels*100)+'%';
if(loadedCount>=totalModels){setTimeout(function(){document.getElementById('loader').classList.add('hidden');},400);}
},undefined,function(){loadedCount++;document.getElementById('loaderFill').style.width=(loadedCount/totalModels*100)+'%';});
});


// ============ SLIDE CONFIG ============
var modelConfig=[
{slide:0,showOrb:true,model:null,camPos:new THREE.Vector3(0,4,14),lookAt:new THREE.Vector3(0,0,0),orbScale:1.5},
{slide:1,showOrb:true,model:'aerospace',camPos:new THREE.Vector3(2,3,10),lookAt:new THREE.Vector3(1.5,0.5,0),orbScale:0.9},
{slide:2,showOrb:true,model:'helmet',camPos:new THREE.Vector3(-3,3.5,8),lookAt:new THREE.Vector3(-1.5,0.5,0),orbScale:0.7},
{slide:3,showOrb:true,model:'robot',camPos:new THREE.Vector3(0,3,10),lookAt:new THREE.Vector3(0,0,0),orbScale:0.8},
{slide:4,showOrb:true,model:'bottle',camPos:new THREE.Vector3(0,3.5,10),lookAt:new THREE.Vector3(0,0,0),orbScale:0.7},
{slide:5,showOrb:true,model:'flashback',camPos:new THREE.Vector3(3,3,9),lookAt:new THREE.Vector3(1.5,0.5,0),orbScale:0.8},
{slide:6,showOrb:true,model:'cannon',camPos:new THREE.Vector3(-2,3.5,9),lookAt:new THREE.Vector3(-1,0.5,0),orbScale:0.8},
{slide:7,showOrb:true,model:'horse',camPos:new THREE.Vector3(0,3.5,11),lookAt:new THREE.Vector3(0,0,0),orbScale:0.7},
{slide:8,showOrb:true,model:'duck',camPos:new THREE.Vector3(0,4,13),lookAt:new THREE.Vector3(0,0,0),orbScale:1.2}
];

var currentModel=null;
var targetCamPos=new THREE.Vector3(0,4,14);
var targetLookAt=new THREE.Vector3(0,0,0);

function setSlideModel(idx){
var cfg=modelConfig[idx];
if(currentModel){orbGroup.remove(currentModel);currentModel=null;}
if(cfg.model&&loadedModels[cfg.model]){
currentModel=loadedModels[cfg.model].clone();
currentModel.position.set(cfg.camPos.x*0.5,0.2,cfg.camPos.z*0.25);
currentModel.castShadow=true;
orbGroup.add(currentModel);
}
orbGroup.scale.setScalar(cfg.orbScale);
targetCamPos.copy(cfg.camPos);
targetLookAt.copy(cfg.lookAt);
}

// ============ SLIDE NAVIGATION ============
var slides=document.querySelectorAll('.slide');
var totalSlides=slides.length;
var currentSlide=0;
var navDotsEl=document.getElementById('navDots');

slides.forEach(function(s){
var dot=document.createElement('div');dot.className='nav-dot';
var idx=parseInt(s.getAttribute('data-slide'));
dot.setAttribute('data-slide',idx);
dot.addEventListener('click',function(){goToSlide(idx);});
navDotsEl.appendChild(dot);
});

function goToSlide(idx){
if(idx<0||idx>=totalSlides||idx===currentSlide)return;
slides[currentSlide].classList.remove('active');
currentSlide=idx;
slides[currentSlide].classList.add('active');
setSlideModel(currentSlide);
document.getElementById('slideNumber').textContent=String(currentSlide+1).padStart(2,'0')+' / '+String(totalSlides).padStart(2,'0');
document.querySelectorAll('.nav-dot').forEach(function(d){d.classList.toggle('active',parseInt(d.getAttribute('data-slide'))===currentSlide);});
document.getElementById('scrollHint').style.opacity='0';
setTimeout(function(){document.getElementById('scrollHint').style.opacity='1';},2000);
}

// Scroll handling
var scrollTimeout=null;
var scrollAccum=0;
var isScrolling=false;
window.addEventListener('wheel',function(e){
e.preventDefault();
if(isScrolling)return;
scrollAccum+=e.deltaY;
clearTimeout(scrollTimeout);
isScrolling=true;
scrollTimeout=setTimeout(function(){isScrolling=false;scrollAccum=0;},300);
if(scrollAccum>80){scrollAccum=0;goToSlide(currentSlide+1);}
else if(scrollAccum<-80){scrollAccum=0;goToSlide(currentSlide-1);}
},{passive:false});

// Keyboard
window.addEventListener('keydown',function(e){
if(e.key==='ArrowDown'||e.key===' '){e.preventDefault();goToSlide(currentSlide+1);}
else if(e.key==='ArrowUp'){e.preventDefault();goToSlide(currentSlide-1);}
else if(e.key==='Home'){e.preventDefault();goToSlide(0);}
else if(e.key==='End'){e.preventDefault();goToSlide(totalSlides-1);}
});

// Touch support
var touchStartY=0;
window.addEventListener('touchstart',function(e){touchStartY=e.touches[0].clientY;});
window.addEventListener('touchend',function(e){
var dy=touchStartY-e.changedTouches[0].clientY;
if(dy>50)goToSlide(currentSlide+1);
else if(dy<-50)goToSlide(currentSlide-1);
});

// Progress bar
document.addEventListener('mousemove',function(){
var w=Math.round((currentSlide+1)/totalSlides*100);
document.getElementById('progressBar').style.width=w+'%';
});


// ============ RESIZE ============
window.addEventListener('resize',function(){
camera.aspect=window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth,window.innerHeight);
});

// ============ ANIMATION LOOP ============
var clock=new THREE.Clock();

function animate(){
requestAnimationFrame(animate);
var time=clock.getElapsedTime();

// Camera smooth movement
camera.position.lerp(targetCamPos,0.03);
var currentLook=new THREE.Vector3();
camera.getWorldDirection(currentLook);
var desiredDir=targetLookAt.clone().sub(camera.position).normalize();
var blendedDir=currentLook.clone().lerp(desiredDir,0.03);
camera.lookAt(camera.position.clone().add(blendedDir));

// Central orb animation
centralOrb.rotation.x=time*0.3;
centralOrb.rotation.y=time*0.5;
centralOrb.position.y=Math.sin(time*0.8)*0.3;
wireShell.rotation.x=-time*0.2;
wireShell.rotation.y=time*0.15;
wireShell.scale.setScalar(1+Math.sin(time*1.5)*0.05);

// Orbiting spheres
orbSpheres.forEach(function(s){
s.userData.angle+=s.userData.speed;
s.position.set(Math.cos(s.userData.angle)*s.userData.radius,Math.sin(time*0.5+s.userData.angle)*0.5,Math.sin(s.userData.angle)*s.userData.radius);
});

// Floating elements
floatingEls.forEach(function(mesh){
var d=mesh.userData;
d.oa+=d.os;
mesh.position.x=Math.cos(d.oa)*d.or;
mesh.position.z=Math.sin(d.oa)*d.or;
mesh.position.y=d.oy+Math.sin(time*0.5)*0.5;
mesh.rotation.x+=d.rs.x;
mesh.rotation.y+=d.rs.y;
mesh.rotation.z+=d.rs.z;
});

// Active model rotation
if(currentModel){
currentModel.rotation.y=time*0.3;
currentModel.position.y=0.2+Math.sin(time*1.2)*0.15;
}

// Particles rotation
particles.rotation.y=time*0.02;
particles.rotation.x=time*0.01;

// Lights orbit
fillLight.position.x=Math.sin(time*0.5)*8;
fillLight.position.z=Math.cos(time*0.5)*8;
rimLight.position.x=Math.cos(time*0.3)*6;
rimLight.position.z=Math.sin(time*0.3)*6;

// Ring rotation
ring.rotation.z=time*0.1;
ring2.rotation.z=-time*0.08;

// Spot light subtle animation
spotLight.intensity=2+Math.sin(time*2)*0.3;

renderer.render(scene,camera);
}

// Start
setSlideModel(0);
animate();

})();
