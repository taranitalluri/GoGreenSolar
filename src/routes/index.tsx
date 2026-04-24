import { useState, useEffect, useRef, useCallback } from "react";

// ── DESIGN TOKENS ──────────────────────────────────────────────────────────────
const C = {
  bg:      "#f0faf4",
  bg2:     "#e8f7ef",
  bg3:     "#d4f0e0",
  bg4:     "#c2ebd4",
  panel:   "rgba(255,255,255,0.85)",
  panelG:  "rgba(220,248,235,0.85)",
  border:  "rgba(0,160,80,0.2)",
  border2: "rgba(0,160,80,0.1)",
  headerBg: "#052b14",
  footerBg: "#041f0f",
  accent:  "#00b85a",
  accent2: "#00d478",
  accent3: "#00ff8c",
  deep:    "#006e36",
  mid:     "#00a04a",
  lime:    "#6ed85a",
  mint:    "#b4f5d0",
  forest:  "#1a5c35",
  emerald: "#00875a",
  gold:    "#f5b800",
  coral:   "#ff6b35",
  sky:     "#00c8ff",
  text:    "#0a2a16",
  text2:   "#2e6044",
  muted:   "#5a8a70",
  textLight: "#e8f5ee",
  htxt:    "#e8ffef",
  htxt2:   "#7fcfa0",
};

