!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){},function(e,t,n){"use strict";n.r(t);var o=function(e,t){const{constructor:n,...o}=t;function r(){e.apply(this,arguments),n.apply(this,arguments)}return r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.prototype=Object.keys(o).reduce((e,t)=>Object.assign({},e,{[t]:o[t]}),r.prototype),r};var r=function(){this._map=new Map,this.on=function(e,t){const n=this._map.get(e);n?this._map.set(e,n.concat(t)):this._map.set(e,[t])},this.emit=function(e,...t){this._map.get(e).forEach(e=>{e(...t)})},this.removeListener=function(e,t){const n=this._map.get(e);this._map.set(e,n.filter(e=>e!==t))}};function c(e,t){this.name=e,this.timeCook=t}const i=new c("base",5),d=new c("chicken",4),a=new c("pepperoni",3),s=new c("pineapple",2),l=new c("cheese",1);var u=new Array(i,d,a,s,l);var p=function(e,t){var n=e+Math.random()*(t+1-e);return n=Math.floor(n)};const m=p(2,4);var h=function(e){this.clientName=e,this.order=[];for(let e=0;e<m;e++)this.order.push(u[p(0,4)])};var f=function(e,t){this.inWork=!1,this.clientName=e,this.ingredient=t,this.cooking=function(){let e=0;return this.ingredient.forEach(t=>{e+=t.timeCook}),e}};n(0);const v=[],C=[],k=[],L=[];let y=1;const g=o(r,new h),b=o(r,new f);document.body.appendChild(function(){const e=document.createElement("div");e.classList.add("generalWrapper");const t=document.createElement("div"),n=document.createElement("div"),o=document.createElement("div"),r=document.createElement("p"),c=document.createElement("p"),i=document.createElement("div"),d=document.createElement("button"),a=document.createElement("button");t.classList.add("headWrap"),n.classList.add("orderCountWrap"),o.classList.add("cookCountWrap"),r.classList.add("text","orderCount"),c.classList.add("text","cookCount"),i.classList.add("cookScreen"),d.classList.add("addCookBtn","button"),a.classList.add("deleteCookBtn","button"),d.innerHTML=" + ",a.innerHTML=" - ",t.appendChild(n),t.appendChild(o),n.appendChild(r),o.appendChild(c),t.appendChild(i),t.appendChild(d),t.appendChild(a);const s=document.createElement("div"),l=document.createElement("div"),u=document.createElement("div"),p=document.createElement("div"),m=document.createElement("div"),h=document.createElement("div"),f=document.createElement("div"),v=document.createElement("h3"),C=document.createElement("h3"),k=document.createElement("h3");return s.classList.add("mainWrap"),l.classList.add("queueWrap"),p.classList.add("processWrap"),h.classList.add("readyOrderWrap"),u.classList.add("queueContainer"),m.classList.add("processContainer"),f.classList.add("readyOrderContainer"),v.classList.add("text","label"),C.classList.add("text","label"),k.classList.add("text","label"),v.innerHTML="в очереди",C.innerHTML="готовятся",k.innerHTML="готовые заказы",s.appendChild(l),s.appendChild(p),s.appendChild(h),l.appendChild(v),l.appendChild(u),p.appendChild(C),p.appendChild(m),h.appendChild(k),h.appendChild(f),e.appendChild(t),e.appendChild(s),e}());const E=document.querySelector(".orderCount"),W=document.querySelector(".cookCount"),S=document.querySelector("div.queueWrap div"),M=document.querySelector("div.processWrap div"),N=document.querySelector("div.readyOrderWrap div"),x=document.querySelector("button.addCookBtn"),T=document.querySelector("button.deleteCookBtn"),q=document.querySelector(".cookScreen");function j(){for(let e=0;e<=v.length-1;e++)if(!v[e].inWork&&C.length>0){k.unshift(C.shift()),v[e].clientName=k[0].clientName,v[e].ingredient=k[0].order,v[e].inWork=!0;const t=document.querySelector(".cookNotWorksIcon");t.classList.add("cookWorksIcon"),t.classList.remove("cookNotWorksIcon"),O(),setTimeout(()=>{v[e].emit("chefFree",v[e].clientName,e)},1e3*v[e].cooking())}}function w(e,t){v[t].inWork=!1,L.push(k[k.findIndex(t=>{if(t.clientName==e)return t})]),k.splice(k.findIndex(t=>{if(t.clientName==e)return t}),1);const n=document.querySelector(".cookWorksIcon");var o;n.classList.remove("cookWorksIcon"),n.classList.add("cookNotWorksIcon"),O(),v.length>0&&(o=L[L.length-1],p(1,100)<=25&&(C.push(new g(`${o.clientName}`)),C[C.length-1].on("createClient",j),C[0].emit("createClient"),O())),C.length>0&&C[0].emit("createClient")}function O(){W.innerHTML=`Поваров в работе: ${v.length}`,E.innerHTML=`Размер очереди: ${C.length}`,S.innerHTML=`${C.map(e=>`<p class = "text">${e.clientName}</p>`).join(" ")}`,M.innerHTML=`${k.map(e=>`<p class = "text">${e.clientName}</p>`).join(" ")}`,N.innerHTML=`${L.map(e=>`<p class = "text">${e.clientName}</p>`).join(" ")}`}setTimeout(function e(){C.push(new g(`${y}`)),C[C.length-1].on("createClient",j),C[0].emit("createClient"),O(),y++,setTimeout(e,1e3*p(0,7))},0),x.addEventListener("click",()=>{v.push(new b),v[v.length-1].on("chefFree",w);const e=document.createElement("div");e.classList.add("cookNotWorksIcon"),q.appendChild(e),O()}),T.addEventListener("click",()=>{if(v.length>0&&!v[v.length-1].inWork){v.splice(v.length-1,1);const e=document.querySelector(".cookNotWorksIcon");q.removeChild(e),O()}})}]);
//# sourceMappingURL=bundle.js.map