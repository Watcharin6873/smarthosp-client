import{r as F}from"./react-B9vPmY1d.js";import{a as b,m as te,n as _,h as k,d as c,_ as ee,b as he,e as Ne,i as xe,j as Ue,g as me,k as $,f as pe,c as re}from"./@babel-CRsfOLTH.js";import{w as G,p as Z,F as J,G as z,n as Ce,x as We}from"./rc-util-oW5U3vZm.js";import{S as je}from"./@rc-component-Dlaa6Cye.js";var Y="RC_FORM_INTERNAL_HOOKS",O=function(){G(!1,"Can not find FormContext. Please make sure you wrap Field under Form.")},X=F.createContext({getFieldValue:O,getFieldsValue:O,getFieldError:O,getFieldWarning:O,getFieldsError:O,isFieldsTouched:O,isFieldTouched:O,isFieldValidating:O,isFieldsValidating:O,resetFields:O,setFields:O,setFieldValue:O,setFieldsValue:O,validateFields:O,submit:O,getInternalHooks:function(){return O(),{dispatch:O,initEntityValue:O,registerField:O,useSubscribe:O,setInitialValues:O,destroyForm:O,setCallbacks:O,registerWatch:O,getFields:O,setValidateMessages:O,setPreserve:O,getInitialValue:O}}}),ae=F.createContext(null);function oe(o){return o==null?[]:Array.isArray(o)?o:[o]}function He(o){return o&&!!o._init}var W="'${name}' is not a valid ${type}",Me={default:"Validation error on field '${name}'",required:"'${name}' is required",enum:"'${name}' must be one of [${enum}]",whitespace:"'${name}' cannot be empty",date:{format:"'${name}' is invalid for format date",parse:"'${name}' could not be parsed as date",invalid:"'${name}' is invalid date"},types:{string:W,method:W,array:W,object:W,number:W,date:W,boolean:W,integer:W,float:W,regexp:W,email:W,url:W,hex:W},string:{len:"'${name}' must be exactly ${len} characters",min:"'${name}' must be at least ${min} characters",max:"'${name}' cannot be longer than ${max} characters",range:"'${name}' must be between ${min} and ${max} characters"},number:{len:"'${name}' must equal ${len}",min:"'${name}' cannot be less than ${min}",max:"'${name}' cannot be greater than ${max}",range:"'${name}' must be between ${min} and ${max}"},array:{len:"'${name}' must be exactly ${len} in length",min:"'${name}' cannot be less than ${min} in length",max:"'${name}' cannot be greater than ${max} in length",range:"'${name}' must be between ${min} and ${max} in length"},pattern:{mismatch:"'${name}' does not match pattern ${pattern}"}},Ee=je;function De(o,l){return o.replace(/\\?\$\{\w+\}/g,function(r){if(r.startsWith("\\"))return r.slice(1);var t=r.slice(2,-1);return l[t]})}var be="CODE_LOGIC_ERROR";function ce(o,l,r,t,e){return de.apply(this,arguments)}function de(){return de=te(_().mark(function o(l,r,t,e,n){var a,d,u,s,i,f,v,C,P;return _().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return a=b({},t),delete a.ruleIndex,Ee.warning=function(){},a.validator&&(d=a.validator,a.validator=function(){try{return d.apply(void 0,arguments)}catch(p){return console.error(p),Promise.reject(be)}}),u=null,a&&a.type==="array"&&a.defaultField&&(u=a.defaultField,delete a.defaultField),s=new Ee(c({},l,[a])),i=Z(Me,e.validateMessages),s.messages(i),f=[],g.prev=10,g.next=13,Promise.resolve(s.validate(c({},l,r),b({},e)));case 13:g.next=18;break;case 15:g.prev=15,g.t0=g.catch(10),g.t0.errors&&(f=g.t0.errors.map(function(p,h){var y=p.message,N=y===be?i.default:y;return F.isValidElement(N)?F.cloneElement(N,{key:"error_".concat(h)}):N}));case 18:if(!(!f.length&&u)){g.next=23;break}return g.next=21,Promise.all(r.map(function(p,h){return ce("".concat(l,".").concat(h),p,u,e,n)}));case 21:return v=g.sent,g.abrupt("return",v.reduce(function(p,h){return[].concat(k(p),k(h))},[]));case 23:return C=b(b({},t),{},{name:l,enum:(t.enum||[]).join(", ")},n),P=f.map(function(p){return typeof p=="string"?De(p,C):p}),g.abrupt("return",P);case 26:case"end":return g.stop()}},o,null,[[10,15]])})),de.apply(this,arguments)}function _e(o,l,r,t,e,n){var a=o.join("."),d=r.map(function(i,f){var v=i.validator,C=b(b({},i),{},{ruleIndex:f});return v&&(C.validator=function(P,m,g){var p=!1,h=function(){for(var E=arguments.length,T=new Array(E),M=0;M<E;M++)T[M]=arguments[M];Promise.resolve().then(function(){G(!p,"Your validator function has already return a promise. `callback` will be ignored."),p||g.apply(void 0,T)})},y=v(P,m,h);p=y&&typeof y.then=="function"&&typeof y.catch=="function",G(p,"`callback` is deprecated. Please return a promise instead."),p&&y.then(function(){g()}).catch(function(N){g(N||" ")})}),C}).sort(function(i,f){var v=i.warningOnly,C=i.ruleIndex,P=f.warningOnly,m=f.ruleIndex;return!!v==!!P?C-m:v?1:-1}),u;if(e===!0)u=new Promise(function(){var i=te(_().mark(function f(v,C){var P,m,g;return _().wrap(function(h){for(;;)switch(h.prev=h.next){case 0:P=0;case 1:if(!(P<d.length)){h.next=12;break}return m=d[P],h.next=5,ce(a,l,m,t,n);case 5:if(g=h.sent,!g.length){h.next=9;break}return C([{errors:g,rule:m}]),h.abrupt("return");case 9:P+=1,h.next=1;break;case 12:v([]);case 13:case"end":return h.stop()}},f)}));return function(f,v){return i.apply(this,arguments)}}());else{var s=d.map(function(i){return ce(a,l,i,t,n).then(function(f){return{errors:f,rule:i}})});u=(e?ze(s):Ke(s)).then(function(i){return Promise.reject(i)})}return u.catch(function(i){return i}),u}function Ke(o){return fe.apply(this,arguments)}function fe(){return fe=te(_().mark(function o(l){return _().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",Promise.all(l).then(function(e){var n,a=(n=[]).concat.apply(n,k(e));return a}));case 1:case"end":return t.stop()}},o)})),fe.apply(this,arguments)}function ze(o){return ve.apply(this,arguments)}function ve(){return ve=te(_().mark(function o(l){var r;return _().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=0,e.abrupt("return",new Promise(function(n){l.forEach(function(a){a.then(function(d){d.errors.length&&n([d]),r+=1,r===l.length&&n([])})})}));case 2:case"end":return e.stop()}},o)})),ve.apply(this,arguments)}function I(o){return oe(o)}function ke(o,l){var r={};return l.forEach(function(t){var e=J(o,t);r=z(r,t,e)}),r}function Q(o,l){var r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1;return o&&o.some(function(t){return Se(l,t,r)})}function Se(o,l){var r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1;return!o||!l||!r&&o.length!==l.length?!1:l.every(function(t,e){return o[e]===t})}function Ge(o,l){if(o===l)return!0;if(!o&&l||o&&!l||!o||!l||ee(o)!=="object"||ee(l)!=="object")return!1;var r=Object.keys(o),t=Object.keys(l),e=new Set([].concat(r,t));return k(e).every(function(n){var a=o[n],d=l[n];return typeof a=="function"&&typeof d=="function"?!0:a===d})}function qe(o){var l=arguments.length<=1?void 0:arguments[1];return l&&l.target&&ee(l.target)==="object"&&o in l.target?l.target[o]:l}function Re(o,l,r){var t=o.length;if(l<0||l>=t||r<0||r>=t)return o;var e=o[l],n=l-r;return n>0?[].concat(k(o.slice(0,r)),[e],k(o.slice(r,l)),k(o.slice(l+1,t))):n<0?[].concat(k(o.slice(0,l)),k(o.slice(l+1,r+1)),[e],k(o.slice(r+1,t))):o}var Je=["name"],j=[];function ue(o,l,r,t,e,n){return typeof o=="function"?o(l,r,"source"in n?{source:n.source}:{}):t!==e}var Fe=function(o){xe(r,o);var l=Ue(r);function r(t){var e;if(me(this,r),e=l.call(this,t),c($(e),"state",{resetCount:0}),c($(e),"cancelRegisterFunc",null),c($(e),"mounted",!1),c($(e),"touched",!1),c($(e),"dirty",!1),c($(e),"validatePromise",void 0),c($(e),"prevValidating",void 0),c($(e),"errors",j),c($(e),"warnings",j),c($(e),"cancelRegister",function(){var u=e.props,s=u.preserve,i=u.isListField,f=u.name;e.cancelRegisterFunc&&e.cancelRegisterFunc(i,s,I(f)),e.cancelRegisterFunc=null}),c($(e),"getNamePath",function(){var u=e.props,s=u.name,i=u.fieldContext,f=i.prefixName,v=f===void 0?[]:f;return s!==void 0?[].concat(k(v),k(s)):[]}),c($(e),"getRules",function(){var u=e.props,s=u.rules,i=s===void 0?[]:s,f=u.fieldContext;return i.map(function(v){return typeof v=="function"?v(f):v})}),c($(e),"refresh",function(){e.mounted&&e.setState(function(u){var s=u.resetCount;return{resetCount:s+1}})}),c($(e),"metaCache",null),c($(e),"triggerMetaEvent",function(u){var s=e.props.onMetaChange;if(s){var i=b(b({},e.getMeta()),{},{destroy:u});Ce(e.metaCache,i)||s(i),e.metaCache=i}else e.metaCache=null}),c($(e),"onStoreChange",function(u,s,i){var f=e.props,v=f.shouldUpdate,C=f.dependencies,P=C===void 0?[]:C,m=f.onReset,g=i.store,p=e.getNamePath(),h=e.getValue(u),y=e.getValue(g),N=s&&Q(s,p);switch(i.type==="valueUpdate"&&i.source==="external"&&!Ce(h,y)&&(e.touched=!0,e.dirty=!0,e.validatePromise=null,e.errors=j,e.warnings=j,e.triggerMetaEvent()),i.type){case"reset":if(!s||N){e.touched=!1,e.dirty=!1,e.validatePromise=void 0,e.errors=j,e.warnings=j,e.triggerMetaEvent(),m==null||m(),e.refresh();return}break;case"remove":{if(v&&ue(v,u,g,h,y,i)){e.reRender();return}break}case"setField":{var E=i.data;if(N){"touched"in E&&(e.touched=E.touched),"validating"in E&&!("originRCField"in E)&&(e.validatePromise=E.validating?Promise.resolve([]):null),"errors"in E&&(e.errors=E.errors||j),"warnings"in E&&(e.warnings=E.warnings||j),e.dirty=!0,e.triggerMetaEvent(),e.reRender();return}else if("value"in E&&Q(s,p,!0)){e.reRender();return}if(v&&!p.length&&ue(v,u,g,h,y,i)){e.reRender();return}break}case"dependenciesUpdate":{var T=P.map(I);if(T.some(function(M){return Q(i.relatedFields,M)})){e.reRender();return}break}default:if(N||(!P.length||p.length||v)&&ue(v,u,g,h,y,i)){e.reRender();return}break}v===!0&&e.reRender()}),c($(e),"validateRules",function(u){var s=e.getNamePath(),i=e.getValue(),f=u||{},v=f.triggerName,C=f.validateOnly,P=C===void 0?!1:C,m=Promise.resolve().then(te(_().mark(function g(){var p,h,y,N,E,T,M;return _().wrap(function(V){for(;;)switch(V.prev=V.next){case 0:if(e.mounted){V.next=2;break}return V.abrupt("return",[]);case 2:if(p=e.props,h=p.validateFirst,y=h===void 0?!1:h,N=p.messageVariables,E=p.validateDebounce,T=e.getRules(),v&&(T=T.filter(function(w){return w}).filter(function(w){var R=w.validateTrigger;if(!R)return!0;var L=oe(R);return L.includes(v)})),!(E&&v)){V.next=10;break}return V.next=8,new Promise(function(w){setTimeout(w,E)});case 8:if(e.validatePromise===m){V.next=10;break}return V.abrupt("return",[]);case 10:return M=_e(s,i,T,u,y,N),M.catch(function(w){return w}).then(function(){var w=arguments.length>0&&arguments[0]!==void 0?arguments[0]:j;if(e.validatePromise===m){var R;e.validatePromise=null;var L=[],A=[];(R=w.forEach)===null||R===void 0||R.call(w,function(x){var K=x.rule.warningOnly,U=x.errors,H=U===void 0?j:U;K?A.push.apply(A,k(H)):L.push.apply(L,k(H))}),e.errors=L,e.warnings=A,e.triggerMetaEvent(),e.reRender()}}),V.abrupt("return",M);case 13:case"end":return V.stop()}},g)})));return P||(e.validatePromise=m,e.dirty=!0,e.errors=j,e.warnings=j,e.triggerMetaEvent(),e.reRender()),m}),c($(e),"isFieldValidating",function(){return!!e.validatePromise}),c($(e),"isFieldTouched",function(){return e.touched}),c($(e),"isFieldDirty",function(){if(e.dirty||e.props.initialValue!==void 0)return!0;var u=e.props.fieldContext,s=u.getInternalHooks(Y),i=s.getInitialValue;return i(e.getNamePath())!==void 0}),c($(e),"getErrors",function(){return e.errors}),c($(e),"getWarnings",function(){return e.warnings}),c($(e),"isListField",function(){return e.props.isListField}),c($(e),"isList",function(){return e.props.isList}),c($(e),"isPreserve",function(){return e.props.preserve}),c($(e),"getMeta",function(){e.prevValidating=e.isFieldValidating();var u={touched:e.isFieldTouched(),validating:e.prevValidating,errors:e.errors,warnings:e.warnings,name:e.getNamePath(),validated:e.validatePromise===null};return u}),c($(e),"getOnlyChild",function(u){if(typeof u=="function"){var s=e.getMeta();return b(b({},e.getOnlyChild(u(e.getControlled(),s,e.props.fieldContext))),{},{isFunction:!0})}var i=We(u);return i.length!==1||!F.isValidElement(i[0])?{child:i,isFunction:!1}:{child:i[0],isFunction:!1}}),c($(e),"getValue",function(u){var s=e.props.fieldContext.getFieldsValue,i=e.getNamePath();return J(u||s(!0),i)}),c($(e),"getControlled",function(){var u=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},s=e.props,i=s.name,f=s.trigger,v=s.validateTrigger,C=s.getValueFromEvent,P=s.normalize,m=s.valuePropName,g=s.getValueProps,p=s.fieldContext,h=v!==void 0?v:p.validateTrigger,y=e.getNamePath(),N=p.getInternalHooks,E=p.getFieldsValue,T=N(Y),M=T.dispatch,S=e.getValue(),V=g||function(x){return c({},m,x)},w=u[f],R=i!==void 0?V(S):{},L=b(b({},u),R);L[f]=function(){e.touched=!0,e.dirty=!0,e.triggerMetaEvent();for(var x,K=arguments.length,U=new Array(K),H=0;H<K;H++)U[H]=arguments[H];C?x=C.apply(void 0,U):x=qe.apply(void 0,[m].concat(U)),P&&(x=P(x,S,E(!0))),M({type:"updateValue",namePath:y,value:x}),w&&w.apply(void 0,U)};var A=oe(h||[]);return A.forEach(function(x){var K=L[x];L[x]=function(){K&&K.apply(void 0,arguments);var U=e.props.rules;U&&U.length&&M({type:"validateField",namePath:y,triggerName:x})}}),L}),t.fieldContext){var n=t.fieldContext.getInternalHooks,a=n(Y),d=a.initEntityValue;d($(e))}return e}return pe(r,[{key:"componentDidMount",value:function(){var e=this.props,n=e.shouldUpdate,a=e.fieldContext;if(this.mounted=!0,a){var d=a.getInternalHooks,u=d(Y),s=u.registerField;this.cancelRegisterFunc=s(this)}n===!0&&this.reRender()}},{key:"componentWillUnmount",value:function(){this.cancelRegister(),this.triggerMetaEvent(!0),this.mounted=!1}},{key:"reRender",value:function(){this.mounted&&this.forceUpdate()}},{key:"render",value:function(){var e=this.state.resetCount,n=this.props.children,a=this.getOnlyChild(n),d=a.child,u=a.isFunction,s;return u?s=d:F.isValidElement(d)?s=F.cloneElement(d,this.getControlled(d.props)):(G(!d,"`children` of Field is not validate ReactElement."),s=d),F.createElement(F.Fragment,{key:e},s)}}]),r}(F.Component);c(Fe,"contextType",X);c(Fe,"defaultProps",{trigger:"onChange",valuePropName:"value"});function Oe(o){var l=o.name,r=he(o,Je),t=F.useContext(X),e=F.useContext(ae),n=l!==void 0?I(l):void 0,a="keep";return r.isListField||(a="_".concat((n||[]).join("_"))),F.createElement(Fe,Ne({key:a,name:n,isListField:!!e},r,{fieldContext:t}))}function Ye(o){var l=o.name,r=o.initialValue,t=o.children,e=o.rules,n=o.validateTrigger,a=o.isListField,d=F.useContext(X),u=F.useContext(ae),s=F.useRef({keys:[],id:0}),i=s.current,f=F.useMemo(function(){var m=I(d.prefixName)||[];return[].concat(k(m),k(I(l)))},[d.prefixName,l]),v=F.useMemo(function(){return b(b({},d),{},{prefixName:f})},[d,f]),C=F.useMemo(function(){return{getKey:function(g){var p=f.length,h=g[p];return[i.keys[h],g.slice(p+1)]}}},[f]);if(typeof t!="function")return G(!1,"Form.List only accepts function as children."),null;var P=function(g,p,h){var y=h.source;return y==="internal"?!1:g!==p};return F.createElement(ae.Provider,{value:C},F.createElement(X.Provider,{value:v},F.createElement(Oe,{name:[],shouldUpdate:P,rules:e,validateTrigger:n,initialValue:r,isList:!0,isListField:a??!!u},function(m,g){var p=m.value,h=p===void 0?[]:p,y=m.onChange,N=d.getFieldValue,E=function(){var V=N(f||[]);return V||[]},T={add:function(V,w){var R=E();w>=0&&w<=R.length?(i.keys=[].concat(k(i.keys.slice(0,w)),[i.id],k(i.keys.slice(w))),y([].concat(k(R.slice(0,w)),[V],k(R.slice(w))))):(i.keys=[].concat(k(i.keys),[i.id]),y([].concat(k(R),[V]))),i.id+=1},remove:function(V){var w=E(),R=new Set(Array.isArray(V)?V:[V]);R.size<=0||(i.keys=i.keys.filter(function(L,A){return!R.has(A)}),y(w.filter(function(L,A){return!R.has(A)})))},move:function(V,w){if(V!==w){var R=E();V<0||V>=R.length||w<0||w>=R.length||(i.keys=Re(i.keys,V,w),y(Re(R,V,w)))}}},M=h||[];return Array.isArray(M)||(M=[]),t(M.map(function(S,V){var w=i.keys[V];return w===void 0&&(i.keys[V]=i.id,w=i.keys[V],i.id+=1),{name:V,key:w,isListField:!0}}),T,g)})))}function Be(o){var l=!1,r=o.length,t=[];return o.length?new Promise(function(e,n){o.forEach(function(a,d){a.catch(function(u){return l=!0,u}).then(function(u){r-=1,t[d]=u,!(r>0)&&(l&&n(t),e(t))})})}):Promise.resolve([])}var Te="__@field_split__";function le(o){return o.map(function(l){return"".concat(ee(l),":").concat(l)}).join(Te)}var B=function(){function o(){me(this,o),c(this,"kvs",new Map)}return pe(o,[{key:"set",value:function(r,t){this.kvs.set(le(r),t)}},{key:"get",value:function(r){return this.kvs.get(le(r))}},{key:"update",value:function(r,t){var e=this.get(r),n=t(e);n?this.set(r,n):this.delete(r)}},{key:"delete",value:function(r){this.kvs.delete(le(r))}},{key:"map",value:function(r){return k(this.kvs.entries()).map(function(t){var e=re(t,2),n=e[0],a=e[1],d=n.split(Te);return r({key:d.map(function(u){var s=u.match(/^([^:]*):(.*)$/),i=re(s,3),f=i[1],v=i[2];return f==="number"?Number(v):v}),value:a})})}},{key:"toJSON",value:function(){var r={};return this.map(function(t){var e=t.key,n=t.value;return r[e.join(".")]=n,null}),r}}]),o}(),Qe=["name"],Xe=pe(function o(l){var r=this;me(this,o),c(this,"formHooked",!1),c(this,"forceRootUpdate",void 0),c(this,"subscribable",!0),c(this,"store",{}),c(this,"fieldEntities",[]),c(this,"initialValues",{}),c(this,"callbacks",{}),c(this,"validateMessages",null),c(this,"preserve",null),c(this,"lastValidatePromise",null),c(this,"getForm",function(){return{getFieldValue:r.getFieldValue,getFieldsValue:r.getFieldsValue,getFieldError:r.getFieldError,getFieldWarning:r.getFieldWarning,getFieldsError:r.getFieldsError,isFieldsTouched:r.isFieldsTouched,isFieldTouched:r.isFieldTouched,isFieldValidating:r.isFieldValidating,isFieldsValidating:r.isFieldsValidating,resetFields:r.resetFields,setFields:r.setFields,setFieldValue:r.setFieldValue,setFieldsValue:r.setFieldsValue,validateFields:r.validateFields,submit:r.submit,_init:!0,getInternalHooks:r.getInternalHooks}}),c(this,"getInternalHooks",function(t){return t===Y?(r.formHooked=!0,{dispatch:r.dispatch,initEntityValue:r.initEntityValue,registerField:r.registerField,useSubscribe:r.useSubscribe,setInitialValues:r.setInitialValues,destroyForm:r.destroyForm,setCallbacks:r.setCallbacks,setValidateMessages:r.setValidateMessages,getFields:r.getFields,setPreserve:r.setPreserve,getInitialValue:r.getInitialValue,registerWatch:r.registerWatch}):(G(!1,"`getInternalHooks` is internal usage. Should not call directly."),null)}),c(this,"useSubscribe",function(t){r.subscribable=t}),c(this,"prevWithoutPreserves",null),c(this,"setInitialValues",function(t,e){if(r.initialValues=t||{},e){var n,a=Z(t,r.store);(n=r.prevWithoutPreserves)===null||n===void 0||n.map(function(d){var u=d.key;a=z(a,u,J(t,u))}),r.prevWithoutPreserves=null,r.updateStore(a)}}),c(this,"destroyForm",function(t){if(t)r.updateStore({});else{var e=new B;r.getFieldEntities(!0).forEach(function(n){r.isMergedPreserve(n.isPreserve())||e.set(n.getNamePath(),!0)}),r.prevWithoutPreserves=e}}),c(this,"getInitialValue",function(t){var e=J(r.initialValues,t);return t.length?Z(e):e}),c(this,"setCallbacks",function(t){r.callbacks=t}),c(this,"setValidateMessages",function(t){r.validateMessages=t}),c(this,"setPreserve",function(t){r.preserve=t}),c(this,"watchList",[]),c(this,"registerWatch",function(t){return r.watchList.push(t),function(){r.watchList=r.watchList.filter(function(e){return e!==t})}}),c(this,"notifyWatch",function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[];if(r.watchList.length){var e=r.getFieldsValue(),n=r.getFieldsValue(!0);r.watchList.forEach(function(a){a(e,n,t)})}}),c(this,"timeoutId",null),c(this,"warningUnhooked",function(){}),c(this,"updateStore",function(t){r.store=t}),c(this,"getFieldEntities",function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1;return t?r.fieldEntities.filter(function(e){return e.getNamePath().length}):r.fieldEntities}),c(this,"getFieldsMap",function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1,e=new B;return r.getFieldEntities(t).forEach(function(n){var a=n.getNamePath();e.set(a,n)}),e}),c(this,"getFieldEntitiesForNamePathList",function(t){if(!t)return r.getFieldEntities(!0);var e=r.getFieldsMap(!0);return t.map(function(n){var a=I(n);return e.get(a)||{INVALIDATE_NAME_PATH:I(n)}})}),c(this,"getFieldsValue",function(t,e){r.warningUnhooked();var n,a,d;if(t===!0||Array.isArray(t)?(n=t,a=e):t&&ee(t)==="object"&&(d=t.strict,a=t.filter),n===!0&&!a)return r.store;var u=r.getFieldEntitiesForNamePathList(Array.isArray(n)?n:null),s=[];return u.forEach(function(i){var f,v,C="INVALIDATE_NAME_PATH"in i?i.INVALIDATE_NAME_PATH:i.getNamePath();if(d){var P,m;if((P=(m=i).isList)!==null&&P!==void 0&&P.call(m))return}else if(!n&&(f=(v=i).isListField)!==null&&f!==void 0&&f.call(v))return;if(!a)s.push(C);else{var g="getMeta"in i?i.getMeta():null;a(g)&&s.push(C)}}),ke(r.store,s.map(I))}),c(this,"getFieldValue",function(t){r.warningUnhooked();var e=I(t);return J(r.store,e)}),c(this,"getFieldsError",function(t){r.warningUnhooked();var e=r.getFieldEntitiesForNamePathList(t);return e.map(function(n,a){return n&&!("INVALIDATE_NAME_PATH"in n)?{name:n.getNamePath(),errors:n.getErrors(),warnings:n.getWarnings()}:{name:I(t[a]),errors:[],warnings:[]}})}),c(this,"getFieldError",function(t){r.warningUnhooked();var e=I(t),n=r.getFieldsError([e])[0];return n.errors}),c(this,"getFieldWarning",function(t){r.warningUnhooked();var e=I(t),n=r.getFieldsError([e])[0];return n.warnings}),c(this,"isFieldsTouched",function(){r.warningUnhooked();for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];var a=e[0],d=e[1],u,s=!1;e.length===0?u=null:e.length===1?Array.isArray(a)?(u=a.map(I),s=!1):(u=null,s=a):(u=a.map(I),s=d);var i=r.getFieldEntities(!0),f=function(g){return g.isFieldTouched()};if(!u)return s?i.every(function(m){return f(m)||m.isList()}):i.some(f);var v=new B;u.forEach(function(m){v.set(m,[])}),i.forEach(function(m){var g=m.getNamePath();u.forEach(function(p){p.every(function(h,y){return g[y]===h})&&v.update(p,function(h){return[].concat(k(h),[m])})})});var C=function(g){return g.some(f)},P=v.map(function(m){var g=m.value;return g});return s?P.every(C):P.some(C)}),c(this,"isFieldTouched",function(t){return r.warningUnhooked(),r.isFieldsTouched([t])}),c(this,"isFieldsValidating",function(t){r.warningUnhooked();var e=r.getFieldEntities();if(!t)return e.some(function(a){return a.isFieldValidating()});var n=t.map(I);return e.some(function(a){var d=a.getNamePath();return Q(n,d)&&a.isFieldValidating()})}),c(this,"isFieldValidating",function(t){return r.warningUnhooked(),r.isFieldsValidating([t])}),c(this,"resetWithFieldInitialValue",function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=new B,n=r.getFieldEntities(!0);n.forEach(function(u){var s=u.props.initialValue,i=u.getNamePath();if(s!==void 0){var f=e.get(i)||new Set;f.add({entity:u,value:s}),e.set(i,f)}});var a=function(s){s.forEach(function(i){var f=i.props.initialValue;if(f!==void 0){var v=i.getNamePath(),C=r.getInitialValue(v);if(C!==void 0)G(!1,"Form already set 'initialValues' with path '".concat(v.join("."),"'. Field can not overwrite it."));else{var P=e.get(v);if(P&&P.size>1)G(!1,"Multiple Field with path '".concat(v.join("."),"' set 'initialValue'. Can not decide which one to pick."));else if(P){var m=r.getFieldValue(v),g=i.isListField();!g&&(!t.skipExist||m===void 0)&&r.updateStore(z(r.store,v,k(P)[0].value))}}}})},d;t.entities?d=t.entities:t.namePathList?(d=[],t.namePathList.forEach(function(u){var s=e.get(u);if(s){var i;(i=d).push.apply(i,k(k(s).map(function(f){return f.entity})))}})):d=n,a(d)}),c(this,"resetFields",function(t){r.warningUnhooked();var e=r.store;if(!t){r.updateStore(Z(r.initialValues)),r.resetWithFieldInitialValue(),r.notifyObservers(e,null,{type:"reset"}),r.notifyWatch();return}var n=t.map(I);n.forEach(function(a){var d=r.getInitialValue(a);r.updateStore(z(r.store,a,d))}),r.resetWithFieldInitialValue({namePathList:n}),r.notifyObservers(e,n,{type:"reset"}),r.notifyWatch(n)}),c(this,"setFields",function(t){r.warningUnhooked();var e=r.store,n=[];t.forEach(function(a){var d=a.name,u=he(a,Qe),s=I(d);n.push(s),"value"in u&&r.updateStore(z(r.store,s,u.value)),r.notifyObservers(e,[s],{type:"setField",data:a})}),r.notifyWatch(n)}),c(this,"getFields",function(){var t=r.getFieldEntities(!0),e=t.map(function(n){var a=n.getNamePath(),d=n.getMeta(),u=b(b({},d),{},{name:a,value:r.getFieldValue(a)});return Object.defineProperty(u,"originRCField",{value:!0}),u});return e}),c(this,"initEntityValue",function(t){var e=t.props.initialValue;if(e!==void 0){var n=t.getNamePath(),a=J(r.store,n);a===void 0&&r.updateStore(z(r.store,n,e))}}),c(this,"isMergedPreserve",function(t){var e=t!==void 0?t:r.preserve;return e??!0}),c(this,"registerField",function(t){r.fieldEntities.push(t);var e=t.getNamePath();if(r.notifyWatch([e]),t.props.initialValue!==void 0){var n=r.store;r.resetWithFieldInitialValue({entities:[t],skipExist:!0}),r.notifyObservers(n,[t.getNamePath()],{type:"valueUpdate",source:"internal"})}return function(a,d){var u=arguments.length>2&&arguments[2]!==void 0?arguments[2]:[];if(r.fieldEntities=r.fieldEntities.filter(function(f){return f!==t}),!r.isMergedPreserve(d)&&(!a||u.length>1)){var s=a?void 0:r.getInitialValue(e);if(e.length&&r.getFieldValue(e)!==s&&r.fieldEntities.every(function(f){return!Se(f.getNamePath(),e)})){var i=r.store;r.updateStore(z(i,e,s,!0)),r.notifyObservers(i,[e],{type:"remove"}),r.triggerDependenciesUpdate(i,e)}}r.notifyWatch([e])}}),c(this,"dispatch",function(t){switch(t.type){case"updateValue":{var e=t.namePath,n=t.value;r.updateValue(e,n);break}case"validateField":{var a=t.namePath,d=t.triggerName;r.validateFields([a],{triggerName:d});break}}}),c(this,"notifyObservers",function(t,e,n){if(r.subscribable){var a=b(b({},n),{},{store:r.getFieldsValue(!0)});r.getFieldEntities().forEach(function(d){var u=d.onStoreChange;u(t,e,a)})}else r.forceRootUpdate()}),c(this,"triggerDependenciesUpdate",function(t,e){var n=r.getDependencyChildrenFields(e);return n.length&&r.validateFields(n),r.notifyObservers(t,n,{type:"dependenciesUpdate",relatedFields:[e].concat(k(n))}),n}),c(this,"updateValue",function(t,e){var n=I(t),a=r.store;r.updateStore(z(r.store,n,e)),r.notifyObservers(a,[n],{type:"valueUpdate",source:"internal"}),r.notifyWatch([n]);var d=r.triggerDependenciesUpdate(a,n),u=r.callbacks.onValuesChange;if(u){var s=ke(r.store,[n]);u(s,r.getFieldsValue())}r.triggerOnFieldsChange([n].concat(k(d)))}),c(this,"setFieldsValue",function(t){r.warningUnhooked();var e=r.store;if(t){var n=Z(r.store,t);r.updateStore(n)}r.notifyObservers(e,null,{type:"valueUpdate",source:"external"}),r.notifyWatch()}),c(this,"setFieldValue",function(t,e){r.setFields([{name:t,value:e}])}),c(this,"getDependencyChildrenFields",function(t){var e=new Set,n=[],a=new B;r.getFieldEntities().forEach(function(u){var s=u.props.dependencies;(s||[]).forEach(function(i){var f=I(i);a.update(f,function(){var v=arguments.length>0&&arguments[0]!==void 0?arguments[0]:new Set;return v.add(u),v})})});var d=function u(s){var i=a.get(s)||new Set;i.forEach(function(f){if(!e.has(f)){e.add(f);var v=f.getNamePath();f.isFieldDirty()&&v.length&&(n.push(v),u(v))}})};return d(t),n}),c(this,"triggerOnFieldsChange",function(t,e){var n=r.callbacks.onFieldsChange;if(n){var a=r.getFields();if(e){var d=new B;e.forEach(function(s){var i=s.name,f=s.errors;d.set(i,f)}),a.forEach(function(s){s.errors=d.get(s.name)||s.errors})}var u=a.filter(function(s){var i=s.name;return Q(t,i)});u.length&&n(u,a)}}),c(this,"validateFields",function(t,e){r.warningUnhooked();var n,a;Array.isArray(t)||typeof t=="string"||typeof e=="string"?(n=t,a=e):a=t;var d=!!n,u=d?n.map(I):[],s=[],i=String(Date.now()),f=new Set,v=a||{},C=v.recursive,P=v.dirty;r.getFieldEntities(!0).forEach(function(h){if(d||u.push(h.getNamePath()),!(!h.props.rules||!h.props.rules.length)&&!(P&&!h.isFieldDirty())){var y=h.getNamePath();if(f.add(y.join(i)),!d||Q(u,y,C)){var N=h.validateRules(b({validateMessages:b(b({},Me),r.validateMessages)},a));s.push(N.then(function(){return{name:y,errors:[],warnings:[]}}).catch(function(E){var T,M=[],S=[];return(T=E.forEach)===null||T===void 0||T.call(E,function(V){var w=V.rule.warningOnly,R=V.errors;w?S.push.apply(S,k(R)):M.push.apply(M,k(R))}),M.length?Promise.reject({name:y,errors:M,warnings:S}):{name:y,errors:M,warnings:S}}))}}});var m=Be(s);r.lastValidatePromise=m,m.catch(function(h){return h}).then(function(h){var y=h.map(function(N){var E=N.name;return E});r.notifyObservers(r.store,y,{type:"validateFinish"}),r.triggerOnFieldsChange(y,h)});var g=m.then(function(){return r.lastValidatePromise===m?Promise.resolve(r.getFieldsValue(u)):Promise.reject([])}).catch(function(h){var y=h.filter(function(N){return N&&N.errors.length});return Promise.reject({values:r.getFieldsValue(u),errorFields:y,outOfDate:r.lastValidatePromise!==m})});g.catch(function(h){return h});var p=u.filter(function(h){return f.has(h.join(i))});return r.triggerOnFieldsChange(p),g}),c(this,"submit",function(){r.warningUnhooked(),r.validateFields().then(function(t){var e=r.callbacks.onFinish;if(e)try{e(t)}catch(n){console.error(n)}}).catch(function(t){var e=r.callbacks.onFinishFailed;e&&e(t)})}),this.forceRootUpdate=l});function Ie(o){var l=F.useRef(),r=F.useState({}),t=re(r,2),e=t[1];if(!l.current)if(o)l.current=o;else{var n=function(){e({})},a=new Xe(n);l.current=a.getForm()}return[l.current]}var ge=F.createContext({triggerFormChange:function(){},triggerFormFinish:function(){},registerForm:function(){},unregisterForm:function(){}}),Ze=function(l){var r=l.validateMessages,t=l.onFormChange,e=l.onFormFinish,n=l.children,a=F.useContext(ge),d=F.useRef({});return F.createElement(ge.Provider,{value:b(b({},a),{},{validateMessages:b(b({},a.validateMessages),r),triggerFormChange:function(s,i){t&&t(s,{changedFields:i,forms:d.current}),a.triggerFormChange(s,i)},triggerFormFinish:function(s,i){e&&e(s,{values:i,forms:d.current}),a.triggerFormFinish(s,i)},registerForm:function(s,i){s&&(d.current=b(b({},d.current),{},c({},s,i))),a.registerForm(s,i)},unregisterForm:function(s){var i=b({},d.current);delete i[s],d.current=i,a.unregisterForm(s)}})},n)},er=["name","initialValues","fields","form","preserve","children","component","validateMessages","validateTrigger","onValuesChange","onFieldsChange","onFinish","onFinishFailed","clearOnDestroy"],rr=function(l,r){var t=l.name,e=l.initialValues,n=l.fields,a=l.form,d=l.preserve,u=l.children,s=l.component,i=s===void 0?"form":s,f=l.validateMessages,v=l.validateTrigger,C=v===void 0?"onChange":v,P=l.onValuesChange,m=l.onFieldsChange,g=l.onFinish,p=l.onFinishFailed,h=l.clearOnDestroy,y=he(l,er),N=F.useRef(null),E=F.useContext(ge),T=Ie(a),M=re(T,1),S=M[0],V=S.getInternalHooks(Y),w=V.useSubscribe,R=V.setInitialValues,L=V.setCallbacks,A=V.setValidateMessages,x=V.setPreserve,K=V.destroyForm;F.useImperativeHandle(r,function(){return b(b({},S),{},{nativeElement:N.current})}),F.useEffect(function(){return E.registerForm(t,S),function(){E.unregisterForm(t)}},[E,S,t]),A(b(b({},E.validateMessages),f)),L({onValuesChange:P,onFieldsChange:function(D){if(E.triggerFormChange(t,D),m){for(var q=arguments.length,we=new Array(q>1?q-1:0),ie=1;ie<q;ie++)we[ie-1]=arguments[ie];m.apply(void 0,[D].concat(we))}},onFinish:function(D){E.triggerFormFinish(t,D),g&&g(D)},onFinishFailed:p}),x(d);var U=F.useRef(null);R(e,!U.current),U.current||(U.current=!0),F.useEffect(function(){return function(){return K(h)}},[]);var H,ye=typeof u=="function";if(ye){var Le=S.getFieldsValue(!0);H=u(Le,S)}else H=u;w(!ye);var Ve=F.useRef();F.useEffect(function(){Ge(Ve.current||[],n||[])||S.setFields(n||[]),Ve.current=n},[n,S]);var Ae=F.useMemo(function(){return b(b({},S),{},{validateTrigger:C})},[S,C]),Pe=F.createElement(ae.Provider,{value:null},F.createElement(X.Provider,{value:Ae},H));return i===!1?Pe:F.createElement(i,Ne({},y,{ref:N,onSubmit:function(D){D.preventDefault(),D.stopPropagation(),S.submit()},onReset:function(D){var q;D.preventDefault(),S.resetFields(),(q=y.onReset)===null||q===void 0||q.call(y,D)}}),Pe)};function $e(o){try{return JSON.stringify(o)}catch{return Math.random()}}function tr(){for(var o=arguments.length,l=new Array(o),r=0;r<o;r++)l[r]=arguments[r];var t=l[0],e=l[1],n=e===void 0?{}:e,a=He(n)?{form:n}:n,d=a.form,u=F.useState(),s=re(u,2),i=s[0],f=s[1],v=F.useMemo(function(){return $e(i)},[i]),C=F.useRef(v);C.current=v;var P=F.useContext(X),m=d||P,g=m&&m._init,p=I(t),h=F.useRef(p);return h.current=p,F.useEffect(function(){if(g){var y=m.getFieldsValue,N=m.getInternalHooks,E=N(Y),T=E.registerWatch,M=function(R,L){var A=a.preserve?L:R;return typeof t=="function"?t(A):J(A,h.current)},S=T(function(w,R){var L=M(w,R),A=$e(L);C.current!==A&&(C.current=A,f(L))}),V=M(y(),y(!0));return i!==V&&f(V),S}},[g]),i}var nr=F.forwardRef(rr),ne=nr;ne.FormProvider=Ze;ne.Field=Oe;ne.List=Ye;ne.useForm=Ie;ne.useWatch=tr;export{X as C,Ze as F,ae as L,ne as R,Oe as W,Ye as a,tr as b,Ie as u};
