import{r as a,a as J}from"./react-DtcBd6oJ.js";import{a as Q}from"./react-dom-BUWP3hwu.js";import{l as Z,D as W,a as z,R as $,u as ee,m as te,b as F,c as B,N as H,d as ne,e as ae}from"./react-router-C8x6Xlmu.js";import{c as ie,b as re,E as oe,s as O,i as K,d as V,e as I}from"./@remix-run-BQcj6FK2.js";/**
 * React Router DOM v6.29.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function b(){return b=Object.assign?Object.assign.bind():function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])}return t},b.apply(this,arguments)}function G(t,n){if(t==null)return{};var e={},r=Object.keys(t),i,o;for(o=0;o<r.length;o++)i=r[o],!(n.indexOf(i)>=0)&&(e[i]=t[i]);return e}function se(t){return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}function le(t,n){return t.button===0&&(!n||n==="_self")&&!se(t)}const ue=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],ce=["aria-current","caseSensitive","className","end","style","to","viewTransition","children"],fe="6";try{window.__reactRouterVersion=fe}catch{}function Ue(t,n){return ie({basename:void 0,future:b({},void 0,{v7_prependBasename:!0}),history:re({window:void 0}),hydrationData:de(),routes:t,mapRouteProperties:te,dataStrategy:void 0,patchRoutesOnNavigation:void 0,window:void 0}).initialize()}function de(){var t;let n=(t=window)==null?void 0:t.__staticRouterHydrationData;return n&&n.errors&&(n=b({},n,{errors:pe(n.errors)})),n}function pe(t){if(!t)return null;let n=Object.entries(t),e={};for(let[r,i]of n)if(i&&i.__type==="RouteErrorResponse")e[r]=new oe(i.status,i.statusText,i.data,i.internal===!0);else if(i&&i.__type==="Error"){if(i.__subType){let o=window[i.__subType];if(typeof o=="function")try{let s=new o(i.message);s.stack="",e[r]=s}catch{}}if(e[r]==null){let o=new Error(i.message);o.stack="",e[r]=o}}else e[r]=i;return e}const X=a.createContext({isTransitioning:!1}),he=a.createContext(new Map),me="startTransition",j=J[me],ve="flushSync",A=Q[ve];function we(t){j?j(t):t()}function k(t){A?A(t):t()}class ge{constructor(){this.status="pending",this.promise=new Promise((n,e)=>{this.resolve=r=>{this.status==="pending"&&(this.status="resolved",n(r))},this.reject=r=>{this.status==="pending"&&(this.status="rejected",e(r))}})}}function Ne(t){let{fallbackElement:n,router:e,future:r}=t,[i,o]=a.useState(e.state),[s,g]=a.useState(),[h,l]=a.useState({isTransitioning:!1}),[c,y]=a.useState(),[m,T]=a.useState(),[v,L]=a.useState(),S=a.useRef(new Map),{v7_startTransition:E}=r||{},d=a.useCallback(u=>{E?we(u):u()},[E]),p=a.useCallback((u,R)=>{let{deletedFetchers:w,flushSync:N,viewTransitionOpts:C}=R;u.fetchers.forEach((P,q)=>{P.data!==void 0&&S.current.set(q,P.data)}),w.forEach(P=>S.current.delete(P));let Y=e.window==null||e.window.document==null||typeof e.window.document.startViewTransition!="function";if(!C||Y){N?k(()=>o(u)):d(()=>o(u));return}if(N){k(()=>{m&&(c&&c.resolve(),m.skipTransition()),l({isTransitioning:!0,flushSync:!0,currentLocation:C.currentLocation,nextLocation:C.nextLocation})});let P=e.window.document.startViewTransition(()=>{k(()=>o(u))});P.finished.finally(()=>{k(()=>{y(void 0),T(void 0),g(void 0),l({isTransitioning:!1})})}),k(()=>T(P));return}m?(c&&c.resolve(),m.skipTransition(),L({state:u,currentLocation:C.currentLocation,nextLocation:C.nextLocation})):(g(u),l({isTransitioning:!0,flushSync:!1,currentLocation:C.currentLocation,nextLocation:C.nextLocation}))},[e.window,m,c,S,d]);a.useLayoutEffect(()=>e.subscribe(p),[e,p]),a.useEffect(()=>{h.isTransitioning&&!h.flushSync&&y(new ge)},[h]),a.useEffect(()=>{if(c&&s&&e.window){let u=s,R=c.promise,w=e.window.document.startViewTransition(async()=>{d(()=>o(u)),await R});w.finished.finally(()=>{y(void 0),T(void 0),g(void 0),l({isTransitioning:!1})}),T(w)}},[d,s,c,e.window]),a.useEffect(()=>{c&&s&&i.location.key===s.location.key&&c.resolve()},[c,m,i.location,s]),a.useEffect(()=>{!h.isTransitioning&&v&&(g(v.state),l({isTransitioning:!0,flushSync:!1,currentLocation:v.currentLocation,nextLocation:v.nextLocation}),L(void 0))},[h.isTransitioning,v]),a.useEffect(()=>{},[]);let f=a.useMemo(()=>({createHref:e.createHref,encodeLocation:e.encodeLocation,go:u=>e.navigate(u),push:(u,R,w)=>e.navigate(u,{state:R,preventScrollReset:w==null?void 0:w.preventScrollReset}),replace:(u,R,w)=>e.navigate(u,{replace:!0,state:R,preventScrollReset:w==null?void 0:w.preventScrollReset})}),[e]),x=e.basename||"/",_=a.useMemo(()=>({router:e,navigator:f,static:!1,basename:x}),[e,f,x]),U=a.useMemo(()=>({v7_relativeSplatPath:e.future.v7_relativeSplatPath}),[e.future.v7_relativeSplatPath]);return a.useEffect(()=>Z(r,e.future),[r,e.future]),a.createElement(a.Fragment,null,a.createElement(W.Provider,{value:_},a.createElement(z.Provider,{value:i},a.createElement(he.Provider,{value:S.current},a.createElement(X.Provider,{value:h},a.createElement($,{basename:x,location:i.location,navigationType:i.historyAction,navigator:f,future:U},i.initialized||e.future.v7_partialHydration?a.createElement(ye,{routes:e.routes,future:e.future,state:i}):n))))),null)}const ye=a.memo(Se);function Se(t){let{routes:n,future:e,state:r}=t;return ee(n,void 0,r,e)}const Re=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",Te=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Le=a.forwardRef(function(n,e){let{onClick:r,relative:i,reloadDocument:o,replace:s,state:g,target:h,to:l,preventScrollReset:c,viewTransition:y}=n,m=G(n,ue),{basename:T}=a.useContext(H),v,L=!1;if(typeof l=="string"&&Te.test(l)&&(v=l,Re))try{let p=new URL(window.location.href),f=l.startsWith("//")?new URL(p.protocol+l):new URL(l),x=O(f.pathname,T);f.origin===p.origin&&x!=null?l=x+f.search+f.hash:L=!0}catch{}let S=ne(l,{relative:i}),E=Ee(l,{replace:s,state:g,target:h,preventScrollReset:c,relative:i,viewTransition:y});function d(p){r&&r(p),p.defaultPrevented||E(p)}return a.createElement("a",b({},m,{href:v||S,onClick:L||o?r:d,ref:e,target:h}))}),Oe=a.forwardRef(function(n,e){let{"aria-current":r="page",caseSensitive:i=!1,className:o="",end:s=!1,style:g,to:h,viewTransition:l,children:c}=n,y=G(n,ce),m=F(h,{relative:y.relative}),T=B(),v=a.useContext(z),{navigator:L,basename:S}=a.useContext(H),E=v!=null&&Ce(m)&&l===!0,d=L.encodeLocation?L.encodeLocation(m).pathname:m.pathname,p=T.pathname,f=v&&v.navigation&&v.navigation.location?v.navigation.location.pathname:null;i||(p=p.toLowerCase(),f=f?f.toLowerCase():null,d=d.toLowerCase()),f&&S&&(f=O(f,S)||f);const x=d!=="/"&&d.endsWith("/")?d.length-1:d.length;let _=p===d||!s&&p.startsWith(d)&&p.charAt(x)==="/",U=f!=null&&(f===d||!s&&f.startsWith(d)&&f.charAt(d.length)==="/"),u={isActive:_,isPending:U,isTransitioning:E},R=_?r:void 0,w;typeof o=="function"?w=o(u):w=[o,_?"active":null,U?"pending":null,E?"transitioning":null].filter(Boolean).join(" ");let N=typeof g=="function"?g(u):g;return a.createElement(Le,b({},y,{"aria-current":R,className:w,ref:e,style:N,to:h,viewTransition:l}),typeof c=="function"?c(u):c)});var D;(function(t){t.UseScrollRestoration="useScrollRestoration",t.UseSubmit="useSubmit",t.UseSubmitFetcher="useSubmitFetcher",t.UseFetcher="useFetcher",t.useViewTransitionState="useViewTransitionState"})(D||(D={}));var M;(function(t){t.UseFetcher="useFetcher",t.UseFetchers="useFetchers",t.UseScrollRestoration="useScrollRestoration"})(M||(M={}));function xe(t){let n=a.useContext(W);return n||K(!1),n}function Ee(t,n){let{target:e,replace:r,state:i,preventScrollReset:o,relative:s,viewTransition:g}=n===void 0?{}:n,h=ae(),l=B(),c=F(t,{relative:s});return a.useCallback(y=>{if(le(y,e)){y.preventDefault();let m=r!==void 0?r:I(l)===I(c);h(t,{replace:m,state:i,preventScrollReset:o,relative:s,viewTransition:g})}},[l,h,c,r,i,e,t,o,s,g])}function Ce(t,n){n===void 0&&(n={});let e=a.useContext(X);e==null&&K(!1);let{basename:r}=xe(D.useViewTransitionState),i=F(t,{relative:n.relative});if(!e.isTransitioning)return!1;let o=O(e.currentLocation.pathname,r)||e.currentLocation.pathname,s=O(e.nextLocation.pathname,r)||e.nextLocation.pathname;return V(i.pathname,s)!=null||V(i.pathname,o)!=null}export{Oe as N,Ne as R,Ue as c};
