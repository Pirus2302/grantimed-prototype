(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,3460,63437,94302,e=>{"use strict";var t=e.i(90072),i=e.i(8560);let r={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var s=t;class a{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}let o=new s.OrthographicCamera(-1,1,1,-1,0,1);class n extends s.BufferGeometry{constructor(){super(),this.setAttribute("position",new s.Float32BufferAttribute([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new s.Float32BufferAttribute([0,2,0,0,2,0],2))}}let l=new n;class h{constructor(e){this._mesh=new s.Mesh(l,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,o)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class u extends a{constructor(e,i="tDiffuse"){super(),this.textureID=i,this.uniforms=null,this.material=null,e instanceof t.ShaderMaterial?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=t.UniformsUtils.clone(e.uniforms),this.material=new t.ShaderMaterial({name:void 0!==e.name?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new h(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?e.setRenderTarget(null):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil)),this._fsQuad.render(e)}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class c extends a{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){let r,s,a=e.getContext(),o=e.state;o.buffers.color.setMask(!1),o.buffers.depth.setMask(!1),o.buffers.color.setLocked(!0),o.buffers.depth.setLocked(!0),this.inverse?(r=0,s=1):(r=1,s=0),o.buffers.stencil.setTest(!0),o.buffers.stencil.setOp(a.REPLACE,a.REPLACE,a.REPLACE),o.buffers.stencil.setFunc(a.ALWAYS,r,0xffffffff),o.buffers.stencil.setClear(s),o.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),o.buffers.color.setLocked(!1),o.buffers.depth.setLocked(!1),o.buffers.color.setMask(!0),o.buffers.depth.setMask(!0),o.buffers.stencil.setLocked(!1),o.buffers.stencil.setFunc(a.EQUAL,1,0xffffffff),o.buffers.stencil.setOp(a.KEEP,a.KEEP,a.KEEP),o.buffers.stencil.setLocked(!0)}}class d extends a{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class p{constructor(e,i){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),void 0===i){const r=e.getSize(new t.Vector2);this._width=r.width,this._height=r.height,(i=new t.WebGLRenderTarget(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:t.HalfFloatType})).texture.name="EffectComposer.rt1"}else this._width=i.width,this._height=i.height;this.renderTarget1=i,this.renderTarget2=i.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new u(r),this.copyPass.material.blending=t.NoBlending,this.timer=new t.Timer}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);-1!==t&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),void 0===e&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),i=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(!1!==r.enabled){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),r.needsSwap){if(i){let t=this.renderer.getContext(),i=this.renderer.state.buffers.stencil;i.setFunc(t.NOTEQUAL,1,0xffffffff),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),i.setFunc(t.EQUAL,1,0xffffffff)}this.swapBuffers()}void 0!==c&&(r instanceof c?i=!0:r instanceof d&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(void 0===e){let i=this.renderer.getSize(new t.Vector2);this._pixelRatio=this.renderer.getPixelRatio(),this._width=i.width,this._height=i.height,(e=this.renderTarget1.clone()).setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let i=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(i,r),this.renderTarget2.setSize(i,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(i,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class f extends a{constructor(e,i,r=null,s=null,a=null){super(),this.scene=e,this.camera=i,this.overrideMaterial=r,this.clearColor=s,this.clearAlpha=a,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new t.Color}render(e,t,i){let r,s,a=e.autoClear;e.autoClear=!1,null!==this.overrideMaterial&&(s=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),null!==this.clearColor&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),null!==this.clearAlpha&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),!0==this.clearDepth&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),!0===this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),null!==this.clearColor&&e.setClearColor(this._oldClearColor),null!==this.clearAlpha&&e.setClearAlpha(r),null!==this.overrideMaterial&&(this.scene.overrideMaterial=s),e.autoClear=a}}var m=e.i(93209),v=e.i(62743);let g={shape:0,mask:"/assets/grantimed/eye-mask.png",blink:1,blinkEvery:4.5,bgColor:"#efe0cd",flameColor:"#7b2524",flameColor2:"#b96a4c",flameAmt:.12,atmoColor:"#7b2524",atmoCount:1500,atmoSize:0,atmoSpeed:.6,irisColorA:"#7b2524",irisColorB:"#b96a4c",inkCore:"#b08268",inkMid:"#f4e3c2",inkEdge:"#7b2524",irisCount:11e4,inkCount:16e4,camDist:21,irisSize:1,inkSize:5,brightness:.4,irisOpacity:1.54,inkOpacity:.86,inkGrow:1.8,halfWidth:6.4,lineThick:.39,wave:.5,spin:0,tilt:-.1,emitRate:.19,spread:.12,rise:0,turbulence:.16,noiseFreq:1.05,noiseEvolve:.1,parallax:3,pointerRadius:3,pointerStrength:.35,maxPixelRatio:1.5},x={...g,shape:1,mask:"/assets/grantimed/stethoscope-mask.png",blink:0,spread:.44,rise:-.2,turbulence:.72,pointerRadius:4,pointerStrength:1.55,halfWidth:6.6,irisCount:13e4,inkCount:13e4,inkSize:4,irisOpacity:1.9,lineThick:.3},y={...g,shape:2,mask:null,blink:0,rise:-.2,pointerRadius:4,pointerStrength:1.55,irisCount:6e4,inkCount:15e4,camDist:19,inkSize:4.2,lineThick:.3,tilt:0,spread:.45,turbulence:.7},w={logo:g,stethoscope:x,iris:y},b=async e=>{let t=new Image;t.decoding="async",t.src=e,await t.decode();let i=t.naturalWidth,r=t.naturalHeight,s=document.createElement("canvas");s.width=i,s.height=r;let a=s.getContext("2d",{willReadFrequently:!1});if(!a)throw Error("eye-ink: 2D context unavailable");a.drawImage(t,0,0);let{data:o}=a.getImageData(0,0,i,r),n=new Int32Array(i*r),l=0;for(let e=0;e<i*r;e++)o[4*e]>127&&(n[l++]=e);return{filled:n.subarray(0,l),width:i,height:r}},k=(e,t)=>{let{filled:i,width:r,height:s}=e;if(0===i.length)return void t.fill(0);let a=2/r,o=r/2,n=s/2;for(let e=0;e<t.length;e+=3){let s=i[Math.random()*i.length|0],l=s%r+Math.random(),h=(s/r|0)+Math.random();t[e]=(l-o)*a,t[e+1]=-(h-n)*a,t[e+2]=0}};var C=e.i(6209);let S=`
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0); const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy)); vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz); vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy); vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + 1.0 * C.xxx; vec3 x2 = x0 - i2 + 2.0 * C.xxx; vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0; vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
    vec4 x_ = floor(j * ns.z); vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy; vec4 y = y_ *ns.x + ns.yyyy; vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy); vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0; vec4 s1 = floor(b1)*2.0 + 1.0; vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy; vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy,h.x); vec3 p1 = vec3(a0.zw,h.y); vec3 p2 = vec3(a1.xy,h.z); vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0); m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  // 0 – глаз открыт, 1 – закрыт. Ведёт сцена, см. scene.ts → blinkAmount().
  uniform float uBlink;
  ${C.EYELID_GLSL}
  float random(vec3 p) { return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453); }
  // Birth point on the clinic's own mark — an eye — for both point clouds.
  //
  // uShape picks WHICH drawing, so every variant the client is choosing between
  // shares one buffer, one material and one draw call — switching is a uniform
  // write, not a rebuild:
  //   0 \xabзнак\xbb, 1 \xabконтур\xbb – глаз прямо из логотипа клиента. Точка уже выбрана
  //     по маске на стороне CPU и приходит атрибутом birth (см. logo-mask.ts),
  //     здесь её остаётся масштабировать. Заливка и обводка отличаются только
  //     картинкой маски, поэтому ветка у них общая.
  //   2 \xabрадужка\xbb – макро: волокна от зрачка к лимбу, век в кадре нет. Рисуется
  //     формулой: у круглой радужки нет формы знака, которую надо повторить.
  //
  // Everything is drawn in the XY plane with a little Z jitter: the mark is
  // flat, and spin is 0 by default, so it faces the camera.
  vec3 eyePoint(float rnd1, float rnd2, float rnd3, float rnd4, vec3 birth,
                float shape, float halfWidth, float thick, float wave,
                float time) {
    vec3 core;

    if (shape > 1.5) {
      // ── \xabРадужка\xbb: глаз с одного шага, век в кадре нет ─────────────────
      float R = halfWidth * 0.62;
      float a = rnd2 * 6.2831853;
      vec2 glareAt = vec2(-R * 0.44, R * 0.44);
      float glareR = R * 0.085;

      if (rnd1 < 0.20) {                                 // зрачок
        float r = R * 0.19 * sqrt(rnd3);
        core = vec3(cos(a) * r, sin(a) * r, 0.0);
        core += (vec3(rnd4, rnd2, rnd3) - 0.5) * thick * 0.25;
      } else if (rnd1 < 0.30) {                          // лимб – внешняя кромка
        float r = R * (0.975 + 0.025 * rnd3);
        core = vec3(cos(a) * r, sin(a) * r, 0.0);
        core += (vec3(rnd3, rnd4, rnd2) - 0.5) * thick * 0.3;
      } else if (rnd1 < 0.38) {                          // воротничок
        float r = R * (0.40 + 0.035 * rnd3);
        core = vec3(cos(a) * r, sin(a) * r, 0.0);
        core += (vec3(rnd2, rnd4, rnd3) - 0.5) * thick * 0.42;
      } else {                                           // волокна
        // Угол квантуется в спицы. Без этого получается ровная заливка, а
        // волокна – единственное, что отличает радужку от диска.
        float spokes = 190.0;
        float k = floor(rnd2 * spokes);
        float seed = random(vec3(k, 5.3, 2.9));
        float ang = (k + 0.5) / spokes * 6.2831853
                  + (random(vec3(k, 1.7, 3.1)) - 0.5) * 0.013;
        float r = mix(R * 0.21, R * mix(0.86, 0.99, seed), rnd3);
        core = vec3(cos(ang) * r, sin(ang) * r, 0.0);
        core += (vec3(rnd4, rnd3, rnd2) - 0.5) * thick * 0.22;
      }
      // Блик: точки выталкиваются из небольшого круга, оставляя просвет с
      // яркой кромкой. В шейдере вершин точку нельзя отбросить, но можно
      // отодвинуть. Зрачок лежит ниже порога – его блик не касается.
      if (rnd1 >= 0.20) {
        vec2 d = core.xy - glareAt;
        if (length(d) < glareR) core.xy = glareAt + normalize(d + vec2(1e-4)) * glareR;
      }
    } else {
      // ── \xabЗнак\xbb и \xabКонтур\xbb: форма взята прямо из логотипа ───────────────
      // Маска отдаёт плоскую фигуру в \xb11 по ширине, масштаб накладываем тут:
      // так ширина остаётся живым ползунком, а буфер не надо перепекать.
      vec2 b = blinkLid(birth.xy, uBlink);
      core = vec3(b * halfWidth, 0.0);
      // В плоскости хватает лёгкого дрожания – площадь уже задана маской, и
      // сильное размывает штрих. В глубину наоборот: без него облако читается
      // листом бумаги, а не рисунком.
      core += (vec3(rnd4, rnd3, rnd2) - 0.5) * thick * vec3(0.16, 0.16, 1.0);
    }

    // Медленное дыхание всей фигуры.
    core.x += sin(time * 0.5 + core.y * 0.6) * wave * 0.35;
    core.y += cos(time * 0.4 + core.x * 0.35) * wave * 0.22;
    core.z += sin(time * 0.3 + core.x * 0.5) * wave * 0.3;
    return core;
  }`,A=`
  attribute vec3 aBirth;
  uniform float uTime, uIrisSize, uHalfWidth, uThick, uWave;
  uniform float uShape;
  uniform float uPixelScale;
  uniform vec3 uIrisA, uIrisB;
  uniform vec3 uCursor; uniform float uRepelRadius, uRepelStrength, uActivity;
  varying vec3 vColor; varying float vFade;
  ${S}
  void main() {
    vec3 s = position;
    float rnd1 = random(s), rnd2 = random(s + 1.7), rnd3 = random(s + 3.3), rnd4 = random(s + 5.9);
    vec3 p = eyePoint(rnd1, rnd2, rnd3, rnd4, aBirth, uShape, uHalfWidth, uThick, uWave, uTime);
    vec3 wp = (modelMatrix * vec4(p, 1.0)).xyz;
    // cursor deform — push points out of a soft world-space ball at the pointer
    vec3 toP = wp - uCursor;
    float fall = smoothstep(uRepelRadius, 0.0, length(toP));
    wp += normalize(toP + vec3(1e-4)) * fall * uRepelStrength * uActivity;
    vec4 mv = viewMatrix * vec4(wp, 1.0);
    // deeper toward the drawn line, lighter toward the jittered rim
    vColor = mix(uIrisB, uIrisA, rnd4);
    vFade = 0.65 + 0.35 * rnd2;
    // uPixelScale ties point size to the drawing buffer. Without it the sprite
    // is a fixed number of device pixels while the projected strand shrinks
    // with the canvas — so a narrow window packs the same dots into less space,
    // and MULTIPLY blending turns that overlap into a darker, wrong colour.
    gl_PointSize = uIrisSize * uPixelScale * (12.0 / -mv.z);
    gl_PointSize = max(gl_PointSize, 1.5);
    gl_Position = projectionMatrix * mv;
  }`,z=`
  uniform float uBrightness, uIrisOpacity, uAppear;
  varying vec3 vColor; varying float vFade;
  void main() {
    vec2 xy = gl_PointCoord - 0.5;
    float ll = length(xy);
    if (ll > 0.5) discard;
    float soft = smoothstep(0.5, 0.05, ll);
    float cov = clamp(soft * vFade * uIrisOpacity * uAppear * uBrightness, 0.0, 1.0);
    gl_FragColor = vec4(mix(vec3(1.0), vColor, cov), 1.0);   // MULTIPLY: darkens the paper toward the mark's brick
  }`,T=`
  attribute vec3 aBirth;
  uniform float uTime, uInkSize, uHalfWidth, uThick, uWave;
  uniform float uShape;
  uniform float uEmitRate, uSpread, uRise, uTurb, uNoiseFreq, uNoiseEvolve, uInkGrow;
  uniform float uPixelScale;
  uniform vec3 uInkCore, uInkMid, uInkEdge;
  uniform vec3 uCursor; uniform float uRepelRadius, uRepelStrength, uActivity;
  varying vec3 vColor; varying float vAlpha;
  ${S}
  void main() {
    vec3 s = position;
    float rnd1 = random(s), rnd2 = random(s + 1.7), rnd3 = random(s + 3.3), rnd4 = random(s + 5.9);
    float seed = random(s + 9.1);

    // normalized life 0..1, phases spread across the cloud
    float life = fract(seed + uTime * uEmitRate);

    // birth on the helix (frozen at the point's own emission moment)
    float birthTime = uTime - life / max(uEmitRate, 1e-4);
    vec3 birth = eyePoint(rnd1, rnd2, rnd3, rnd4, aBirth, uShape, uHalfWidth, uThick, uWave, birthTime);

    // Наружу от центра знака, а не от вертикальной оси: фигура плоская, и
    // старое направление разносило чернила ровно влево и вправо.
    vec3 outward = normalize(birth + vec3(1e-4));

    // evolving simplex flow field — the "swirl through water"
    float e = uTime * uNoiseEvolve;
    vec3 np = birth * uNoiseFreq;
    vec3 flow = vec3(
      snoise(np + vec3(e, 0.0, 0.0)),
      snoise(np + vec3(0.0, e, 0.0) + 11.0),
      snoise(np + vec3(0.0, 0.0, e) + 23.0)
    );

    vec3 disp = outward * life * uSpread
              + flow * pow(life, 1.4) * uTurb
              + vec3(0.0, life * uRise, 0.0);
    vec3 p = birth + disp;

    vec3 wp = (modelMatrix * vec4(p, 1.0)).xyz;
    // cursor deform — the dye swirls out of the pointer ball too
    vec3 toP = wp - uCursor;
    float fall = smoothstep(uRepelRadius, 0.0, length(toP));
    wp += normalize(toP + vec3(1e-4)) * fall * uRepelStrength * uActivity;
    vec4 mv = viewMatrix * vec4(wp, 1.0);

    // colour bleeds core -> mid -> edge as the dye ages & thins
    vec3 c = mix(uInkCore, uInkMid, smoothstep(0.0, 0.4, life));
    c = mix(c, uInkEdge, smoothstep(0.35, 1.0, life));
    vColor = c;

    // fade in fast, thin out as it disperses
    vAlpha = smoothstep(0.0, 0.06, life) * (1.0 - smoothstep(0.4, 1.0, life));

    float grow = 0.35 + life * uInkGrow;
    gl_PointSize = uInkSize * grow * uPixelScale * (12.0 / -mv.z);
    gl_PointSize = max(gl_PointSize, 1.0);
    gl_Position = projectionMatrix * mv;
  }`,R=`
  uniform float uBrightness, uInkOpacity, uAppear;
  varying vec3 vColor; varying float vAlpha;
  void main() {
    vec2 xy = gl_PointCoord - 0.5;
    float ll = length(xy);
    if (ll > 0.5) discard;
    // soft gaussian puff so overlapping dye stays smooth, never aliased
    float soft = exp(-ll * ll * 7.0);
    float cov = clamp(soft * vAlpha * uInkOpacity * uAppear * uBrightness, 0.0, 1.0);
    gl_FragColor = vec4(mix(vec3(1.0), vColor, cov), 1.0);   // MULTIPLY: dye darkens the white water
  }`,P=`
  attribute float size; attribute float seed; uniform float uTime; uniform vec2 uRes;
  varying float vA;
  vec3 warp(vec3 p, float t){ float c=0.9,a=1.9,b=0.02,s=0.05; p*=2.;
    p.x+=c*sin(s*t+a*p.y)+t*b; p.y+=c*cos(s*t+a*p.x); p.y+=c*sin(s*t+a*p.z)+t*b;
    p.z+=c*cos(s*t+a*p.y); p.z+=c*sin(s*t+a*p.x)+t*b; p.x+=c*cos(s*t+a*p.z);
    return cos(p+vec3(1,2,4)); }
  void main(){
    vec3 v = position*5.0 + warp(position, uTime)*1.4;
    vec4 mv = modelViewMatrix * vec4(v, 1.0);
    float r = length(v); float farF = 1.0 - smoothstep(6.0, 8.0, r); float nearF = smoothstep(0.0, 0.5, -mv.z);
    vA = farF * nearF;
    gl_PointSize = size * uRes.y / 900.0 / -mv.z; gl_PointSize = max(gl_PointSize, 1.0);
    gl_Position = projectionMatrix * mv;
  }`,_=`
  uniform vec3 uColor; varying float vA;
  void main(){ vec2 p = gl_PointCoord - 0.5; float l = length(p); if (l > 0.5) discard;
    float tex = smoothstep(0.5, 0.0, l); float cov = clamp(tex * vA * 0.4, 0.0, 1.0);
    gl_FragColor = vec4(mix(vec3(1.0), uColor, cov), 1.0); }`,B=`
  varying vec2 vUv;
  void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }`,M=`
  uniform sampler2D tDiffuse;
  varying vec2 vUv;
  void main(){
    gl_FragColor = vec4(texture2D(tDiffuse, vUv).xyz, 1.);
  }`,I=new t.Sphere(new t.Vector3(32,32,32),32*Math.sqrt(3)),E=new t.Sphere(new t.Vector3(0,0,0),Math.sqrt(3)),F=()=>new Promise(e=>setTimeout(e,0)),L=(e,t,i)=>e+(t-e)*i,D=(e,t,i)=>Math.max(t,Math.min(i,e)),U=e=>{let i=parseInt(e.slice(1),16);return new t.Vector3((i>>16&255)/255,(i>>8&255)/255,(255&i)/255)},W=e=>{e.geometry.dispose(),e.material.dispose()};class G{config;renderer;scene;camera;composer;finalPass;copyQuadGeometry=new t.PlaneGeometry(2,2);bgColor=new t.Color;fog;tiltGroup;spinner;uniforms;atmoUniforms;iris=null;ink=null;atmo=null;ready=!1;disposed=!1;pointerTarget={x:0,y:0};pointer={x:0,y:0};cursorWorld=new t.Vector3;pointerActive=!1;pointerLastMove=0;pointerActivity=0;spinPhase=0;elapsed=0;lastFrame;startedAt;width=0;height=0;rebuildTimer=null;maskSource=null;blinkClock=new v.BlinkClock;maskUrl=null;ndc=new t.Vector3;rayDir=new t.Vector3;cursorTarget=new t.Vector3;constructor(e,r=g){this.config=r,this.renderer=new i.WebGLRenderer({canvas:e,antialias:!0}),this.scene=new t.Scene,this.scene.background=this.bgColor,this.fog=new t.Fog(this.bgColor,0,22),this.scene.fog=this.fog,this.camera=new t.PerspectiveCamera(45,1,.1,200),this.camera.position.set(0,0,r.camDist),this.scene.add(this.camera),this.finalPass=new u({uniforms:{iTime:{value:0},tDiffuse:{value:null},uBg:{value:new t.Vector3},uFlameA:{value:new t.Vector3},uFlameB:{value:new t.Vector3},uFlameAmt:{value:0}},vertexShader:B,fragmentShader:M}),this.composer=new p(this.renderer),this.composer.addPass(new f(this.scene,this.camera)),this.composer.addPass(this.finalPass),this.uniforms={uTime:{value:0},uAppear:{value:0},uIrisA:{value:new t.Vector3},uIrisB:{value:new t.Vector3},uInkCore:{value:new t.Vector3},uInkMid:{value:new t.Vector3},uInkEdge:{value:new t.Vector3},uIrisSize:{value:0},uInkSize:{value:0},uBrightness:{value:0},uIrisOpacity:{value:0},uInkOpacity:{value:0},uInkGrow:{value:0},uShape:{value:0},uBlink:{value:0},uHalfWidth:{value:0},uThick:{value:0},uWave:{value:0},uEmitRate:{value:0},uSpread:{value:0},uRise:{value:0},uTurb:{value:0},uNoiseFreq:{value:0},uNoiseEvolve:{value:0},uCursor:{value:new t.Vector3},uRepelRadius:{value:0},uRepelStrength:{value:0},uActivity:{value:0},uPixelScale:{value:1}},this.atmoUniforms={uTime:{value:0},uColor:{value:new t.Vector3},uRes:{value:new t.Vector2(1,1)}},this.writeUniforms(),this.syncBackground(),this.tiltGroup=new t.Group,this.spinner=new t.Group,this.tiltGroup.add(this.spinner),this.scene.add(this.tiltGroup);const s=performance.now();this.startedAt=s,this.lastFrame=s/1e3,this.pointerLastMove=s,this.syncMask(),this.prepare()}async syncMask(){let e=this.config.mask;if(e!==this.maskUrl){if(this.maskUrl=e,this.maskSource=null,!e)return void this.writeBirths();try{let t=await b((0,m.asset)(e));if(this.disposed||this.maskUrl!==e)return;this.maskSource=t,this.writeBirths(),this.startedAt=performance.now()}catch{this.maskUrl=null}}}writeBirths(){for(let e of[this.iris,this.ink]){if(!e)continue;let t=e.geometry.getAttribute("aBirth"),i=t.array;this.maskSource?k(this.maskSource,i):i.fill(0),t.needsUpdate=!0}}async prepare(){if(await F(),this.disposed||(this.iris=this.createCloud(this.config.irisCount,A,z),await F(),this.disposed)||(this.ink=this.createCloud(this.config.inkCount,T,R),this.spinner.add(this.iris,this.ink),this.atmo=this.createAtmosphere(),this.scene.add(this.atmo),await F(),this.disposed)||(this.sized=!0,this.applySize(),await F(),this.disposed)||(this.width>0&&(this.renderer.initRenderTarget(this.composer.readBuffer),this.renderer.initRenderTarget(this.composer.writeBuffer)),await F(),this.disposed))return;this.renderer.setRenderTarget(this.composer.readBuffer);let e=this.renderer.compileAsync(this.scene,this.camera);this.renderer.setRenderTarget(null);let i=new t.Mesh(this.copyQuadGeometry,this.finalPass.material),r=this.renderer.compileAsync(i,this.camera);if(await Promise.all([e,r]),this.disposed||(await F(),this.disposed))return;this.renderer.setRenderTarget(this.composer.readBuffer),this.renderer.render(this.scene,this.camera),this.renderer.setRenderTarget(null);let s=performance.now();this.startedAt=s,this.lastFrame=s/1e3,this.ready=!0}syncBackground(){var e,t;let i;e=this.config.bgColor,t=this.bgColor,i=parseInt(e.slice(1),16),t.setRGB((i>>16&255)/255,(i>>8&255)/255,(255&i)/255),this.renderer.setClearColor(this.bgColor,1),this.fog.color.copy(this.bgColor)}writeUniforms(){let e=this.config,t=this.uniforms;t.uIrisA.value.copy(U(e.irisColorA)),t.uIrisB.value.copy(U(e.irisColorB)),t.uInkCore.value.copy(U(e.inkCore)),t.uInkMid.value.copy(U(e.inkMid)),t.uInkEdge.value.copy(U(e.inkEdge)),t.uIrisSize.value=e.irisSize,t.uInkSize.value=e.inkSize,t.uBrightness.value=e.brightness,t.uIrisOpacity.value=e.irisOpacity,t.uInkOpacity.value=e.inkOpacity,t.uInkGrow.value=e.inkGrow,t.uShape.value=e.shape,t.uHalfWidth.value=e.halfWidth,t.uThick.value=e.lineThick,t.uWave.value=e.wave,t.uEmitRate.value=e.emitRate,t.uSpread.value=e.spread,t.uRise.value=e.rise,t.uTurb.value=e.turbulence,t.uNoiseFreq.value=e.noiseFreq,t.uNoiseEvolve.value=e.noiseEvolve,t.uRepelRadius.value=e.pointerRadius,t.uRepelStrength.value=e.pointerStrength,this.atmoUniforms.uColor.value.copy(U(e.atmoColor)),this.finalPass.uniforms.uBg.value.copy(U(e.bgColor)),this.finalPass.uniforms.uFlameA.value.copy(U(e.flameColor)),this.finalPass.uniforms.uFlameB.value.copy(U(e.flameColor2)),this.finalPass.uniforms.uFlameAmt.value=e.flameAmt}applyConfig(e){let t=this.config;this.config=e,this.writeUniforms(),this.syncBackground(),e.maxPixelRatio!==t.maxPixelRatio&&this.setSize(this.width,this.height),e.mask!==t.mask&&this.syncMask(),(e.irisCount!==t.irisCount||e.inkCount!==t.inkCount||e.atmoCount!==t.atmoCount||e.atmoSize!==t.atmoSize)&&(null!==this.rebuildTimer&&clearTimeout(this.rebuildTimer),this.rebuildTimer=setTimeout(()=>{this.rebuildTimer=null,this.rebuildClouds()},120))}rebuildClouds(){this.ready&&this.iris&&this.ink&&this.atmo&&(this.spinner.remove(this.iris,this.ink),W(this.iris),W(this.ink),this.iris=this.createCloud(this.config.irisCount,A,z),this.ink=this.createCloud(this.config.inkCount,T,R),this.spinner.add(this.iris,this.ink),this.scene.remove(this.atmo),W(this.atmo),this.atmo=this.createAtmosphere(),this.scene.add(this.atmo))}createCloud(e,i,r){let s=new t.Points(((e,i)=>{let r=new t.BufferGeometry,s=new Float32Array(3*e);for(let e=0;e<s.length;e++)s[e]=64*Math.random();r.setAttribute("position",new t.Float32BufferAttribute(s,3));let a=new Float32Array(3*e);return i&&k(i,a),r.setAttribute("aBirth",new t.Float32BufferAttribute(a,3)),r.boundingSphere=I.clone(),r})(Math.round(e),this.maskSource),new t.ShaderMaterial({uniforms:this.uniforms,vertexShader:i,fragmentShader:r,transparent:!0,depthWrite:!1,depthTest:!1,blending:t.MultiplyBlending,premultipliedAlpha:!0}));return s.frustumCulled=!1,s}createAtmosphere(){let e=Math.round(this.config.atmoCount),i=new Float32Array(3*e),r=new Float32Array(e),s=new Float32Array(e);for(let t=0;t<e;t++)i[3*t]=2*Math.random()-1,i[3*t+1]=2*Math.random()-1,i[3*t+2]=2*Math.random()-1,r[t]=this.config.atmoSize*(.4+Math.random()),s[t]=Math.random();let a=new t.BufferGeometry;a.setAttribute("position",new t.Float32BufferAttribute(i,3)),a.setAttribute("size",new t.Float32BufferAttribute(r,1)),a.setAttribute("seed",new t.Float32BufferAttribute(s,1)),a.boundingSphere=E.clone();let o=new t.Points(a,new t.ShaderMaterial({uniforms:this.atmoUniforms,vertexShader:P,fragmentShader:_,transparent:!0,depthWrite:!1,depthTest:!1,blending:t.MultiplyBlending,premultipliedAlpha:!0}));return o.frustumCulled=!1,o}setSize(e,t){e<=0||t<=0||(this.width=e,this.height=t,this.sized&&this.applySize())}sized=!1;applySize(){let{width:e,height:t}=this;if(e<=0||t<=0)return;let i=Math.min(window.devicePixelRatio,this.config.maxPixelRatio);this.renderer.setPixelRatio(i),this.renderer.setSize(e,t,!1),this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.composer.setPixelRatio(i),this.composer.setSize(e,t),this.atmoUniforms.uRes.value.set(e*i,t*i),this.uniforms.uPixelScale.value=t*i/1600}resetClock(){this.elapsed=0,this.spinPhase=0,this.blinkClock.reset(),this.lastFrame=performance.now()/1e3,this.pointerTarget.x=0,this.pointerTarget.y=0,this.pointer.x=0,this.pointer.y=0,this.cursorWorld.set(0,0,0),this.pointerActivity=0,this.pointerActive=!1}setPointer(e,t){this.pointerTarget.x=D(e,-1,1),this.pointerTarget.y=D(t,-1,1),this.pointerActive=!0,this.pointerLastMove=performance.now()}clearPointer(){this.pointerActive=!1}updateCursorWorld(){if(this.cursorTarget.set(0,0,0),this.pointerActive){this.ndc.set(this.pointer.x,this.pointer.y,.5).unproject(this.camera),this.rayDir.copy(this.ndc).sub(this.camera.position).normalize();let e=this.rayDir.z;if(Math.abs(e)>1e-4){let t=-this.camera.position.z/e;t>0&&Number.isFinite(t)&&this.cursorTarget.copy(this.camera.position).addScaledVector(this.rayDir,t)}}this.cursorWorld.lerp(this.cursorTarget,.15);let e=(performance.now()-this.pointerLastMove)/1e3,t=this.pointerActive&&e<3?1:0;this.pointerActivity+=(t-this.pointerActivity)*.08}inspect(){return{appear:this.uniforms.uAppear.value,pixelScale:this.uniforms.uPixelScale.value,elapsed:this.elapsed,spinPhase:this.spinPhase,camX:this.camera.position.x,camY:this.camera.position.y,camZ:this.camera.position.z,aspect:this.camera.aspect,width:this.width,height:this.height,irisSize:this.uniforms.uIrisSize.value,brightness:this.uniforms.uBrightness.value}}render(){if(!this.ready||!this.atmo)return!1;let e=performance.now(),t=e/1e3,i=Math.min(.05,t-this.lastFrame);this.lastFrame=t,this.elapsed+=i,this.pointer.x=L(this.pointer.x,this.pointerTarget.x,.05),this.pointer.y=L(this.pointer.y,this.pointerTarget.y,.05),this.uniforms.uTime.value=this.elapsed,this.tiltGroup.rotation.z=this.config.tilt,this.spinPhase+=i*this.config.spin,this.spinner.rotation.y=this.spinPhase,this.camera.position.x=this.pointer.x*this.config.parallax,this.camera.position.y=this.pointer.y*this.config.parallax,this.camera.position.z=this.config.camDist,this.camera.lookAt(0,0,0),this.uniforms.uBlink.value=this.blinkAmount(),this.updateCursorWorld(),this.uniforms.uCursor.value.copy(this.cursorWorld),this.uniforms.uActivity.value=this.pointerActivity;let r=null!==this.config.mask&&null===this.maskSource,s=(e-this.startedAt)/1e3;return this.uniforms.uAppear.value=r?0:D((s-.2)/1.6,0,1),this.atmoUniforms.uTime.value=this.elapsed*this.config.atmoSpeed*8,this.atmo.position.copy(this.camera.position),this.finalPass.uniforms.iTime.value=this.elapsed,this.composer.render(),!0}blinkAmount(){return this.config.blink<=0?0:this.blinkClock.sample(this.elapsed,this.config.blinkEvery)*this.config.blink}dispose(){for(let e of(this.disposed=!0,null!==this.rebuildTimer&&clearTimeout(this.rebuildTimer),[this.iris,this.ink,this.atmo]))e&&W(e);this.finalPass.dispose(),this.copyQuadGeometry.dispose(),this.composer.dispose(),this.renderer.dispose()}}e.s(["EyeInkScene",0,G],63437),e.s([],3460);let O=()=>{let e=new URLSearchParams(window.location.search).get("eye");return null!==e&&Object.hasOwn(w,e)?e:null};e.s(["EYE_LABELS",0,{logo:"Знак",stethoscope:"Стетоскоп",iris:"Радужка"},"EYE_ORDER",0,["logo","stethoscope","iris"],"EYE_PARAM",0,"eye","readEyeShape",0,O,"resolveEyeConfig",0,()=>{let e=O();return e?w[e]:g}],94302)}]);