// ── GLOBAL KEYFRAMES ──────────────────────────────────────────────────────────
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;500;600;700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap');
    *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
    html{scroll-behavior:smooth;overflow-x:hidden;background:${C.bg}}
    body{background:${C.bg};color:${C.text};font-family:'DM Sans',sans-serif;overflow-x:hidden;cursor:none}
    a,button{cursor:none}
    ::placeholder{color:${C.muted}}
    ::-webkit-scrollbar{width:4px}
    ::-webkit-scrollbar-track{background:${C.bg2}}
    ::-webkit-scrollbar-thumb{background:rgba(0,160,80,0.4);border-radius:2px}

    @keyframes float1{0%,100%{transform:translateY(0) rotate(0deg)}33%{transform:translateY(-18px) rotate(1.5deg)}66%{transform:translateY(-9px) rotate(-1deg)}}
    @keyframes float2{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-22px) rotate(2deg)}}
    @keyframes float3{0%,100%{transform:translateY(-8px)}50%{transform:translateY(8px)}}
    @keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
    @keyframes spinRev{0%{transform:rotate(0deg)}100%{transform:rotate(-360deg)}}
    @keyframes pulseGlow{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:1;transform:scale(1.12)}}
    @keyframes morphBlob{0%,100%{border-radius:42% 58% 62% 38%/48% 52% 48% 52%}25%{border-radius:58% 42% 38% 62%/52% 48% 62% 38%}50%{border-radius:38% 62% 52% 48%/42% 58% 32% 68%}75%{border-radius:62% 38% 48% 52%/64% 36% 58% 42%}}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:.25}}
    @keyframes slideUp{from{transform:translateY(40px);opacity:0}to{transform:translateY(0);opacity:1}}
    @keyframes slideDown{from{transform:translateY(-40px);opacity:0}to{transform:translateY(0);opacity:1}}
    @keyframes slideInL{from{transform:translateX(-70px);opacity:0}to{transform:translateX(0);opacity:1}}
    @keyframes slideInR{from{transform:translateX(70px);opacity:0}to{transform:translateX(0);opacity:1}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes zoomIn{from{transform:scale(.7);opacity:0}to{transform:scale(1);opacity:1}}
    @keyframes zoomOut{from{transform:scale(1.3);opacity:0}to{transform:scale(1);opacity:1}}
    @keyframes rotateIn{from{transform:rotate(-15deg) scale(.8);opacity:0}to{transform:rotate(0deg) scale(1);opacity:1}}
    @keyframes rotateInR{from{transform:rotate(15deg) scale(.8);opacity:0}to{transform:rotate(0deg) scale(1);opacity:1}}
    @keyframes flipInX{from{transform:rotateX(-90deg);opacity:0}to{transform:rotateX(0deg);opacity:1}}
    @keyframes flipInY{from{transform:rotateY(-90deg);opacity:0}to{transform:rotateY(0deg);opacity:1}}
    @keyframes scanLine{0%{top:0}100%{top:100%}}
    @keyframes numberCount{from{opacity:0;transform:scale(.7)}to{opacity:1;transform:scale(1)}}
    @keyframes borderRot{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
    @keyframes textShimmer{0%,100%{background-position:200% center}50%{background-position:-200% center}}
    @keyframes hexFloat{0%,100%{transform:translateY(0) rotateX(0deg) rotateY(0deg)}33%{transform:translateY(-16px) rotateX(8deg) rotateY(12deg)}66%{transform:translateY(-8px) rotateX(-6deg) rotateY(-9deg)}}
    @keyframes particleDrift{0%{transform:translate(0,0) scale(1);opacity:.7}100%{transform:translate(var(--dx),var(--dy)) scale(0);opacity:0}}
    @keyframes expandIn{from{transform:scale(0) rotate(-90deg);opacity:0}to{transform:scale(1) rotate(0deg);opacity:1}}
    @keyframes drawStroke{from{stroke-dashoffset:1000}to{stroke-dashoffset:0}}
    @keyframes orbitalSpin{0%{transform:rotate(0deg) translateX(90px) rotate(0deg)}100%{transform:rotate(360deg) translateX(90px) rotate(-360deg)}}
    @keyframes plasma{0%{transform:translate(-50%,-50%) scale(1) rotate(0deg)}50%{transform:translate(-50%,-50%) scale(1.3) rotate(180deg)}100%{transform:translate(-50%,-50%) scale(1) rotate(360deg)}}
    @keyframes spinLoader{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
    @keyframes successPop{from{transform:scale(.8);opacity:0}to{transform:scale(1);opacity:1}}
    @keyframes gridShift{0%{background-position:0 0}100%{background-position:60px 60px}}
    @keyframes conicSpin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
    @keyframes badgePop{from{transform:scale(.7) translateY(12px);opacity:0}to{transform:scale(1) translateY(0);opacity:1}}
    @keyframes techScan{0%{top:0%;opacity:.9}100%{top:100%;opacity:0}}
    @keyframes leafSway{0%,100%{transform:rotate(-8deg)}50%{transform:rotate(8deg)}}
    @keyframes leafFall{0%{transform:translateY(-20px) rotate(0deg);opacity:0}20%{opacity:1}100%{transform:translateY(100vh) rotate(720deg);opacity:0}}
    @keyframes glowPulse{0%,100%{box-shadow:0 0 20px rgba(0,180,80,0.3)}50%{box-shadow:0 0 50px rgba(0,212,120,0.6)}}
    @keyframes wave{0%{transform:scaleX(1)}50%{transform:scaleX(1.05)}100%{transform:scaleX(1)}}
    @keyframes bounceIn{0%{transform:scale(.3);opacity:0}50%{transform:scale(1.08)}70%{transform:scale(.95)}100%{transform:scale(1);opacity:1}}
    @keyframes slideUpFade{from{transform:translateY(60px);opacity:0}to{transform:translateY(0);opacity:1}}
    @keyframes diagonalSlide{from{transform:translate(-40px,40px);opacity:0}to{transform:translate(0,0);opacity:1}}
    @keyframes spiralIn{from{transform:rotate(180deg) scale(0);opacity:0}to{transform:rotate(0deg) scale(1);opacity:1}}
    @keyframes videoFloat{0%,100%{transform:translateY(0px)}50%{transform:translateY(-12px)}}
    @keyframes shimmerGreen{0%{background-position:-200% 0}100%{background-position:200% 0}}
    @keyframes navGlow{0%,100%{box-shadow:0 4px 30px rgba(0,160,80,0.15)}50%{box-shadow:0 4px 40px rgba(0,212,120,0.3)}}
    @keyframes leafRotate{0%{transform:rotate(0deg) scale(1)}100%{transform:rotate(360deg) scale(1.1)}}
    @keyframes countUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}
    @keyframes cardHoverShine{0%{left:-100%}100%{left:200%}}
    @keyframes orbitRing1{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
    @keyframes orbitRing2{0%{transform:rotate(0deg)}100%{transform:rotate(-360deg)}}
    @keyframes orbitRing3{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
    @keyframes orbitRing4{0%{transform:rotate(0deg)}100%{transform:rotate(-360deg)}}
    @keyframes solarPulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.08);opacity:0.9}}
    @keyframes lineGrow{from{width:0;opacity:0}to{width:100%;opacity:1}}
    @keyframes numberPop{from{transform:scale(0) rotate(-20deg);opacity:0}to{transform:scale(1) rotate(0deg);opacity:1}}
    @keyframes whyItemSlide{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:translateX(0)}}
    @keyframes featureReveal{from{opacity:0;transform:translateY(20px) scale(0.95)}to{opacity:1;transform:translateY(0) scale(1)}}
    @keyframes testimonialSlide{from{opacity:0;transform:translateX(60px)}to{opacity:1;transform:translateX(0)}}

    /* Nav entrance animation */
    @keyframes navSlideDown{from{transform:translateY(-100%);opacity:0}to{transform:translateY(0);opacity:1}}
    @keyframes navLogoReveal{from{transform:translateX(-20px) scale(0.8);opacity:0}to{transform:translateX(0) scale(1);opacity:1}}
    @keyframes navLinkFadeIn{from{transform:translateY(-10px);opacity:0}to{transform:translateY(0);opacity:1}}
    @keyframes navBtnReveal{from{transform:translateX(20px) scale(0.8);opacity:0}to{transform:translateX(0) scale(1);opacity:1}}
  `}</style>
);

// ── FALLING LEAVES ────────────────────────────────────────────────────────────
function FallingLeaves() {
  const leaves = Array.from({length:12},(_,i)=>({
    id:i, left: Math.random()*100, delay: Math.random()*8,
    dur: 6+Math.random()*6, size: 10+Math.random()*14, hue: 110+Math.random()*40,
  }));
  return (
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:2,overflow:"hidden"}}>
      {leaves.map(l=>(
        <div key={l.id} style={{position:"absolute",top:-30,left:`${l.left}%`,width:l.size,height:l.size,
          background:`hsl(${l.hue},70%,45%)`,borderRadius:"50% 0 50% 0",opacity:0.35,
          animation:`leafFall ${l.dur}s ${l.delay}s linear infinite`}}/>
      ))}
    </div>
  );
}

// ── PLASMA CANVAS ─────────────────────────────────────────────────────────────
function PlasmaCanvas() {
  const cvRef = useRef(null);
  const rafRef = useRef(null);
  useEffect(() => {
    const cv = cvRef.current;
    const ctx = cv.getContext("2d");
    let W, H, t = 0;
    const resize = () => { W = cv.width = window.innerWidth; H = cv.height = window.innerHeight; };
    class Particle {
      constructor() { this.reset(true); }
      reset(init) {
        this.x = Math.random()*W; this.y = init?Math.random()*H:(Math.random()>.5?-10:H+10);
        this.vx = (Math.random()-.5)*.5; this.vy = (Math.random()-.5)*.5;
        this.r = Math.random()*2+.5; this.life = Math.random();
        this.maxLife = Math.random()*200+120; this.hue = 110+Math.random()*50;
      }
      update() {
        this.x+=this.vx; this.y+=this.vy; this.life++;
        if(this.life>this.maxLife||this.x<-10||this.x>W+10||this.y<-10||this.y>H+10) this.reset(false);
      }
      draw() {
        const a=Math.sin((this.life/this.maxLife)*Math.PI)*.25;
        ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
        ctx.fillStyle=`hsla(${this.hue},80%,45%,${a})`; ctx.fill();
      }
    }
    class Web {
      constructor(p){this.p=p;}
      draw(){
        const MAX=100;
        for(let i=0;i<this.p.length;i++) for(let j=i+1;j<this.p.length;j++){
          const dx=this.p[i].x-this.p[j].x,dy=this.p[i].y-this.p[j].y;
          const d=Math.sqrt(dx*dx+dy*dy);
          if(d<MAX){
            ctx.beginPath(); ctx.moveTo(this.p[i].x,this.p[i].y); ctx.lineTo(this.p[j].x,this.p[j].y);
            ctx.strokeStyle=`rgba(0,160,80,${(1-d/MAX)*.08})`; ctx.lineWidth=.6; ctx.stroke();
          }
        }
      }
    }
    resize();
    const parts=Array.from({length:70},()=>new Particle());
    const web=new Web(parts);
    const loop=()=>{
      t+=.008; ctx.clearRect(0,0,W,H);
      [{x:W*.25,y:H*.35,r:400,h:130},{x:W*.75,y:H*.6,r:300,h:150},{x:W*.5,y:H*.2,r:250,h:115}].forEach(b=>{
        const bx=b.x+Math.sin(t*1.1)*50,by=b.y+Math.cos(t*.9)*30;
        const g=ctx.createRadialGradient(bx,by,0,bx,by,b.r);
        g.addColorStop(0,`hsla(${b.h},70%,55%,0.05)`); g.addColorStop(.5,`hsla(${b.h},60%,50%,0.02)`); g.addColorStop(1,`hsla(${b.h},60%,50%,0)`);
        ctx.fillStyle=g; ctx.beginPath(); ctx.arc(bx,by,b.r,0,Math.PI*2); ctx.fill();
      });
      web.draw(); parts.forEach(p=>{p.update();p.draw();});
      rafRef.current=requestAnimationFrame(loop);
    };
    loop(); window.addEventListener("resize",resize);
    return ()=>{cancelAnimationFrame(rafRef.current);window.removeEventListener("resize",resize);};
  },[]);
  return <canvas ref={cvRef} style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none"}}/>;
}

// ── SOLAR ORB ─────────────────────────────────────────────────────────────────
function SolarOrb({ size=260, style:sx }) {
  const cvRef=useRef(null); const raf=useRef(null);
  useEffect(()=>{
    const cv=cvRef.current; const ctx=cv.getContext("2d");
    const S=size*window.devicePixelRatio;
    cv.width=S; cv.height=S; ctx.scale(window.devicePixelRatio,window.devicePixelRatio);
    const C2=size/2; let t=0;
    const draw=()=>{
      t+=.016; ctx.clearRect(0,0,size,size);
      for(let r=3;r>=1;r--){
        const rs=C2*(.75+r*.12);
        const g=ctx.createRadialGradient(C2,C2,0,C2,C2,rs);
        g.addColorStop(0,"transparent"); g.addColorStop(.75,`rgba(0,180,80,${.015*r})`); g.addColorStop(.95,`rgba(0,180,80,${.06*r})`); g.addColorStop(1,"transparent");
        ctx.fillStyle=g; ctx.beginPath(); ctx.arc(C2,C2,rs,0,Math.PI*2); ctx.fill();
      }
      const iR=C2*.62;
      for(let i=0;i<12;i++){
        const a=(i/12)*Math.PI*2+t*.4;
        const r2=iR*(.88+Math.sin(t*2.1+i*1.3)*.12);
        const x=C2+Math.cos(a)*r2*(.55+Math.sin(t+i)*.08);
        const y=C2+Math.sin(a)*r2*(.55+Math.cos(t*1.3+i)*.08);
        const g2=ctx.createRadialGradient(x,y,0,x,y,iR*.32);
        const h=130+Math.sin(t+i)*20;
        g2.addColorStop(0,`hsla(${h},90%,50%,0.4)`); g2.addColorStop(1,"transparent");
        ctx.fillStyle=g2; ctx.beginPath(); ctx.arc(x,y,iR*.32,0,Math.PI*2); ctx.fill();
      }
      const core=ctx.createRadialGradient(C2,C2,0,C2,C2,iR*.9);
      core.addColorStop(0,"rgba(255,245,160,0.95)"); core.addColorStop(.3,"rgba(200,220,60,0.8)"); core.addColorStop(.6,"rgba(0,200,80,0.5)"); core.addColorStop(1,"transparent");
      ctx.fillStyle=core; ctx.beginPath(); ctx.arc(C2,C2,iR*.9,0,Math.PI*2); ctx.fill();
      for(let i=0;i<6;i++){
        const a=(i/6)*Math.PI*2+t*.25+Math.sin(t*.7+i)*.5;
        const len=iR*(.28+Math.sin(t*1.8+i*2.4)*.18);
        ctx.save(); ctx.translate(C2,C2); ctx.rotate(a);
        const fg=ctx.createLinearGradient(iR*.7,0,iR*.7+len,0);
        fg.addColorStop(0,"rgba(0,220,100,0.7)"); fg.addColorStop(1,"transparent");
        ctx.strokeStyle=fg; ctx.lineWidth=3+Math.sin(t+i)*2;
        ctx.beginPath(); ctx.moveTo(iR*.7,0); ctx.lineTo(iR*.7+len,0); ctx.stroke(); ctx.restore();
      }
      ctx.save(); ctx.globalCompositeOperation="overlay";
      for(let i=-3;i<=3;i++){
        ctx.strokeStyle="rgba(0,160,80,0.07)"; ctx.lineWidth=.5;
        const y2=C2+i*iR*.3; ctx.beginPath(); ctx.moveTo(C2-iR,y2); ctx.lineTo(C2+iR,y2); ctx.stroke();
        const x2=C2+i*iR*.3; ctx.beginPath(); ctx.moveTo(x2,C2-iR); ctx.lineTo(x2,C2+iR); ctx.stroke();
      }
      ctx.restore(); raf.current=requestAnimationFrame(draw);
    };
    draw(); return ()=>cancelAnimationFrame(raf.current);
  },[size]);
  return <canvas ref={cvRef} style={{width:size,height:size,...sx}}/>;
}

// ── HEX GRID ──────────────────────────────────────────────────────────────────
function HexGrid3D({ style:sx }) {
  const cvRef=useRef(null); const raf=useRef(null);
  useEffect(()=>{
    const cv=cvRef.current; const ctx=cv.getContext("2d");
    let t=0,W=520,H=380; cv.width=W; cv.height=H;
    const hex=(cx,cy,r,fill,stroke,alpha)=>{
      ctx.beginPath();
      for(let i=0;i<6;i++){const a=(Math.PI/3)*i-Math.PI/6; i===0?ctx.moveTo(cx+r*Math.cos(a),cy+r*Math.sin(a)):ctx.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a));}
      ctx.closePath(); ctx.globalAlpha=alpha;
      if(fill){ctx.fillStyle=fill;ctx.fill();}
      if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=.8;ctx.stroke();}
      ctx.globalAlpha=1;
    };
    const draw=()=>{
      t+=.012; ctx.clearRect(0,0,W,H);
      ctx.fillStyle="rgba(232,247,239,0.5)"; ctx.fillRect(0,0,W,H);
      const cols=8,rows=6,R=32,xOff=20,yOff=18;
      for(let row=0;row<rows;row++) for(let col=0;col<cols;col++){
        const cx=xOff+col*R*1.75+(row%2)*R*.875;
        const cy=yOff+row*R*1.52;
        const d=Math.sqrt((cx-W/2)**2+(cy-H/2)**2);
        const wave=Math.sin(t*1.4-d*.015)*.5+.5;
        const en=wave>.6;
        const alpha=.15+wave*.5;
        const h=en?130:(wave>.35?145:160);
        hex(cx,cy,R*.88,`hsla(${h},${en?80:40}%,${en?50:65}%,${alpha*.8})`,`hsla(${h},70%,${en?45:60}%,${alpha*.5})`,1);
        if(en){
          hex(cx,cy,R*.55,null,`rgba(0,200,100,${.4+wave*.3})`,1);
          ctx.beginPath(); ctx.arc(cx,cy,3+wave*3,0,Math.PI*2);
          ctx.fillStyle=`rgba(0,200,100,${.7+wave*.3})`; ctx.fill();
        }
      }
      const scanY=(Math.sin(t*.35)+1)/2*H;
      const scanG=ctx.createLinearGradient(0,scanY-20,0,scanY+20);
      scanG.addColorStop(0,"transparent"); scanG.addColorStop(.5,"rgba(0,180,80,0.1)"); scanG.addColorStop(1,"transparent");
      ctx.fillStyle=scanG; ctx.fillRect(0,scanY-20,W,40);
      raf.current=requestAnimationFrame(draw);
    };
    draw(); return ()=>cancelAnimationFrame(raf.current);
  },[]);
  return <canvas ref={cvRef} style={{width:520,height:380,...sx}}/>;
}

// ── ORBITAL DIAGRAM ───────────────────────────────────────────────────────────
function OrbitalDiagram({ style:sx }) {
  const cvRef=useRef(null); const raf=useRef(null);
  useEffect(()=>{
    const cv=cvRef.current; const ctx=cv.getContext("2d");
    const S=480; cv.width=S; cv.height=S; const C2=S/2; let t=0;
    const nodes=[
      {label:"Solar Panels",num:"1",color:"#00b85a",r:80,speed:1,phase:0,icon:"☀"},
      {label:"Power Grid",num:"2",color:"#00a8ff",r:130,speed:.65,phase:1.2,icon:"⚡"},
      {label:"Your Home",num:"3",color:"#f5b800",r:178,speed:.42,phase:2.5,icon:"🏡"},
      {label:"Battery Bank",num:"4",color:"#ff6b35",r:220,speed:.28,phase:4.1,icon:"🔋"},
    ];
    const draw=()=>{
      t+=.012; ctx.clearRect(0,0,S,S);
      nodes.forEach(n=>{
        ctx.beginPath(); ctx.arc(C2,C2,n.r,0,Math.PI*2);
        ctx.strokeStyle=`${n.color}44`; ctx.lineWidth=1.2; ctx.setLineDash([5,7]); ctx.stroke(); ctx.setLineDash([]);
      });
      const core=ctx.createRadialGradient(C2,C2,0,C2,C2,40);
      core.addColorStop(0,"rgba(255,245,160,0.98)"); core.addColorStop(.4,"rgba(200,220,40,0.85)"); core.addColorStop(.8,"rgba(0,200,80,0.4)"); core.addColorStop(1,"transparent");
      ctx.fillStyle=core; ctx.beginPath(); ctx.arc(C2,C2,44,0,Math.PI*2); ctx.fill();
      const glow=ctx.createRadialGradient(C2,C2,0,C2,C2,60);
      glow.addColorStop(0,"rgba(255,230,80,0.15)"); glow.addColorStop(1,"transparent");
      ctx.fillStyle=glow; ctx.beginPath(); ctx.arc(C2,C2,60,0,Math.PI*2); ctx.fill();
      ctx.font="bold 22px 'DM Sans'"; ctx.fillStyle="#fff"; ctx.textAlign="center"; ctx.textBaseline="middle";
      ctx.fillText("☀",C2,C2);
      nodes.forEach(n=>{
        const a=t*n.speed+n.phase;
        const x=C2+Math.cos(a)*n.r; const y=C2+Math.sin(a)*n.r;
        for(let i=1;i<=12;i++){
          const ta=a-i*.16; const tx=C2+Math.cos(ta)*n.r,ty=C2+Math.sin(ta)*n.r;
          ctx.beginPath(); ctx.arc(tx,ty,2.5,0,Math.PI*2);
          ctx.fillStyle=`${n.color}${Math.floor((1-i/12)*50).toString(16).padStart(2,"0")}`; ctx.fill();
        }
        const ng=ctx.createRadialGradient(x,y,0,x,y,22);
        ng.addColorStop(0,n.color+"cc"); ng.addColorStop(1,"transparent");
        ctx.fillStyle=ng; ctx.beginPath(); ctx.arc(x,y,22,0,Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(x,y,13,0,Math.PI*2); ctx.fillStyle=n.color; ctx.fill();
        ctx.strokeStyle="rgba(255,255,255,0.6)"; ctx.lineWidth=1.5; ctx.stroke();
        ctx.font="bold 9px 'DM Sans'"; ctx.fillStyle="#fff"; ctx.textAlign="center"; ctx.textBaseline="middle";
        ctx.fillText(n.num,x,y);
        const lAngle=a;
        const labelR=n.r+32;
        const lx=C2+Math.cos(lAngle)*labelR;
        const ly=C2+Math.sin(lAngle)*labelR;
        const labelW=ctx.measureText(n.label).width+14;
        ctx.fillStyle=`${n.color}22`;
        ctx.beginPath();
        ctx.roundRect(lx-labelW/2,ly-9,labelW,18,9);
        ctx.fill();
        ctx.strokeStyle=`${n.color}55`; ctx.lineWidth=0.8; ctx.stroke();
        ctx.font="10px 'DM Sans'"; ctx.fillStyle=n.color; ctx.textAlign="center"; ctx.textBaseline="middle";
        ctx.fillText(n.label,lx,ly);
        ctx.beginPath(); ctx.moveTo(C2,C2); ctx.lineTo(x,y);
        ctx.strokeStyle=`${n.color}30`; ctx.lineWidth=1; ctx.stroke();
      });
      raf.current=requestAnimationFrame(draw);
    };
    draw(); return ()=>cancelAnimationFrame(raf.current);
  },[]);
  return <canvas ref={cvRef} style={{width:480,height:480,...sx}}/>;
}

// ── SCROLL HOOK — ONE-SHOT: triggers on first enter, never resets ─────────────
// This prevents blank-page flash when scrolling back to top
function useInView(threshold=.1) {
  const ref=useRef(null);
  const [v,setV]=useState(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{
      if(e.isIntersecting) {
        setV(true);
        obs.disconnect(); // Fire once, then stop observing — no reset on scroll up
      }
    },{threshold});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[threshold]);
  return [ref,v];
}

function useCountUp(target,dur=2000,go=false) {
  const [val,setVal]=useState(0);
  useEffect(()=>{
    if(!go){setVal(0);return;}
    let s=null;
    const ease=t=>1-Math.pow(1-t,4);
    const fn=ts=>{if(!s)s=ts;const p=Math.min((ts-s)/dur,1);setVal(Math.floor(ease(p)*target));if(p<1)requestAnimationFrame(fn);else setVal(target);};
    requestAnimationFrame(fn);
  },[target,dur,go]);
  return val;
}

// ── CURSOR ────────────────────────────────────────────────────────────────────
function Cursor() {
  const dot=useRef(null); const ring=useRef(null);
  const p=useRef({x:0,y:0}); const rp=useRef({x:0,y:0});
  const raf=useRef(null); const [hov,setHov]=useState(false);
  useEffect(()=>{
    const mv=e=>{p.current={x:e.clientX,y:e.clientY};};
    window.addEventListener("mousemove",mv);
    const on=()=>setHov(true),off=()=>setHov(false);
    document.querySelectorAll("button,a").forEach(el=>{el.addEventListener("mouseenter",on);el.addEventListener("mouseleave",off);});
    const loop=()=>{
      if(dot.current&&ring.current){
        dot.current.style.transform=`translate(${p.current.x-4}px,${p.current.y-4}px)`;
        rp.current.x+=(p.current.x-rp.current.x)*.1;
        rp.current.y+=(p.current.y-rp.current.y)*.1;
        const sz=hov?44:26;
        ring.current.style.transform=`translate(${rp.current.x-sz/2}px,${rp.current.y-sz/2}px)`;
        ring.current.style.width=sz+"px"; ring.current.style.height=sz+"px";
      }
      raf.current=requestAnimationFrame(loop);
    };
    loop();
    return ()=>{window.removeEventListener("mousemove",mv);cancelAnimationFrame(raf.current);};
  },[hov]);
  return (<>
    <div ref={dot} style={{position:"fixed",top:0,left:0,width:8,height:8,background:C.accent,borderRadius:"50%",pointerEvents:"none",zIndex:99999,mixBlendMode:"multiply"}}/>
    <div ref={ring} style={{position:"fixed",top:0,left:0,width:26,height:26,border:`2px solid ${C.accent}`,borderRadius:"50%",pointerEvents:"none",zIndex:99998,transition:"width .25s,height .25s",opacity:.7}}/>
  </>);
}

// ── SCROLL BAR ────────────────────────────────────────────────────────────────
function ScrollBar() {
  const [p,setP]=useState(0);
  useEffect(()=>{
    const h=()=>{const d=document.documentElement;setP(window.scrollY/(d.scrollHeight-d.clientHeight)*100);};
    window.addEventListener("scroll",h,{passive:true}); return ()=>window.removeEventListener("scroll",h);
  },[]);
  return (
    <div style={{position:"fixed",top:0,left:0,right:0,height:3,zIndex:9999,background:"rgba(0,160,80,0.1)"}}>
      <div style={{height:"100%",width:`${p}%`,background:`linear-gradient(90deg,${C.deep},${C.accent},${C.lime})`,transition:"width .08s linear",boxShadow:`0 0 8px ${C.accent}`}}/>
    </div>
  );
}

// ── NAV — with entrance animation ────────────────────────────────────────────
function Nav() {
  const [scrolled,setScrolled]=useState(false);
  const [active,setActive]=useState(null);
  const [mounted,setMounted]=useState(false);

  useEffect(()=>{
    // Trigger entrance animation shortly after mount
    const t=setTimeout(()=>setMounted(true),80);
    const h=()=>setScrolled(window.scrollY>60);
    window.addEventListener("scroll",h,{passive:true});
    return ()=>{clearTimeout(t);window.removeEventListener("scroll",h);};
  },[]);

  const go=id=>document.querySelector(id)?.scrollIntoView({behavior:"smooth"});
  const links=["About","Solutions","Process","Reviews","Contact"];

  return (
    <nav style={{
      position:"fixed",top:0,left:0,right:0,zIndex:500,
      padding:scrolled?"0.6rem 3rem":"0.95rem 3rem",
      display:"flex",alignItems:"center",justifyContent:"space-between",
      backdropFilter:"blur(28px)",WebkitBackdropFilter:"blur(28px)",
      background:scrolled?`rgba(5,43,20,0.97)`:`rgba(5,43,20,0.92)`,
      borderBottom:`1px solid rgba(0,180,80,0.25)`,
      // Entrance: slide down from above
      transform:mounted?"translateY(0)":"translateY(-100%)",
      opacity:mounted?1:0,
      transition:"transform .7s cubic-bezier(.22,1,.36,1), opacity .7s ease, padding .4s cubic-bezier(.22,1,.36,1), background .4s",
      animation:mounted?"navGlow 4s ease-in-out infinite":"none",
      boxShadow:"0 4px 40px rgba(0,0,0,0.3)",
    }}>
      {/* Logo — delayed reveal */}
      <div style={{
        display:"flex",alignItems:"center",gap:"0.6rem",
        fontFamily:"'Exo 2',sans-serif",fontSize:"1.3rem",fontWeight:800,
        letterSpacing:"-0.02em",color:"#fff",
        opacity:mounted?1:0,
        transform:mounted?"translateX(0) scale(1)":"translateX(-20px) scale(0.8)",
        transition:"opacity .6s .3s, transform .6s .3s cubic-bezier(.34,1.56,.64,1)",
      }}>
        <div style={{
          width:32,height:32,
          background:`linear-gradient(135deg,${C.accent},${C.lime})`,
          borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",
          boxShadow:`0 0 20px ${C.accent}88`,
          animation:mounted?"glowPulse 3s ease-in-out infinite":"none",
        }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.2} strokeLinecap="round">
            <circle cx={12} cy={12} r={4}/>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2"/>
          </svg>
        </div>
        <span style={{color:"#fff"}}>Go<span style={{color:C.lime}}>Green</span></span>
      </div>

      {/* Nav links — staggered fade-in from top */}
      <div style={{display:"flex",gap:"2rem"}}>
        {links.map((l,i)=>(
          <button key={l}
            onMouseEnter={()=>setActive(l)}
            onMouseLeave={()=>setActive(null)}
            onClick={()=>go(`#${l.toLowerCase()}`)}
            style={{
              background:"none",border:"none",
              fontFamily:"'DM Sans',sans-serif",fontSize:"0.85rem",fontWeight:500,
              letterSpacing:"0.04em",
              color:active===l?C.lime:C.htxt2,
              transition:"color .2s",
              padding:"4px 0",position:"relative",
              opacity:mounted?1:0,
              transform:mounted?"translateY(0)":"translateY(-10px)",
              // Each link staggers by 0.07s, starting after nav slides in
              transitionProperty:"color, opacity, transform",
              transitionDuration:`.2s, .5s, .5s`,
              transitionDelay:`0s, ${.35+i*.07}s, ${.35+i*.07}s`,
              transitionTimingFunction:"ease, cubic-bezier(.22,1,.36,1), cubic-bezier(.22,1,.36,1)",
            }}>
            {l}
            {active===l&&<div style={{position:"absolute",bottom:-3,left:0,right:0,height:2,background:`linear-gradient(90deg,${C.accent},${C.lime})`,borderRadius:1}}/>}
          </button>
        ))}
      </div>

      {/* CTA button — delayed slide in from right */}
      <button
        onClick={()=>go("#contact")}
        style={{
          padding:"0.6rem 1.4rem",
          background:`linear-gradient(135deg,${C.accent},${C.lime})`,
          border:"none",borderRadius:8,
          fontFamily:"'Exo 2',sans-serif",fontWeight:700,fontSize:"0.82rem",
          color:"#fff",letterSpacing:"0.04em",
          boxShadow:`0 0 24px ${C.accent}55`,
          opacity:mounted?1:0,
          transform:mounted?"translateX(0) scale(1)":"translateX(20px) scale(0.8)",
          transition:"opacity .6s .6s, transform .6s .6s cubic-bezier(.34,1.56,.64,1), box-shadow .25s",
        }}
        onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.06)";e.currentTarget.style.boxShadow=`0 0 40px ${C.lime}88`;}}
        onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow=`0 0 24px ${C.accent}55`;}}>
        Get Quote ✦
      </button>
    </nav>
  );
}

