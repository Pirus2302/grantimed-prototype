(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,55778,e=>{"use strict";var t=e.i(43476),i=e.i(71645),r=e.i(33070),a=e.i(90072),s=e.i(8560),n=e.i(93209),o=e.i(62743),l=e.i(6209);let h={mask:"/assets/grantimed/eye-mask.png",color:"#b96a4c",opacity:.62,halfWidth:6.4,tilt:-.1,blinkEvery:4.5,parallax:.35,maxPixelRatio:2},u=42*Math.tan(Math.PI/180*22.5),p=`
  uniform float uBlink;
  varying vec2 vUv;
  ${l.EYELID_GLSL}
  void main() {
    vUv = uv;
    // The plane is built in mask space (x \xb11, y \xb1h/w), so its vertices are
    // the mask points blinkLid expects.
    vec2 p = blinkLid(position.xy, uBlink);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 0.0, 1.0);
  }
`,c=`
  uniform sampler2D uMask;
  uniform vec3 uColor;
  uniform float uReveal;
  uniform float uOpacity;
  varying vec2 vUv;
  void main() {
    float lit = texture2D(uMask, vUv).r;
    // The mask is anti-aliased already; tightening it keeps the edge crisp
    // without stair-steps when the texture is magnified.
    float alpha = smoothstep(0.25, 0.75, lit);
    // Entrance: a soft edge sweeping left to right, like a pen stroke.
    alpha *= smoothstep(vUv.x - 0.06, vUv.x, uReveal * 1.06);
    alpha *= uOpacity;
    if (alpha < 0.002) discard;
    gl_FragColor = vec4(uColor * alpha, alpha);
  }
`;class d{config;renderer;scene=new a.Scene;camera=new a.OrthographicCamera(-1,1,1,-1,-10,10);group=new a.Group;uniforms={uMask:{value:null},uColor:{value:new a.Color},uBlink:{value:0},uReveal:{value:0},uOpacity:{value:1}};mesh=null;blink=new o.BlinkClock;elapsed=0;lastFrame=performance.now()/1e3;revealStart=0;pointerTarget={x:0,y:0};pointer={x:0,y:0};disposed=!1;constructor(e,t=h){this.config=t,this.renderer=new s.WebGLRenderer({canvas:e,antialias:!0,alpha:!0,premultipliedAlpha:!0}),this.renderer.setClearColor(0,0),this.uniforms.uColor.value=(e=>{let t=parseInt(e.slice(1),16);return new a.Color().setRGB((t>>16&255)/255,(t>>8&255)/255,(255&t)/255)})(t.color),this.uniforms.uOpacity.value=t.opacity,this.group.rotation.z=t.tilt,this.scene.add(this.group),this.load()}async load(){let e=await new a.TextureLoader().loadAsync((0,n.asset)(this.config.mask));if(this.disposed)return void e.dispose();e.colorSpace=a.NoColorSpace,e.anisotropy=this.renderer.capabilities.getMaxAnisotropy(),e.minFilter=a.LinearMipmapLinearFilter;let t=e.image,i=t.height/t.width;this.uniforms.uMask.value=e;let r=new a.PlaneGeometry(2,2*i,320,110),s=new a.ShaderMaterial({uniforms:this.uniforms,vertexShader:p,fragmentShader:c,transparent:!0,premultipliedAlpha:!0,depthTest:!1,depthWrite:!1});this.mesh=new a.Mesh(r,s),this.mesh.scale.setScalar(this.config.halfWidth),this.mesh.frustumCulled=!1,this.group.add(this.mesh),this.revealStart=this.elapsed}setSize(e,t){if(e<=0||t<=0)return;let i=Math.min(window.devicePixelRatio,this.config.maxPixelRatio);this.renderer.setPixelRatio(i),this.renderer.setSize(e,t,!1);let r=u/2,a=e/t*r;this.camera.left=-a,this.camera.right=a,this.camera.top=r,this.camera.bottom=-r,this.camera.updateProjectionMatrix()}setPointer(e,t){this.pointerTarget.x=Math.max(-1,Math.min(1,e)),this.pointerTarget.y=Math.max(-1,Math.min(1,t))}clearPointer(){this.pointerTarget.x=0,this.pointerTarget.y=0}resetClock(){this.lastFrame=performance.now()/1e3,this.blink.reset(),this.elapsed=0,this.revealStart=this.mesh?-1.45:0}render(){if(!this.mesh)return!1;let e=performance.now()/1e3,t=Math.min(.05,e-this.lastFrame);this.lastFrame=e,this.elapsed+=t,this.pointer.x+=(this.pointerTarget.x-this.pointer.x)*.04,this.pointer.y+=(this.pointerTarget.y-this.pointer.y)*.04,this.group.position.set(this.pointer.x*this.config.parallax,this.pointer.y*this.config.parallax,0);let i=Math.max(0,Math.min(1,(this.elapsed-this.revealStart-.15)/1.3));return this.uniforms.uReveal.value=1-(1-i)*(1-i)*(1-i),this.uniforms.uBlink.value=this.blink.sample(this.elapsed,this.config.blinkEvery),this.renderer.render(this.scene,this.camera),!0}dispose(){this.disposed=!0,this.mesh?.geometry.dispose(),this.mesh?.material.dispose(),this.uniforms.uMask.value?.dispose(),this.renderer.dispose()}}e.s(["LogoEye",0,({className:e,onReady:a})=>{let s=(0,i.useRef)(null),n=(0,i.useRef)(null),o=(0,i.useRef)(!0),l=(0,i.useRef)(a);(0,i.useEffect)(()=>{l.current=a});let h=(0,i.useRef)(!1);return(0,i.useEffect)(()=>{let e=s.current;if(!e)return;let t=new d(e);n.current=t;let i=0,r=0,a=()=>{let a=e.getBoundingClientRect(),s=Math.round(a.width),n=Math.round(a.height);(s!==i||n!==r)&&(i=s,r=n,t.setSize(s,n))};a();let l=new ResizeObserver(a);l.observe(e);let h=window.matchMedia("(pointer: fine)").matches,u=i=>{if(!o.current)return;let r=e.getBoundingClientRect();0!==r.width&&0!==r.height&&t.setPointer((i.clientX-r.left)/r.width*2-1,-((i.clientY-r.top)/r.height*2-1))},p=()=>t.clearPointer();return h&&(window.addEventListener("pointermove",u,{passive:!0}),document.documentElement.addEventListener("mouseleave",p)),()=>{l.disconnect(),window.removeEventListener("pointermove",u),document.documentElement.removeEventListener("mouseleave",p),t.dispose(),n.current=null}},[]),(0,r.useLoop)(()=>{let e=s.current,t=n.current;if(!e||!t)return;let i=e.getBoundingClientRect();if(!(i.width>0&&i.height>0&&i.bottom>0&&i.top<window.innerHeight)){o.current&&(o.current=!1,t.resetClock());return}o.current=!0,t.render()&&(h.current||(h.current=!0,l.current?.()))},{framerate:0}),(0,t.jsx)("canvas",{ref:s,className:e,"aria-hidden":"true"})}],55778)},89135,e=>{e.n(e.i(55778))}]);