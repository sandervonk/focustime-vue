if(!self.define){let e,i={};const s=(s,u)=>(s=new URL(s+".js",u).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(u,o)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let n={};const l=e=>s(e,c),r={module:{uri:c},exports:n,require:l};i[c]=Promise.all(u.map((e=>r[e]||l(e)))).then((e=>(o(...e),n)))}}define(["./workbox-db5fc017"],(function(e){"use strict";e.setCacheNameDetails({prefix:"FocusTime-vue"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/FocusTime-vue/123.css",revision:"49b2b60925bc5c27600af6db072b1739"},{url:"/FocusTime-vue/369.css",revision:"155dfa36dfc817bedcb3ee818af3c205"},{url:"/FocusTime-vue/727.css",revision:"b9290af604eef20d015488712e827f8b"},{url:"/FocusTime-vue/775.css",revision:"92ca11bf80166a1a6546aba1f9db6e2e"},{url:"/FocusTime-vue/835.css",revision:"3b2e36b2830cd4b837539266bb9b90c3"},{url:"/FocusTime-vue/880.css",revision:"3bf45ce09aa83be99d3cb0613a11c75d"},{url:"/FocusTime-vue/9.css",revision:"52debf8750367f7d15b2d0c2ba5ac10a"},{url:"/FocusTime-vue/css/123.61d64ed1.css",revision:null},{url:"/FocusTime-vue/css/369.ef154621.css",revision:null},{url:"/FocusTime-vue/css/727.8e24e845.css",revision:null},{url:"/FocusTime-vue/css/775.a0c4a21d.css",revision:null},{url:"/FocusTime-vue/css/835.783ce344.css",revision:null},{url:"/FocusTime-vue/css/880.9af6dafd.css",revision:null},{url:"/FocusTime-vue/css/9.d05e55b4.css",revision:null},{url:"/FocusTime-vue/css/index.b42728cc.css",revision:null},{url:"/FocusTime-vue/img/add-alt.b522b56e.svg",revision:null},{url:"/FocusTime-vue/img/add.5b38422b.svg",revision:null},{url:"/FocusTime-vue/img/archive-icon.2c4d8224.svg",revision:null},{url:"/FocusTime-vue/img/archive-icon.63406cd1.svg",revision:null},{url:"/FocusTime-vue/img/check-alt.bf91195b.svg",revision:null},{url:"/FocusTime-vue/img/check.dd29a30c.svg",revision:null},{url:"/FocusTime-vue/img/clock-icon.8b10622c.svg",revision:null},{url:"/FocusTime-vue/img/date-icon.5a1de83e.svg",revision:null},{url:"/FocusTime-vue/img/done-icon.b7ff3a51.svg",revision:null},{url:"/FocusTime-vue/img/edit-icon.39b68915.svg",revision:null},{url:"/FocusTime-vue/img/editing-icon.2639dd28.svg",revision:null},{url:"/FocusTime-vue/img/email.de75a40c.svg",revision:null},{url:"/FocusTime-vue/img/error-icon.c5bc41dd.svg",revision:null},{url:"/FocusTime-vue/img/favicon-monochrome.da2fcf2b.svg",revision:null},{url:"/FocusTime-vue/img/home-alt.9721e7af.svg",revision:null},{url:"/FocusTime-vue/img/home.184d8e52.svg",revision:null},{url:"/FocusTime-vue/img/info-locked-icon.0b9144cc.svg",revision:null},{url:"/FocusTime-vue/img/info-unlocked-icon.1ea710d7.svg",revision:null},{url:"/FocusTime-vue/img/name.6e669c70.svg",revision:null},{url:"/FocusTime-vue/img/nothing.80203fa4.svg",revision:null},{url:"/FocusTime-vue/img/onboarding-art.a9b4fbb6.svg",revision:null},{url:"/FocusTime-vue/img/onboarding-art.e745680f.png",revision:null},{url:"/FocusTime-vue/img/password.5e64c3c5.svg",revision:null},{url:"/FocusTime-vue/img/pfp.683c239e.png",revision:null},{url:"/FocusTime-vue/img/pfp.c9ab5173.svg",revision:null},{url:"/FocusTime-vue/img/pin-date.c4e1dae8.svg",revision:null},{url:"/FocusTime-vue/img/pin-icon-alt.85abe2c1.svg",revision:null},{url:"/FocusTime-vue/img/pin-icon.562a7cea.svg",revision:null},{url:"/FocusTime-vue/img/popup-done.0f425dea.svg",revision:null},{url:"/FocusTime-vue/img/popup-out.93416fee.svg",revision:null},{url:"/FocusTime-vue/img/session-alt.62b325ff.svg",revision:null},{url:"/FocusTime-vue/img/session.59dc4a8d.svg",revision:null},{url:"/FocusTime-vue/img/star.8e647e2a.svg",revision:null},{url:"/FocusTime-vue/img/success-icon.53e866c5.svg",revision:null},{url:"/FocusTime-vue/img/unimplemented-icon.5a21c0ed.svg",revision:null},{url:"/FocusTime-vue/img/warning-icon.5869cd08.svg",revision:null},{url:"/FocusTime-vue/index.css",revision:"11833b033cb82d114f73db41224bfdfe"},{url:"/FocusTime-vue/index.html",revision:"d84a7a04016e8ccb9f2a61351160e30d"},{url:"/FocusTime-vue/js/123.b8a0b4dc.js",revision:null},{url:"/FocusTime-vue/js/369.c8e02383.js",revision:null},{url:"/FocusTime-vue/js/727.1861cef2.js",revision:null},{url:"/FocusTime-vue/js/775.2b43cc29.js",revision:null},{url:"/FocusTime-vue/js/835.067f3d7f.js",revision:null},{url:"/FocusTime-vue/js/880.b06acbbc.js",revision:null},{url:"/FocusTime-vue/js/9.96caeccb.js",revision:null},{url:"/FocusTime-vue/js/chunk-vendors.d99adef7.js",revision:null},{url:"/FocusTime-vue/js/index.651863a3.js",revision:null},{url:"/FocusTime-vue/manifest.json",revision:"a3249976190232318c27518982d9c075"},{url:"/FocusTime-vue/og/hero-img.png",revision:"73a3342bc334f0fc8043efafc5a7e301"},{url:"/FocusTime-vue/og/screenshot/app-create.jpeg",revision:"b0c1a21a37eae8ce215f65dd8984e729"},{url:"/FocusTime-vue/og/screenshot/app-home.jpeg",revision:"32919ed37f8e6380f7508f547bd1a190"},{url:"/FocusTime-vue/og/screenshot/app-session.jpeg",revision:"1e16319cc490811ddf2960d4be411418"},{url:"/FocusTime-vue/og/screenshot/onboard.jpeg",revision:"7ce9aed4087c32cd00db7b1e58595ca4"},{url:"/FocusTime-vue/og/screenshot/signup.jpeg",revision:"cb2b131c17b39eb9411412d5a0a7598a"},{url:"/FocusTime-vue/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
