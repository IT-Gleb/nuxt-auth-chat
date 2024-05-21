import{A as H,u as V,r as I,N as j,v as M,f as k,i as q,R,G as z,g as O,o as p,c as h,a as e,b as s,w as v,y as l,Q as w,t as G,p as Q,e as X,_ as F,a5 as J,a6 as K}from"./BHZ1H3K9.js";import{_ as U}from"./BMZs0pVj.js";import{_ as W}from"./N_DSWs8T.js";import{u as Y}from"./CvP0EubP.js";function Z(o,t){const i=t/o*100;return 2/Math.PI*100*Math.atan(i/50)}function tt(o={}){const{duration:t=2e3,throttle:i=200,hideDelay:n=500,resetDelay:_=400}=o,m=o.estimatedProgress||Z,u=M(),a=I(0),f=I(!1);let r=!1,c,P,T,S;const N=()=>$(0);function $(d=0){if(!u.isHydrating){if(d>=100)return x();L(),a.value=d<0?0:d,i?P=setTimeout(()=>{f.value=!0,A()},i):(f.value=!0,A())}}function B(){T=setTimeout(()=>{f.value=!1,S=setTimeout(()=>{a.value=0},_)},n)}function x(d={}){a.value=100,r=!0,L(),C(),d.force?(a.value=0,f.value=!1):B()}function C(){clearTimeout(T),clearTimeout(S)}function L(){clearTimeout(P),cancelAnimationFrame(c)}function A(){r=!1;let d;function b(y){if(r)return;d??(d=y);const E=y-d;a.value=Math.max(0,Math.min(100,m(t,E))),c=requestAnimationFrame(b)}c=requestAnimationFrame(b)}let D=()=>{};{const d=u.hook("page:loading:start",()=>{N()}),b=u.hook("page:loading:end",()=>{x()}),y=u.hook("vue:error",()=>x());D=()=>{y(),d(),b(),L()}}return{_cleanup:D,progress:j(()=>a.value),isLoading:j(()=>f.value),start:N,set:$,finish:x,clear:L}}function et(o={}){const t=M(),i=t._loadingIndicator=t._loadingIndicator||tt(o);return H()&&(t._loadingIndicatorDeps=t._loadingIndicatorDeps||0,t._loadingIndicatorDeps++,V(()=>{t._loadingIndicatorDeps--,t._loadingIndicatorDeps===0&&(i._cleanup(),delete t._loadingIndicator)})),i}const ot=k({name:"NuxtLoadingIndicator",props:{throttle:{type:Number,default:200},duration:{type:Number,default:2e3},height:{type:Number,default:3},color:{type:[String,Boolean],default:"repeating-linear-gradient(to right,#00dc82 0%,#34cdfe 50%,#0047e1 100%)"},estimatedProgress:{type:Function,required:!1}},setup(o,{slots:t,expose:i}){const{progress:n,isLoading:_,start:m,finish:u,clear:a}=et({duration:o.duration,throttle:o.throttle,estimatedProgress:o.estimatedProgress});return i({progress:n,isLoading:_,start:m,finish:u,clear:a}),()=>q("div",{class:"nuxt-loading-indicator",style:{position:"fixed",top:0,right:0,left:0,pointerEvents:"none",width:"auto",height:`${o.height}px`,opacity:_.value?1:0,background:o.color||void 0,backgroundSize:`${100/n.value*100}% auto`,transform:`scaleX(${n.value}%)`,transformOrigin:"left",transition:"transform 0.1s, height 0.4s, opacity 0.4s",zIndex:999999}},t)}}),g=o=>(Q("data-v-fdcfad20"),o=o(),X(),o),st={class:"min-h-[10vh] w-[100%] bg-gradient-to-b from-slate-900 from-20% to-slate-400 text-white flex flex-col"},it={class:"container mx-auto p-2 font-roboto font-light text-[1.2rem]/[2rem] flex-[1_0_auto]"},at={class:"mt-5 w-fit mx-auto"},nt={class:"flex items-start justify-start gap-x-12 md:gap-x-24"},lt={class:"flex items-center justify-start gap-2"},rt=g(()=>e("span",{class:"hidden md:inline"},"One",-1)),dt={class:"flex items-center justify-start gap-2"},ct=g(()=>e("span",{class:"hidden md:inline"},"Валюты",-1)),ut={key:0},mt={class:"flex items-center justify-start gap-2"},_t=g(()=>e("span",{class:"hidden md:inline"},"Login",-1)),ft={key:1},pt={class:"flex items-center justify-start gap-2"},ht=g(()=>e("span",{class:"hidden md:inline"}," Чат ",-1)),gt={class:"flex items-center justify-start gap-2"},vt=g(()=>e("span",{class:"hidden md:inline"}," About ",-1)),xt={key:2},Lt={class:"xl:ml-[400px] flex gap-3 text-[0.75rem]/[1.2rem] mt-2"},bt={class:"hidden lg:inline"},yt=g(()=>e("section",{class:"w-[100%] h-[2dvh] bg-slate-300"},null,-1)),wt=k({__name:"headerTop",setup(o){const t=R(),i=Y(),{isAuth:n,email:_}=z(i),m=I("");function u(){let a="";return a="/"+String(Math.floor(Math.random()*900)+100),a}return O(()=>{m.value=u()}),(a,f)=>{const r=U,c=W;return p(),h("header",st,[e("section",it,[e("nav",at,[e("ul",nt,[e("li",null,[s(c,{to:"/",exact:""},{default:v(()=>[e("div",lt,[s(r,{name:"close-list-numbered",filled:l(t).fullPath!=="/"},null,8,["filled"]),rt])]),_:1})]),e("li",null,[s(c,{to:l(m)},{default:v(()=>[e("div",dt,[s(r,{name:"world",filled:l(t).fullPath!==`${l(m)}`},null,8,["filled"]),ct])]),_:1},8,["to"])]),l(n)?w("",!0):(p(),h("li",ut,[s(c,{to:"/login"},{default:v(()=>[e("div",mt,[s(r,{name:"user",filled:l(t).fullPath!=="/login"},null,8,["filled"]),_t])]),_:1})])),l(n)?(p(),h("li",ft,[s(c,{to:"/chat"},{default:v(()=>[e("div",pt,[s(r,{name:"chat",filled:l(t).fullPath!=="/chat"},null,8,["filled"]),ht])]),_:1})])):w("",!0),e("li",null,[s(c,{to:"/about"},{default:v(()=>[e("div",gt,[s(r,{name:"map-edit",filled:l(t).fullPath!=="/about"},null,8,["filled"]),vt])]),_:1})]),l(n)?(p(),h("li",xt,[e("div",Lt,[s(r,{name:"user",filled:""}),e("span",bt,G(l(_)),1)])])):w("",!0)])])]),yt])}}}),It=F(wt,[["__scopeId","data-v-fdcfad20"]]),kt={},Pt={class:"min-h-[40dvh] bg-slate-900 text-white overflow-hidden relative"},Tt=J('<div class="w-[100%] flex justify-between absolute left-0 bottom-0"><div class="w-[100%] md:w-[49%] h-[50dvh] bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-100/40 via-slate-200/20 to-60% to-transparent"></div><div class="hidden md:block w-[50%] h-[50dvh] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-100/40 via-slate-200/20 to-60% to-transparent"></div></div><section class="max-w-[60%] mt-2 xl:mt-10 mx-auto p-2 flex items-start justify-evenly flex-wrap gap-3 xl:gap-5 text-[0.8rem]/[1.2rem]"><ul><li>Lorem ipsum dolor sit.</li><li>Lorem, ipsum dolor.</li><li>Lorem ipsum dolor sit amet.</li><li>Lorem, ipsum.</li><li>Lorem, ipsum dolor.</li></ul><ul><li>Lorem ipsum dolor sit.</li><li>Lorem, ipsum dolor.</li><li>Lorem ipsum dolor sit amet.</li><li>Lorem, ipsum.</li><li>Lorem, ipsum dolor.</li></ul><ul><li>Lorem ipsum dolor sit.</li><li>Lorem, ipsum dolor.</li><li>Lorem ipsum dolor sit amet.</li><li>Lorem, ipsum.</li><li>Lorem, ipsum dolor.</li></ul></section>',2),St=[Tt];function Nt(o,t){return p(),h("footer",Pt,St)}const $t=F(kt,[["render",Nt]]),Ft=k({__name:"main",setup(o){return(t,i)=>{const n=ot;return p(),h("div",null,[s(n,{height:5}),s(It),e("main",null,[K(t.$slots,"default")]),s($t)])}}});export{Ft as default};
