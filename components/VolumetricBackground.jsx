"use client";
import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vert = `varying vec2 vUv;
void main(){vUv=uv;gl_Position=vec4(position.xy,0.0,1.0);}`;

const frag = `precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uSpeed;
uniform float uRadius;
uniform float uFov;
uniform float uMouseInfluence;
uniform float uAutoRotateSpeed;
uniform float uBeamCount;
uniform float uHalfAngle;
uniform float uEdgeSoft;
uniform float uBeamRot;
uniform float uTwistDepth;
uniform float uDensity;
uniform float uFalloff;
uniform float uAniso;
uniform float uLightIntensity;
uniform vec3 uLightColor;
uniform vec3 uTint;
uniform float uStripeFreq;
uniform float uStripeAmp;
uniform float uStripeSharp;
uniform float uStripeSpeed;
uniform float uStripeJit;
uniform float uVolSteps;
uniform float uStepMin;
uniform float uStepMax;
uniform float uMaxDist;
uniform float uExposure;
uniform float uGamma;
uniform float uGrainAmount;
uniform float uVignette;
uniform vec3 uBgColor;
const float PI=3.141592653589793;
float hash21(vec2 p){p=fract(p*vec2(123.34,345.45));p+=dot(p,p+34.45);return fract(p.x*p.y);}
mat2 rot2(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}
void beamAxis(vec2 p,float N,float rot,out vec2 axis,out float angDist){
  float ang=atan(p.y,p.x)+rot;
  float period=2.0*PI/max(1.0,N);
  float k=floor(ang/period+0.5);
  float centerAng=k*period;
  axis=vec2(cos(centerAng-rot),sin(centerAng-rot));
  float d=ang-centerAng;
  d=mod(d+PI,2.0*PI)-PI;
  angDist=abs(d);
}
float beamMask(float ad,float halfAng,float edgeSoft){
  float a0=max(0.0,halfAng-edgeSoft);
  float a1=halfAng+edgeSoft;
  return 1.0-smoothstep(a0,a1,ad);
}
float hg(float mu,float g){float g2=g*g;return(1.0-g2)/pow(1.0+g2-2.0*g*mu,1.5);}
float mediumDensity(vec3 p,float t,out vec2 si){
  vec3 q=p;
  q.xy*=rot2(uTwistDepth*q.z);
  vec2 axis;float ad;
  beamAxis(q.xy,uBeamCount,uBeamRot,axis,ad);
  float beam=beamMask(ad,uHalfAngle,uEdgeSoft);
  float r=length(q.xy);
  float center=exp(-uFalloff*r*r);
  vec2 perp=vec2(-axis.y,axis.x);
  float coord=dot(q.xy,perp);
  float jit=uStripeJit*sin(0.7*q.z+2.3*coord+1.7*t);
  float stripes=0.5+0.5*sin(coord*uStripeFreq+jit-t*uStripeSpeed);
  stripes=pow(clamp(stripes,0.0,1.0),uStripeSharp);
  float rib=mix(1.0,0.55+0.45*stripes,uStripeAmp*beam);
  float d=uDensity*beam*center;
  si=vec2(stripes,beam);
  return d;
}
void main(){
  float t=uTime*uSpeed;
  vec2 uv=(gl_FragCoord.xy-0.5*uResolution.xy)/uResolution.y;
  float az=t*uAutoRotateSpeed+(uMouse.x*2.0-1.0)*PI*0.35*uMouseInfluence;
  float el=(uMouse.y*2.0-1.0)*0.25*uMouseInfluence;
  vec3 ro=vec3(cos(az)*cos(el),sin(el),sin(az)*cos(el))*uRadius;
  vec3 ww=normalize(-ro);
  vec3 uu=normalize(cross(vec3(0.0,1.0,0.0),ww));
  vec3 vv=cross(ww,uu);
  vec3 rd=normalize(uv.x*uu+uv.y*vv+uFov*ww);
  vec3 col=uBgColor;
  vec3 accum=vec3(0.0);
  float Tr=1.0;
  float dist=0.0;
  int stepsHard=int(uVolSteps);
  for(int i=0;i<128;i++){
    if(i>=stepsHard)break;
    float s=mix(uStepMin,uStepMax,clamp(dist/uMaxDist,0.0,1.0));
    vec3 pos=ro+rd*dist;
    vec2 si;
    float dens=mediumDensity(pos,t,si);
    vec3 L=normalize(-pos);
    float mu=dot(rd,L);
    float phase=hg(mu,uAniso);
    vec3 scatterCol=uLightColor*uLightIntensity*phase*dens;
    accum+=Tr*scatterCol*s;
    Tr*=exp(-dens*s);
    dist+=s;
    if(Tr<1e-3||dist>uMaxDist)break;
  }
  col+=accum*abs(ro*0.3)*uTint;
  float vig=1.0-uVignette*length(uv);
  col*=clamp(vig,0.0,1.0);
  float g=(hash21(gl_FragCoord.xy+fract(t*123.45))-0.5)*uGrainAmount*1.4;
  col+=g;
  col*=uExposure;
  col=col/(1.0+col);
  col=pow(col,vec3(1.0/uGamma));
  gl_FragColor=vec4(col,1.0);
}`;

function Shader() {
  const mat = useRef();
  const { size, gl } = useThree();
  const tmpV2 = useMemo(() => new THREE.Vector2(), []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uSpeed: { value: 0.2 },
    uRadius: { value: 3.8 },
    uFov: { value: 1.65 },
    uMouseInfluence: { value: 0.3 },
    uAutoRotateSpeed: { value: 0.012 },
    uBeamCount: { value: 4 },
    uHalfAngle: { value: 0.09 },
    uEdgeSoft: { value: 0.05 },
    uBeamRot: { value: 0.0 },
    uTwistDepth: { value: 0.06 },
    uDensity: { value: 1.1 },
    uFalloff: { value: 0.5 },
    uAniso: { value: 0.76 },
    uLightIntensity: { value: 2.0 },
    uLightColor: { value: new THREE.Vector3(0.55, 0.3, 0.75) },
    uTint: { value: new THREE.Vector3(0.6, 0.25, 0.8) },
    uStripeFreq: { value: 42.0 },
    uStripeAmp: { value: 0.5 },
    uStripeSharp: { value: 1.8 },
    uStripeSpeed: { value: 0.1 },
    uStripeJit: { value: 0.25 },
    uVolSteps: { value: 80 },
    uStepMin: { value: 0.018 },
    uStepMax: { value: 0.07 },
    uMaxDist: { value: 16.0 },
    uExposure: { value: 1.1 },
    uGamma: { value: 2.0 },
    uGrainAmount: { value: 0.03 },
    uVignette: { value: 0.4 },
    uBgColor: { value: new THREE.Vector3(0.06, 0.02, 0.1) },
  }), []);

  useFrame((state) => {
    const dpr = gl.getPixelRatio();
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uResolution.value.set(size.width * dpr, size.height * dpr);
    const mx = 0.5 + state.pointer.x * 0.5;
    const my = 0.5 + state.pointer.y * 0.5;
    uniforms.uMouse.value.lerp(tmpV2.set(mx, my), 0.15);
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2, 1, 1]} />
      <shaderMaterial
        vertexShader={vert}
        fragmentShader={frag}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function VolumetricBackground({ children }) {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: false }}
          style={{ width: "100%", height: "100%" }}
        >
          <Shader />
        </Canvas>
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
