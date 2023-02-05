(function(){"use strict";var e={8214:function(e,t,n){n.r(t)},8179:function(e,t,n){var o=n(9963),r=n(6252);function i(e,t,n,o,i,a){const u=(0,r.up)("router-link"),s=(0,r.up)("router-view");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r._)("nav",null,[(0,r.Wm)(u,{to:"/auth"},{default:(0,r.w5)((()=>[(0,r.Uk)("Auth")])),_:1}),(0,r.Uk)(" | "),(0,r.Wm)(u,{to:"/"},{default:(0,r.w5)((()=>[(0,r.Uk)("App")])),_:1})]),(0,r.Wm)(s)],64)}var a={},u=n(3744);const s=(0,u.Z)(a,[["render",i]]);var c=s,l=n(2201);const f={class:"app"},d=(0,r._)("h1",null,"App View",-1),p=[d];function h(e,t,n,o,i,a){return(0,r.wg)(),(0,r.iD)("main",f,p)}var m={};const g=(0,u.Z)(m,[["render",h]]);var v=g;const y=[{path:"/",name:"AppView",component:v,meta:{requiresAuth:!0}},{path:"/auth",name:"AuthView",component:()=>n.e(93).then(n.bind(n,1093)),meta:{requiresAuth:!1}},{path:"/terms",name:"TermsView",component:()=>n.e(704).then(n.bind(n,6704)),meta:{requiresAuth:!1}}],w=(0,l.p7)({history:(0,l.PO)("/focustime-vue/"),routes:y});var b=w,E=(n(7658),n(3907)),S=n(3977),k=n(3059),T=n(8578),C=n(3247);const A={apiKey:"AIzaSyBtV4ajO6P0PH3aje1J0UedJj8zSYgqy9w",authDomain:"focustime-a18ff.firebaseapp.com",projectId:"focustime-a18ff",storageBucket:"focustime-a18ff.appspot.com",messagingSenderId:"1081184659635",appId:"1:1081184659635:web:c62431e60888334575e8c6",measurementId:"G-N8T6NFR8GN"},O=(0,S.ZF)(A),_=((0,k.IH)(O),(0,C.ad)(O),(0,T.v0)(O));_.onAuthStateChanged((e=>{e?x.dispatch("login",e):x.dispatch("logout")}));var N=n(3313),x=(0,E.MT)({state:{user:null},getters:{},mutations:{SET_USER(e,t){e.user=t,"/"!==b.currentRoute.path&&b.push({path:"/"})},CLEAR_USER(e){e.user=null,b.push({path:"/"})}},actions:{async login({commit:e},t){e("SET_USER",t)},async logout({commit:e}){await _.signOut(),e("CLEAR_USER"),new N.bF("Logged out successfully!",2e3)},async sign_in({commit:e},t){try{const{user:n}=await(0,T.e5)(_,t.email,t.password);e("SET_USER",n),new N.bF("Signed in successfully!",2e3)}catch(n){new N.PK("Could not sign in: ",(0,N.YY)(n),2e3)}},async create_user({commit:e},t){try{const{user:n}=await(0,T.Xb)(_,t.email,t.password);e("SET_USER",n),new N.bF("Account created successfully. Welcome to FocusTime!",2e3)}catch(n){new N.PK("Could not create account: ",(0,N.YY)(n),2e3)}}}});(0,o.ri)(c).use(x).use(b).mount("#app"),b.beforeEach(((e,t,o)=>{e.path.meta&&e.path.meta.requires_auth&&!x.state.user?(o({path:"/auth"}),new N.FN("You need to be logged in to view that!","default",1e3,n(1181))):"/auth"==e.path&&x.state.user?(o({path:"/"}),"/auth"!==t.path?new N.FN("You're already logged in!","default",1e3,n(3014)):new N.bF("Signed in successfully!",2e3)):o()}))},3313:function(e,t,n){n.d(t,{FN:function(){return r},OO:function(){return a},PK:function(){return i},YY:function(){return c},bF:function(){return u}});var o=n(9755);n(8214),window.history&&history.replaceState({},"",window.location.href.substr(0,window.location.href.length-window.location.search.length));class r{constructor(e,t,n,o="",r=""){this.message=e,this.type=t,this.duration=n,this.icon=o,this.action=r,this.showToast()}showToast(){o(".toast").remove();let e=document.createElement("div"),t=document.createElement("div");t.classList.add("toast"),e.classList.add("toast-overlay"),t.classList.add(this.type),""!=this.icon&&(t.innerHTML+=`<img alt="icon" src="${this.icon}" class="toast-icon" alt="Toast Popup Icon">`),t.innerHTML+=this.message,""!=this.action&&document.body.appendChild(e),document.body.appendChild(t),setTimeout((()=>{o(t).css({animation:"slideOut 0.5s forwards"})}),this.duration),setTimeout((()=>{e.remove(),t.remove(),""!=this.action&&""!=this.action&&(window.location.href=this.action)}),this.duration+500)}}class i extends r{constructor(e,t,o,r=""){e+=": "+t,super(e,"default",o,n(4346),r)}}class a extends r{constructor(e,t,o=""){super(e,"default",t,n(4266),o)}}class u extends r{constructor(e,t,o=""){super(e,"default",t,n(7237),o)}}function s(){o(".popup").css({animation:"popupout 0.25s forwards"}),o(".popup-overlay").css({animation:"fadeout 0.5s forwards"}),setTimeout((()=>{o(".popup").remove(),o(".popup-overlay").remove()}),500)}function c(e){switch(e.code){case"auth/invalid-email":return"Invalid email";case"auth/user-disabled":return"User disabled";case"auth/user-not-found":return"User not found";case"auth/wrong-password":return"Incorrect password";case"auth/email-already-in-use":return"Email already in use, try logging in";case"auth/weak-password":return"Password is too weak";case"auth/operation-not-allowed":return"Operation not allowed";case"auth/too-many-requests":return"Too many requests";default:return e.message.replace("Error ","")}}o(document.body).on("click",".popup-overlay",(function(){s()})),o("[placeholdaction]").click((function(){new r("This feature hasn't been implemented yet, sorry! 🤫","default",1500,n(3191))}))},4346:function(e,t,n){e.exports=n.p+"img/error-icon.c5bc41dd.svg"},1181:function(e,t,n){e.exports=n.p+"img/info-locked-icon.0b9144cc.svg"},3014:function(e,t,n){e.exports=n.p+"img/info-unlocked-icon.1ea710d7.svg"},7237:function(e,t,n){e.exports=n.p+"img/success-icon.53e866c5.svg"},3191:function(e,t,n){e.exports=n.p+"img/unimplemented-icon.5a21c0ed.svg"},4266:function(e,t,n){e.exports=n.p+"img/warning-icon.5869cd08.svg"}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={exports:{}};return e[o].call(i.exports,i,i.exports,n),i.exports}n.m=e,function(){var e=[];n.O=function(t,o,r,i){if(!o){var a=1/0;for(l=0;l<e.length;l++){o=e[l][0],r=e[l][1],i=e[l][2];for(var u=!0,s=0;s<o.length;s++)(!1&i||a>=i)&&Object.keys(n.O).every((function(e){return n.O[e](o[s])}))?o.splice(s--,1):(u=!1,i<a&&(a=i));if(u){e.splice(l--,1);var c=r();void 0!==c&&(t=c)}}return t}i=i||0;for(var l=e.length;l>0&&e[l-1][2]>i;l--)e[l]=e[l-1];e[l]=[o,r,i]}}(),function(){n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,o){return n.f[o](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+e+"."+{93:"b6ff0107",704:"5fad6e1b"}[e]+".js"}}(),function(){n.miniCssF=function(e){return"css/"+e+"."+{93:"f9fda068",704:"123f5f12"}[e]+".css"}}(),function(){n.miniCssF=function(e){return e+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="focustime-vue:";n.l=function(o,r,i,a){if(e[o])e[o].push(r);else{var u,s;if(void 0!==i)for(var c=document.getElementsByTagName("script"),l=0;l<c.length;l++){var f=c[l];if(f.getAttribute("src")==o||f.getAttribute("data-webpack")==t+i){u=f;break}}u||(s=!0,u=document.createElement("script"),u.charset="utf-8",u.timeout=120,n.nc&&u.setAttribute("nonce",n.nc),u.setAttribute("data-webpack",t+i),u.src=o),e[o]=[r];var d=function(t,n){u.onerror=u.onload=null,clearTimeout(p);var r=e[o];if(delete e[o],u.parentNode&&u.parentNode.removeChild(u),r&&r.forEach((function(e){return e(n)})),t)return t(n)},p=setTimeout(d.bind(null,void 0,{type:"timeout",target:u}),12e4);u.onerror=d.bind(null,u.onerror),u.onload=d.bind(null,u.onload),s&&document.head.appendChild(u)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p="/focustime-vue/"}(),function(){if("undefined"!==typeof document){var e=function(e,t,n,o,r){var i=document.createElement("link");i.rel="stylesheet",i.type="text/css";var a=function(n){if(i.onerror=i.onload=null,"load"===n.type)o();else{var a=n&&("load"===n.type?"missing":n.type),u=n&&n.target&&n.target.href||t,s=new Error("Loading CSS chunk "+e+" failed.\n("+u+")");s.code="CSS_CHUNK_LOAD_FAILED",s.type=a,s.request=u,i.parentNode.removeChild(i),r(s)}};return i.onerror=i.onload=a,i.href=t,n?n.parentNode.insertBefore(i,n.nextSibling):document.head.appendChild(i),i},t=function(e,t){for(var n=document.getElementsByTagName("link"),o=0;o<n.length;o++){var r=n[o],i=r.getAttribute("data-href")||r.getAttribute("href");if("stylesheet"===r.rel&&(i===e||i===t))return r}var a=document.getElementsByTagName("style");for(o=0;o<a.length;o++){r=a[o],i=r.getAttribute("data-href");if(i===e||i===t)return r}},o=function(o){return new Promise((function(r,i){var a=n.miniCssF(o),u=n.p+a;if(t(a,u))return r();e(o,u,null,r,i)}))},r={143:0};n.f.miniCss=function(e,t){var n={93:1,704:1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=o(e).then((function(){r[e]=0}),(function(t){throw delete r[e],t})))}}}(),function(){if("undefined"!==typeof document){var e=function(e,t,n,o,r){var i=document.createElement("link");i.rel="stylesheet",i.type="text/css";var a=function(n){if(i.onerror=i.onload=null,"load"===n.type)o();else{var a=n&&("load"===n.type?"missing":n.type),u=n&&n.target&&n.target.href||t,s=new Error("Loading CSS chunk "+e+" failed.\n("+u+")");s.code="CSS_CHUNK_LOAD_FAILED",s.type=a,s.request=u,i.parentNode.removeChild(i),r(s)}};return i.onerror=i.onload=a,i.href=t,n?n.parentNode.insertBefore(i,n.nextSibling):document.head.appendChild(i),i},t=function(e,t){for(var n=document.getElementsByTagName("link"),o=0;o<n.length;o++){var r=n[o],i=r.getAttribute("data-href")||r.getAttribute("href");if("stylesheet"===r.rel&&(i===e||i===t))return r}var a=document.getElementsByTagName("style");for(o=0;o<a.length;o++){r=a[o],i=r.getAttribute("data-href");if(i===e||i===t)return r}},o=function(o){return new Promise((function(r,i){var a=n.miniCssF(o),u=n.p+a;if(t(a,u))return r();e(o,u,null,r,i)}))},r={143:0};n.f.miniCss=function(e,t){var n={93:1,704:1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=o(e).then((function(){r[e]=0}),(function(t){throw delete r[e],t})))}}}(),function(){var e={143:0};n.f.j=function(t,o){var r=n.o(e,t)?e[t]:void 0;if(0!==r)if(r)o.push(r[2]);else{var i=new Promise((function(n,o){r=e[t]=[n,o]}));o.push(r[2]=i);var a=n.p+n.u(t),u=new Error,s=function(o){if(n.o(e,t)&&(r=e[t],0!==r&&(e[t]=void 0),r)){var i=o&&("load"===o.type?"missing":o.type),a=o&&o.target&&o.target.src;u.message="Loading chunk "+t+" failed.\n("+i+": "+a+")",u.name="ChunkLoadError",u.type=i,u.request=a,r[1](u)}};n.l(a,s,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,o){var r,i,a=o[0],u=o[1],s=o[2],c=0;if(a.some((function(t){return 0!==e[t]}))){for(r in u)n.o(u,r)&&(n.m[r]=u[r]);if(s)var l=s(n)}for(t&&t(o);c<a.length;c++)i=a[c],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(l)},o=self["webpackChunkfocustime_vue"]=self["webpackChunkfocustime_vue"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=n.O(void 0,[998],(function(){return n(8179)}));o=n.O(o)})();
//# sourceMappingURL=app.0005019d.js.map