import{r as a}from"./react-B9vPmY1d.js";import{c as re}from"./classnames-BK5ccKcQ.js";import{c as ae,_,a as G,b as oe,e as ce}from"./@babel-CRsfOLTH.js";import{c as ne}from"./rc-util-oW5U3vZm.js";var se={percent:0,prefixCls:"rc-progress",strokeColor:"#2db7f5",strokeLinecap:"round",strokeWidth:1,trailColor:"#D9D9D9",trailWidth:1,gapPosition:"bottom"},ie=function(){var r=a.useRef([]),e=a.useRef(null);return a.useEffect(function(){var o=Date.now(),c=!1;r.current.forEach(function(i){if(i){c=!0;var n=i.style;n.transitionDuration=".3s, .3s, .3s, .06s",e.current&&o-e.current<100&&(n.transitionDuration="0s, 0s")}}),c&&(e.current=Date.now())}),r.current},X=0,le=ne();function ue(){var t;return le?(t=X,X+=1):t="TEST_OR_SSR",t}const fe=function(t){var r=a.useState(),e=ae(r,2),o=e[0],c=e[1];return a.useEffect(function(){c("rc_progress_".concat(ue()))},[]),t||o};var Z=function(r){var e=r.bg,o=r.children;return a.createElement("div",{style:{width:"100%",height:"100%",background:e}},o)};function q(t,r){return Object.keys(t).map(function(e){var o=parseFloat(e),c="".concat(Math.floor(o*r),"%");return"".concat(t[e]," ").concat(c)})}var de=a.forwardRef(function(t,r){var e=t.prefixCls,o=t.color,c=t.gradientId,i=t.radius,n=t.style,h=t.ptg,d=t.strokeLinecap,s=t.strokeWidth,u=t.size,l=t.gapDegree,p=o&&_(o)==="object",y=p?"#FFF":void 0,f=u/2,v=a.createElement("circle",{className:"".concat(e,"-circle-path"),r:i,cx:f,cy:f,stroke:y,strokeLinecap:d,strokeWidth:s,opacity:h===0?0:1,style:n,ref:r});if(!p)return v;var P="".concat(c,"-conic"),F=l?"".concat(180+l/2,"deg"):"0deg",g=q(o,(360-l)/360),R=q(o,1),x="conic-gradient(from ".concat(F,", ").concat(g.join(", "),")"),k="linear-gradient(to ".concat(l?"bottom":"top",", ").concat(R.join(", "),")");return a.createElement(a.Fragment,null,a.createElement("mask",{id:P},v),a.createElement("foreignObject",{x:0,y:0,width:u,height:u,mask:"url(#".concat(P,")")},a.createElement(Z,{bg:k},a.createElement(Z,{bg:x}))))}),L=100,T=function(r,e,o,c,i,n,h,d,s,u){var l=arguments.length>10&&arguments[10]!==void 0?arguments[10]:0,p=o/100*360*((360-n)/360),y=n===0?0:{bottom:0,top:180,left:90,right:-90}[h],f=(100-c)/100*e;s==="round"&&c!==100&&(f+=u/2,f>=e&&(f=e-.01));var v=L/2;return{stroke:typeof d=="string"?d:void 0,strokeDasharray:"".concat(e,"px ").concat(r),strokeDashoffset:f+l,transform:"rotate(".concat(i+p+y,"deg)"),transformOrigin:"".concat(v,"px ").concat(v,"px"),transition:"stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s, opacity .3s ease 0s",fillOpacity:0}},ve=["id","prefixCls","steps","strokeWidth","trailWidth","gapDegree","gapPosition","trailColor","strokeLinecap","style","className","strokeColor","percent"];function H(t){var r=t??[];return Array.isArray(r)?r:[r]}var ye=function(r){var e=G(G({},se),r),o=e.id,c=e.prefixCls,i=e.steps,n=e.strokeWidth,h=e.trailWidth,d=e.gapDegree,s=d===void 0?0:d,u=e.gapPosition,l=e.trailColor,p=e.strokeLinecap,y=e.style,f=e.className,v=e.strokeColor,P=e.percent,F=oe(e,ve),g=L/2,R=fe(o),x="".concat(R,"-gradient"),k=g-n/2,I=Math.PI*2*k,B=s>0?90+s/2:-90,S=I*((360-s)/360),A=_(i)==="object"?i:{count:i,gap:2},C=A.count,$=A.gap,M=H(P),D=H(v),U=D.find(function(W){return W&&_(W)==="object"}),J=U&&_(U)==="object",j=J?"butt":p,Q=T(I,S,0,100,B,s,u,l,j,n),K=ie(),Y=function(){var w=0;return M.map(function(b,m){var z=D[m]||D[D.length-1],E=T(I,S,w,b,B,s,u,z,j,n);return w+=b,a.createElement(de,{key:m,color:z,ptg:b,radius:k,prefixCls:c,gradientId:x,style:E,strokeLinecap:j,strokeWidth:n,gapDegree:s,ref:function(O){K[m]=O},size:L})}).reverse()},ee=function(){var w=Math.round(C*(M[0]/100)),b=100/C,m=0;return new Array(C).fill(null).map(function(z,E){var N=E<=w-1?D[0]:l,O=N&&_(N)==="object"?"url(#".concat(x,")"):void 0,V=T(I,S,m,b,B,s,u,N,"butt",n,$);return m+=(S-V.strokeDashoffset+$)*100/S,a.createElement("circle",{key:E,className:"".concat(c,"-circle-path"),r:k,cx:g,cy:g,stroke:O,strokeWidth:n,opacity:1,style:V,ref:function(te){K[E]=te}})})};return a.createElement("svg",ce({className:re("".concat(c,"-circle"),f),viewBox:"0 0 ".concat(L," ").concat(L),style:y,id:o,role:"presentation"},F),!C&&a.createElement("circle",{className:"".concat(c,"-circle-trail"),r:k,cx:g,cy:g,stroke:l,strokeLinecap:j,strokeWidth:h||n,style:Q}),C?ee():Y())};export{ye as C};
