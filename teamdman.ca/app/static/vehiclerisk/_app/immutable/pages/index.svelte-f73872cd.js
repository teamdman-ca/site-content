import{S as ve,i as Me,s as ye,e as y,t as I,c as P,a as B,h as V,d as p,b as M,g as S,J as c,K as q,k as j,m as A,f as re,j as ke,L as pe,n as te,M as Fe,l as dt,N as He,O as Nt,P as et,Q as G,R as Q,T as he,U as _e,x as Be,y as we,z as Re,V as be,r as je,p as Ae,C as De}from"../chunks/index-e8133c0a.js";function xe(t,e){return Math.floor(Math.random()*(e-t+1))+t}function ht(t,e){const n=Math.random()*(e-t)+t;return Le(n)}function Le(t){return Math.round(t*100)/100}function It(t,e,n){var r=n,a=1-r,l=[Math.round(t[0]*r+e[0]*a),Math.round(t[1]*r+e[1]*a),Math.round(t[2]*r+e[2]*a)];return l}function Ot(t){return t.reduce((e,n)=>e.add(n),new Set)}function Vt(t){const e=Math.floor(Math.random()*t.length);return t[e]}function Oe(t,e,n,r){if(r===0)return new Set;if(t.length===0)return new Set;for(var a=[],l=0;l<t.length;l++){for(var d=[],h=1;h<=r;h++)d.push(f(l,h));a.push(d)}return Ot(_().subset);function _(){var i=a[a.length-1];return i[i.length-1]}function f(i,o){const s={maxValue:0,subset:[]};var u=o-1,b=t[i],m=o-e(b),w=i>0&&a[i-1][u]||s,E=i>0&&a[i-1][m-1]||s;if(m<0)return w;var g=w.maxValue,C=E.maxValue,v=C+n(b);if(v>=g){var R=E.subset.slice();return R.push(b),{maxValue:v,subset:R}}else return w}}function Ht(t){const e=t.severity**2*t.attackProb*(1-t.defendProb)*(t.defendCost/t.attackCost);return Math.round(e*100)/100}function $e(t){const e=[];for(let n=0;n<t.numComponents;n++)for(let r=0;r<t.numVulnerabilities-t.weaknesses[n];r++){const a={comp:n,vuln:r,attackCost:xe(1,t.attackerMaxCost),defendCost:xe(1,t.defenderMaxCost),attackProb:ht(t.attackerMinProb,t.attackerMaxProb),defendProb:ht(t.defenderMinProb,t.defenderMaxProb),severity:xe(1,5),risk:-1};a.risk=Ht(a),e.push(a)}return e}function St(t,e,n){const r=Array.from(e).reduce((a,l)=>{let d=l.severity**2*l.attackProb;return n.has(l)&&(d*=1-l.defendProb),a+d},0);return Math.round(r*100)/100}function oe(t){return t==="attacker"?e=>e.attackCost:e=>e.defendCost}const Ut=(t,e,n)=>Oe(t,oe(e),r=>r.severity,n),Ue=(t,e,n)=>Oe(t,oe(e),r=>r.risk,n),Ft=(t,e,n)=>{const r=new Set,a=oe(e);for(;n>0;){const l=t.filter(h=>!r.has(h)).filter(h=>a(h)<=n).sort((h,_)=>_.risk-h.risk).slice(0,5);if(l.length===0)return r;const d=Vt(Array.from(l));n-=a(d),r.add(d)}return r},Lt=(t,e,n)=>{const r=oe(e);return Oe(t.filter(a=>r(a)%2===1),r,a=>a.risk,n)},Jt=(t,e,n)=>{const r=e==="attacker"?"defender":"attacker",a=oe(e),l=Ue(t,r,n),d=Ue(Array.from(l),e,n);return n-=Array.from(d).map(a).reduce((h,_)=>h+_,0),Array.from(Ue(t.filter(h=>!d.has(h)),e,n)).forEach(h=>d.add(h)),d},zt=(t,e,n)=>Oe(t,oe(e),r=>oe(e)(r),n),Yt=(t,e,n)=>Oe(t,oe(e),r=>1/r.risk,n),Gt=(t,e,n)=>{const r=new Set;for(;n>0;){const a=t.filter(d=>!r.has(d)).filter(d=>oe(e)(d)<=n);if(a.length===0)return r;const l=Vt(a);r.add(l),n-=oe(e)(l)}return r},qt=(t,e,n)=>new Set,ie={bestRisk:Ue,bestGuess:Jt,bestSeverity:Ut,bestRiskRandom:Ft,even:Lt,cheap:zt,random:Gt,worstRisk:Yt,none:qt};function Kt(t,e,n,r){var l;const a={};for(let d=0;d<t;d++){const h=$e(e);for(const[_,f]of Object.entries(ie)){(a==null?void 0:a[_])===void 0&&(a[_]={});for(const[i,o]of Object.entries(ie)){((l=a[_])==null?void 0:l[i])===void 0&&(a[_][i]=[]);const s=a[_][i],u={board:h,attacking:o(h,"attacker",n),defending:f(h,"defender",r)};if(h.filter(b=>u.attacking.has(b)).map(b=>b.attackCost).reduce((b,m)=>b+m,0)>n)throw new Error("Exceeded atk cap");if(h.filter(b=>u.defending.has(b)).map(b=>b.defendCost).reduce((b,m)=>b+m,0)>r)throw new Error("Exceeded def cap");s.push(u)}}}return a}function _t(t,e,n){const r=t.slice();return r[7]=e[n],r[9]=n,r}function bt(t,e,n){const r=t.slice();r[10]=e[n],r[14]=n;const a=r[4](r[0][r[7]][r[10]]);r[11]=a;const l=It([240,70,70],[70,255,70],r[11]/r[1]);return r[12]=l,r}function pt(t,e,n){const r=t.slice();return r[15]=e[n],r[9]=n,r}function gt(t){let e,n=t[15]+"",r,a,l;function d(){return t[5](t[15])}return{c(){e=y("th"),r=I(n),this.h()},l(h){e=P(h,"TH",{class:!0});var _=B(e);r=V(_,n),_.forEach(p),this.h()},h(){M(e,"class","strat svelte-1yd8f63")},m(h,_){S(h,e,_),c(e,r),a||(l=q(e,"click",d),a=!0)},p(h,_){t=h},d(h){h&&p(e),a=!1,l()}}}function mt(t){let e,n=t[4](t[0][t[7]][t[10]])+"",r;return{c(){e=y("td"),r=I(n),this.h()},l(a){e=P(a,"TD",{style:!0,class:!0});var l=B(e);r=V(l,n),l.forEach(p),this.h()},h(){re(e,"background-color","rgb("+t[12][0]+","+t[12][1]+","+t[12][2]+")"),M(e,"class","svelte-1yd8f63")},m(a,l){S(a,e,l),c(e,r)},p(a,l){l&1&&n!==(n=a[4](a[0][a[7]][a[10]])+"")&&ke(r,n),l&3&&re(e,"background-color","rgb("+a[12][0]+","+a[12][1]+","+a[12][2]+")")},d(a){a&&p(e)}}}function kt(t){let e,n,r=t[7]+"",a,l,d,h,_;function f(){return t[6](t[7])}let i=t[3],o=[];for(let s=0;s<i.length;s+=1)o[s]=mt(bt(t,i,s));return{c(){e=y("tr"),n=y("th"),a=I(r),l=j();for(let s=0;s<o.length;s+=1)o[s].c();d=j(),this.h()},l(s){e=P(s,"TR",{});var u=B(e);n=P(u,"TH",{class:!0});var b=B(n);a=V(b,r),b.forEach(p),l=A(u);for(let m=0;m<o.length;m+=1)o[m].l(u);d=A(u),u.forEach(p),this.h()},h(){M(n,"class","strat svelte-1yd8f63")},m(s,u){S(s,e,u),c(e,n),c(n,a),c(e,l);for(let b=0;b<o.length;b+=1)o[b].m(e,null);c(e,d),h||(_=q(n,"click",f),h=!0)},p(s,u){if(t=s,u&27){i=t[3];let b;for(b=0;b<i.length;b+=1){const m=bt(t,i,b);o[b]?o[b].p(m,u):(o[b]=mt(m),o[b].c(),o[b].m(e,d))}for(;b<o.length;b+=1)o[b].d(1);o.length=i.length}},d(s){s&&p(e),pe(o,s),h=!1,_()}}}function Qt(t){let e,n,r,a,l,d,h,_,f,i,o,s,u,b,m,w=t[3],E=[];for(let v=0;v<w.length;v+=1)E[v]=gt(pt(t,w,v));let g=t[3],C=[];for(let v=0;v<g.length;v+=1)C[v]=kt(_t(t,g,v));return{c(){e=I(`Value averages\r
\r
`),n=y("table"),r=y("thead"),a=y("tr"),l=y("th"),d=j(),h=y("th"),_=I("Attacker"),f=j(),i=y("tr");for(let v=0;v<E.length;v+=1)E[v].c();o=j(),s=y("tbody"),u=y("th"),b=I("Defender"),m=j();for(let v=0;v<C.length;v+=1)C[v].c();this.h()},l(v){e=V(v,`Value averages\r
\r
`),n=P(v,"TABLE",{class:!0});var R=B(n);r=P(R,"THEAD",{});var k=B(r);a=P(k,"TR",{});var D=B(a);l=P(D,"TH",{rowspan:!0,colspan:!0,class:!0}),B(l).forEach(p),d=A(D),h=P(D,"TH",{colspan:!0,class:!0});var K=B(h);_=V(K,"Attacker"),K.forEach(p),D.forEach(p),f=A(k),i=P(k,"TR",{});var N=B(i);for(let L=0;L<E.length;L+=1)E[L].l(N);N.forEach(p),k.forEach(p),o=A(R),s=P(R,"TBODY",{});var J=B(s);u=P(J,"TH",{rowspan:!0,class:!0});var Z=B(u);b=V(Z,"Defender"),Z.forEach(p),m=A(J);for(let L=0;L<C.length;L+=1)C[L].l(J);J.forEach(p),R.forEach(p),this.h()},h(){M(l,"rowspan","2"),M(l,"colspan","2"),M(l,"class","svelte-1yd8f63"),M(h,"colspan",Object.keys(ie).length),M(h,"class","svelte-1yd8f63"),M(u,"rowspan",Object.keys(ie).length+1),M(u,"class","svelte-1yd8f63"),M(n,"class","svelte-1yd8f63")},m(v,R){S(v,e,R),S(v,n,R),c(n,r),c(r,a),c(a,l),c(a,d),c(a,h),c(h,_),c(r,f),c(r,i);for(let k=0;k<E.length;k+=1)E[k].m(i,null);c(n,o),c(n,s),c(s,u),c(u,b),c(s,m);for(let k=0;k<C.length;k+=1)C[k].m(s,null)},p(v,[R]){if(R&12){w=v[3];let k;for(k=0;k<w.length;k+=1){const D=pt(v,w,k);E[k]?E[k].p(D,R):(E[k]=gt(D),E[k].c(),E[k].m(i,null))}for(;k<E.length;k+=1)E[k].d(1);E.length=w.length}if(R&31){g=v[3];let k;for(k=0;k<g.length;k+=1){const D=_t(v,g,k);C[k]?C[k].p(D,R):(C[k]=kt(D),C[k].c(),C[k].m(s,null))}for(;k<C.length;k+=1)C[k].d(1);C.length=g.length}},i:te,o:te,d(v){v&&p(e),v&&p(n),pe(E,v),pe(C,v)}}}function Xt(t,e,n){let r,{results:a}=e;const l=Fe(),d=Object.keys(ie);function h(i){return Le(i.map(o=>St(o.board,o.attacking,o.defending)).reduce((o,s)=>o+s,0)/i.length)}const _=i=>l("attack",i),f=i=>l("defend",i);return t.$$set=i=>{"results"in i&&n(0,a=i.results)},t.$$.update=()=>{t.$$.dirty&1&&n(1,r=Object.values(a).flatMap(i=>Object.values(i)).map(h).reduce((i,o)=>Math.max(i,o),0))},[a,r,l,d,h,_,f]}class Wt extends ve{constructor(e){super(),Me(this,e,Xt,Qt,ye,{results:0})}}function vt(t,e,n){const r=t.slice();return r[6]=e[n],r[8]=n,r}function Mt(t,e,n){const r=t.slice();r[9]=e[n],r[13]=n;const a=r[3](r[0][r[6]][r[9]]);r[10]=a;const l=It([70,255,70],[240,70,70],r[10]/100);return r[11]=l,r}function yt(t,e,n){const r=t.slice();return r[14]=e[n],r[8]=n,r}function Pt(t){let e,n=t[14]+"",r,a,l;function d(){return t[4](t[14])}return{c(){e=y("th"),r=I(n),this.h()},l(h){e=P(h,"TH",{class:!0});var _=B(e);r=V(_,n),_.forEach(p),this.h()},h(){M(e,"class","strat svelte-1yd8f63")},m(h,_){S(h,e,_),c(e,r),a||(l=q(e,"click",d),a=!0)},p(h,_){t=h},d(h){h&&p(e),a=!1,l()}}}function Ct(t){let e,n=t[10]+"",r,a;return{c(){e=y("td"),r=I(n),a=I("%"),this.h()},l(l){e=P(l,"TD",{style:!0,class:!0});var d=B(e);r=V(d,n),a=V(d,"%"),d.forEach(p),this.h()},h(){re(e,"background-color","rgb("+t[11][0]+","+t[11][1]+","+t[11][2]+")"),M(e,"class","svelte-1yd8f63")},m(l,d){S(l,e,d),c(e,r),c(e,a)},p(l,d){d&1&&n!==(n=l[10]+"")&&ke(r,n),d&1&&re(e,"background-color","rgb("+l[11][0]+","+l[11][1]+","+l[11][2]+")")},d(l){l&&p(e)}}}function Et(t){let e,n,r=t[6]+"",a,l,d,h,_;function f(){return t[5](t[6])}let i=t[2],o=[];for(let s=0;s<i.length;s+=1)o[s]=Ct(Mt(t,i,s));return{c(){e=y("tr"),n=y("th"),a=I(r),l=j();for(let s=0;s<o.length;s+=1)o[s].c();d=j(),this.h()},l(s){e=P(s,"TR",{});var u=B(e);n=P(u,"TH",{class:!0});var b=B(n);a=V(b,r),b.forEach(p),l=A(u);for(let m=0;m<o.length;m+=1)o[m].l(u);d=A(u),u.forEach(p),this.h()},h(){M(n,"class","strat svelte-1yd8f63")},m(s,u){S(s,e,u),c(e,n),c(n,a),c(e,l);for(let b=0;b<o.length;b+=1)o[b].m(e,null);c(e,d),h||(_=q(n,"click",f),h=!0)},p(s,u){if(t=s,u&13){i=t[2];let b;for(b=0;b<i.length;b+=1){const m=Mt(t,i,b);o[b]?o[b].p(m,u):(o[b]=Ct(m),o[b].c(),o[b].m(e,d))}for(;b<o.length;b+=1)o[b].d(1);o.length=i.length}},d(s){s&&p(e),pe(o,s),h=!1,_()}}}function Zt(t){let e,n,r,a,l,d,h,_,f,i,o,s,u,b,m,w=t[2],E=[];for(let v=0;v<w.length;v+=1)E[v]=Pt(yt(t,w,v));let g=t[2],C=[];for(let v=0;v<g.length;v+=1)C[v]=Et(vt(t,g,v));return{c(){e=I(`Match percentage\r
\r
`),n=y("table"),r=y("thead"),a=y("tr"),l=y("th"),d=j(),h=y("th"),_=I("Attacker"),f=j(),i=y("tr");for(let v=0;v<E.length;v+=1)E[v].c();o=j(),s=y("tbody"),u=y("th"),b=I("Defender"),m=j();for(let v=0;v<C.length;v+=1)C[v].c();this.h()},l(v){e=V(v,`Match percentage\r
\r
`),n=P(v,"TABLE",{class:!0});var R=B(n);r=P(R,"THEAD",{});var k=B(r);a=P(k,"TR",{});var D=B(a);l=P(D,"TH",{rowspan:!0,colspan:!0,class:!0}),B(l).forEach(p),d=A(D),h=P(D,"TH",{colspan:!0,class:!0});var K=B(h);_=V(K,"Attacker"),K.forEach(p),D.forEach(p),f=A(k),i=P(k,"TR",{});var N=B(i);for(let L=0;L<E.length;L+=1)E[L].l(N);N.forEach(p),k.forEach(p),o=A(R),s=P(R,"TBODY",{});var J=B(s);u=P(J,"TH",{rowspan:!0,class:!0});var Z=B(u);b=V(Z,"Defender"),Z.forEach(p),m=A(J);for(let L=0;L<C.length;L+=1)C[L].l(J);J.forEach(p),R.forEach(p),this.h()},h(){M(l,"rowspan","2"),M(l,"colspan","2"),M(l,"class","svelte-1yd8f63"),M(h,"colspan",Object.keys(ie).length),M(h,"class","svelte-1yd8f63"),M(u,"rowspan",Object.keys(ie).length+1),M(u,"class","svelte-1yd8f63"),M(n,"class","svelte-1yd8f63")},m(v,R){S(v,e,R),S(v,n,R),c(n,r),c(r,a),c(a,l),c(a,d),c(a,h),c(h,_),c(r,f),c(r,i);for(let k=0;k<E.length;k+=1)E[k].m(i,null);c(n,o),c(n,s),c(s,u),c(u,b),c(s,m);for(let k=0;k<C.length;k+=1)C[k].m(s,null)},p(v,[R]){if(R&6){w=v[2];let k;for(k=0;k<w.length;k+=1){const D=yt(v,w,k);E[k]?E[k].p(D,R):(E[k]=Pt(D),E[k].c(),E[k].m(i,null))}for(;k<E.length;k+=1)E[k].d(1);E.length=w.length}if(R&15){g=v[2];let k;for(k=0;k<g.length;k+=1){const D=vt(v,g,k);C[k]?C[k].p(D,R):(C[k]=Et(D),C[k].c(),C[k].m(s,null))}for(;k<C.length;k+=1)C[k].d(1);C.length=g.length}},i:te,o:te,d(v){v&&p(e),v&&p(n),pe(E,v),pe(C,v)}}}function xt(t,e,n){const r=Fe(),a=Object.keys(ie);let{results:l}=e;function d(f){let i=0,o=0;for(const s of f)o+=s.attacking.size,i+=Array.from(s.attacking).filter(u=>s.defending.has(u)).length;return i===0?Array.from(f).every(s=>s.attacking.size===0)?100:0:Le(i/o*100)}const h=f=>r("attack",f),_=f=>r("defend",f);return t.$$set=f=>{"results"in f&&n(0,l=f.results)},[l,r,a,d,h,_]}class $t extends ve{constructor(e){super(),Me(this,e,xt,Zt,ye,{results:0})}}function Tt(t,e,n){const r=t.slice();return r[9]=e[n],r[11]=n,r}function Bt(t,e,n){const r=t.slice();r[9]=e[n],r[14]=n;const a=rn(r[0],r[11],r[14]);return r[12]=a,r}function wt(t,e,n){const r=t.slice();return r[9]=e[n],r[11]=n,r}function Rt(t){let e,n,r=t[11]+1+"",a;return{c(){e=y("th"),n=I("Vuln "),a=I(r),this.h()},l(l){e=P(l,"TH",{class:!0});var d=B(e);n=V(d,"Vuln "),a=V(d,r),d.forEach(p),this.h()},h(){M(e,"class","svelte-fnopyr")},m(l,d){S(l,e,d),c(e,n),c(e,a)},p:te,d(l){l&&p(e)}}}function en(t){let e;return{c(){e=y("td"),this.h()},l(n){e=P(n,"TD",{class:!0}),B(e).forEach(p),this.h()},h(){M(e,"class","inactive svelte-fnopyr")},m(n,r){S(n,e,r)},p:te,d(n){n&&p(e)}}}function tn(t){let e,n=Dt(t[12])+"",r,a,l;function d(){return t[6](t[12])}function h(){return t[7](t[12])}return{c(){e=y("td"),r=I(n),this.h()},l(_){e=P(_,"TD",{class:!0});var f=B(e);r=V(f,n),f.forEach(p),this.h()},h(){M(e,"class","noselect svelte-fnopyr"),He(e,"attacking",t[1].has(t[12])),He(e,"defending",t[2].has(t[12]))},m(_,f){S(_,e,f),c(e,r),a||(l=[q(e,"click",d),q(e,"contextmenu",Nt(h))],a=!0)},p(_,f){t=_,f&1&&n!==(n=Dt(t[12])+"")&&ke(r,n),f&3&&He(e,"attacking",t[1].has(t[12])),f&5&&He(e,"defending",t[2].has(t[12]))},d(_){_&&p(e),a=!1,et(l)}}}function jt(t){let e;function n(l,d){return l[12]?tn:en}let r=n(t),a=r(t);return{c(){a.c(),e=dt()},l(l){a.l(l),e=dt()},m(l,d){a.m(l,d),S(l,e,d)},p(l,d){r===(r=n(l))&&a?a.p(l,d):(a.d(1),a=r(l),a&&(a.c(),a.m(e.parentNode,e)))},d(l){a.d(l),l&&p(e)}}}function At(t){let e,n,r,a,l,d,h=Array(t[3]),_=[];for(let f=0;f<h.length;f+=1)_[f]=jt(Bt(t,h,f));return{c(){e=y("tr"),n=y("td"),r=I("Comp "),a=I(t[11]),l=j();for(let f=0;f<_.length;f+=1)_[f].c();d=j(),this.h()},l(f){e=P(f,"TR",{});var i=B(e);n=P(i,"TD",{class:!0});var o=B(n);r=V(o,"Comp "),a=V(o,t[11]),o.forEach(p),l=A(i);for(let s=0;s<_.length;s+=1)_[s].l(i);d=A(i),i.forEach(p),this.h()},h(){M(n,"class","svelte-fnopyr")},m(f,i){S(f,e,i),c(e,n),c(n,r),c(n,a),c(e,l);for(let o=0;o<_.length;o+=1)_[o].m(e,null);c(e,d)},p(f,i){if(i&47){h=Array(f[3]);let o;for(o=0;o<h.length;o+=1){const s=Bt(f,h,o);_[o]?_[o].p(s,i):(_[o]=jt(s),_[o].c(),_[o].m(e,d))}for(;o<_.length;o+=1)_[o].d(1);_.length=h.length}},d(f){f&&p(e),pe(_,f)}}}function nn(t){let e,n,r,a,l,d,h,_,f=Array(t[3]),i=[];for(let u=0;u<f.length;u+=1)i[u]=Rt(wt(t,f,u));let o=Array(t[4]),s=[];for(let u=0;u<o.length;u+=1)s[u]=At(Tt(t,o,u));return{c(){e=I(`Board example\r
\r
`),n=y("table"),r=y("thead"),a=y("tr"),l=y("th"),d=j();for(let u=0;u<i.length;u+=1)i[u].c();h=j(),_=y("tbody");for(let u=0;u<s.length;u+=1)s[u].c();this.h()},l(u){e=V(u,`Board example\r
\r
`),n=P(u,"TABLE",{class:!0});var b=B(n);r=P(b,"THEAD",{});var m=B(r);a=P(m,"TR",{});var w=B(a);l=P(w,"TH",{class:!0}),B(l).forEach(p),d=A(w);for(let g=0;g<i.length;g+=1)i[g].l(w);w.forEach(p),m.forEach(p),h=A(b),_=P(b,"TBODY",{});var E=B(_);for(let g=0;g<s.length;g+=1)s[g].l(E);E.forEach(p),b.forEach(p),this.h()},h(){M(l,"class","svelte-fnopyr"),M(n,"class","svelte-fnopyr")},m(u,b){S(u,e,b),S(u,n,b),c(n,r),c(r,a),c(a,l),c(a,d);for(let m=0;m<i.length;m+=1)i[m].m(a,null);c(n,h),c(n,_);for(let m=0;m<s.length;m+=1)s[m].m(_,null)},p(u,[b]){if(b&8){f=Array(u[3]);let m;for(m=0;m<f.length;m+=1){const w=wt(u,f,m);i[m]?i[m].p(w,b):(i[m]=Rt(w),i[m].c(),i[m].m(a,null))}for(;m<i.length;m+=1)i[m].d(1);i.length=f.length}if(b&63){o=Array(u[4]);let m;for(m=0;m<o.length;m+=1){const w=Tt(u,o,m);s[m]?s[m].p(w,b):(s[m]=At(w),s[m].c(),s[m].m(_,null))}for(;m<s.length;m+=1)s[m].d(1);s.length=o.length}},i:te,o:te,d(u){u&&p(e),u&&p(n),pe(i,u),pe(s,u)}}}function rn(t,e,n){var r;return(r=t.find(a=>a.comp===e&&a.vuln===n))!=null?r:null}function Dt(t){if(t===null)return"";const e=["attackCost","defendCost","attackProb","defendProb","risk","severity"];let n="";for(const r of e)n+=`${r}: ${t[r]}
`;return n}function an(t,e,n){let r,a,{board:l}=e,{attacking:d}=e,{defending:h}=e;const _=Fe();function f(s,u){_("toggle",{action:s,player:u})}const i=s=>f(s,"attacker"),o=s=>f(s,"defender");return t.$$set=s=>{"board"in s&&n(0,l=s.board),"attacking"in s&&n(1,d=s.attacking),"defending"in s&&n(2,h=s.defending)},t.$$.update=()=>{t.$$.dirty&1&&n(4,r=l.map(s=>s.comp).reduce((s,u)=>Math.max(s,u+1),0)),t.$$.dirty&1&&n(3,a=l.map(s=>s.vuln).reduce((s,u)=>Math.max(s,u+1),0))},[l,d,h,a,r,f,i,o]}class ln extends ve{constructor(e){super(),Me(this,e,an,nn,ye,{board:0,attacking:1,defending:2})}}function sn(t){let e,n,r,a,l,d,h,_,f,i,o,s,u,b,m,w,E;return{c(){e=I("Total attack cost: "),n=I(t[4]),r=j(),a=y("br"),l=I(`\r
Total defend cost: `),d=I(t[3]),h=j(),_=y("br"),f=I(`\r
Total value: `),i=I(t[2]),o=j(),s=y("br"),u=I(`\r
Matches: `),b=I(t[0]),m=I(" ("),w=I(t[1]),E=I("%)")},l(g){e=V(g,"Total attack cost: "),n=V(g,t[4]),r=A(g),a=P(g,"BR",{}),l=V(g,`\r
Total defend cost: `),d=V(g,t[3]),h=A(g),_=P(g,"BR",{}),f=V(g,`\r
Total value: `),i=V(g,t[2]),o=A(g),s=P(g,"BR",{}),u=V(g,`\r
Matches: `),b=V(g,t[0]),m=V(g," ("),w=V(g,t[1]),E=V(g,"%)")},m(g,C){S(g,e,C),S(g,n,C),S(g,r,C),S(g,a,C),S(g,l,C),S(g,d,C),S(g,h,C),S(g,_,C),S(g,f,C),S(g,i,C),S(g,o,C),S(g,s,C),S(g,u,C),S(g,b,C),S(g,m,C),S(g,w,C),S(g,E,C)},p(g,[C]){C&16&&ke(n,g[4]),C&8&&ke(d,g[3]),C&4&&ke(i,g[2]),C&1&&ke(b,g[0]),C&2&&ke(w,g[1])},i:te,o:te,d(g){g&&p(e),g&&p(n),g&&p(r),g&&p(a),g&&p(l),g&&p(d),g&&p(h),g&&p(_),g&&p(f),g&&p(i),g&&p(o),g&&p(s),g&&p(u),g&&p(b),g&&p(m),g&&p(w),g&&p(E)}}}function on(t,e,n){let r,a,l,d,h,{board:_}=e,{attacking:f}=e,{defending:i}=e;return t.$$set=o=>{"board"in o&&n(5,_=o.board),"attacking"in o&&n(6,f=o.attacking),"defending"in o&&n(7,i=o.defending)},t.$$.update=()=>{t.$$.dirty&96&&n(4,r=_.filter(o=>f.has(o)).reduce((o,s)=>o+=s.attackCost,0)),t.$$.dirty&160&&n(3,a=_.filter(o=>i.has(o)).reduce((o,s)=>o+=s.defendCost,0)),t.$$.dirty&224&&n(2,l=St(_,f,i)),t.$$.dirty&192&&n(0,d=Array.from(f).filter(o=>i.has(o)).reduce((o,s)=>o+1,0)),t.$$.dirty&65&&n(1,h=Le(d==0?0:d/f.size*100))},[d,h,l,a,r,_,f,i]}class cn extends ve{constructor(e){super(),Me(this,e,on,sn,ye,{board:5,attacking:6,defending:7})}}function fn(t){let e,n,r,a,l,d,h,_;return{c(){e=y("label"),n=I(`Python JSON: \r
    `),r=y("textarea"),a=j(),l=y("button"),d=I("Import"),this.h()},l(f){e=P(f,"LABEL",{});var i=B(e);n=V(i,`Python JSON: \r
    `),r=P(i,"TEXTAREA",{}),B(r).forEach(p),i.forEach(p),a=A(f),l=P(f,"BUTTON",{type:!0});var o=B(l);d=V(o,"Import"),o.forEach(p),this.h()},h(){M(l,"type","button")},m(f,i){S(f,e,i),c(e,n),c(e,r),G(r,t[0]),S(f,a,i),S(f,l,i),c(l,d),h||(_=[q(r,"input",t[3]),q(l,"click",t[1])],h=!0)},p(f,[i]){i&1&&G(r,f[0])},i:te,o:te,d(f){f&&p(e),f&&p(a),f&&p(l),h=!1,et(_)}}}function un(t,e,n){let{setBoard:r}=e,a="";function l(){const _=JSON.parse(a).map(f=>({comp:f.attack.comp,vuln:f.attack.vuln,attackCost:f.attackerCost,defendCost:f.defenderCost,attackProb:f.attackerProb,defendProb:f.defenderProb,risk:f.risk,severity:f.severity}));r(_)}function d(){a=this.value,n(0,a)}return t.$$set=h=>{"setBoard"in h&&n(2,r=h.setBoard)},[a,l,r,d]}class dn extends ve{constructor(e){super(),Me(this,e,un,fn,ye,{setBoard:2})}}function hn(t){let e,n,r,a,l,d,h,_,f,i,o,s,u,b,m,w,E,g,C,v,R,k,D,K,N,J,Z,L,Y,le,H,ce,ge,Ie,$,Ve,Se,Ne,me,ee,T,U,ne,X,W,fe,ue,x,Pe,Ce,Je,Ee,ze,ae,Ye,Ge,qe,se,Ke,Qe,Xe,Te,We,de,Ze,tt;return{c(){e=y("div"),n=y("div"),r=y("p"),a=I("attackerMaxCost: "),l=y("input"),d=j(),h=y("br"),_=j(),f=y("p"),i=I("defenderMaxCost: "),o=y("input"),s=j(),u=y("br"),b=j(),m=y("p"),w=I("attackerMinProb: "),E=y("input"),g=j(),C=y("br"),v=j(),R=y("p"),k=I("attackerMaxProb: "),D=y("input"),K=j(),N=y("br"),J=j(),Z=y("p"),L=I("defenderMinProb: "),Y=y("input"),le=j(),H=y("br"),ce=j(),ge=y("p"),Ie=I("defenderMaxProb: "),$=y("input"),Ve=j(),Se=y("br"),Ne=j(),me=y("button"),ee=I("New board"),T=j(),U=y("p"),ne=I("Attacker capacity: "),X=y("input"),W=j(),fe=y("br"),ue=j(),x=y("input"),Pe=j(),Ce=y("br"),Je=j(),Ee=y("p"),ze=I("Defender capacity: "),ae=y("input"),Ye=j(),Ge=y("br"),qe=j(),se=y("input"),Ke=j(),Qe=y("br"),Xe=j(),Te=y("p"),We=I("Iterations: "),de=y("input"),this.h()},l(z){e=P(z,"DIV",{style:!0});var O=B(e);n=P(O,"DIV",{});var F=B(n);r=P(F,"P",{class:!0});var nt=B(r);a=V(nt,"attackerMaxCost: "),nt.forEach(p),l=P(F,"INPUT",{type:!0,min:!0,max:!0,class:!0}),d=A(F),h=P(F,"BR",{}),_=A(F),f=P(F,"P",{class:!0});var rt=B(f);i=V(rt,"defenderMaxCost: "),rt.forEach(p),o=P(F,"INPUT",{type:!0,min:!0,max:!0,class:!0}),s=A(F),u=P(F,"BR",{}),b=A(F),m=P(F,"P",{class:!0});var at=B(m);w=V(at,"attackerMinProb: "),at.forEach(p),E=P(F,"INPUT",{type:!0,step:!0,min:!0,max:!0,class:!0}),g=A(F),C=P(F,"BR",{}),v=A(F),R=P(F,"P",{class:!0});var lt=B(R);k=V(lt,"attackerMaxProb: "),lt.forEach(p),D=P(F,"INPUT",{type:!0,step:!0,min:!0,max:!0,class:!0}),K=A(F),N=P(F,"BR",{}),J=A(F),Z=P(F,"P",{class:!0});var st=B(Z);L=V(st,"defenderMinProb: "),st.forEach(p),Y=P(F,"INPUT",{type:!0,step:!0,min:!0,max:!0,class:!0}),le=A(F),H=P(F,"BR",{}),ce=A(F),ge=P(F,"P",{class:!0});var ot=B(ge);Ie=V(ot,"defenderMaxProb: "),ot.forEach(p),$=P(F,"INPUT",{type:!0,step:!0,min:!0,max:!0,class:!0}),Ve=A(F),Se=P(F,"BR",{}),Ne=A(F),me=P(F,"BUTTON",{});var it=B(me);ee=V(it,"New board"),it.forEach(p),F.forEach(p),T=A(O),U=P(O,"P",{class:!0});var ct=B(U);ne=V(ct,"Attacker capacity: "),ct.forEach(p),X=P(O,"INPUT",{type:!0,min:!0,max:!0,class:!0}),W=A(O),fe=P(O,"BR",{}),ue=A(O),x=P(O,"INPUT",{type:!0,min:!0,max:!0}),Pe=A(O),Ce=P(O,"BR",{}),Je=A(O),Ee=P(O,"P",{class:!0});var ft=B(Ee);ze=V(ft,"Defender capacity: "),ft.forEach(p),ae=P(O,"INPUT",{type:!0,min:!0,max:!0,class:!0}),Ye=A(O),Ge=P(O,"BR",{}),qe=A(O),se=P(O,"INPUT",{type:!0,min:!0,max:!0}),Ke=A(O),Qe=P(O,"BR",{}),Xe=A(O),Te=P(O,"P",{class:!0});var ut=B(Te);We=V(ut,"Iterations: "),ut.forEach(p),de=P(O,"INPUT",{type:!0,class:!0}),O.forEach(p),this.h()},h(){M(r,"class","svelte-pjgrd3"),M(l,"type","number"),M(l,"min","1"),M(l,"max","100"),M(l,"class","svelte-pjgrd3"),M(f,"class","svelte-pjgrd3"),M(o,"type","number"),M(o,"min","1"),M(o,"max","100"),M(o,"class","svelte-pjgrd3"),M(m,"class","svelte-pjgrd3"),M(E,"type","number"),M(E,"step","0.01"),M(E,"min","0.1"),M(E,"max","1"),M(E,"class","svelte-pjgrd3"),M(R,"class","svelte-pjgrd3"),M(D,"type","number"),M(D,"step","0.01"),M(D,"min","0.1"),M(D,"max","1"),M(D,"class","svelte-pjgrd3"),M(Z,"class","svelte-pjgrd3"),M(Y,"type","number"),M(Y,"step","0.01"),M(Y,"min","0.1"),M(Y,"max","1"),M(Y,"class","svelte-pjgrd3"),M(ge,"class","svelte-pjgrd3"),M($,"type","number"),M($,"step","0.01"),M($,"min","0.1"),M($,"max","1"),M($,"class","svelte-pjgrd3"),M(U,"class","svelte-pjgrd3"),M(X,"type","number"),M(X,"min","1"),M(X,"max","100"),M(X,"class","svelte-pjgrd3"),M(x,"type","range"),M(x,"min","1"),M(x,"max","100"),M(Ee,"class","svelte-pjgrd3"),M(ae,"type","number"),M(ae,"min","1"),M(ae,"max","100"),M(ae,"class","svelte-pjgrd3"),M(se,"type","range"),M(se,"min","1"),M(se,"max","100"),M(Te,"class","svelte-pjgrd3"),M(de,"type","number"),M(de,"class","svelte-pjgrd3"),re(e,"min-width","200px")},m(z,O){S(z,e,O),c(e,n),c(n,r),c(r,a),c(n,l),G(l,t[2]),c(n,d),c(n,h),c(n,_),c(n,f),c(f,i),c(n,o),G(o,t[3]),c(n,s),c(n,u),c(n,b),c(n,m),c(m,w),c(n,E),G(E,t[4]),c(n,g),c(n,C),c(n,v),c(n,R),c(R,k),c(n,D),G(D,t[5]),c(n,K),c(n,N),c(n,J),c(n,Z),c(Z,L),c(n,Y),G(Y,t[6]),c(n,le),c(n,H),c(n,ce),c(n,ge),c(ge,Ie),c(n,$),G($,t[7]),c(n,Ve),c(n,Se),c(n,Ne),c(n,me),c(me,ee),c(e,T),c(e,U),c(U,ne),c(e,X),G(X,t[0]),c(e,W),c(e,fe),c(e,ue),c(e,x),G(x,t[0]),c(e,Pe),c(e,Ce),c(e,Je),c(e,Ee),c(Ee,ze),c(e,ae),G(ae,t[1]),c(e,Ye),c(e,Ge),c(e,qe),c(e,se),G(se,t[1]),c(e,Ke),c(e,Qe),c(e,Xe),c(e,Te),c(Te,We),c(e,de),G(de,t[8]),Ze||(tt=[q(l,"input",t[10]),q(o,"input",t[11]),q(E,"input",t[12]),q(D,"input",t[13]),q(Y,"input",t[14]),q($,"input",t[15]),q(me,"click",t[16]),q(X,"input",t[17]),q(x,"change",t[18]),q(x,"input",t[18]),q(ae,"input",t[19]),q(se,"change",t[20]),q(se,"input",t[20]),q(de,"input",t[21])],Ze=!0)},p(z,[O]){O&4&&Q(l.value)!==z[2]&&G(l,z[2]),O&8&&Q(o.value)!==z[3]&&G(o,z[3]),O&16&&Q(E.value)!==z[4]&&G(E,z[4]),O&32&&Q(D.value)!==z[5]&&G(D,z[5]),O&64&&Q(Y.value)!==z[6]&&G(Y,z[6]),O&128&&Q($.value)!==z[7]&&G($,z[7]),O&1&&Q(X.value)!==z[0]&&G(X,z[0]),O&1&&G(x,z[0]),O&2&&Q(ae.value)!==z[1]&&G(ae,z[1]),O&2&&G(se,z[1]),O&256&&Q(de.value)!==z[8]&&G(de,z[8])},i:te,o:te,d(z){z&&p(e),Ze=!1,et(tt)}}}function _n(t,e,n){let{attackerCapacity:r}=e,{defenderCapacity:a}=e,{attackerMaxCost:l}=e,{defenderMaxCost:d}=e,{attackerMinProb:h}=e,{attackerMaxProb:_}=e,{defenderMinProb:f}=e,{defenderMaxProb:i}=e,{iterations:o}=e;const s=Fe();function u(){l=Q(this.value),n(2,l)}function b(){d=Q(this.value),n(3,d)}function m(){h=Q(this.value),n(4,h)}function w(){_=Q(this.value),n(5,_)}function E(){f=Q(this.value),n(6,f)}function g(){i=Q(this.value),n(7,i)}const C=()=>s("newboard");function v(){r=Q(this.value),n(0,r)}function R(){r=Q(this.value),n(0,r)}function k(){a=Q(this.value),n(1,a)}function D(){a=Q(this.value),n(1,a)}function K(){o=Q(this.value),n(8,o)}return t.$$set=N=>{"attackerCapacity"in N&&n(0,r=N.attackerCapacity),"defenderCapacity"in N&&n(1,a=N.defenderCapacity),"attackerMaxCost"in N&&n(2,l=N.attackerMaxCost),"defenderMaxCost"in N&&n(3,d=N.defenderMaxCost),"attackerMinProb"in N&&n(4,h=N.attackerMinProb),"attackerMaxProb"in N&&n(5,_=N.attackerMaxProb),"defenderMinProb"in N&&n(6,f=N.defenderMinProb),"defenderMaxProb"in N&&n(7,i=N.defenderMaxProb),"iterations"in N&&n(8,o=N.iterations)},[r,a,l,d,h,_,f,i,o,s,u,b,m,w,E,g,C,v,R,k,D,K]}class bn extends ve{constructor(e){super(),Me(this,e,_n,hn,ye,{attackerCapacity:0,defenderCapacity:1,attackerMaxCost:2,defenderMaxCost:3,attackerMinProb:4,attackerMaxProb:5,defenderMinProb:6,defenderMaxProb:7,iterations:8})}}function pn(t){let e,n,r,a,l,d,h,_,f,i,o,s,u,b,m,w,E,g,C,v,R,k,D,K,N,J,Z,L,Y,le;r=new ln({props:{board:t[12],attacking:t[9],defending:t[10]}}),r.$on("toggle",t[13]),d=new dn({props:{setBoard:t[17]}}),i=new cn({props:{board:t[12],attacking:t[9],defending:t[10]}});function H(T){t[19](T)}function ce(T){t[20](T)}function ge(T){t[21](T)}function Ie(T){t[22](T)}function $(T){t[23](T)}function Ve(T){t[24](T)}function Se(T){t[25](T)}function Ne(T){t[26](T)}function me(T){t[27](T)}let ee={};return t[0]!==void 0&&(ee.attackerMaxCost=t[0]),t[1]!==void 0&&(ee.defenderMaxCost=t[1]),t[2]!==void 0&&(ee.attackerMinProb=t[2]),t[3]!==void 0&&(ee.attackerMaxProb=t[3]),t[4]!==void 0&&(ee.defenderMinProb=t[4]),t[5]!==void 0&&(ee.defenderMaxProb=t[5]),t[6]!==void 0&&(ee.attackerCapacity=t[6]),t[7]!==void 0&&(ee.defenderCapacity=t[7]),t[8]!==void 0&&(ee.iterations=t[8]),u=new bn({props:ee}),he.push(()=>_e(u,"attackerMaxCost",H)),he.push(()=>_e(u,"defenderMaxCost",ce)),he.push(()=>_e(u,"attackerMinProb",ge)),he.push(()=>_e(u,"attackerMaxProb",Ie)),he.push(()=>_e(u,"defenderMinProb",$)),he.push(()=>_e(u,"defenderMaxProb",Ve)),he.push(()=>_e(u,"attackerCapacity",Se)),he.push(()=>_e(u,"defenderCapacity",Ne)),he.push(()=>_e(u,"iterations",me)),u.$on("newboard",t[16]),J=new Wt({props:{results:t[11]}}),J.$on("attack",t[14]),J.$on("defend",t[15]),Y=new $t({props:{results:t[11]}}),Y.$on("attack",t[14]),Y.$on("defend",t[15]),{c(){e=y("div"),n=y("div"),Be(r.$$.fragment),a=j(),l=y("div"),Be(d.$$.fragment),h=j(),_=y("div"),f=y("div"),Be(i.$$.fragment),o=j(),s=y("div"),Be(u.$$.fragment),D=j(),K=y("div"),N=y("div"),Be(J.$$.fragment),Z=j(),L=y("div"),Be(Y.$$.fragment),this.h()},l(T){e=P(T,"DIV",{style:!0});var U=B(e);n=P(U,"DIV",{style:!0});var ne=B(n);we(r.$$.fragment,ne),a=A(ne),l=P(ne,"DIV",{style:!0});var X=B(l);we(d.$$.fragment,X),X.forEach(p),ne.forEach(p),h=A(U),_=P(U,"DIV",{style:!0});var W=B(_);f=P(W,"DIV",{});var fe=B(f);we(i.$$.fragment,fe),fe.forEach(p),o=A(W),s=P(W,"DIV",{style:!0});var ue=B(s);we(u.$$.fragment,ue),ue.forEach(p),W.forEach(p),D=A(U),K=P(U,"DIV",{});var x=B(K);N=P(x,"DIV",{style:!0});var Pe=B(N);we(J.$$.fragment,Pe),Pe.forEach(p),Z=A(x),L=P(x,"DIV",{style:!0});var Ce=B(L);we(Y.$$.fragment,Ce),Ce.forEach(p),x.forEach(p),U.forEach(p),this.h()},h(){re(l,"margin","5px"),re(n,"margin","5px"),re(s,"margin-top","10px"),re(_,"margin","5px"),re(N,"margin","5px"),re(L,"margin","5px"),re(e,"display","flex")},m(T,U){S(T,e,U),c(e,n),Re(r,n,null),c(n,a),c(n,l),Re(d,l,null),c(e,h),c(e,_),c(_,f),Re(i,f,null),c(_,o),c(_,s),Re(u,s,null),c(e,D),c(e,K),c(K,N),Re(J,N,null),c(K,Z),c(K,L),Re(Y,L,null),le=!0},p(T,[U]){const ne={};U&4096&&(ne.board=T[12]),U&512&&(ne.attacking=T[9]),U&1024&&(ne.defending=T[10]),r.$set(ne);const X={};U&4096&&(X.board=T[12]),U&512&&(X.attacking=T[9]),U&1024&&(X.defending=T[10]),i.$set(X);const W={};!b&&U&1&&(b=!0,W.attackerMaxCost=T[0],be(()=>b=!1)),!m&&U&2&&(m=!0,W.defenderMaxCost=T[1],be(()=>m=!1)),!w&&U&4&&(w=!0,W.attackerMinProb=T[2],be(()=>w=!1)),!E&&U&8&&(E=!0,W.attackerMaxProb=T[3],be(()=>E=!1)),!g&&U&16&&(g=!0,W.defenderMinProb=T[4],be(()=>g=!1)),!C&&U&32&&(C=!0,W.defenderMaxProb=T[5],be(()=>C=!1)),!v&&U&64&&(v=!0,W.attackerCapacity=T[6],be(()=>v=!1)),!R&&U&128&&(R=!0,W.defenderCapacity=T[7],be(()=>R=!1)),!k&&U&256&&(k=!0,W.iterations=T[8],be(()=>k=!1)),u.$set(W);const fe={};U&2048&&(fe.results=T[11]),J.$set(fe);const ue={};U&2048&&(ue.results=T[11]),Y.$set(ue)},i(T){le||(je(r.$$.fragment,T),je(d.$$.fragment,T),je(i.$$.fragment,T),je(u.$$.fragment,T),je(J.$$.fragment,T),je(Y.$$.fragment,T),le=!0)},o(T){Ae(r.$$.fragment,T),Ae(d.$$.fragment,T),Ae(i.$$.fragment,T),Ae(u.$$.fragment,T),Ae(J.$$.fragment,T),Ae(Y.$$.fragment,T),le=!1},d(T){T&&p(e),De(r),De(d),De(i),De(u),De(J),De(Y)}}}function gn(t,e,n){let r,a,l,d=10,h=10,_=.1,f=.98,i=.1,o=.98,s=10,u=10,b=new Set,m=new Set;function w(H){const ce=H.detail.player==="attacker"?b:m;ce.has(H.detail.action)?ce.delete(H.detail.action):ce.add(H.detail.action),n(9,b),n(10,m)}function E(H){n(9,b=ie[H.detail](a,"attacker",s))}function g(H){n(10,m=ie[H.detail](a,"defender",u))}function C(){n(12,a=$e(r))}function v(H){n(12,a=H),b.clear(),m.clear()}let R=100;function k(H){d=H,n(0,d)}function D(H){h=H,n(1,h)}function K(H){_=H,n(2,_)}function N(H){f=H,n(3,f)}function J(H){i=H,n(4,i)}function Z(H){o=H,n(5,o)}function L(H){s=H,n(6,s)}function Y(H){u=H,n(7,u)}function le(H){R=H,n(8,R)}return t.$$.update=()=>{t.$$.dirty&63&&n(18,r={numComponents:5,numVulnerabilities:4,weaknesses:[0,1,3,2,0],attackerMaxCost:d,defenderMaxCost:h,attackerMinProb:_,attackerMaxProb:f,defenderMinProb:i,defenderMaxProb:o}),t.$$.dirty&262144&&n(12,a=$e(r)),t.$$.dirty&262592&&n(11,l=Kt(R,r,s,u))},[d,h,_,f,i,o,s,u,R,b,m,l,a,w,E,g,C,v,r,k,D,K,N,J,Z,L,Y,le]}class kn extends ve{constructor(e){super(),Me(this,e,gn,pn,ye,{})}}export{kn as default};
