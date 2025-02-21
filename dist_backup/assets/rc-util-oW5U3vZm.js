import{r as v,e as Se,R as Ke}from"./react-B9vPmY1d.js";import{a as E,_ as h,o as He,h as X,c as y,m as we,n as N}from"./@babel-CRsfOLTH.js";import{R as _,a as ke}from"./react-dom-DlYqUQm3.js";function Z(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}function We(e,n){if(!e)return!1;if(e.contains)return e.contains(n);for(var r=n;r;){if(r===e)return!0;r=r.parentNode}return!1}var ie="data-rc-order",ue="data-rc-priority",$e="rc-util-key",B=new Map;function Re(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=e.mark;return n?n.startsWith("data-")?n:"data-".concat(n):$e}function C(e){if(e.attachTo)return e.attachTo;var n=document.querySelector("head");return n||document.body}function Ve(e){return e==="queue"?"prependQueue":e?"prepend":"append"}function J(e){return Array.from((B.get(e)||e).children).filter(function(n){return n.tagName==="STYLE"})}function be(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(!Z())return null;var r=n.csp,t=n.prepend,a=n.priority,o=a===void 0?0:a,i=Ve(t),s=i==="prependQueue",f=document.createElement("style");f.setAttribute(ie,i),s&&o&&f.setAttribute(ue,"".concat(o)),r!=null&&r.nonce&&(f.nonce=r==null?void 0:r.nonce),f.innerHTML=e;var l=C(n),d=l.firstChild;if(t){if(s){var m=(n.styles||J(l)).filter(function(g){if(!["prepend","prependQueue"].includes(g.getAttribute(ie)))return!1;var S=Number(g.getAttribute(ue)||0);return o>=S});if(m.length)return l.insertBefore(f,m[m.length-1].nextSibling),f}l.insertBefore(f,d)}else l.appendChild(f);return f}function Ne(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=C(n);return(n.styles||J(r)).find(function(t){return t.getAttribute(Re(n))===e})}function je(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=Ne(e,n);if(r){var t=C(n);t.removeChild(r)}}function Be(e,n){var r=B.get(e);if(!r||!We(document,r)){var t=be("",n),a=t.parentNode;B.set(e,a),e.removeChild(t)}}function ze(e,n){var r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},t=C(r),a=J(t),o=E(E({},r),{},{styles:a});Be(t,o);var i=Ne(n,o);if(i){var s,f;if((s=o.csp)!==null&&s!==void 0&&s.nonce&&i.nonce!==((f=o.csp)===null||f===void 0?void 0:f.nonce)){var l;i.nonce=(l=o.csp)===null||l===void 0?void 0:l.nonce}return i.innerHTML!==e&&(i.innerHTML=e),i}var d=be(e,o);return d.setAttribute(Re(o),n),d}function _e(e){var n;return e==null||(n=e.getRootNode)===null||n===void 0?void 0:n.call(e)}function Ge(e){return _e(e)instanceof ShadowRoot}function Tn(e){return Ge(e)?_e(e):null}var z={},qe=function(n){};function Qe(e,n){}function Ye(e,n){}function Xe(){z={}}function Ae(e,n,r){!n&&!z[r]&&(e(!1,r),z[r]=!0)}function O(e,n){Ae(Qe,e,n)}function Ze(e,n){Ae(Ye,e,n)}O.preMessage=qe;O.resetWarned=Xe;O.noteOnce=Ze;var Me={exports:{}},c={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ee=Symbol.for("react.element"),ne=Symbol.for("react.portal"),T=Symbol.for("react.fragment"),L=Symbol.for("react.strict_mode"),I=Symbol.for("react.profiler"),U=Symbol.for("react.provider"),P=Symbol.for("react.context"),Je=Symbol.for("react.server_context"),F=Symbol.for("react.forward_ref"),D=Symbol.for("react.suspense"),x=Symbol.for("react.suspense_list"),K=Symbol.for("react.memo"),H=Symbol.for("react.lazy"),en=Symbol.for("react.offscreen"),Ce;Ce=Symbol.for("react.module.reference");function p(e){if(typeof e=="object"&&e!==null){var n=e.$$typeof;switch(n){case ee:switch(e=e.type,e){case T:case I:case L:case D:case x:return e;default:switch(e=e&&e.$$typeof,e){case Je:case P:case F:case H:case K:case U:return e;default:return n}}case ne:return n}}}c.ContextConsumer=P;c.ContextProvider=U;c.Element=ee;c.ForwardRef=F;c.Fragment=T;c.Lazy=H;c.Memo=K;c.Portal=ne;c.Profiler=I;c.StrictMode=L;c.Suspense=D;c.SuspenseList=x;c.isAsyncMode=function(){return!1};c.isConcurrentMode=function(){return!1};c.isContextConsumer=function(e){return p(e)===P};c.isContextProvider=function(e){return p(e)===U};c.isElement=function(e){return typeof e=="object"&&e!==null&&e.$$typeof===ee};c.isForwardRef=function(e){return p(e)===F};c.isFragment=function(e){return p(e)===T};c.isLazy=function(e){return p(e)===H};c.isMemo=function(e){return p(e)===K};c.isPortal=function(e){return p(e)===ne};c.isProfiler=function(e){return p(e)===I};c.isStrictMode=function(e){return p(e)===L};c.isSuspense=function(e){return p(e)===D};c.isSuspenseList=function(e){return p(e)===x};c.isValidElementType=function(e){return typeof e=="string"||typeof e=="function"||e===T||e===I||e===L||e===D||e===x||e===en||typeof e=="object"&&e!==null&&(e.$$typeof===H||e.$$typeof===K||e.$$typeof===U||e.$$typeof===P||e.$$typeof===F||e.$$typeof===Ce||e.getModuleId!==void 0)};c.typeOf=p;Me.exports=c;var w=Me.exports;function nn(e,n,r){var t=v.useRef({});return(!("value"in t.current)||r(t.current.condition,n))&&(t.current.value=e(),t.current.condition=n),t.current.value}var rn=function(n,r){typeof n=="function"?n(r):h(n)==="object"&&n&&"current"in n&&(n.current=r)},tn=function(){for(var n=arguments.length,r=new Array(n),t=0;t<n;t++)r[t]=arguments[t];var a=r.filter(Boolean);return a.length<=1?a[0]:function(o){r.forEach(function(i){rn(i,o)})}},Ln=function(){for(var n=arguments.length,r=new Array(n),t=0;t<n;t++)r[t]=arguments[t];return nn(function(){return tn.apply(void 0,r)},r,function(a,o){return a.length!==o.length||a.every(function(i,s){return i!==o[s]})})},an=function(n){var r,t,a=w.isMemo(n)?n.type.type:n.type;return!(typeof a=="function"&&!((r=a.prototype)!==null&&r!==void 0&&r.render)&&a.$$typeof!==w.ForwardRef||typeof n=="function"&&!((t=n.prototype)!==null&&t!==void 0&&t.render)&&n.$$typeof!==w.ForwardRef)};function G(e){return v.isValidElement(e)&&!w.isFragment(e)}var In=function(n){return G(n)&&an(n)};Number(v.version.split(".")[0])>=19;function se(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=[];return Se.Children.forEach(e,function(t){t==null&&!n.keepEmpty||(Array.isArray(t)?r=r.concat(se(t)):w.isFragment(t)&&t.props?r=r.concat(se(t.props.children,n)):r.push(t))}),r}function ce(e){return e instanceof HTMLElement||e instanceof SVGElement}function on(e){return e&&h(e)==="object"&&ce(e.nativeElement)?e.nativeElement:ce(e)?e:null}function Un(e){var n=on(e);if(n)return n;if(e instanceof Se.Component){var r;return(r=_.findDOMNode)===null||r===void 0?void 0:r.call(_,e)}return null}function Pn(e,n){var r=Object.assign({},e);return Array.isArray(n)&&n.forEach(function(t){delete r[t]}),r}var Oe=function(n){return+setTimeout(n,16)},Te=function(n){return clearTimeout(n)};typeof window<"u"&&"requestAnimationFrame"in window&&(Oe=function(n){return window.requestAnimationFrame(n)},Te=function(n){return window.cancelAnimationFrame(n)});var fe=0,re=new Map;function Le(e){re.delete(e)}var un=function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:1;fe+=1;var t=fe;function a(o){if(o===0)Le(t),n();else{var i=Oe(function(){a(o-1)});re.set(t,i)}}return a(r),t};un.cancel=function(e){var n=re.get(e);return Le(e),Te(n)};function Fn(e,n){var r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,t=new Set;function a(o,i){var s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:1,f=t.has(o);if(O(!f,"Warning: There may be circular references"),f)return!1;if(o===i)return!0;if(r&&s>1)return!1;t.add(o);var l=s+1;if(Array.isArray(o)){if(!Array.isArray(i)||o.length!==i.length)return!1;for(var d=0;d<o.length;d++)if(!a(o[d],i[d],l))return!1;return!0}if(o&&i&&h(o)==="object"&&h(i)==="object"){var m=Object.keys(o);return m.length!==Object.keys(i).length?!1:m.every(function(g){return a(o[g],i[g],l)})}return!1}return a(e,n)}var le=Z()?v.useLayoutEffect:v.useEffect,Ie=function(n,r){var t=v.useRef(!0);le(function(){return n(t.current)},r),le(function(){return t.current=!1,function(){t.current=!0}},[])},de=function(n,r){Ie(function(t){if(!t)return n()},r)};function q(e,n){for(var r=e,t=0;t<n.length;t+=1){if(r==null)return;r=r[n[t]]}return r}function Ue(e,n,r,t){if(!n.length)return r;var a=He(n),o=a[0],i=a.slice(1),s;return!e&&typeof o=="number"?s=[]:Array.isArray(e)?s=X(e):s=E({},e),t&&r===void 0&&i.length===1?delete s[o][i[0]]:s[o]=Ue(s[o],i,r,t),s}function $(e,n,r){var t=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!1;return n.length&&t&&r===void 0&&!q(e,n.slice(0,-1))?e:Ue(e,n,r,t)}function sn(e){return h(e)==="object"&&e!==null&&Object.getPrototypeOf(e)===Object.prototype}function me(e){return Array.isArray(e)?[]:{}}var cn=typeof Reflect>"u"?Object.keys:Reflect.ownKeys;function Dn(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];var t=me(n[0]);return n.forEach(function(a){function o(i,s){var f=new Set(s),l=q(a,i),d=Array.isArray(l);if(d||sn(l)){if(!f.has(l)){f.add(l);var m=q(t,i);d?t=$(t,i,[]):(!m||h(m)!=="object")&&(t=$(t,i,me(l))),cn(l).forEach(function(g){o([].concat(X(i),[g]),f)})}}else t=$(t,i,l)}o([])}),t}function A(e){var n=v.useRef();n.current=e;var r=v.useCallback(function(){for(var t,a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return(t=n.current)===null||t===void 0?void 0:t.call.apply(t,[n].concat(o))},[]);return r}function ve(e){var n=v.useRef(!1),r=v.useState(e),t=y(r,2),a=t[0],o=t[1];v.useEffect(function(){return n.current=!1,function(){n.current=!0}},[]);function i(s,f){f&&n.current||o(s)}return[a,i]}function V(e){return e!==void 0}function xn(e,n){var r=n||{},t=r.defaultValue,a=r.value,o=r.onChange,i=r.postState,s=ve(function(){return V(a)?a:V(t)?typeof t=="function"?t():t:typeof e=="function"?e():e}),f=y(s,2),l=f[0],d=f[1],m=a!==void 0?a:l,g=i?i(m):m,S=A(o),W=ve([m]),te=y(W,2),ae=te[0],De=te[1];de(function(){var b=ae[0];l!==b&&S(l,b)},[ae]),de(function(){V(a)||d(a)},[a]);var xe=A(function(b,oe){d(b,oe),De([m],oe)});return[g,xe]}function Kn(e){var n=v.useReducer(function(s){return s+1},0),r=y(n,2),t=r[1],a=v.useRef(e),o=A(function(){return a.current}),i=A(function(s){a.current=typeof s=="function"?s(a.current):s,t()});return[o,i]}var fn=`accept acceptCharset accessKey action allowFullScreen allowTransparency
    alt async autoComplete autoFocus autoPlay capture cellPadding cellSpacing challenge
    charSet checked classID className colSpan cols content contentEditable contextMenu
    controls coords crossOrigin data dateTime default defer dir disabled download draggable
    encType form formAction formEncType formMethod formNoValidate formTarget frameBorder
    headers height hidden high href hrefLang htmlFor httpEquiv icon id inputMode integrity
    is keyParams keyType kind label lang list loop low manifest marginHeight marginWidth max maxLength media
    mediaGroup method min minLength multiple muted name noValidate nonce open
    optimum pattern placeholder poster preload radioGroup readOnly rel required
    reversed role rowSpan rows sandbox scope scoped scrolling seamless selected
    shape size sizes span spellCheck src srcDoc srcLang srcSet start step style
    summary tabIndex target title type useMap value width wmode wrap`,ln=`onCopy onCut onPaste onCompositionEnd onCompositionStart onCompositionUpdate onKeyDown
    onKeyPress onKeyUp onFocus onBlur onChange onInput onSubmit onClick onContextMenu onDoubleClick
    onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown
    onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp onSelect onTouchCancel
    onTouchEnd onTouchMove onTouchStart onScroll onWheel onAbort onCanPlay onCanPlayThrough
    onDurationChange onEmptied onEncrypted onEnded onError onLoadedData onLoadedMetadata
    onLoadStart onPause onPlay onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend onTimeUpdate onVolumeChange onWaiting onLoad onError`,dn="".concat(fn," ").concat(ln).split(/[\s\n]+/),mn="aria-",vn="data-";function pe(e,n){return e.indexOf(n)===0}function Hn(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,r;n===!1?r={aria:!0,data:!0,attr:!0}:n===!0?r={aria:!0}:r=E({},n);var t={};return Object.keys(e).forEach(function(a){(r.aria&&(a==="role"||pe(a,mn))||r.data&&pe(a,vn)||r.attr&&dn.includes(a))&&(t[a]=e[a])}),t}var u={MAC_ENTER:3,BACKSPACE:8,TAB:9,NUM_CENTER:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,PAUSE:19,CAPS_LOCK:20,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,PRINT_SCREEN:44,INSERT:45,DELETE:46,ZERO:48,ONE:49,TWO:50,THREE:51,FOUR:52,FIVE:53,SIX:54,SEVEN:55,EIGHT:56,NINE:57,QUESTION_MARK:63,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,META:91,WIN_KEY_RIGHT:92,CONTEXT_MENU:93,NUM_ZERO:96,NUM_ONE:97,NUM_TWO:98,NUM_THREE:99,NUM_FOUR:100,NUM_FIVE:101,NUM_SIX:102,NUM_SEVEN:103,NUM_EIGHT:104,NUM_NINE:105,NUM_MULTIPLY:106,NUM_PLUS:107,NUM_MINUS:109,NUM_PERIOD:110,NUM_DIVISION:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,NUMLOCK:144,SEMICOLON:186,DASH:189,EQUALS:187,COMMA:188,PERIOD:190,SLASH:191,APOSTROPHE:192,SINGLE_QUOTE:222,OPEN_SQUARE_BRACKET:219,BACKSLASH:220,CLOSE_SQUARE_BRACKET:221,WIN_KEY:224,MAC_FF_META:224,WIN_IME:229,isTextModifyingKeyEvent:function(n){var r=n.keyCode;if(n.altKey&&!n.ctrlKey||n.metaKey||r>=u.F1&&r<=u.F12)return!1;switch(r){case u.ALT:case u.CAPS_LOCK:case u.CONTEXT_MENU:case u.CTRL:case u.DOWN:case u.END:case u.ESC:case u.HOME:case u.INSERT:case u.LEFT:case u.MAC_FF_META:case u.META:case u.NUMLOCK:case u.NUM_CENTER:case u.PAGE_DOWN:case u.PAGE_UP:case u.PAUSE:case u.PRINT_SCREEN:case u.RIGHT:case u.SHIFT:case u.UP:case u.WIN_KEY:case u.WIN_KEY_RIGHT:return!1;default:return!0}},isCharacterKey:function(n){if(n>=u.ZERO&&n<=u.NINE||n>=u.NUM_ZERO&&n<=u.NUM_MULTIPLY||n>=u.A&&n<=u.Z||window.navigator.userAgent.indexOf("WebKit")!==-1&&n===0)return!0;switch(n){case u.SPACE:case u.QUESTION_MARK:case u.NUM_PLUS:case u.NUM_MINUS:case u.NUM_PERIOD:case u.NUM_DIVISION:case u.SEMICOLON:case u.DASH:case u.EQUALS:case u.COMMA:case u.PERIOD:case u.SLASH:case u.APOSTROPHE:case u.SINGLE_QUOTE:case u.OPEN_SQUARE_BRACKET:case u.BACKSLASH:case u.CLOSE_SQUARE_BRACKET:return!0;default:return!1}}},R=E({},ke),pn=R.version,gn=R.render,hn=R.unmountComponentAtNode,k;try{var En=Number((pn||"").split(".")[0]);En>=18&&(k=R.createRoot)}catch{}function ge(e){var n=R.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;n&&h(n)==="object"&&(n.usingClientEntryPoint=e)}var M="__rc_react_root__";function yn(e,n){ge(!0);var r=n[M]||k(n);ge(!1),r.render(e),n[M]=r}function Sn(e,n){gn(e,n)}function kn(e,n){if(k){yn(e,n);return}Sn(e,n)}function wn(e){return Q.apply(this,arguments)}function Q(){return Q=we(N().mark(function e(n){return N().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",Promise.resolve().then(function(){var a;(a=n[M])===null||a===void 0||a.unmount(),delete n[M]}));case 1:case"end":return t.stop()}},e)})),Q.apply(this,arguments)}function Rn(e){hn(e)}function Wn(e){return Y.apply(this,arguments)}function Y(){return Y=we(N().mark(function e(n){return N().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(k===void 0){t.next=2;break}return t.abrupt("return",wn(n));case 2:Rn(n);case 3:case"end":return t.stop()}},e)})),Y.apply(this,arguments)}const bn=function(e){if(!e)return!1;if(e instanceof Element){if(e.offsetParent)return!0;if(e.getBBox){var n=e.getBBox(),r=n.width,t=n.height;if(r||t)return!0}if(e.getBoundingClientRect){var a=e.getBoundingClientRect(),o=a.width,i=a.height;if(o||i)return!0}}return!1};var j;function Pe(e){var n="rc-scrollbar-measure-".concat(Math.random().toString(36).substring(7)),r=document.createElement("div");r.id=n;var t=r.style;t.position="absolute",t.left="0",t.top="0",t.width="100px",t.height="100px",t.overflow="scroll";var a,o;if(e){var i=getComputedStyle(e);t.scrollbarColor=i.scrollbarColor,t.scrollbarWidth=i.scrollbarWidth;var s=getComputedStyle(e,"::-webkit-scrollbar"),f=parseInt(s.width,10),l=parseInt(s.height,10);try{var d=f?"width: ".concat(s.width,";"):"",m=l?"height: ".concat(s.height,";"):"";ze(`
#`.concat(n,`::-webkit-scrollbar {
`).concat(d,`
`).concat(m,`
}`),n)}catch(W){console.error(W),a=f,o=l}}document.body.appendChild(r);var g=e&&a&&!isNaN(a)?a:r.offsetWidth-r.clientWidth,S=e&&o&&!isNaN(o)?o:r.offsetHeight-r.clientHeight;return document.body.removeChild(r),je(n),{width:g,height:S}}function $n(e){return typeof document>"u"?0:(j===void 0&&(j=Pe()),j.width)}function Vn(e){return typeof document>"u"||!e||!(e instanceof Element)?{width:0,height:0}:Pe(e)}function Nn(){var e=E({},Ke);return e.useId}var he=0,Ee=Nn();const jn=Ee?function(n){var r=Ee();return n||r}:function(n){var r=v.useState("ssr-id"),t=y(r,2),a=t[0],o=t[1];return v.useEffect(function(){var i=he;he+=1,o("rc_unique_".concat(i))},[]),n||a};var Fe=function(n){if(Z()&&window.document.documentElement){var r=Array.isArray(n)?n:[n],t=window.document.documentElement;return r.some(function(a){return a in t.style})}return!1},_n=function(n,r){if(!Fe(n))return!1;var t=document.createElement("div"),a=t.style[n];return t.style[n]=r,t.style[n]!==a};function Bn(e,n){return!Array.isArray(e)&&n!==void 0?_n(e,n):Fe(e)}const An=function(){if(typeof navigator>"u"||typeof window>"u")return!1;var e=navigator.userAgent||navigator.vendor||window.opera;return/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(e==null?void 0:e.substr(0,4))};function ye(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;if(bn(e)){var r=e.nodeName.toLowerCase(),t=["input","select","textarea","button"].includes(r)||e.isContentEditable||r==="a"&&!!e.getAttribute("href"),a=e.getAttribute("tabindex"),o=Number(a),i=null;return a&&!Number.isNaN(o)?i=o:t&&i===null&&(i=0),t&&e.disabled&&(i=null),i!==null&&(i>=0||n&&i<0)}return!1}function zn(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,r=X(e.querySelectorAll("*")).filter(function(t){return ye(t,n)});return ye(e,n)&&r.unshift(e),r}function Gn(e,n){return typeof Proxy<"u"&&e?new Proxy(e,{get:function(t,a){if(n[a])return n[a];var o=t[a];return typeof o=="function"?o.bind(t):o}}):e}var qn=function(){var n=v.useState(!1),r=y(n,2),t=r[0],a=r[1];return Ie(function(){a(An())},[]),t};function Qn(){var e=document.documentElement.clientWidth,n=window.innerHeight||document.documentElement.clientHeight;return{width:e,height:n}}function Yn(e){var n=e.getBoundingClientRect(),r=document.documentElement;return{left:n.left+(window.pageXOffset||r.scrollLeft)-(r.clientLeft||document.body.clientLeft||0),top:n.top+(window.pageYOffset||r.scrollTop)-(r.clientTop||document.body.clientTop||0)}}function Xn(e,n,r,t){var a=_.unstable_batchedUpdates?function(i){_.unstable_batchedUpdates(r,i)}:r;return e!=null&&e.addEventListener&&e.addEventListener(n,a,t),{remove:function(){e!=null&&e.removeEventListener&&e.removeEventListener(n,a,t)}}}export{Hn as A,xn as B,In as C,on as D,We as E,q as F,$ as G,Qn as H,Xn as I,Yn as J,u as K,qn as L,Gn as M,de as N,zn as O,Kn as P,Un as Q,$n as R,Bn as S,Qe as a,Ie as b,Z as c,Vn as d,Ln as e,tn as f,Tn as g,rn as h,A as i,ce as j,bn as k,An as l,jn as m,Fn as n,nn as o,Dn as p,un as q,je as r,an as s,kn as t,ze as u,Wn as v,O as w,se as x,Pn as y,ve as z};
