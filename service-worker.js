if(!self.define){let e,i={};const s=(s,u)=>(s=new URL(s+".js",u).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(u,o)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let n={};const l=e=>s(e,c),r={module:{uri:c},exports:n,require:l};i[c]=Promise.all(u.map((e=>r[e]||l(e)))).then((e=>(o(...e),n)))}}define(["./workbox-db5fc017"],(function(e){"use strict";e.setCacheNameDetails({prefix:"focustime-vue"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/focustime-vue/123.css",revision:"49b2b60925bc5c27600af6db072b1739"},{url:"/focustime-vue/369.css",revision:"647e8cc8c85d7f58939916168898259c"},{url:"/focustime-vue/404.html",revision:"986284eb77f3dff0d49920ee2c72a9da"},{url:"/focustime-vue/672.css",revision:"ff5e94c1f40db30363d2927b84e8ecca"},{url:"/focustime-vue/727.css",revision:"b9290af604eef20d015488712e827f8b"},{url:"/focustime-vue/775.css",revision:"92ca11bf80166a1a6546aba1f9db6e2e"},{url:"/focustime-vue/835.css",revision:"4b0d2ab5ac7b77964a5ff3abe5300c47"},{url:"/focustime-vue/880.css",revision:"3bf45ce09aa83be99d3cb0613a11c75d"},{url:"/focustime-vue/chunk-common.css",revision:"5b0d2899d1fe50193518341a3d45da57"},{url:"/focustime-vue/css/123.61d64ed1.css",revision:null},{url:"/focustime-vue/css/369.6233db28.css",revision:null},{url:"/focustime-vue/css/672.24f67cdd.css",revision:null},{url:"/focustime-vue/css/727.8e24e845.css",revision:null},{url:"/focustime-vue/css/775.a0c4a21d.css",revision:null},{url:"/focustime-vue/css/835.f5088649.css",revision:null},{url:"/focustime-vue/css/880.9af6dafd.css",revision:null},{url:"/focustime-vue/css/chunk-common.79f56af2.css",revision:null},{url:"/focustime-vue/img/add-alt.b522b56e.svg",revision:null},{url:"/focustime-vue/img/add.5b38422b.svg",revision:null},{url:"/focustime-vue/img/archive-icon.2c4d8224.svg",revision:null},{url:"/focustime-vue/img/archive-icon.63406cd1.svg",revision:null},{url:"/focustime-vue/img/check-alt.bf91195b.svg",revision:null},{url:"/focustime-vue/img/check.dd29a30c.svg",revision:null},{url:"/focustime-vue/img/clock-icon.8b10622c.svg",revision:null},{url:"/focustime-vue/img/date-icon.5a1de83e.svg",revision:null},{url:"/focustime-vue/img/done-icon.b7ff3a51.svg",revision:null},{url:"/focustime-vue/img/edit-icon.39b68915.svg",revision:null},{url:"/focustime-vue/img/editing-icon.2639dd28.svg",revision:null},{url:"/focustime-vue/img/email.de75a40c.svg",revision:null},{url:"/focustime-vue/img/error-icon.c5bc41dd.svg",revision:null},{url:"/focustime-vue/img/favicon-monochrome.da2fcf2b.svg",revision:null},{url:"/focustime-vue/img/home-alt.9721e7af.svg",revision:null},{url:"/focustime-vue/img/home.184d8e52.svg",revision:null},{url:"/focustime-vue/img/info-locked-icon.0b9144cc.svg",revision:null},{url:"/focustime-vue/img/info-unlocked-icon.1ea710d7.svg",revision:null},{url:"/focustime-vue/img/name.6e669c70.svg",revision:null},{url:"/focustime-vue/img/nothing.80203fa4.svg",revision:null},{url:"/focustime-vue/img/onboarding-art.a9b4fbb6.svg",revision:null},{url:"/focustime-vue/img/onboarding-art.e745680f.png",revision:null},{url:"/focustime-vue/img/password.5e64c3c5.svg",revision:null},{url:"/focustime-vue/img/pfp.683c239e.png",revision:null},{url:"/focustime-vue/img/pfp.c9ab5173.svg",revision:null},{url:"/focustime-vue/img/pin-date.c4e1dae8.svg",revision:null},{url:"/focustime-vue/img/pin-icon-alt.85abe2c1.svg",revision:null},{url:"/focustime-vue/img/pin-icon.562a7cea.svg",revision:null},{url:"/focustime-vue/img/popup-done.0f425dea.svg",revision:null},{url:"/focustime-vue/img/popup-out.93416fee.svg",revision:null},{url:"/focustime-vue/img/session-alt.62b325ff.svg",revision:null},{url:"/focustime-vue/img/session.59dc4a8d.svg",revision:null},{url:"/focustime-vue/img/star.8e647e2a.svg",revision:null},{url:"/focustime-vue/img/success-icon.53e866c5.svg",revision:null},{url:"/focustime-vue/img/unimplemented-icon.5a21c0ed.svg",revision:null},{url:"/focustime-vue/img/warning-icon.5869cd08.svg",revision:null},{url:"/focustime-vue/index.html",revision:"41facee840cc38cf1914d12452e188b1"},{url:"/focustime-vue/js/123.72636c46.js",revision:null},{url:"/focustime-vue/js/369.177ed1b1.js",revision:null},{url:"/focustime-vue/js/404.8e28c5db.js",revision:null},{url:"/focustime-vue/js/672.f921afbc.js",revision:null},{url:"/focustime-vue/js/727.787d7487.js",revision:null},{url:"/focustime-vue/js/775.0c6e3644.js",revision:null},{url:"/focustime-vue/js/835.a2ac7119.js",revision:null},{url:"/focustime-vue/js/880.b23e6377.js",revision:null},{url:"/focustime-vue/js/chunk-common.b161ecd4.js",revision:null},{url:"/focustime-vue/js/chunk-vendors.a95ae4dc.js",revision:null},{url:"/focustime-vue/js/index.6972f3bc.js",revision:null},{url:"/focustime-vue/manifest.json",revision:"a3249976190232318c27518982d9c075"},{url:"/focustime-vue/og/hero-img.png",revision:"73a3342bc334f0fc8043efafc5a7e301"},{url:"/focustime-vue/og/screenshot/app-create.jpeg",revision:"b0c1a21a37eae8ce215f65dd8984e729"},{url:"/focustime-vue/og/screenshot/app-home.jpeg",revision:"32919ed37f8e6380f7508f547bd1a190"},{url:"/focustime-vue/og/screenshot/app-session.jpeg",revision:"1e16319cc490811ddf2960d4be411418"},{url:"/focustime-vue/og/screenshot/onboard.jpeg",revision:"7ce9aed4087c32cd00db7b1e58595ca4"},{url:"/focustime-vue/og/screenshot/signup.jpeg",revision:"cb2b131c17b39eb9411412d5a0a7598a"},{url:"/focustime-vue/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
