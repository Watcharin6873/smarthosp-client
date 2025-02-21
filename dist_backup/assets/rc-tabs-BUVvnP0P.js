import{c as R,a as F,_ as ze,d as W,e as ae,h as Je,b as ke}from"./@babel-CRsfOLTH.js";import{c as H}from"./classnames-BK5ccKcQ.js";import{q as et,N as It,K as Q,i as Lt,e as At,l as Bt,B as tt}from"./rc-util-oW5U3vZm.js";import{r as t,e as Dt}from"./react-B9vPmY1d.js";import{R as De}from"./rc-resize-observer-CR2VYCCu.js";import{D as zt}from"./rc-dropdown-CyskiKzf.js";import{E as Kt,M as $t}from"./rc-menu-CrVkuPeK.js";import{C as Wt}from"./rc-motion-HwhRbTFL.js";const _e=t.createContext(null);var Ot=function(a){var n=a.activeTabOffset,i=a.horizontal,o=a.rtl,c=a.indicator,l=c===void 0?{}:c,r=l.size,s=l.align,f=s===void 0?"center":s,d=t.useState(),v=R(d,2),E=v[0],k=v[1],M=t.useRef(),p=Dt.useCallback(function(b){return typeof r=="function"?r(b):typeof r=="number"?r:b},[r]);function I(){et.cancel(M.current)}return t.useEffect(function(){var b={};if(n)if(i){b.width=p(n.width);var u=o?"right":"left";f==="start"&&(b[u]=n[u]),f==="center"&&(b[u]=n[u]+n.width/2,b.transform=o?"translateX(50%)":"translateX(-50%)"),f==="end"&&(b[u]=n[u]+n.width,b.transform="translateX(-100%)")}else b.height=p(n.height),f==="start"&&(b.top=n.top),f==="center"&&(b.top=n.top+n.height/2,b.transform="translateY(-50%)"),f==="end"&&(b.top=n.top+n.height,b.transform="translateY(-100%)");return I(),M.current=et(function(){k(b)}),I},[n,i,o,f,p]),{style:E}},at={width:0,height:0,left:0,top:0};function Ut(e,a,n){return t.useMemo(function(){for(var i,o=new Map,c=a.get((i=e[0])===null||i===void 0?void 0:i.key)||at,l=c.left+c.width,r=0;r<e.length;r+=1){var s=e[r].key,f=a.get(s);if(!f){var d;f=a.get((d=e[r-1])===null||d===void 0?void 0:d.key)||at}var v=o.get(s)||F({},f);v.right=l-v.left-v.width,o.set(s,v)}return o},[e.map(function(i){return i.key}).join("_"),a,n])}function nt(e,a){var n=t.useRef(e),i=t.useState({}),o=R(i,2),c=o[1];function l(r){var s=typeof r=="function"?r(n.current):r;s!==n.current&&a(s,n.current),n.current=s,c({})}return[n.current,l]}var Vt=.1,rt=.01,Re=20,it=Math.pow(.995,Re);function Ft(e,a){var n=t.useState(),i=R(n,2),o=i[0],c=i[1],l=t.useState(0),r=R(l,2),s=r[0],f=r[1],d=t.useState(0),v=R(d,2),E=v[0],k=v[1],M=t.useState(),p=R(M,2),I=p[0],b=p[1],u=t.useRef();function N(y){var _=y.touches[0],h=_.screenX,S=_.screenY;c({x:h,y:S}),window.clearInterval(u.current)}function L(y){if(o){var _=y.touches[0],h=_.screenX,S=_.screenY;c({x:h,y:S});var C=h-o.x,x=S-o.y;a(C,x);var X=Date.now();f(X),k(X-s),b({x:C,y:x})}}function D(){if(o&&(c(null),b(null),I)){var y=I.x/E,_=I.y/E,h=Math.abs(y),S=Math.abs(_);if(Math.max(h,S)<Vt)return;var C=y,x=_;u.current=window.setInterval(function(){if(Math.abs(C)<rt&&Math.abs(x)<rt){window.clearInterval(u.current);return}C*=it,x*=it,a(C*Re,x*Re)},Re)}}var K=t.useRef();function z(y){var _=y.deltaX,h=y.deltaY,S=0,C=Math.abs(_),x=Math.abs(h);C===x?S=K.current==="x"?_:h:C>x?(S=_,K.current="x"):(S=h,K.current="y"),a(-S,-S)&&y.preventDefault()}var g=t.useRef(null);g.current={onTouchStart:N,onTouchMove:L,onTouchEnd:D,onWheel:z},t.useEffect(function(){function y(C){g.current.onTouchStart(C)}function _(C){g.current.onTouchMove(C)}function h(C){g.current.onTouchEnd(C)}function S(C){g.current.onWheel(C)}return document.addEventListener("touchmove",_,{passive:!1}),document.addEventListener("touchend",h,{passive:!0}),e.current.addEventListener("touchstart",y,{passive:!0}),e.current.addEventListener("wheel",S,{passive:!1}),function(){document.removeEventListener("touchmove",_),document.removeEventListener("touchend",h)}},[])}function ft(e){var a=t.useState(0),n=R(a,2),i=n[0],o=n[1],c=t.useRef(0),l=t.useRef();return l.current=e,It(function(){var r;(r=l.current)===null||r===void 0||r.call(l)},[i]),function(){c.current===i&&(c.current+=1,o(c.current))}}function Ht(e){var a=t.useRef([]),n=t.useState({}),i=R(n,2),o=i[1],c=t.useRef(typeof e=="function"?e():e),l=ft(function(){var s=c.current;a.current.forEach(function(f){s=f(s)}),a.current=[],c.current=s,o({})});function r(s){a.current.push(s),l()}return[c.current,r]}var ot={width:0,height:0,left:0,top:0,right:0};function Xt(e,a,n,i,o,c,l){var r=l.tabs,s=l.tabPosition,f=l.rtl,d,v,E;return["top","bottom"].includes(s)?(d="width",v=f?"right":"left",E=Math.abs(n)):(d="height",v="top",E=-n),t.useMemo(function(){if(!r.length)return[0,0];for(var k=r.length,M=k,p=0;p<k;p+=1){var I=e.get(r[p].key)||ot;if(Math.floor(I[v]+I[d])>Math.floor(E+a)){M=p-1;break}}for(var b=0,u=k-1;u>=0;u-=1){var N=e.get(r[u].key)||ot;if(N[v]<E){b=u+1;break}}return b>=M?[0,0]:[b,M]},[e,a,i,o,c,E,s,r.map(function(k){return k.key}).join("_"),f])}function ct(e){var a;return e instanceof Map?(a={},e.forEach(function(n,i){a[i]=n})):a=e,JSON.stringify(a)}var Gt="TABS_DQ";function dt(e){return String(e).replace(/"/g,Gt)}function vt(e,a,n,i){return!(!n||i||e===!1||e===void 0&&(a===!1||a===null))}var bt=t.forwardRef(function(e,a){var n=e.prefixCls,i=e.editable,o=e.locale,c=e.style;return!i||i.showAdd===!1?null:t.createElement("button",{ref:a,type:"button",className:"".concat(n,"-nav-add"),style:c,"aria-label":(o==null?void 0:o.addAriaLabel)||"Add tab",onClick:function(r){i.onEdit("add",{event:r})}},i.addIcon||"+")}),lt=t.forwardRef(function(e,a){var n=e.position,i=e.prefixCls,o=e.extra;if(!o)return null;var c,l={};return ze(o)==="object"&&!t.isValidElement(o)?l=o:l.right=o,n==="right"&&(c=l.right),n==="left"&&(c=l.left),c?t.createElement("div",{className:"".concat(i,"-extra-content"),ref:a},c):null}),Yt=t.forwardRef(function(e,a){var n=e.prefixCls,i=e.id,o=e.tabs,c=e.locale,l=e.mobile,r=e.more,s=r===void 0?{}:r,f=e.style,d=e.className,v=e.editable,E=e.tabBarGutter,k=e.rtl,M=e.removeAriaLabel,p=e.onTabClick,I=e.getPopupContainer,b=e.popupClassName,u=t.useState(!1),N=R(u,2),L=N[0],D=N[1],K=t.useState(null),z=R(K,2),g=z[0],y=z[1],_=s.icon,h=_===void 0?"More":_,S="".concat(i,"-more-popup"),C="".concat(n,"-dropdown"),x=g!==null?"".concat(S,"-").concat(g):null,X=c==null?void 0:c.dropdownAriaLabel;function le(T,B){T.preventDefault(),T.stopPropagation(),v.onEdit("remove",{key:B,event:T})}var ne=t.createElement(Kt,{onClick:function(B){var $=B.key,O=B.domEvent;p($,O),D(!1)},prefixCls:"".concat(C,"-menu"),id:S,tabIndex:-1,role:"listbox","aria-activedescendant":x,selectedKeys:[g],"aria-label":X!==void 0?X:"expanded dropdown"},o.map(function(T){var B=T.closable,$=T.disabled,O=T.closeIcon,G=T.key,Z=T.label,j=vt(B,O,v,$);return t.createElement($t,{key:G,id:"".concat(S,"-").concat(G),role:"option","aria-controls":i&&"".concat(i,"-panel-").concat(G),disabled:$},t.createElement("span",null,Z),j&&t.createElement("button",{type:"button","aria-label":M||"remove",tabIndex:0,className:"".concat(C,"-menu-item-remove"),onClick:function(ue){ue.stopPropagation(),le(ue,G)}},O||v.removeIcon||"×"))}));function V(T){for(var B=o.filter(function(j){return!j.disabled}),$=B.findIndex(function(j){return j.key===g})||0,O=B.length,G=0;G<O;G+=1){$=($+T+O)%O;var Z=B[$];if(!Z.disabled){y(Z.key);return}}}function re(T){var B=T.which;if(!L){[Q.DOWN,Q.SPACE,Q.ENTER].includes(B)&&(D(!0),T.preventDefault());return}switch(B){case Q.UP:V(-1),T.preventDefault();break;case Q.DOWN:V(1),T.preventDefault();break;case Q.ESC:D(!1);break;case Q.SPACE:case Q.ENTER:g!==null&&p(g,T);break}}t.useEffect(function(){var T=document.getElementById(x);T&&T.scrollIntoView&&T.scrollIntoView(!1)},[g]),t.useEffect(function(){L||y(null)},[L]);var J=W({},k?"marginRight":"marginLeft",E);o.length||(J.visibility="hidden",J.order=1);var Y=H(W({},"".concat(C,"-rtl"),k)),se=l?null:t.createElement(zt,ae({prefixCls:C,overlay:ne,visible:o.length?L:!1,onVisibleChange:D,overlayClassName:H(Y,b),mouseEnterDelay:.1,mouseLeaveDelay:.1,getPopupContainer:I},s),t.createElement("button",{type:"button",className:"".concat(n,"-nav-more"),style:J,tabIndex:-1,"aria-hidden":"true","aria-haspopup":"listbox","aria-controls":S,id:"".concat(i,"-more"),"aria-expanded":L,onKeyDown:re},h));return t.createElement("div",{className:H("".concat(n,"-nav-operations"),d),style:f,ref:a},se,t.createElement(bt,{prefixCls:n,locale:c,editable:v}))});const jt=t.memo(Yt,function(e,a){return a.tabMoving});var qt=function(a){var n=a.prefixCls,i=a.id,o=a.active,c=a.tab,l=c.key,r=c.label,s=c.disabled,f=c.closeIcon,d=c.icon,v=a.closable,E=a.renderWrapper,k=a.removeAriaLabel,M=a.editable,p=a.onClick,I=a.onFocus,b=a.style,u="".concat(n,"-tab"),N=vt(v,f,M,s);function L(g){s||p(g)}function D(g){g.preventDefault(),g.stopPropagation(),M.onEdit("remove",{key:l,event:g})}var K=t.useMemo(function(){return d&&typeof r=="string"?t.createElement("span",null,r):r},[r,d]),z=t.createElement("div",{key:l,"data-node-key":dt(l),className:H(u,W(W(W({},"".concat(u,"-with-remove"),N),"".concat(u,"-active"),o),"".concat(u,"-disabled"),s)),style:b,onClick:L},t.createElement("div",{role:"tab","aria-selected":o,id:i&&"".concat(i,"-tab-").concat(l),className:"".concat(u,"-btn"),"aria-controls":i&&"".concat(i,"-panel-").concat(l),"aria-disabled":s,tabIndex:s?null:0,onClick:function(y){y.stopPropagation(),L(y)},onKeyDown:function(y){[Q.SPACE,Q.ENTER].includes(y.which)&&(y.preventDefault(),L(y))},onFocus:I},d&&t.createElement("span",{className:"".concat(u,"-icon")},d),r&&K),N&&t.createElement("button",{type:"button","aria-label":k||"remove",tabIndex:0,className:"".concat(u,"-remove"),onClick:function(y){y.stopPropagation(),D(y)}},f||M.removeIcon||"×"));return E?E(z):z},Qt=function(a,n){var i=a.offsetWidth,o=a.offsetHeight,c=a.offsetTop,l=a.offsetLeft,r=a.getBoundingClientRect(),s=r.width,f=r.height,d=r.left,v=r.top;return Math.abs(s-i)<1?[s,f,d-n.left,v-n.top]:[i,o,l,c]},fe=function(a){var n=a.current||{},i=n.offsetWidth,o=i===void 0?0:i,c=n.offsetHeight,l=c===void 0?0:c;if(a.current){var r=a.current.getBoundingClientRect(),s=r.width,f=r.height;if(Math.abs(s-o)<1)return[s,f]}return[o,l]},pe=function(a,n){return a[n?0:1]},st=t.forwardRef(function(e,a){var n=e.className,i=e.style,o=e.id,c=e.animated,l=e.activeKey,r=e.rtl,s=e.extra,f=e.editable,d=e.locale,v=e.tabPosition,E=e.tabBarGutter,k=e.children,M=e.onTabClick,p=e.onTabScroll,I=e.indicator,b=t.useContext(_e),u=b.prefixCls,N=b.tabs,L=t.useRef(null),D=t.useRef(null),K=t.useRef(null),z=t.useRef(null),g=t.useRef(null),y=t.useRef(null),_=t.useRef(null),h=v==="top"||v==="bottom",S=nt(0,function(w,m){h&&p&&p({direction:w>m?"left":"right"})}),C=R(S,2),x=C[0],X=C[1],le=nt(0,function(w,m){!h&&p&&p({direction:w>m?"top":"bottom"})}),ne=R(le,2),V=ne[0],re=ne[1],J=t.useState([0,0]),Y=R(J,2),se=Y[0],T=Y[1],B=t.useState([0,0]),$=R(B,2),O=$[0],G=$[1],Z=t.useState([0,0]),j=R(Z,2),me=j[0],ue=j[1],he=t.useState([0,0]),ye=R(he,2),P=ye[0],ie=ye[1],de=Ht(new Map),Ke=R(de,2),ht=Ke[0],yt=Ke[1],ge=Ut(N,ht,O[0]),Pe=pe(se,h),ve=pe(O,h),Ne=pe(me,h),$e=pe(P,h),We=Math.floor(Pe)<Math.floor(ve+Ne),q=We?Pe-$e:Pe-Ne,gt="".concat(u,"-nav-operations-hidden"),ee=0,oe=0;h&&r?(ee=0,oe=Math.max(0,ve-q)):(ee=Math.min(0,q-ve),oe=0);function we(w){return w<ee?ee:w>oe?oe:w}var Me=t.useRef(null),St=t.useState(),Oe=R(St,2),Se=Oe[0],Ue=Oe[1];function Ie(){Ue(Date.now())}function Le(){Me.current&&clearTimeout(Me.current)}Ft(z,function(w,m){function A(U,ce){U(function(te){var xe=we(te+ce);return xe})}return We?(h?A(X,w):A(re,m),Le(),Ie(),!0):!1}),t.useEffect(function(){return Le(),Se&&(Me.current=setTimeout(function(){Ue(0)},100)),Le},[Se]);var Et=Xt(ge,q,h?x:V,ve,Ne,$e,F(F({},e),{},{tabs:N})),Ve=R(Et,2),Ct=Ve[0],xt=Ve[1],Fe=Lt(function(){var w=arguments.length>0&&arguments[0]!==void 0?arguments[0]:l,m=ge.get(w)||{width:0,height:0,left:0,right:0,top:0};if(h){var A=x;r?m.right<x?A=m.right:m.right+m.width>x+q&&(A=m.right+m.width-q):m.left<-x?A=-m.left:m.left+m.width>-x+q&&(A=-(m.left+m.width-q)),re(0),X(we(A))}else{var U=V;m.top<-V?U=-m.top:m.top+m.height>-V+q&&(U=-(m.top+m.height-q)),X(0),re(we(U))}}),Ee={};v==="top"||v==="bottom"?Ee[r?"marginRight":"marginLeft"]=E:Ee.marginTop=E;var He=N.map(function(w,m){var A=w.key;return t.createElement(qt,{id:o,prefixCls:u,key:A,tab:w,style:m===0?void 0:Ee,closable:w.closable,editable:f,active:A===l,renderWrapper:k,removeAriaLabel:d==null?void 0:d.removeAriaLabel,onClick:function(ce){M(A,ce)},onFocus:function(){Fe(A),Ie(),z.current&&(r||(z.current.scrollLeft=0),z.current.scrollTop=0)}})}),Xe=function(){return yt(function(){var m,A=new Map,U=(m=g.current)===null||m===void 0?void 0:m.getBoundingClientRect();return N.forEach(function(ce){var te,xe=ce.key,Ze=(te=g.current)===null||te===void 0?void 0:te.querySelector('[data-node-key="'.concat(dt(xe),'"]'));if(Ze){var _t=Qt(Ze,U),Te=R(_t,4),Pt=Te[0],Nt=Te[1],wt=Te[2],Mt=Te[3];A.set(xe,{width:Pt,height:Nt,left:wt,top:Mt})}}),A})};t.useEffect(function(){Xe()},[N.map(function(w){return w.key}).join("_")]);var Ce=ft(function(){var w=fe(L),m=fe(D),A=fe(K);T([w[0]-m[0]-A[0],w[1]-m[1]-A[1]]);var U=fe(_);ue(U);var ce=fe(y);ie(ce);var te=fe(g);G([te[0]-U[0],te[1]-U[1]]),Xe()}),Tt=N.slice(0,Ct),pt=N.slice(xt+1),Ge=[].concat(Je(Tt),Je(pt)),Ye=ge.get(l),Rt=Ot({activeTabOffset:Ye,horizontal:h,indicator:I,rtl:r}),kt=Rt.style;t.useEffect(function(){Fe()},[l,ee,oe,ct(Ye),ct(ge),h]),t.useEffect(function(){Ce()},[r]);var je=!!Ge.length,be="".concat(u,"-nav-wrap"),Ae,Be,qe,Qe;return h?r?(Be=x>0,Ae=x!==oe):(Ae=x<0,Be=x!==ee):(qe=V<0,Qe=V!==ee),t.createElement(De,{onResize:Ce},t.createElement("div",{ref:At(a,L),role:"tablist",className:H("".concat(u,"-nav"),n),style:i,onKeyDown:function(){Ie()}},t.createElement(lt,{ref:D,position:"left",extra:s,prefixCls:u}),t.createElement(De,{onResize:Ce},t.createElement("div",{className:H(be,W(W(W(W({},"".concat(be,"-ping-left"),Ae),"".concat(be,"-ping-right"),Be),"".concat(be,"-ping-top"),qe),"".concat(be,"-ping-bottom"),Qe)),ref:z},t.createElement(De,{onResize:Ce},t.createElement("div",{ref:g,className:"".concat(u,"-nav-list"),style:{transform:"translate(".concat(x,"px, ").concat(V,"px)"),transition:Se?"none":void 0}},He,t.createElement(bt,{ref:_,prefixCls:u,locale:d,editable:f,style:F(F({},He.length===0?void 0:Ee),{},{visibility:je?"hidden":null})}),t.createElement("div",{className:H("".concat(u,"-ink-bar"),W({},"".concat(u,"-ink-bar-animated"),c.inkBar)),style:kt}))))),t.createElement(jt,ae({},e,{removeAriaLabel:d==null?void 0:d.removeAriaLabel,ref:y,prefixCls:u,tabs:Ge,className:!je&&gt,tabMoving:!!Se})),t.createElement(lt,{ref:K,position:"right",extra:s,prefixCls:u})))}),mt=t.forwardRef(function(e,a){var n=e.prefixCls,i=e.className,o=e.style,c=e.id,l=e.active,r=e.tabKey,s=e.children;return t.createElement("div",{id:c&&"".concat(c,"-panel-").concat(r),role:"tabpanel",tabIndex:l?0:-1,"aria-labelledby":c&&"".concat(c,"-tab-").concat(r),"aria-hidden":!l,style:o,className:H(n,l&&"".concat(n,"-active"),i),ref:a},s)}),Zt=["renderTabBar"],Jt=["label","key"],ea=function(a){var n=a.renderTabBar,i=ke(a,Zt),o=t.useContext(_e),c=o.tabs;if(n){var l=F(F({},i),{},{panes:c.map(function(r){var s=r.label,f=r.key,d=ke(r,Jt);return t.createElement(mt,ae({tab:s,key:f,tabKey:f},d))})});return n(l,st)}return t.createElement(st,i)},ta=["key","forceRender","style","className","destroyInactiveTabPane"],aa=function(a){var n=a.id,i=a.activeKey,o=a.animated,c=a.tabPosition,l=a.destroyInactiveTabPane,r=t.useContext(_e),s=r.prefixCls,f=r.tabs,d=o.tabPane,v="".concat(s,"-tabpane");return t.createElement("div",{className:H("".concat(s,"-content-holder"))},t.createElement("div",{className:H("".concat(s,"-content"),"".concat(s,"-content-").concat(c),W({},"".concat(s,"-content-animated"),d))},f.map(function(E){var k=E.key,M=E.forceRender,p=E.style,I=E.className,b=E.destroyInactiveTabPane,u=ke(E,ta),N=k===i;return t.createElement(Wt,ae({key:k,visible:N,forceRender:M,removeOnLeave:!!(l||b),leavedClassName:"".concat(v,"-hidden")},o.tabPaneMotion),function(L,D){var K=L.style,z=L.className;return t.createElement(mt,ae({},u,{prefixCls:v,id:n,tabKey:k,animated:d,active:N,style:F(F({},p),K),className:H(I,z),ref:D}))})})))};function na(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{inkBar:!0,tabPane:!1},a;return e===!1?a={inkBar:!1,tabPane:!1}:e===!0?a={inkBar:!0,tabPane:!1}:a=F({inkBar:!0},ze(e)==="object"?e:{}),a.tabPaneMotion&&a.tabPane===void 0&&(a.tabPane=!0),!a.tabPaneMotion&&a.tabPane&&(a.tabPane=!1),a}var ra=["id","prefixCls","className","items","direction","activeKey","defaultActiveKey","editable","animated","tabPosition","tabBarGutter","tabBarStyle","tabBarExtraContent","locale","more","destroyInactiveTabPane","renderTabBar","onChange","onTabClick","onTabScroll","getPopupContainer","popupClassName","indicator"],ut=0,va=t.forwardRef(function(e,a){var n=e.id,i=e.prefixCls,o=i===void 0?"rc-tabs":i,c=e.className,l=e.items,r=e.direction,s=e.activeKey,f=e.defaultActiveKey,d=e.editable,v=e.animated,E=e.tabPosition,k=E===void 0?"top":E,M=e.tabBarGutter,p=e.tabBarStyle,I=e.tabBarExtraContent,b=e.locale,u=e.more,N=e.destroyInactiveTabPane,L=e.renderTabBar,D=e.onChange,K=e.onTabClick,z=e.onTabScroll,g=e.getPopupContainer,y=e.popupClassName,_=e.indicator,h=ke(e,ra),S=t.useMemo(function(){return(l||[]).filter(function(P){return P&&ze(P)==="object"&&"key"in P})},[l]),C=r==="rtl",x=na(v),X=t.useState(!1),le=R(X,2),ne=le[0],V=le[1];t.useEffect(function(){V(Bt())},[]);var re=tt(function(){var P;return(P=S[0])===null||P===void 0?void 0:P.key},{value:s,defaultValue:f}),J=R(re,2),Y=J[0],se=J[1],T=t.useState(function(){return S.findIndex(function(P){return P.key===Y})}),B=R(T,2),$=B[0],O=B[1];t.useEffect(function(){var P=S.findIndex(function(de){return de.key===Y});if(P===-1){var ie;P=Math.max(0,Math.min($,S.length-1)),se((ie=S[P])===null||ie===void 0?void 0:ie.key)}O(P)},[S.map(function(P){return P.key}).join("_"),Y,$]);var G=tt(null,{value:n}),Z=R(G,2),j=Z[0],me=Z[1];t.useEffect(function(){n||(me("rc-tabs-".concat(ut)),ut+=1)},[]);function ue(P,ie){K==null||K(P,ie);var de=P!==Y;se(P),de&&(D==null||D(P))}var he={id:j,activeKey:Y,animated:x,tabPosition:k,rtl:C,mobile:ne},ye=F(F({},he),{},{editable:d,locale:b,more:u,tabBarGutter:M,onTabClick:ue,onTabScroll:z,extra:I,style:p,panes:null,getPopupContainer:g,popupClassName:y,indicator:_});return t.createElement(_e.Provider,{value:{tabs:S,prefixCls:o}},t.createElement("div",ae({ref:a,id:n,className:H(o,"".concat(o,"-").concat(k),W(W(W({},"".concat(o,"-mobile"),ne),"".concat(o,"-editable"),d),"".concat(o,"-rtl"),C),c)},h),t.createElement(ea,ae({},ye,{renderTabBar:L})),t.createElement(aa,ae({destroyInactiveTabPane:N},he,{animated:x}))))});export{va as T};
