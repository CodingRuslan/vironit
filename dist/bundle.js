!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){},function(e,t,n){"use strict";n.r(t);var o=function(e,t){const{constructor:n,...o}=t;function r(){e.apply(this,arguments),n.apply(this,arguments)}return r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.prototype=Object.keys(o).reduce((e,t)=>Object.assign({},e,{[t]:o[t]}),r.prototype),r};var r=function(){this._map=new Map,this.on=function(e,t){const n=this._map.get(e);n?this._map.set(e,n.concat(t)):this._map.set(e,[t])},this.emit=function(e,...t){this._map.get(e).forEach(e=>{e(...t)})},this.removeListener=function(e,t){const n=this._map.get(e);this._map.set(e,n.filter(e=>e!==t))}};function c(e,t){this.name=e,this.timeCook=t}const i=new c("base",5),d=new c("chicken",4),a=new c("pepperoni",3),s=new c("pineapple",2),l=new c("cheese",1);var u=new Array(i,d,a,s,l);var p=function(e,t){var n=e+Math.random()*(t+1-e);return n=Math.floor(n)};var m=function(e){this.clientName=e,this.order=[u[p(0,4)],u[p(0,4)]],this.getIngr=function(){return this.order}};var h=function(e,t){this.inWork=!1,this.clientName=e,this.ingredient=t,this.cooking=function(){let e=0;return this.ingredient.forEach(t=>{e+=t.timeCook}),e}};n(0);const f=[],k=[],L=[],C=[];let v=1;const y=o(r,new m),g=o(r,new h);document.body.appendChild(function(){const e=document.createElement("div");e.classList.add("generalWrapper");const t=document.createElement("div"),n=document.createElement("div"),o=document.createElement("div"),r=document.createElement("p"),c=document.createElement("p"),i=document.createElement("div"),d=document.createElement("button"),a=document.createElement("button");t.classList.add("headWrap"),n.classList.add("orderCountWrap"),o.classList.add("cookCountWrap"),r.classList.add("text","orderCount"),c.classList.add("text","cookCount"),i.classList.add("cookScreen"),d.classList.add("addCookBtn","button"),a.classList.add("deleteCookBtn","button"),d.innerHTML=" + ",a.innerHTML=" - ",t.appendChild(n),t.appendChild(o),n.appendChild(r),o.appendChild(c),t.appendChild(i),t.appendChild(d),t.appendChild(a);const s=document.createElement("div"),l=document.createElement("div"),u=document.createElement("div"),p=document.createElement("div"),m=document.createElement("h3"),h=document.createElement("h3"),f=document.createElement("h3"),k=document.createElement("p"),L=document.createElement("p"),C=document.createElement("p");return s.classList.add("mainWrap"),l.classList.add("queueWrap"),u.classList.add("processWrap"),p.classList.add("readyOrderWrap"),m.classList.add("text","label"),h.classList.add("text","label"),f.classList.add("text","label"),k.classList.add("text"),L.classList.add("text"),C.classList.add("text"),m.innerHTML="в очереди",h.innerHTML="готовятся",f.innerHTML="готовые заказы",s.appendChild(l),s.appendChild(u),s.appendChild(p),l.appendChild(m),l.appendChild(k),u.appendChild(h),u.appendChild(L),p.appendChild(f),p.appendChild(C),e.appendChild(t),e.appendChild(s),e}());const b=document.querySelector(".orderCount"),E=document.querySelector(".cookCount"),W=document.querySelector("div.queueWrap p"),S=document.querySelector("div.processWrap p"),M=document.querySelector("div.readyOrderWrap p"),x=document.querySelector("button.addCookBtn"),N=document.querySelector("button.deleteCookBtn"),T=document.querySelector(".cookScreen");function j(){for(let e=0;e<=f.length-1;e++)if(!f[e].inWork&&k.length>0){L.unshift(k.shift()),f[e].clientName=L[0].clientName,f[e].ingredient=L[0].order,f[e].inWork=!0;const t=document.querySelector(".cookNotWorksIcon");t.classList.add("cookWorksIcon"),t.classList.remove("cookNotWorksIcon"),_(),setTimeout(()=>{f[e].emit("chefFree",f[e].clientName,e)},1e3*f[e].cooking())}}function q(e,t){f[t].inWork=!1,C.push(L[L.findIndex(t=>{if(t.clientName==e)return t})]),L.splice(L.findIndex(t=>{if(t.clientName==e)return t}),1);const n=document.querySelector(".cookWorksIcon");var o;n.classList.remove("cookWorksIcon"),n.classList.add("cookNotWorksIcon"),_(),f.length>0&&(o=C[C.length-1],p(1,100)<=25&&(k.push(o),_())),k.length>0&&k[0].emit("createClient")}function _(){E.innerHTML=`Поваров в работе: ${f.length}`,b.innerHTML=`Размер очереди: ${k.length}`,W.innerHTML=`${k.map(e=>e.clientName).join(" ")}`,S.innerHTML=`${L.map(e=>e.clientName).join(" ")}`,M.innerHTML=`${C.map(e=>e.clientName).join(" ")}`}setTimeout(function e(){k.push(new y(`${v}`)),k[k.length-1].on("createClient",j),k[0].emit("createClient"),_(),v++,setTimeout(e,1e3*p(0,7))},0),x.addEventListener("click",()=>{f.push(new g),f[f.length-1].on("chefFree",q);const e=document.createElement("div");e.classList.add("cookNotWorksIcon"),T.appendChild(e),_()}),N.addEventListener("click",()=>{if(f.length>0&&!f[f.length-1].inWork){f.splice(f.length-1,1);const e=document.querySelector(".cookNotWorksIcon");T.removeChild(e),_()}})}]);
//# sourceMappingURL=bundle.js.map