// ── HERO ──────────────────────────────────────────────────────────────────────
function Hero() {
  const [vis,setVis]=useState(false);
  const orbRef=useRef(null);
  useEffect(()=>{
    setTimeout(()=>setVis(true),120);
    const mv=e=>{
      if(!orbRef.current) return;
      const nx=(e.clientX/window.innerWidth-.5)*32,ny=(e.clientY/window.innerHeight-.5)*20;
      orbRef.current.style.transform=`translate(calc(-50% + ${nx}px),calc(-50% + ${ny}px))`;
    };
    window.addEventListener("mousemove",mv); return ()=>window.removeEventListener("mousemove",mv);
  },[]);
  return (
    <section style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"7rem 2rem 3rem",overflow:"hidden",position:"relative",textAlign:"center",background:`linear-gradient(160deg,${C.bg} 0%,${C.bg2} 40%,${C.bg3} 100%)`}}>
      <div style={{position:"absolute",inset:0,backgroundImage:`linear-gradient(${C.border2} 1px,transparent 1px),linear-gradient(90deg,${C.border2} 1px,transparent 1px)`,backgroundSize:"60px 60px",animation:"gridShift 12s linear infinite",opacity:.5,zIndex:1}}/>
      <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 90% 80% at 50% 50%,transparent 30%,${C.bg} 95%)`,zIndex:2,pointerEvents:"none"}}/>
      <div style={{position:"absolute",width:700,height:700,top:"50%",left:"30%",transform:"translate(-50%,-50%)",background:`radial-gradient(circle,${C.accent}12 0%,transparent 70%)`,animation:"plasma 14s ease-in-out infinite",zIndex:1}}/>
      <div style={{position:"absolute",width:500,height:500,top:"40%",left:"72%",transform:"translate(-50%,-50%)",background:`radial-gradient(circle,${C.lime}0a 0%,transparent 70%)`,animation:"plasma 10s 3s ease-in-out infinite",zIndex:1}}/>
      <div style={{position:"absolute",top:"50%",left:"3%",transform:"translateY(-50%)",width:280,height:180,borderRadius:20,overflow:"hidden",border:`2px solid ${C.border}`,boxShadow:`0 20px 60px rgba(0,100,40,0.2)`,animation:"videoFloat 5s ease-in-out infinite",zIndex:5,opacity:vis?1:0,transition:"opacity 1.2s 1.4s"}}>
        <video src="/mnt/user-data/uploads/WhatsApp_Video_2026-04-23_at_10_11_01_PM.mp4" autoPlay muted loop playsInline style={{width:"100%",height:"100%",objectFit:"cover"}}/>
        <div style={{position:"absolute",inset:0,background:`linear-gradient(transparent 60%,${C.bg3}99)`}}/>
        <div style={{position:"absolute",bottom:10,left:12,fontSize:"0.68rem",fontWeight:700,color:C.deep,textTransform:"uppercase",letterSpacing:"0.08em"}}>🌱 Live Install</div>
      </div>
      <div ref={orbRef} style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",zIndex:3,opacity:.7,transition:"transform .08s linear"}}>
        <SolarOrb size={400}/>
      </div>
      <div style={{position:"relative",zIndex:10}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:"0.5rem",padding:"0.35rem 1.1rem",border:`1px solid ${C.border}`,borderRadius:100,fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:C.deep,background:`rgba(0,180,80,0.08)`,marginBottom:"1.8rem",opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(20px)",transition:"all .7s .1s",boxShadow:`0 4px 20px rgba(0,160,80,0.1)`}}>
          <span style={{width:5,height:5,background:C.accent,borderRadius:"50%",animation:"blink 2s infinite"}}/>
          Hyderabad's #1 Solar Installer
        </div>
        <h1 style={{fontFamily:"'Exo 2',sans-serif",fontSize:"clamp(3rem,8vw,7rem)",fontWeight:800,lineHeight:.9,letterSpacing:"-0.05em",marginBottom:"1.4rem"}}>
          {[{w:"POWER",c:C.text},{w:"YOUR",c:"gradient"},{w:"WORLD",c:C.deep}].map((item,i)=>(
            <div key={item.w} style={{display:"block",opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(-50px)",transition:`all .7s ${.15+i*.12}s cubic-bezier(.22,1,.36,1)`,background:item.c==="gradient"?`linear-gradient(135deg,${C.deep},${C.accent},${C.lime},${C.gold})`:"none",WebkitBackgroundClip:item.c==="gradient"?"text":"initial",WebkitTextFillColor:item.c==="gradient"?"transparent":"initial",backgroundClip:item.c==="gradient"?"text":"initial",color:item.c==="gradient"?"transparent":item.c}}>{item.w}</div>
          ))}
        </h1>
        <p style={{fontSize:"1rem",color:C.text2,maxWidth:480,lineHeight:1.85,margin:"0 auto 2.5rem",opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(20px)",transition:"all .8s .5s cubic-bezier(.22,1,.36,1)"}}>
          Premium solar installations engineered for maximum output. Cut your electricity bills by up to <strong style={{color:C.deep}}>90%</strong> while powering a sustainable future.
        </p>
        <div style={{display:"flex",gap:"1rem",flexWrap:"wrap",justifyContent:"center",opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(20px)",transition:"all .8s .65s"}}>
          <button onClick={()=>document.querySelector("#contact")?.scrollIntoView({behavior:"smooth"})} style={{padding:"0.9rem 2.4rem",background:`linear-gradient(135deg,${C.deep},${C.accent})`,color:"#fff",border:"none",borderRadius:12,fontFamily:"'Exo 2',sans-serif",fontWeight:700,fontSize:"0.95rem",letterSpacing:"0.02em",boxShadow:`0 8px 40px ${C.accent}55`,transition:"all .25s",position:"relative",overflow:"hidden"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px) scale(1.02)";e.currentTarget.style.boxShadow=`0 15px 50px ${C.accent}77`;}} onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=`0 8px 40px ${C.accent}55`;}}>Get Free Quote →</button>
          <button onClick={()=>document.querySelector("#solutions")?.scrollIntoView({behavior:"smooth"})} style={{padding:"0.9rem 2.4rem",background:"rgba(0,100,50,0.08)",color:C.deep,border:`1px solid ${C.border}`,borderRadius:12,fontFamily:"'Exo 2',sans-serif",fontWeight:600,fontSize:"0.95rem",backdropFilter:"blur(12px)",transition:"all .25s"}} onMouseEnter={e=>{e.currentTarget.style.background=`rgba(0,160,80,0.15)`;e.currentTarget.style.borderColor=C.accent;}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(0,100,50,0.08)";e.currentTarget.style.borderColor=C.border;}}>Explore Solutions ↓</button>
        </div>
        <div style={{position:"absolute",top:"10rem",left:"-15rem",padding:"0.75rem 1.1rem",borderRadius:14,background:`linear-gradient(135deg,${C.bg},${C.bg2})`,border:`1px solid ${C.border}`,backdropFilter:"blur(20px)",animation:"float1 6s ease-in-out infinite",opacity:vis?1:0,transition:"opacity 1s 1s",zIndex:5,boxShadow:"0 10px 40px rgba(0,100,40,0.12)"}}>
          <div style={{fontSize:"0.65rem",color:C.muted,textTransform:"uppercase",letterSpacing:"0.08em"}}>Today's Generation</div>
          <div style={{fontFamily:"'Exo 2',sans-serif",fontSize:"1.5rem",fontWeight:800,color:C.accent}}>4.2 <span style={{fontSize:"0.85rem"}}>kWh</span></div>
        </div>
        <div style={{position:"absolute",top:"10rem",right:"-15rem",padding:"0.75rem 1.1rem",borderRadius:14,background:`linear-gradient(135deg,${C.bg},${C.bg2})`,border:`1px solid ${C.border}`,backdropFilter:"blur(20px)",animation:"float2 7s ease-in-out infinite",opacity:vis?1:0,transition:"opacity 1s 1.2s",zIndex:5,boxShadow:"0 10px 40px rgba(0,100,40,0.12)"}}>
          <div style={{fontSize:"0.65rem",color:C.muted,textTransform:"uppercase",letterSpacing:"0.08em"}}>Savings Today</div>
          <div style={{fontFamily:"'Exo 2',sans-serif",fontSize:"1.5rem",fontWeight:800,color:C.gold}}>₹3,200</div>
        </div>
        <div style={{position:"absolute",top:"14rem",right:"-15rem",padding:"0.75rem 1.1rem",borderRadius:14,background:`linear-gradient(135deg,${C.bg3},${C.bg4})`,border:`1px solid ${C.border}`,animation:"float3 5s ease-in-out infinite",opacity:vis?1:0,transition:"opacity 1s 1.4s",zIndex:5,boxShadow:"0 10px 30px rgba(0,100,40,0.1)"}}>
          <div style={{fontSize:"0.65rem",color:C.muted,textTransform:"uppercase",letterSpacing:"0.08em"}}>CO₂ Offset</div>
          <div style={{fontFamily:"'Exo 2',sans-serif",fontSize:"1.4rem",fontWeight:800,color:C.forest}}>2.1 <span style={{fontSize:"0.8rem"}}>T/yr</span></div>
        </div>
      </div>

    </section>
  );
}

// ── STATS ─────────────────────────────────────────────────────────────────────
function Stats() {
  const [ref,inView]=useInView(.2);
  const data=[
    {v:5000,sfx:"+",label:"Installations",color:C.accent,icon:"🏡"},
    {v:98,sfx:"%",label:"Satisfaction",color:C.emerald,icon:"⭐"},
    {v:25,sfx:"yr",label:"Warranty",color:C.gold,icon:"🔒"},
    {v:15,sfx:"+",label:"Yrs Experience",color:C.coral,icon:"🏆"},
  ];
  return (
    <div ref={ref} style={{padding:"0 3rem 3rem",position:"relative",zIndex:10,background:`linear-gradient(180deg,${C.bg3},${C.bg2})`}}>
      <svg style={{display:"block",marginTop:-2}} viewBox="0 0 1440 60" preserveAspectRatio="none" height={60}><path d={`M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z`} fill={C.bg3}/></svg>
      <div style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1rem"}}>
        {data.map((d,i)=>{
          const n=useCountUp(d.v,2000,inView);
          return (
            <div key={d.label} style={{padding:"1.8rem",borderRadius:20,background:C.panel,border:`1px solid ${C.border}`,backdropFilter:"blur(24px)",textAlign:"center",opacity:inView?1:0,transform:inView?"scale(1) translateY(0)":"scale(0.7) translateY(20px)",transition:`all .7s ${i*.12}s cubic-bezier(.34,1.56,.64,1)`,boxShadow:"0 8px 30px rgba(0,100,40,0.08)"}}>
              <div style={{fontSize:"1.8rem",marginBottom:"0.3rem"}}>{d.icon}</div>
              <div style={{fontFamily:"'Exo 2',sans-serif",fontSize:"2.8rem",fontWeight:800,color:d.color,lineHeight:1,letterSpacing:"-0.04em"}}>{n.toLocaleString()}{d.sfx}</div>
              <div style={{fontSize:"0.72rem",color:C.muted,textTransform:"uppercase",letterSpacing:"0.1em",marginTop:"0.4rem"}}>{d.label}</div>
              <div style={{marginTop:"1rem",height:3,background:C.bg3,borderRadius:2,overflow:"hidden"}}>
                <div style={{height:"100%",width:inView?"100%":"0%",background:`linear-gradient(90deg,${d.color}66,${d.color})`,transition:`width 2s ${i*.15}s ease`,borderRadius:2}}/>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── ABOUT ─────────────────────────────────────────────────────────────────────
function About() {
  const [ref,inView]=useInView(.1);
  const pills=["High-Efficiency Panels","25-yr Warranty","Fast Install","Battery Storage","Net Metering","AI Monitoring","Govt. Subsidy","Zero EMI"];
  return (
    <section id="about" ref={ref} style={{padding:"4rem 3rem",position:"relative",zIndex:10,background:`linear-gradient(160deg,${C.bg2},${C.bg})`}}>
      <div style={{position:"absolute",top:"50%",right:"3%",transform:"translateY(-50%)",width:500,height:500,borderRadius:"50%",background:`radial-gradient(circle,${C.accent}08,transparent 70%)`,pointerEvents:"none",animation:"pulseGlow 5s ease-in-out infinite"}}/>
      <div style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6rem",alignItems:"center"}}>
        <div style={{opacity:inView?1:0,transform:inView?"translateX(0)":"translateX(-70px)",transition:"all 1s cubic-bezier(.22,1,.36,1)"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:"0.5rem",fontSize:"0.68rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.14em",color:C.accent,marginBottom:"0.8rem"}}>
            <div style={{width:24,height:2,background:`linear-gradient(90deg,${C.accent},${C.lime})`}}/>About Us
          </div>
          <h2 style={{fontFamily:"'Exo 2',sans-serif",fontSize:"clamp(2rem,4.5vw,3.2rem)",fontWeight:800,lineHeight:1.05,letterSpacing:"-0.04em",marginBottom:"1.2rem",color:C.text}}>
            Leading<br/><span style={{color:C.accent}}>Hyderabad's</span><br/>Solar Revolution
          </h2>
          <p style={{color:C.text2,lineHeight:1.85,marginBottom:"1rem",fontSize:"0.92rem"}}>Since 2009, Go Green has been at the forefront of clean energy adoption in Telangana. We've helped over 5,000 homes and businesses slash their electricity bills while contributing to a greener planet.</p>
          <p style={{color:C.text2,lineHeight:1.85,fontSize:"0.92rem"}}>Our team of certified engineers designs each system for maximum performance — from site assessment to post-installation monitoring — ensuring decades of reliable, clean power.</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:"0.5rem",marginTop:"2rem"}}>
            {pills.map((p,i)=>(
              <div key={p} style={{padding:"0.4rem 0.9rem",border:`1px solid ${C.border}`,borderRadius:100,fontSize:"0.73rem",color:C.deep,background:`linear-gradient(135deg,rgba(0,180,80,0.06),rgba(0,120,60,0.04))`,opacity:inView?1:0,transform:inView?"translateY(0) rotate(0deg)":"translateY(15px) rotate(-3deg)",transition:`all .5s ${.3+i*.06}s cubic-bezier(.34,1.56,.64,1)`,fontWeight:500}}>{p}</div>
            ))}
          </div>
        </div>
        <div style={{opacity:inView?1:0,transform:inView?"translateX(0)":"translateX(70px)",transition:"all 1s .2s cubic-bezier(.22,1,.36,1)",position:"relative"}}>
          <div style={{position:"absolute",inset:-2,borderRadius:22,background:`linear-gradient(135deg,${C.accent}44,${C.lime}22,transparent)`,zIndex:0,animation:"borderRot 8s linear infinite"}}/>
          <div style={{position:"relative",borderRadius:20,overflow:"hidden",border:`1px solid ${C.border}`,background:C.bg2,zIndex:1,boxShadow:`0 20px 60px rgba(0,100,40,0.12)`}}>
            <HexGrid3D/>
            <div style={{position:"absolute",bottom:16,left:16,padding:"0.5rem 0.85rem",borderRadius:10,background:"rgba(255,255,255,0.9)",border:`1px solid ${C.border}`,backdropFilter:"blur(12px)"}}>
              <div style={{fontSize:"0.65rem",color:C.muted,textTransform:"uppercase",letterSpacing:"0.08em"}}>Live Grid Status</div>
              <div style={{display:"flex",alignItems:"center",gap:"0.4rem",marginTop:"0.2rem"}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:C.accent,animation:"blink 1.5s infinite"}}/>
                <span style={{fontSize:"0.8rem",fontWeight:600,color:C.deep}}>94 cells active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── VIDEO SECTION ─────────────────────────────────────────────────────────────
function VideoSection() {
  const [ref,inView]=useInView(.15);
  return (
    <section style={{padding:"3rem 3rem",background:`linear-gradient(135deg,${C.forest},${C.deep})`,position:"relative",zIndex:10,overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:`radial-gradient(${C.lime}22 1px,transparent 1px)`,backgroundSize:"30px 30px",opacity:.4}}/>
      <div ref={ref} style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"5rem",alignItems:"center"}}>
        <div style={{opacity:inView?1:0,transform:inView?"translateY(0)":"translateY(60px)",transition:"all 1s cubic-bezier(.22,1,.36,1)"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:"0.5rem",fontSize:"0.68rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.14em",color:C.lime,marginBottom:"0.8rem"}}>
            <div style={{width:24,height:2,background:`linear-gradient(90deg,${C.lime},${C.accent})`}}/>See Us In Action
          </div>
          <h2 style={{fontFamily:"'Exo 2',sans-serif",fontSize:"clamp(1.8rem,3.5vw,2.8rem)",fontWeight:800,lineHeight:1.1,letterSpacing:"-0.04em",marginBottom:"1rem",color:"#fff"}}>Real Projects,<br/><span style={{color:C.lime}}>Real Results</span></h2>
          <p style={{color:"rgba(255,255,255,0.7)",lineHeight:1.85,marginBottom:"1.5rem",fontSize:"0.9rem"}}>Watch our team deliver flawless solar installations across Hyderabad. From rooftop panels to ground-mounted arrays — every project built to last 25+ years.</p>
          {[{icon:"⚡","text":"Average installation: 1–2 days"},{icon:"🛡","text":"MNRE certified installation team"},{icon:"📱","text":"Real-time mobile monitoring app"}].map((item,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:"0.8rem",marginBottom:"0.7rem",opacity:inView?1:0,transform:inView?"translateX(0)":"translateX(-30px)",transition:`all .6s ${.3+i*.1}s`}}>
              <span style={{fontSize:"1.2rem"}}>{item.icon}</span>
              <span style={{color:"rgba(255,255,255,0.8)",fontSize:"0.875rem"}}>{item.text}</span>
            </div>
          ))}
        </div>
        <div style={{opacity:inView?1:0,transform:inView?"scale(1)":"scale(0.8)",transition:"all 1s .3s cubic-bezier(.22,1,.36,1)",position:"relative"}}>
          <div style={{position:"absolute",inset:-4,borderRadius:24,background:`linear-gradient(135deg,${C.lime}66,${C.accent}44)`,zIndex:0,animation:"glowPulse 3s ease-in-out infinite"}}/>
          <div style={{position:"relative",borderRadius:20,overflow:"hidden",zIndex:1,boxShadow:`0 30px 80px rgba(0,0,0,0.4)`}}>
            <video src="/mnt/user-data/uploads/WhatsApp_Video_2026-04-23_at_10_11_01_PM.mp4" autoPlay muted loop playsInline style={{width:"100%",display:"block",maxHeight:340,objectFit:"cover"}}/>
            <div style={{position:"absolute",inset:0,background:`linear-gradient(transparent 50%,${C.forest}cc)`,pointerEvents:"none"}}/>
            <div style={{position:"absolute",bottom:16,left:16,right:16,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",alignItems:"center",gap:"0.4rem"}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:"#ff3b3b",animation:"blink 1s infinite"}}/>
                <span style={{color:"#fff",fontSize:"0.72rem",fontWeight:600}}>LIVE • Solar Installation</span>
              </div>
              <div style={{padding:"0.25rem 0.6rem",borderRadius:6,background:"rgba(0,0,0,0.5)",border:"1px solid rgba(255,255,255,0.2)"}}>
                <span style={{color:C.lime,fontSize:"0.68rem",fontWeight:700}}>HD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SOLUTIONS ─────────────────────────────────────────────────────────────────
function Solutions() {
  const [ref,inView]=useInView(.1);
  const [hov,setHov]=useState(null);
  const cards=[
    {n:"01",title:"Residential Rooftop",desc:"Transform your home into a power plant. Sleek panels that cut bills by up to 90% with AI-based monitoring.",color:C.accent,bg:C.bg2,icon:<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>,feats:["Grid-tied with net metering","Real-time app monitoring","25-yr performance warranty"]},
    {n:"02",title:"Commercial Systems",desc:"Large-scale solar for businesses and factories. ROI in 3–5 years with full subsidy support.",color:C.emerald,bg:C.bg3,icon:<><rect x={2} y={7} width={20} height={14} rx={2}/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></>,feats:["Scalable 10kW to 10MW","Tax & depreciation benefits","Dedicated commercial team"]},
    {n:"03",title:"Ground-Mounted",desc:"Maximum energy yield for open land. Dual-axis tracking for seasonal optimization.",color:C.gold,bg:C.bg2,icon:<><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></>,feats:["Dual-axis tracking option","25% more than rooftop","Minimal maintenance design"]},
    {n:"04",title:"Off-Grid Systems",desc:"Complete energy independence with lithium battery storage. Perfect for remote locations.",color:C.coral,bg:C.bg3,icon:<><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></>,feats:["Lithium battery backup","Zero grid dependency","Satellite remote monitoring"]},
  ];
  return (
    <section id="solutions" style={{padding:"4rem 3rem",position:"relative",zIndex:10,background:`linear-gradient(160deg,${C.bg},${C.bg3})`}}>
      <div ref={ref} style={{textAlign:"center",maxWidth:540,margin:"0 auto 3rem",opacity:inView?1:0,transform:inView?"translateY(0) scale(1)":"translateY(-40px) scale(0.9)",transition:"all .8s cubic-bezier(.22,1,.36,1)"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:"0.5rem",fontSize:"0.68rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.14em",color:C.accent,marginBottom:"0.75rem"}}>
          <div style={{width:20,height:2,background:`linear-gradient(90deg,${C.accent},${C.lime})`}}/>Our Solutions
        </div>
        <h2 style={{fontFamily:"'Exo 2',sans-serif",fontSize:"clamp(2rem,4.5vw,3.2rem)",fontWeight:800,lineHeight:1.05,letterSpacing:"-0.04em",color:C.text}}>Solar Systems We <span style={{color:C.accent,textDecoration:"underline",textDecorationColor:`${C.lime}88`,textUnderlineOffset:"6px"}}>Install</span></h2>
      </div>
      <div style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"1.2rem"}}>
        {cards.map((c,i)=>{
          const transitionStyles=[
            {opacity:inView?1:0,transform:inView?"rotate(0deg) scale(1)":"rotate(-15deg) scale(0.8)",transition:`all .7s ${i*.1}s cubic-bezier(.34,1.56,.64,1)`},
            {opacity:inView?1:0,transform:inView?"translateY(0)":"translateY(50px)",transition:`all .7s ${i*.1}s cubic-bezier(.22,1,.36,1)`},
            {opacity:inView?1:0,transform:inView?"translateX(0)":"translateX(-50px)",transition:`all .7s ${i*.1}s cubic-bezier(.22,1,.36,1)`},
            {opacity:inView?1:0,transform:inView?"scale(1)":"scale(0.7)",transition:`all .7s ${i*.1}s cubic-bezier(.34,1.56,.64,1)`},
          ];
          return (
            <div key={c.n} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)} style={{borderRadius:20,border:`1px solid ${hov===i?c.color+"66":C.border}`,background:hov===i?c.bg:C.panel,backdropFilter:"blur(24px)",overflow:"hidden",...transitionStyles[i%4],boxShadow:hov===i?`0 20px 60px ${c.color}22`:`0 4px 20px rgba(0,100,40,0.06)`,transform:(()=>{if(!inView)return transitionStyles[i%4].transform;return hov===i?"translateY(-6px)":"";})(),position:"relative"}}>
              {hov===i&&<div style={{position:"absolute",top:0,left:"-100%",width:"60%",height:"100%",background:`linear-gradient(90deg,transparent,${c.color}11,transparent)`,animation:"cardHoverShine .8s ease-in-out forwards",zIndex:2,pointerEvents:"none"}}/>}
              <div style={{position:"absolute",top:"1rem",right:"1.4rem",fontFamily:"'Exo 2',sans-serif",fontSize:"4rem",fontWeight:800,color:c.color,opacity:.06,lineHeight:1}}>{c.n}</div>
              <div style={{height:130,background:`linear-gradient(135deg,${c.bg},${C.bg3})`,borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",inset:0,backgroundImage:`linear-gradient(${C.border2} 1px,transparent 1px),linear-gradient(90deg,${C.border2} 1px,transparent 1px)`,backgroundSize:"24px 24px"}}/>
                <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at center,${c.color}14,transparent 70%)`}}/>
                <div style={{width:64,height:64,borderRadius:16,background:`${c.color}18`,border:`1px solid ${c.color}44`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 0 30px ${c.color}44`,position:"relative",zIndex:1,transition:"transform .3s",transform:hov===i?"scale(1.12) rotate(-5deg)":"scale(1)"}}>
                  <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={c.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">{c.icon}</svg>
                </div>
              </div>
              <div style={{padding:"1.5rem"}}>
                <div style={{fontFamily:"'Exo 2',sans-serif",fontSize:"1.15rem",fontWeight:700,marginBottom:"0.45rem",color:C.text,letterSpacing:"-0.02em"}}>{c.title}</div>
                <div style={{color:C.text2,fontSize:"0.85rem",lineHeight:1.75,marginBottom:"1.2rem"}}>{c.desc}</div>
                <div style={{display:"flex",flexDirection:"column",gap:"0.4rem"}}>
                  {c.feats.map((f,fi)=>(
                    <div key={fi} style={{display:"flex",alignItems:"center",gap:"0.55rem",fontSize:"0.78rem",color:C.text2}}>
                      <div style={{width:5,height:5,borderRadius:"50%",background:c.color,flexShrink:0,boxShadow:`0 0 6px ${c.color}`}}/>
                      {f}
                    </div>
                  ))}
                </div>
                <button style={{marginTop:"1.2rem",padding:"0.5rem 1.2rem",background:`${c.color}18`,border:`1px solid ${c.color}44`,borderRadius:8,color:c.color,fontSize:"0.78rem",fontWeight:600,fontFamily:"'DM Sans',sans-serif",transition:"all .2s",opacity:hov===i?1:0,transform:hov===i?"translateY(0)":"translateY(8px)"}} onMouseEnter={e=>{e.currentTarget.style.background=`${c.color}33`;}} onMouseLeave={e=>{e.currentTarget.style.background=`${c.color}18`;}}>Learn More →</button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ── PROCESS ───────────────────────────────────────────────────────────────────
function Process() {
  const [ref,inView]=useInView(.15);
  const steps=[
    {n:"01",title:"Site Assessment",desc:"Our engineers visit your location and analyze roof orientation, shading, and energy needs.",color:C.accent},
    {n:"02",title:"Custom Design",desc:"We create a 3D model of your solar system optimized for maximum energy output.",color:C.emerald},
    {n:"03",title:"Installation",desc:"Certified installers complete the job in 1–2 days with zero disruption to your life.",color:C.gold},
    {n:"04",title:"Monitoring",desc:"AI-powered monitoring tracks generation and alerts you to any performance issues.",color:C.coral},
  ];
  return (
    <section id="process" ref={ref} style={{padding:"4rem 3rem",position:"relative",zIndex:10,background:`linear-gradient(160deg,${C.bg3},${C.bg2})`}}>
      <div style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",opacity:inView?1:0,transform:inView?"rotate(0deg) scale(1)":"rotate(180deg) scale(0)",transition:"all 1.2s cubic-bezier(.22,1,.36,1)"}}>
          <div style={{position:"relative",width:480,height:480}}>
            <div style={{position:"absolute",inset:-20,borderRadius:"50%",background:`radial-gradient(circle,${C.accent}10,transparent 70%)`,animation:"pulseGlow 4s ease-in-out infinite"}}/>
            <OrbitalDiagram/>
          </div>
        </div>
        <div style={{opacity:inView?1:0,transform:inView?"rotateY(0deg)":"rotateY(-60deg)",transition:"all 1s .3s cubic-bezier(.22,1,.36,1)",perspective:"1000px"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:"0.5rem",fontSize:"0.68rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.14em",color:C.accent,marginBottom:"0.75rem"}}>
            <div style={{width:20,height:2,background:`linear-gradient(90deg,${C.accent},${C.lime})`}}/>How It Works
          </div>
          <h2 style={{fontFamily:"'Exo 2',sans-serif",fontSize:"clamp(2rem,4vw,3rem)",fontWeight:800,lineHeight:1.05,letterSpacing:"-0.04em",marginBottom:"2.5rem",color:C.text}}>From <span style={{color:C.accent}}>Sun</span> to Savings</h2>
          <div style={{display:"flex",flexDirection:"column",gap:"0"}}>
            {steps.map((s,i)=>(
              <div key={s.n} style={{display:"flex",gap:"1.2rem",paddingBottom:"2rem",position:"relative",opacity:inView?1:0,transform:inView?"translateX(0)":"translateX(40px)",transition:`all .6s ${.4+i*.12}s cubic-bezier(.22,1,.36,1)`}}>
                {i<steps.length-1&&<div style={{position:"absolute",left:"1.35rem",top:"2.8rem",width:2,height:"calc(100% - 1.4rem)",background:`linear-gradient(${s.color}66,${steps[i+1].color}22)`}}/>}
                <div style={{width:44,height:44,borderRadius:12,background:`linear-gradient(135deg,${s.color}18,${s.color}08)`,border:`1px solid ${s.color}55`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontFamily:"'Exo 2',sans-serif",fontWeight:800,fontSize:"0.75rem",color:s.color,boxShadow:`0 4px 20px ${s.color}22`}}>{s.n}</div>
                <div>
                  <div style={{fontFamily:"'Exo 2',sans-serif",fontWeight:700,fontSize:"1rem",color:C.text,marginBottom:"0.3rem",letterSpacing:"-0.01em"}}>{s.title}</div>
                  <div style={{color:C.text2,fontSize:"0.85rem",lineHeight:1.72}}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── WHY US ────────────────────────────────────────────────────────────────────
function WhyUs() {
  const [ref,inView]=useInView(.1);
  const [hovItem,setHovItem]=useState(null);
  const items=[
    {icon:"🌿",title:"100% Green Energy",desc:"Every panel offsets tonnes of CO₂ annually, contributing to a carbon-neutral Hyderabad.",color:C.accent,num:"01"},
    {icon:"💰",title:"Save Up to 90%",desc:"Our optimized systems deliver maximum ROI — most customers recover costs in 3–4 years.",color:C.emerald,num:"02"},
    {icon:"🔧",title:"Expert Installation",desc:"MNRE-certified engineers with 15+ years experience handle every project with precision.",color:C.gold,num:"03"},
    {icon:"📡",title:"Smart Monitoring",desc:"AI-powered dashboards track generation in real time and predict maintenance needs.",color:C.coral,num:"04"},
    {icon:"🛡️",title:"25-Year Warranty",desc:"Industry-leading performance guarantee with dedicated post-install support teams.",color:C.sky,num:"05"},
    {icon:"🏛️",title:"Govt. Subsidy Help",desc:"We handle all subsidy paperwork and DISCOM approvals — you just enjoy clean power.",color:C.lime,num:"06"},
  ];
  return (
    <section style={{padding:"4rem 0",background:`linear-gradient(160deg,${C.bg2},${C.bg3})`,position:"relative",zIndex:10,overflow:"hidden"}}>
      <div style={{position:"absolute",right:"-2rem",top:"50%",transform:"translateY(-50%)",fontFamily:"'Exo 2',sans-serif",fontSize:"28rem",fontWeight:800,color:`${C.accent}04`,lineHeight:1,pointerEvents:"none",userSelect:"none"}}>GO</div>
      <div ref={ref} style={{textAlign:"center",maxWidth:540,margin:"0 auto 3rem",padding:"0 3rem",opacity:inView?1:0,transform:inView?"translateY(0)":"translateY(-30px)",transition:"all .8s"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:"0.5rem",fontSize:"0.68rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.14em",color:C.accent,marginBottom:"0.75rem",justifyContent:"center"}}>
          <div style={{width:20,height:2,background:`linear-gradient(90deg,${C.accent},${C.lime})`}}/>Why Choose Us
        </div>
        <h2 style={{fontFamily:"'Exo 2',sans-serif",fontSize:"clamp(2rem,4.5vw,3.2rem)",fontWeight:800,lineHeight:1.05,letterSpacing:"-0.04em",color:C.text}}>The <span style={{color:C.accent}}>GoGreen</span> Advantage</h2>
      </div>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"0 3rem",display:"flex",flexDirection:"column",gap:"0"}}>
        {items.map((item,i)=>{
          const isEven=i%2===0;
          const isHov=hovItem===i;
          return (
            <div key={i}
              onMouseEnter={()=>setHovItem(i)}
              onMouseLeave={()=>setHovItem(null)}
              style={{
                display:"flex",flexDirection:isEven?"row":"row-reverse",alignItems:"center",gap:"0",
                borderBottom:i<items.length-1?`1px solid ${C.border2}`:"none",padding:"0",
                position:"relative",
                opacity:inView?1:0,
                transform:inView?"translateX(0)":`translateX(${isEven?"-50px":"50px"})`,
                transition:`all .7s ${i*.1}s cubic-bezier(.22,1,.36,1)`,
                cursor:"default",overflow:"hidden",
                background:isHov?`linear-gradient(${isEven?"90deg":"270deg"},${item.color}08,transparent)`:"transparent",
              }}>
              <div style={{width:100,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",padding:"2.5rem 1rem",borderRight:isEven?`1px solid ${isHov?item.color+"44":C.border2}`:"none",borderLeft:isEven?"none":`1px solid ${isHov?item.color+"44":C.border2}`,transition:"border-color .3s"}}>
                <span style={{fontFamily:"'Exo 2',sans-serif",fontSize:"3rem",fontWeight:800,color:isHov?item.color:`${item.color}33`,transition:"color .4s, transform .4s",transform:isHov?"scale(1.15)":"scale(1)",display:"block",lineHeight:1}}>{item.num}</span>
              </div>
              <div style={{width:80,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",padding:"2.5rem 0.5rem"}}>
                <div style={{width:52,height:52,borderRadius:"50%",background:isHov?`${item.color}22`:`${item.color}0a`,border:`2px solid ${isHov?item.color+"66":item.color+"22"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.5rem",transition:"all .35s cubic-bezier(.34,1.56,.64,1)",transform:isHov?"scale(1.2) rotate(-8deg)":"scale(1)",boxShadow:isHov?`0 0 30px ${item.color}44`:"none"}}>{item.icon}</div>
              </div>
              <div style={{flex:1,padding:"2.2rem 2rem",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"2rem"}}>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Exo 2',sans-serif",fontWeight:800,fontSize:"1.25rem",color:isHov?item.color:C.text,marginBottom:"0.4rem",letterSpacing:"-0.02em",transition:"color .3s"}}>{item.title}</div>
                  <div style={{color:C.text2,fontSize:"0.875rem",lineHeight:1.75,maxWidth:420,opacity:isHov?1:0.75,transition:"opacity .3s"}}>{item.desc}</div>
                </div>
                <div style={{width:44,height:44,borderRadius:"50%",flexShrink:0,border:`1.5px solid ${isHov?item.color+"88":C.border}`,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .35s cubic-bezier(.34,1.56,.64,1)",background:isHov?`${item.color}15`:"transparent",transform:isHov?"translateX(6px)":"translateX(0)"}}>
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={isHov?item.color:C.muted} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </div>
              <div style={{position:"absolute",bottom:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${item.color},${item.color}44)`,transform:isHov?"scaleX(1)":"scaleX(0)",transformOrigin:isEven?"left":"right",transition:"transform .5s cubic-bezier(.22,1,.36,1)"}}/>
            </div>
          );
        })}
      </div>
      <div style={{margin:"4rem 3rem 0",maxWidth:1100,marginLeft:"auto",marginRight:"auto",padding:"2rem",borderRadius:20,background:`linear-gradient(135deg,${C.deep},${C.forest})`,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem",opacity:inView?1:0,transition:"all .8s .7s"}}>
        <div>
          <div style={{fontFamily:"'Exo 2',sans-serif",fontSize:"1.3rem",fontWeight:800,color:"#fff",marginBottom:"0.2rem"}}>Ready to switch to solar?</div>
          <div style={{fontSize:"0.85rem",color:"rgba(180,245,208,0.7)"}}>Join 5,000+ satisfied customers across Hyderabad</div>
        </div>
        <button onClick={()=>document.querySelector("#contact")?.scrollIntoView({behavior:"smooth"})}
          style={{padding:"0.8rem 2rem",background:`linear-gradient(135deg,${C.accent},${C.lime})`,border:"none",borderRadius:10,fontFamily:"'Exo 2',sans-serif",fontWeight:700,fontSize:"0.9rem",color:"#fff",boxShadow:`0 0 30px ${C.accent}55`,transition:"all .25s",whiteSpace:"nowrap"}}
          onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.05)";}}
          onMouseLeave={e=>{e.currentTarget.style.transform="";}}>
          Get Free Quote →
        </button>
      </div>
    </section>
  );
}

// ── TESTIMONIALS ──────────────────────────────────────────────────────────────
function Testimonials() {
  const [active,setActive]=useState(1);
  const [ref,inView]=useInView(.1);
  const timerRef=useRef(null);
  const testi=[
    {name:"Sarah Johnson",role:"Homeowner · Banjara Hills",text:"Go Green transformed our home — electricity bills dropped by 80% in the very first month. The team was professional and the system looks stunning on our rooftop.",init:"S",color:C.accent},
    {name:"Michael Chen",role:"Factory Owner · Gachibowli",text:"The commercial installation for our factory paid for itself in 3.5 years. Go Green handled all government paperwork and subsidies. Exceptional ROI.",init:"M",color:C.emerald},
    {name:"Emma Williams",role:"Farm Owner · Medchal",text:"Our farm runs entirely off-grid now. The battery storage system is a game changer — full power through the night and cloudy days. Incredible technology.",init:"E",color:C.gold},
  ];
  useEffect(()=>{
    timerRef.current=setInterval(()=>{
      setActive(prev=>(prev+1)%testi.length);
    },3000);
    return ()=>clearInterval(timerRef.current);
  },[]);
  const goTo=(i)=>{
    clearInterval(timerRef.current);
    setActive(((i%testi.length)+testi.length)%testi.length);
    timerRef.current=setInterval(()=>{
      setActive(prev=>(prev+1)%testi.length);
    },3000);
  };
  return (
    <section id="reviews" ref={ref} style={{padding:"4rem 3rem",position:"relative",zIndex:10,background:`linear-gradient(160deg,${C.bg3},${C.bg2})`}}>
      <div style={{textAlign:"center",marginBottom:"4rem",opacity:inView?1:0,transform:inView?"scale(1)":"scale(0.85)",transition:"all .8s cubic-bezier(.34,1.56,.64,1)"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:"0.5rem",fontSize:"0.68rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.14em",color:C.accent,marginBottom:"0.75rem",justifyContent:"center"}}>
          <div style={{width:20,height:2,background:`linear-gradient(90deg,${C.accent},${C.lime})`}}/>Client Reviews
        </div>
        <h2 style={{fontFamily:"'Exo 2',sans-serif",fontSize:"clamp(2rem,4.5vw,3.2rem)",fontWeight:800,lineHeight:1.05,letterSpacing:"-0.04em",color:C.text}}>What Clients <span style={{color:C.accent}}>Say</span></h2>
      </div>
      <div style={{maxWidth:960,margin:"0 auto",position:"relative",height:300,perspective:1200}}>
        {testi.map((t,i)=>{
          const off=i-active;
          return (
            <div key={i} onClick={()=>goTo(i)} style={{
              position:"absolute",top:0,left:"50%",width:360,
              transform:`translateX(calc(-50% + ${off*330}px)) translateZ(${off===0?0:-160}px) rotateY(${off*24}deg) scale(${off===0?1:.84})`,
              filter:`brightness(${off===0?1:.5}) saturate(${off===0?1:.6})`,
              transition:"all .6s cubic-bezier(.22,1,.36,1)",cursor:off?"pointer":"default",
              border:`1px solid ${off===0?t.color+"55":C.border}`,
              borderRadius:20,padding:"1.8rem",
              background:off===0?`linear-gradient(135deg,${C.panel},${C.bg2})`:`${C.panel}88`,
              backdropFilter:"blur(24px)",
              boxShadow:off===0?`0 20px 60px rgba(0,100,40,0.15),0 0 0 1px ${t.color}22`:"none"}}>
              <div style={{display:"flex",gap:"0.15rem",marginBottom:"1rem"}}>
                {Array.from({length:5},(_,si)=>(
                  <svg key={si} width={13} height={13} viewBox="0 0 24 24" fill={t.color}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                ))}
              </div>
              <p style={{color:C.text2,fontSize:"0.875rem",lineHeight:1.75,marginBottom:"1.3rem",fontStyle:"italic"}}>"{t.text}"</p>
              <div style={{display:"flex",alignItems:"center",gap:"0.7rem"}}>
                <div style={{width:38,height:38,borderRadius:"50%",background:`linear-gradient(135deg,${t.color}33,${t.color}11)`,border:`2px solid ${t.color}55`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:"0.88rem",color:t.color,flexShrink:0}}>{t.init}</div>
                <div>
                  <div style={{fontWeight:600,fontSize:"0.85rem",color:C.text}}>{t.name}</div>
                  <div style={{fontSize:"0.72rem",color:C.muted}}>{t.role}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{display:"flex",justifyContent:"center",gap:"0.45rem",marginTop:"1.5rem"}}>
        {testi.map((_,i)=>(
          <button key={i} onClick={()=>goTo(i)} style={{width:i===active?28:8,height:8,borderRadius:4,background:i===active?`linear-gradient(90deg,${C.accent},${C.lime})`:C.border,border:"none",padding:0,transition:"all .3s"}}/>
        ))}
      </div>
      <div style={{maxWidth:120,margin:"0.8rem auto 0",height:2,background:C.border2,borderRadius:1,overflow:"hidden"}}>
        <div key={active} style={{height:"100%",background:`linear-gradient(90deg,${testi[active].color},${C.lime})`,borderRadius:1,animation:"lineGrow 3s linear forwards"}}/>
      </div>
    </section>
  );
}

// ── CONTACT ───────────────────────────────────────────────────────────────────
function Contact() {
  const [ref,inView]=useInView(.1);
  const [status,setStatus]=useState("idle");
  const [focused,setFocused]=useState(null);
  const inp=name=>({width:"100%",padding:"0.75rem 1rem",background:focused===name?`rgba(0,180,80,0.06)`:C.bg2,border:`1px solid ${focused===name?C.accent:C.border}`,borderRadius:10,color:C.text,fontSize:"0.875rem",fontFamily:"inherit",outline:"none",transition:"all .2s",boxShadow:focused===name?`0 0 0 3px ${C.accent}18`:"none"});
  return (
    <section id="contact" ref={ref} style={{padding:"4rem 3rem",position:"relative",zIndex:10,background:`linear-gradient(160deg,${C.bg2},${C.bg})`}}>
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:600,height:600,background:`radial-gradient(circle,${C.accent}07,transparent 70%)`,pointerEvents:"none"}}/>
      <div style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6rem",alignItems:"center"}}>
        <div style={{opacity:inView?1:0,transform:inView?"translateY(0)":"translateY(-60px)",transition:"all 1s cubic-bezier(.22,1,.36,1)"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:"0.5rem",fontSize:"0.68rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.14em",color:C.accent,marginBottom:"0.75rem"}}>
            <div style={{width:20,height:2,background:`linear-gradient(90deg,${C.accent},${C.lime})`}}/>Contact Us
          </div>
          <h2 style={{fontFamily:"'Exo 2',sans-serif",fontSize:"clamp(2rem,4.5vw,3.2rem)",fontWeight:800,lineHeight:1.05,letterSpacing:"-0.04em",marginBottom:"1.2rem",color:C.text}}>Ready to Go <span style={{color:C.accent}}>Green?</span></h2>
          <p style={{color:C.text2,lineHeight:1.85,marginBottom:"2.5rem",fontSize:"0.9rem"}}>Get a free site assessment and custom quote. Our engineers will design the perfect system for your energy needs.</p>
          {[
            {icon:<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.57 3.35 2 2 0 0 1 3.54 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.81-.81a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>,label:"+91 98765 43210"},
            {icon:<><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,label:"hello@gogreensolar.in"},
            {icon:<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx={12} cy={10} r={3}/></>,label:"Solar House, Hyderabad, TG 500001"},
          ].map((item,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:"1rem",padding:"0.85rem 0",borderBottom:`1px solid ${C.border2}`,opacity:inView?1:0,transform:inView?"translateX(0)":"translateX(-30px)",transition:`all .6s ${.2+i*.12}s`}}>
              <div style={{width:42,height:42,borderRadius:12,background:`${C.accent}10`,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.background=`${C.accent}20`;e.currentTarget.style.transform="scale(1.1)";}} onMouseLeave={e=>{e.currentTarget.style.background=`${C.accent}10`;e.currentTarget.style.transform="";}}>
                <svg viewBox="0 0 24 24" width={17} height={17} fill="none" stroke={C.accent} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">{item.icon}</svg>
              </div>
              <span style={{fontSize:"0.875rem",color:C.text2}}>{item.label}</span>
            </div>
          ))}
        </div>
        <div style={{opacity:inView?1:0,transform:inView?"translateY(0)":"translateY(60px)",transition:"all 1s .2s cubic-bezier(.22,1,.36,1)",border:`1px solid ${C.border}`,borderRadius:24,padding:"2.2rem",background:C.panel,backdropFilter:"blur(30px)",boxShadow:"0 20px 60px rgba(0,100,40,0.1)"}}>
          <div style={{fontFamily:"'Exo 2',sans-serif",fontSize:"1.3rem",fontWeight:700,marginBottom:"0.3rem",color:C.text}}>Send a Message</div>
          <div style={{fontSize:"0.8rem",color:C.muted,marginBottom:"1.5rem"}}>We respond within 2 business hours</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.65rem",marginBottom:"0.65rem"}}>
            <input style={inp("fn")} placeholder="First Name" onFocus={()=>setFocused("fn")} onBlur={()=>setFocused(null)}/>
            <input style={inp("ln")} placeholder="Last Name" onFocus={()=>setFocused("ln")} onBlur={()=>setFocused(null)}/>
          </div>
          <input style={{...inp("em"),display:"block",marginBottom:"0.65rem"}} placeholder="Email" type="email" onFocus={()=>setFocused("em")} onBlur={()=>setFocused(null)}/>
          <input style={{...inp("ph"),display:"block",marginBottom:"0.65rem"}} placeholder="Phone" type="tel" onFocus={()=>setFocused("ph")} onBlur={()=>setFocused(null)}/>
          <textarea style={{...inp("msg"),display:"block",marginBottom:"0.65rem",resize:"none",height:100}} placeholder="Tell us about your solar needs..." onFocus={()=>setFocused("msg")} onBlur={()=>setFocused(null)}/>
          {status==="idle"&&(
            <button onClick={()=>{setStatus("loading");setTimeout(()=>setStatus("success"),1500);}} style={{width:"100%",padding:"0.9rem",background:`linear-gradient(135deg,${C.deep},${C.accent},${C.lime})`,color:"#fff",border:"none",borderRadius:10,fontFamily:"'Exo 2',sans-serif",fontWeight:700,fontSize:"0.95rem",boxShadow:`0 8px 30px ${C.accent}44`,transition:"all .25s"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=`0 15px 40px ${C.accent}66`;}} onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=`0 8px 30px ${C.accent}44`;}}>Send Message →</button>
          )}
          {status==="loading"&&(
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:48}}>
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth={2} strokeLinecap="round" style={{animation:"spinLoader .8s linear infinite"}}><path d="M21 12a9 9 0 1 1-9-9"/></svg>
            </div>
          )}
          {status==="success"&&(
            <div style={{width:"100%",padding:"0.9rem",background:`${C.accent}12`,borderRadius:10,border:`1px solid ${C.accent}44`,display:"flex",alignItems:"center",justifyContent:"center",gap:"0.5rem",color:C.deep,fontWeight:700,animation:"successPop .4s cubic-bezier(.22,1,.36,1)"}}>
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth={2.5} strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              Message sent! We'll be in touch.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer() {
  const [ref,inView]=useInView(.1);
  return (
    <footer ref={ref} style={{background:`linear-gradient(160deg,${C.footerBg},${C.headerBg})`,padding:"3rem 3rem 2rem",position:"relative",zIndex:10,overflow:"hidden"}}>
      <svg style={{position:"absolute",top:-2,left:0,right:0}} viewBox="0 0 1440 60" preserveAspectRatio="none" height={60}><path d={`M0,0 C480,60 960,0 1440,0 L1440,60 L0,60 Z`} fill={C.bg}/></svg>
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:800,height:400,background:`radial-gradient(ellipse,${C.accent}08,transparent 70%)`,pointerEvents:"none"}}/>
      <div style={{position:"absolute",inset:0,backgroundImage:`linear-gradient(rgba(0,180,80,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,180,80,0.04) 1px,transparent 1px)`,backgroundSize:"40px 40px"}}/>
      <div style={{maxWidth:1100,margin:"0 auto",position:"relative",zIndex:1}}>
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:"3rem",marginBottom:"3.5rem"}}>
          <div style={{opacity:inView?1:0,transform:inView?"translateY(0)":"translateY(30px)",transition:"all .8s"}}>
            <div style={{display:"flex",alignItems:"center",gap:"0.7rem",fontFamily:"'Exo 2',sans-serif",fontSize:"1.4rem",fontWeight:800,color:"#fff",marginBottom:"1.1rem"}}>
              <div style={{width:34,height:34,background:`linear-gradient(135deg,${C.accent},${C.lime})`,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 0 20px ${C.accent}66`,animation:"glowPulse 3s ease-in-out infinite"}}>
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.2} strokeLinecap="round"><circle cx={12} cy={12} r={4}/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2"/></svg>
              </div>
              Go<span style={{color:C.lime}}>Green</span>
            </div>
            <p style={{color:"rgba(180,245,208,0.6)",fontSize:"0.82rem",lineHeight:1.85,maxWidth:260}}>Leading Hyderabad's solar revolution since 2009. Premium installations, lifetime support, and a greener tomorrow — guaranteed.</p>
            <div style={{display:"flex",gap:"0.7rem",marginTop:"1.5rem"}}>
              {["📱","🐦","💼","📷"].map((icon,i)=>(
                <button key={i} style={{width:36,height:36,borderRadius:9,background:"rgba(0,180,80,0.12)",border:`1px solid rgba(0,180,80,0.2)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.85rem",transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.background=`${C.accent}30`;e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(0,180,80,0.12)";e.currentTarget.style.transform="";}}>
                  {icon}
                </button>
              ))}
            </div>
          </div>
          {[
            {title:"Quick Links",items:["About Us","Solutions","How It Works","Reviews","Contact"],delay:.1},
            {title:"Services",items:["Residential Solar","Commercial Solar","Ground-Mounted","Off-Grid Systems","Battery Storage"],delay:.2},
            {title:"Connect",items:["+91 98765 43210","hello@gogreensolar.in","Hyderabad, TG 500001","Mon–Sat: 9am–7pm"],delay:.3},
          ].map(col=>(
            <div key={col.title} style={{opacity:inView?1:0,transform:inView?"translateY(0)":"translateY(30px)",transition:`all .8s ${col.delay}s`}}>
              <h4 style={{fontSize:"0.68rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.14em",color:C.lime,marginBottom:"1.1rem"}}>{col.title}</h4>
              <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:"0.55rem"}}>
                {col.items.map((item)=>(
                  <li key={item}>
                    <button style={{background:"none",border:"none",padding:0,color:"rgba(180,245,208,0.55)",fontSize:"0.82rem",transition:"color .2s",textAlign:"left",fontFamily:"'DM Sans',sans-serif"}} onMouseEnter={e=>{e.currentTarget.style.color=C.lime;}} onMouseLeave={e=>{e.currentTarget.style.color="rgba(180,245,208,0.55)";}}>
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{display:"flex",gap:"1rem",flexWrap:"wrap",marginBottom:"2.5rem",opacity:inView?1:0,transition:"all .8s .4s",transform:inView?"translateY(0)":"translateY(20px)"}}>
          {["🌱 Carbon Neutral Ops","⚡ 50MW+ Installed","🏆 MNRE Certified","🌍 5000+ Happy Homes"].map((b,i)=>(
            <div key={i} style={{padding:"0.4rem 0.9rem",borderRadius:100,background:"rgba(0,180,80,0.1)",border:`1px solid rgba(0,180,80,0.2)`,fontSize:"0.72rem",color:C.htxt2,fontWeight:500}}>{b}</div>
          ))}
        </div>
        <div style={{borderTop:"1px solid rgba(0,180,80,0.12)",paddingTop:"1.5rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem"}}>
          <p style={{color:"rgba(130,200,160,0.45)",fontSize:"0.75rem"}}>© 2026 Go Green Solar. All rights reserved. Made with 💚 in Hyderabad.</p>
          <div style={{display:"flex",gap:"1.5rem"}}>
            {["Privacy Policy","Terms of Service","Sitemap"].map(l=>(
              <button key={l} style={{background:"none",border:"none",color:"rgba(130,200,160,0.45)",fontSize:"0.72rem",fontFamily:"'DM Sans',sans-serif",padding:0,transition:"color .2s"}} onMouseEnter={e=>e.currentTarget.style.color=C.lime} onMouseLeave={e=>e.currentTarget.style.color="rgba(130,200,160,0.45)"}>
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Styles/>
      <Cursor/>
      <ScrollBar/>
      <PlasmaCanvas/>
      <Nav/>
      <Hero/>
      <Stats/>
      <About/>
      <VideoSection/>
      <Solutions/>
      <Process/>
      <WhyUs/>
      <Testimonials/>
      <Contact/>
      <Footer/>
    </>
  );
}
