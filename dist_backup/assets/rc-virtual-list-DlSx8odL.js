import{b as B,_ as O,e as ft,d as H,a as Ye,f as Dt,g as zt,c as Tt}from"./@babel-CNPOxmrp.js";import{c as ze}from"./classnames-BK5ccKcQ.js";import{R as st}from"./rc-resize-observer-DcjZBGzh.js";import{t as U,R as Ct,b as Re,j as tt}from"./rc-util-DhJyx-BV.js";import{r as t}from"./react-DtcBd6oJ.js";import{r as rt}from"./react-dom-BUWP3hwu.js";var ct=t.forwardRef(function(e,s){var m=e.height,u=e.offsetY,c=e.offsetX,S=e.children,f=e.prefixCls,i=e.onInnerResize,M=e.innerProps,v=e.rtl,R=e.extra,n={},g={display:"flex",flexDirection:"column"};return u!==void 0&&(n={height:m,position:"relative",overflow:"hidden"},g=B(B({},g),{},O(O(O(O(O({transform:"translateY(".concat(u,"px)")},v?"marginRight":"marginLeft",-c),"position","absolute"),"left",0),"right",0),"top",0))),t.createElement("div",{style:n},t.createElement(st,{onResize:function(d){var o=d.offsetHeight;o&&i&&i()}},t.createElement("div",ft({style:g,className:ze(O({},"".concat(f,"-holder-inner"),f)),ref:s},M),S,R)))});ct.displayName="Filler";function It(e){var s=e.children,m=e.setRef,u=t.useCallback(function(c){m(c)},[]);return t.cloneElement(s,{ref:u})}function Ht(e,s,m,u,c,S,f,i){var M=i.getKey;return e.slice(s,m+1).map(function(v,R){var n=s+R,g=f(v,n,{style:{width:u},offsetX:c}),l=M(v);return t.createElement(It,{key:l,setRef:function(o){return S(v,o)}},g)})}function Pt(e,s,m){var u=e.length,c=s.length,S,f;if(u===0&&c===0)return null;u<c?(S=e,f=s):(S=s,f=e);var i={__EMPTY_ITEM__:!0};function M(d){return d!==void 0?m(d):i}for(var v=null,R=Math.abs(u-c)!==1,n=0;n<f.length;n+=1){var g=M(S[n]),l=M(f[n]);if(g!==l){v=n,R=R||g!==M(f[n+1]);break}}return v===null?null:{index:v,multiple:R}}function Nt(e,s,m){var u=t.useState(e),c=H(u,2),S=c[0],f=c[1],i=t.useState(null),M=H(i,2),v=M[0],R=M[1];return t.useEffect(function(){var n=Pt(S||[],e||[],s);(n==null?void 0:n.index)!==void 0&&R(e[n.index]),f(e)},[e]),[v]}var nt=(typeof navigator>"u"?"undefined":Ye(navigator))==="object"&&/Firefox/i.test(navigator.userAgent);const vt=function(e,s,m,u){var c=t.useRef(!1),S=t.useRef(null);function f(){clearTimeout(S.current),c.current=!0,S.current=setTimeout(function(){c.current=!1},50)}var i=t.useRef({top:e,bottom:s,left:m,right:u});return i.current.top=e,i.current.bottom=s,i.current.left=m,i.current.right=u,function(M,v){var R=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,n=M?v<0&&i.current.left||v>0&&i.current.right:v<0&&i.current.top||v>0&&i.current.bottom;return R&&n?(clearTimeout(S.current),c.current=!1):(!n||c.current)&&f(),!c.current&&n}};function Ot(e,s,m,u,c,S,f){var i=t.useRef(0),M=t.useRef(null),v=t.useRef(null),R=t.useRef(!1),n=vt(s,m,u,c);function g(h,E){if(U.cancel(M.current),!n(!1,E)){var w=h;if(!w._virtualHandled)w._virtualHandled=!0;else return;i.current+=E,v.current=E,nt||w.preventDefault(),M.current=U(function(){var F=R.current?10:1;f(i.current*F,!1),i.current=0})}}function l(h,E){f(E,!0),nt||h.preventDefault()}var d=t.useRef(null),o=t.useRef(null);function y(h){if(e){U.cancel(o.current),o.current=U(function(){d.current=null},2);var E=h.deltaX,w=h.deltaY,F=h.shiftKey,P=E,x=w;(d.current==="sx"||!d.current&&F&&w&&!E)&&(P=w,x=0,d.current="sx");var $=Math.abs(P),X=Math.abs(x);d.current===null&&(d.current=S&&$>X?"x":"y"),d.current==="y"?g(h,x):l(h,P)}}function b(h){e&&(R.current=h.detail===v.current)}return[y,b]}function $t(e,s,m,u){var c=t.useMemo(function(){return[new Map,[]]},[e,m.id,u]),S=H(c,2),f=S[0],i=S[1],M=function(R){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:R,g=f.get(R),l=f.get(n);if(g===void 0||l===void 0)for(var d=e.length,o=i.length;o<d;o+=1){var y,b=e[o],h=s(b);f.set(h,o);var E=(y=m.get(h))!==null&&y!==void 0?y:u;if(i[o]=(i[o-1]||0)+E,h===R&&(g=o),h===n&&(l=o),g!==void 0&&l!==void 0)break}return{top:i[g-1]||0,bottom:i[l]}};return M}var kt=function(){function e(){zt(this,e),O(this,"maps",void 0),O(this,"id",0),O(this,"diffKeys",new Set),this.maps=Object.create(null)}return Dt(e,[{key:"set",value:function(m,u){this.maps[m]=u,this.id+=1,this.diffKeys.add(m)}},{key:"get",value:function(m){return this.maps[m]}},{key:"resetRecord",value:function(){this.diffKeys.clear()}},{key:"getRecord",value:function(){return this.diffKeys}}]),e}();function at(e){var s=parseFloat(e);return isNaN(s)?0:s}function Bt(e,s,m){var u=t.useState(0),c=H(u,2),S=c[0],f=c[1],i=t.useRef(new Map),M=t.useRef(new kt),v=t.useRef(0);function R(){v.current+=1}function n(){var l=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1;R();var d=function(){var b=!1;i.current.forEach(function(h,E){if(h&&h.offsetParent){var w=Ct(h),F=w.offsetHeight,P=getComputedStyle(w),x=P.marginTop,$=P.marginBottom,X=at(x),G=at($),I=F+X+G;M.current.get(E)!==I&&(M.current.set(E,I),b=!0)}}),b&&f(function(h){return h+1})};if(l)d();else{v.current+=1;var o=v.current;Promise.resolve().then(function(){o===v.current&&d()})}}function g(l,d){var o=e(l);i.current.get(o),d?(i.current.set(o,d),n()):i.current.delete(o)}return t.useEffect(function(){return R},[]),[g,n,M.current,S]}var ut=14/15;function Ft(e,s,m){var u=t.useRef(!1),c=t.useRef(0),S=t.useRef(0),f=t.useRef(null),i=t.useRef(null),M,v=function(l){if(u.current){var d=Math.ceil(l.touches[0].pageX),o=Math.ceil(l.touches[0].pageY),y=c.current-d,b=S.current-o,h=Math.abs(y)>Math.abs(b);h?c.current=d:S.current=o;var E=m(h,h?y:b,!1,l);E&&l.preventDefault(),clearInterval(i.current),E&&(i.current=setInterval(function(){h?y*=ut:b*=ut;var w=Math.floor(h?y:b);(!m(h,w,!0)||Math.abs(w)<=.1)&&clearInterval(i.current)},16))}},R=function(){u.current=!1,M()},n=function(l){M(),l.touches.length===1&&!u.current&&(u.current=!0,c.current=Math.ceil(l.touches[0].pageX),S.current=Math.ceil(l.touches[0].pageY),f.current=l.target,f.current.addEventListener("touchmove",v,{passive:!1}),f.current.addEventListener("touchend",R,{passive:!0}))};M=function(){f.current&&(f.current.removeEventListener("touchmove",v),f.current.removeEventListener("touchend",R))},Re(function(){return e&&s.current.addEventListener("touchstart",n,{passive:!0}),function(){var g;(g=s.current)===null||g===void 0||g.removeEventListener("touchstart",n),M(),clearInterval(i.current)}},[e])}function it(e){return Math.floor(Math.pow(e,.5))}function Fe(e,s){var m="touches"in e?e.touches[0]:e;return m[s?"pageX":"pageY"]-window[s?"scrollX":"scrollY"]}function Yt(e,s,m){t.useEffect(function(){var u=s.current;if(e&&u){var c=!1,S,f,i=function(){U.cancel(S)},M=function g(){i(),S=U(function(){m(f),g()})},v=function(l){var d=l;d._virtualHandled||(d._virtualHandled=!0,c=!0)},R=function(){c=!1,i()},n=function(l){if(c){var d=Fe(l,!1),o=u.getBoundingClientRect(),y=o.top,b=o.bottom;if(d<=y){var h=y-d;f=-it(h),M()}else if(d>=b){var E=d-b;f=it(E),M()}else i()}};return u.addEventListener("mousedown",v),u.ownerDocument.addEventListener("mouseup",R),u.ownerDocument.addEventListener("mousemove",n),function(){u.removeEventListener("mousedown",v),u.ownerDocument.removeEventListener("mouseup",R),u.ownerDocument.removeEventListener("mousemove",n),i()}}},[e])}var Xt=10;function Wt(e,s,m,u,c,S,f,i){var M=t.useRef(),v=t.useState(null),R=H(v,2),n=R[0],g=R[1];return Re(function(){if(n&&n.times<Xt){if(!e.current){g(function(ne){return B({},ne)});return}S();var l=n.targetAlign,d=n.originAlign,o=n.index,y=n.offset,b=e.current.clientHeight,h=!1,E=l,w=null;if(b){for(var F=l||d,P=0,x=0,$=0,X=Math.min(s.length-1,o),G=0;G<=X;G+=1){var I=c(s[G]);x=P;var Q=m.get(I);$=x+(Q===void 0?u:Q),P=$}for(var K=F==="top"?y:b-y,ee=X;ee>=0;ee-=1){var te=c(s[ee]),N=m.get(te);if(N===void 0){h=!0;break}if(K-=N,K<=0)break}switch(F){case"top":w=x-y;break;case"bottom":w=$-b+y;break;default:{var re=e.current.scrollTop,k=re+b;x<re?E="top":$>k&&(E="bottom")}}w!==null&&f(w),w!==n.lastTop&&(h=!0)}h&&g(B(B({},n),{},{times:n.times+1,targetAlign:E,lastTop:w}))}},[n,e.current]),function(l){if(l==null){i();return}if(U.cancel(M.current),typeof l=="number")f(l);else if(l&&Ye(l)==="object"){var d,o=l.align;"index"in l?d=l.index:d=s.findIndex(function(h){return c(h)===l.key});var y=l.offset,b=y===void 0?0:y;g({times:0,index:d,offset:b,originAlign:o})}}}var lt=t.forwardRef(function(e,s){var m=e.prefixCls,u=e.rtl,c=e.scrollOffset,S=e.scrollRange,f=e.onStartMove,i=e.onStopMove,M=e.onScroll,v=e.horizontal,R=e.spinSize,n=e.containerSize,g=e.style,l=e.thumbStyle,d=e.showScrollBar,o=t.useState(!1),y=H(o,2),b=y[0],h=y[1],E=t.useState(null),w=H(E,2),F=w[0],P=w[1],x=t.useState(null),$=H(x,2),X=$[0],G=$[1],I=!u,Q=t.useRef(),K=t.useRef(),ee=t.useState(d),te=H(ee,2),N=te[0],re=te[1],k=t.useRef(),ne=function(){d===!0||d===!1||(clearTimeout(k.current),re(!0),k.current=setTimeout(function(){re(!1)},3e3))},A=S-n||0,W=n-R||0,ae=t.useMemo(function(){if(c===0||A===0)return 0;var Y=c/A;return Y*W},[c,A,W]),D=function(z){z.stopPropagation(),z.preventDefault()},V=t.useRef({top:ae,dragging:b,pageY:F,startTop:X});V.current={top:ae,dragging:b,pageY:F,startTop:X};var oe=function(z){h(!0),P(Fe(z,v)),G(V.current.top),f(),z.stopPropagation(),z.preventDefault()};t.useEffect(function(){var Y=function(de){de.preventDefault()},z=Q.current,T=K.current;return z.addEventListener("touchstart",Y,{passive:!1}),T.addEventListener("touchstart",oe,{passive:!1}),function(){z.removeEventListener("touchstart",Y),T.removeEventListener("touchstart",oe)}},[]);var ve=t.useRef();ve.current=A;var pe=t.useRef();pe.current=W,t.useEffect(function(){if(b){var Y,z=function(de){var fe=V.current,Te=fe.dragging,Me=fe.pageY,be=fe.startTop;U.cancel(Y);var he=Q.current.getBoundingClientRect(),Ce=n/(v?he.width:he.height);if(Te){var q=(Fe(de,v)-Me)*Ce,se=be;!I&&v?se-=q:se+=q;var ye=ve.current,Ee=pe.current,Ie=Ee?se/Ee:0,ie=Math.ceil(Ie*ye);ie=Math.max(ie,0),ie=Math.min(ie,ye),Y=U(function(){M(ie,v)})}},T=function(){h(!1),i()};return window.addEventListener("mousemove",z,{passive:!0}),window.addEventListener("touchmove",z,{passive:!0}),window.addEventListener("mouseup",T,{passive:!0}),window.addEventListener("touchend",T,{passive:!0}),function(){window.removeEventListener("mousemove",z),window.removeEventListener("touchmove",z),window.removeEventListener("mouseup",T),window.removeEventListener("touchend",T),U.cancel(Y)}}},[b]),t.useEffect(function(){return ne(),function(){clearTimeout(k.current)}},[c]),t.useImperativeHandle(s,function(){return{delayHidden:ne}});var Z="".concat(m,"-scrollbar"),_={position:"absolute",visibility:N?null:"hidden"},j={position:"absolute",background:"rgba(0, 0, 0, 0.5)",borderRadius:99,cursor:"pointer",userSelect:"none"};return v?(_.height=8,_.left=0,_.right=0,_.bottom=0,j.height="100%",j.width=R,I?j.left=ae:j.right=ae):(_.width=8,_.top=0,_.bottom=0,I?_.right=0:_.left=0,j.width="100%",j.height=R,j.top=ae),t.createElement("div",{ref:Q,className:ze(Z,O(O(O({},"".concat(Z,"-horizontal"),v),"".concat(Z,"-vertical"),!v),"".concat(Z,"-visible"),N)),style:B(B({},_),g),onMouseDown:D,onMouseMove:ne},t.createElement("div",{ref:K,className:ze("".concat(Z,"-thumb"),O({},"".concat(Z,"-thumb-moving"),b)),style:B(B({},j),l),onMouseDown:oe}))}),At=20;function ot(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:0,s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,m=e/s*e;return isNaN(m)&&(m=0),m=Math.max(m,At),Math.floor(m)}var Kt=["prefixCls","className","height","itemHeight","fullHeight","style","data","children","itemKey","virtual","direction","scrollWidth","component","onScroll","onVirtualScroll","onVisibleChange","innerProps","extraRender","styles","showScrollBar"],Vt=[],jt={overflowY:"auto",overflowAnchor:"none"};function Ut(e,s){var m=e.prefixCls,u=m===void 0?"rc-virtual-list":m,c=e.className,S=e.height,f=e.itemHeight,i=e.fullHeight,M=i===void 0?!0:i,v=e.style,R=e.data,n=e.children,g=e.itemKey,l=e.virtual,d=e.direction,o=e.scrollWidth,y=e.component,b=y===void 0?"div":y,h=e.onScroll,E=e.onVirtualScroll,w=e.onVisibleChange,F=e.innerProps,P=e.extraRender,x=e.styles,$=e.showScrollBar,X=$===void 0?"optional":$,G=Tt(e,Kt),I=t.useCallback(function(a){return typeof g=="function"?g(a):a==null?void 0:a[g]},[g]),Q=Bt(I),K=H(Q,4),ee=K[0],te=K[1],N=K[2],re=K[3],k=!!(l!==!1&&S&&f),ne=t.useMemo(function(){return Object.values(N.maps).reduce(function(a,r){return a+r},0)},[N.id,N.maps]),A=k&&R&&(Math.max(f*R.length,ne)>S||!!o),W=d==="rtl",ae=ze(u,O({},"".concat(u,"-rtl"),W),c),D=R||Vt,V=t.useRef(),oe=t.useRef(),ve=t.useRef(),pe=t.useState(0),Z=H(pe,2),_=Z[0],j=Z[1],Y=t.useState(0),z=H(Y,2),T=z[0],ue=z[1],de=t.useState(!1),fe=H(de,2),Te=fe[0],Me=fe[1],be=function(){Me(!0)},he=function(){Me(!1)},Ce={getKey:I};function q(a){j(function(r){var p;typeof a=="function"?p=a(r):p=a;var L=Rt(p);return V.current.scrollTop=L,L})}var se=t.useRef({start:0,end:D.length}),ye=t.useRef(),Ee=Nt(D,I),Ie=H(Ee,1),ie=Ie[0];ye.current=ie;var we=t.useMemo(function(){if(!k)return{scrollHeight:void 0,start:0,end:D.length-1,offset:void 0};if(!A){var a;return{scrollHeight:((a=oe.current)===null||a===void 0?void 0:a.offsetHeight)||0,start:0,end:D.length-1,offset:void 0}}for(var r=0,p,L,C,De=D.length,ge=0;ge<De;ge+=1){var Lt=D[ge],_t=I(Lt),et=N.get(_t),Be=r+(et===void 0?f:et);Be>=_&&p===void 0&&(p=ge,L=r),Be>_+S&&C===void 0&&(C=ge),r=Be}return p===void 0&&(p=0,L=0,C=Math.ceil(S/f)),C===void 0&&(C=D.length-1),C=Math.min(C+1,D.length-1),{scrollHeight:r,start:p,end:C,offset:L}},[A,k,_,D,re,S]),le=we.scrollHeight,ce=we.start,me=we.end,Xe=we.offset;se.current.start=ce,se.current.end=me,t.useLayoutEffect(function(){var a=N.getRecord();if(a.size===1){var r=Array.from(a)[0],p=I(D[ce]);if(p===r){var L=N.get(r),C=L-f;q(function(De){return De+C})}}N.resetRecord()},[le]);var dt=t.useState({width:0,height:S}),We=H(dt,2),J=We[0],ht=We[1],mt=function(r){ht({width:r.offsetWidth,height:r.offsetHeight})},Ae=t.useRef(),Ke=t.useRef(),St=t.useMemo(function(){return ot(J.width,o)},[J.width,o]),gt=t.useMemo(function(){return ot(J.height,le)},[J.height,le]),He=le-S,Pe=t.useRef(He);Pe.current=He;function Rt(a){var r=a;return Number.isNaN(Pe.current)||(r=Math.min(r,Pe.current)),r=Math.max(r,0),r}var xe=_<=0,Le=_>=He,Ve=T<=0,je=T>=o,pt=vt(xe,Le,Ve,je),Ne=function(){return{x:W?-T:T,y:_}},Oe=t.useRef(Ne()),_e=tt(function(a){if(E){var r=B(B({},Ne()),a);(Oe.current.x!==r.x||Oe.current.y!==r.y)&&(E(r),Oe.current=r)}});function Ue(a,r){var p=a;r?(rt.flushSync(function(){ue(p)}),_e()):q(p)}function Mt(a){var r=a.currentTarget.scrollTop;r!==_&&q(r),h==null||h(a),_e()}var $e=function(r){var p=r,L=o?o-J.width:0;return p=Math.max(p,0),p=Math.min(p,L),p},bt=tt(function(a,r){r?(rt.flushSync(function(){ue(function(p){var L=p+(W?-a:a);return $e(L)})}),_e()):q(function(p){var L=p+a;return L})}),yt=Ot(k,xe,Le,Ve,je,!!o,bt),Ge=H(yt,2),ke=Ge[0],Ze=Ge[1];Ft(k,V,function(a,r,p,L){var C=L;return pt(a,r,p)?!1:!C||!C._virtualHandled?(C&&(C._virtualHandled=!0),ke({preventDefault:function(){},deltaX:a?r:0,deltaY:a?0:r}),!0):!1}),Yt(A,V,function(a){q(function(r){return r+a})}),Re(function(){function a(p){var L=xe&&p.detail<0,C=Le&&p.detail>0;k&&!L&&!C&&p.preventDefault()}var r=V.current;return r.addEventListener("wheel",ke,{passive:!1}),r.addEventListener("DOMMouseScroll",Ze,{passive:!0}),r.addEventListener("MozMousePixelScroll",a,{passive:!1}),function(){r.removeEventListener("wheel",ke),r.removeEventListener("DOMMouseScroll",Ze),r.removeEventListener("MozMousePixelScroll",a)}},[k,xe,Le]),Re(function(){if(o){var a=$e(T);ue(a),_e({x:a})}},[J.width,o]);var qe=function(){var r,p;(r=Ae.current)===null||r===void 0||r.delayHidden(),(p=Ke.current)===null||p===void 0||p.delayHidden()},Je=Wt(V,D,N,f,I,function(){return te(!0)},q,qe);t.useImperativeHandle(s,function(){return{nativeElement:ve.current,getScrollInfo:Ne,scrollTo:function(r){function p(L){return L&&Ye(L)==="object"&&("left"in L||"top"in L)}p(r)?(r.left!==void 0&&ue($e(r.left)),Je(r.top)):Je(r)}}}),Re(function(){if(w){var a=D.slice(ce,me+1);w(a,D)}},[ce,me,D]);var Et=$t(D,I,N,f),wt=P==null?void 0:P({start:ce,end:me,virtual:A,offsetX:T,offsetY:Xe,rtl:W,getSize:Et}),xt=Ht(D,ce,me,o,T,ee,n,Ce),Se=null;S&&(Se=B(O({},M?"height":"maxHeight",S),jt),k&&(Se.overflowY="hidden",o&&(Se.overflowX="hidden"),Te&&(Se.pointerEvents="none")));var Qe={};return W&&(Qe.dir="rtl"),t.createElement("div",ft({ref:ve,style:B(B({},v),{},{position:"relative"}),className:ae},Qe,G),t.createElement(st,{onResize:mt},t.createElement(b,{className:"".concat(u,"-holder"),style:Se,ref:V,onScroll:Mt,onMouseEnter:qe},t.createElement(ct,{prefixCls:u,height:le,offsetX:T,offsetY:Xe,scrollWidth:o,onInnerResize:te,ref:oe,innerProps:F,rtl:W,extra:wt},xt))),A&&le>S&&t.createElement(lt,{ref:Ae,prefixCls:u,scrollOffset:_,scrollRange:le,rtl:W,onScroll:Ue,onStartMove:be,onStopMove:he,spinSize:gt,containerSize:J.height,style:x==null?void 0:x.verticalScrollBar,thumbStyle:x==null?void 0:x.verticalScrollBarThumb,showScrollBar:X}),A&&o>J.width&&t.createElement(lt,{ref:Ke,prefixCls:u,scrollOffset:T,scrollRange:o,rtl:W,onScroll:Ue,onStartMove:be,onStopMove:he,spinSize:St,containerSize:J.width,horizontal:!0,style:x==null?void 0:x.horizontalScrollBar,thumbStyle:x==null?void 0:x.horizontalScrollBarThumb,showScrollBar:X}))}var Gt=t.forwardRef(Ut);Gt.displayName="List";export{Gt as L};
