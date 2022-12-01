import{B as b,C as D,E as A,Fa as Y,M as S,Ma as Q,N as y,Oa as Z,U as G,Xa as F,c as K,h as $,i as N,o as V,q as W}from"./chunk-KRQXBF4V.js";var k=class{},j=class{};var p=class{constructor(e){this.normalizedNames=new Map,this.lazyUpdate=null,e?typeof e=="string"?this.lazyInit=()=>{this.headers=new Map,e.split(`
`).forEach(t=>{let n=t.indexOf(":");if(n>0){let r=t.slice(0,n),o=r.toLowerCase(),a=t.slice(n+1).trim();this.maybeSetNormalizedName(r,o),this.headers.has(o)?this.headers.get(o).push(a):this.headers.set(o,[a])}})}:this.lazyInit=()=>{this.headers=new Map,Object.keys(e).forEach(t=>{let n=e[t],r=t.toLowerCase();typeof n=="string"&&(n=[n]),n.length>0&&(this.headers.set(r,n),this.maybeSetNormalizedName(t,r))})}:this.headers=new Map}has(e){return this.init(),this.headers.has(e.toLowerCase())}get(e){this.init();let t=this.headers.get(e.toLowerCase());return t&&t.length>0?t[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(e){return this.init(),this.headers.get(e.toLowerCase())||null}append(e,t){return this.clone({name:e,value:t,op:"a"})}set(e,t){return this.clone({name:e,value:t,op:"s"})}delete(e,t){return this.clone({name:e,value:t,op:"d"})}maybeSetNormalizedName(e,t){this.normalizedNames.has(t)||this.normalizedNames.set(t,e)}init(){this.lazyInit&&(this.lazyInit instanceof p?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(e=>this.applyUpdate(e)),this.lazyUpdate=null))}copyFrom(e){e.init(),Array.from(e.headers.keys()).forEach(t=>{this.headers.set(t,e.headers.get(t)),this.normalizedNames.set(t,e.normalizedNames.get(t))})}clone(e){let t=new p;return t.lazyInit=!!this.lazyInit&&this.lazyInit instanceof p?this.lazyInit:this,t.lazyUpdate=(this.lazyUpdate||[]).concat([e]),t}applyUpdate(e){let t=e.name.toLowerCase();switch(e.op){case"a":case"s":let n=e.value;if(typeof n=="string"&&(n=[n]),n.length===0)return;this.maybeSetNormalizedName(e.name,t);let r=(e.op==="a"?this.headers.get(t):void 0)||[];r.push(...n),this.headers.set(t,r);break;case"d":let o=e.value;if(!o)this.headers.delete(t),this.normalizedNames.delete(t);else{let a=this.headers.get(t);if(!a)return;a=a.filter(h=>o.indexOf(h)===-1),a.length===0?(this.headers.delete(t),this.normalizedNames.delete(t)):this.headers.set(t,a)}break}}forEach(e){this.init(),Array.from(this.normalizedNames.keys()).forEach(t=>e(this.normalizedNames.get(t),this.headers.get(t)))}};var U=class{encodeKey(e){return q(e)}encodeValue(e){return q(e)}decodeKey(e){return decodeURIComponent(e)}decodeValue(e){return decodeURIComponent(e)}};function ae(s,e){let t=new Map;return s.length>0&&s.replace(/^\?/,"").split("&").forEach(r=>{let o=r.indexOf("="),[a,h]=o==-1?[e.decodeKey(r),""]:[e.decodeKey(r.slice(0,o)),e.decodeValue(r.slice(o+1))],i=t.get(a)||[];i.push(h),t.set(a,i)}),t}var le=/%(\d[a-f0-9])/gi,ce={40:"@","3A":":",24:"$","2C":",","3B":";","3D":"=","3F":"?","2F":"/"};function q(s){return encodeURIComponent(s).replace(le,(e,t)=>ce[t]??e)}function P(s){return`${s}`}var m=class{constructor(e={}){if(this.updates=null,this.cloneFrom=null,this.encoder=e.encoder||new U,e.fromString){if(e.fromObject)throw new Error("Cannot specify both fromString and fromObject.");this.map=ae(e.fromString,this.encoder)}else e.fromObject?(this.map=new Map,Object.keys(e.fromObject).forEach(t=>{let n=e.fromObject[t],r=Array.isArray(n)?n.map(P):[P(n)];this.map.set(t,r)})):this.map=null}has(e){return this.init(),this.map.has(e)}get(e){this.init();let t=this.map.get(e);return t?t[0]:null}getAll(e){return this.init(),this.map.get(e)||null}keys(){return this.init(),Array.from(this.map.keys())}append(e,t){return this.clone({param:e,value:t,op:"a"})}appendAll(e){let t=[];return Object.keys(e).forEach(n=>{let r=e[n];Array.isArray(r)?r.forEach(o=>{t.push({param:n,value:o,op:"a"})}):t.push({param:n,value:r,op:"a"})}),this.clone(t)}set(e,t){return this.clone({param:e,value:t,op:"s"})}delete(e,t){return this.clone({param:e,value:t,op:"d"})}toString(){return this.init(),this.keys().map(e=>{let t=this.encoder.encodeKey(e);return this.map.get(e).map(n=>t+"="+this.encoder.encodeValue(n)).join("&")}).filter(e=>e!=="").join("&")}clone(e){let t=new m({encoder:this.encoder});return t.cloneFrom=this.cloneFrom||this,t.updates=(this.updates||[]).concat(e),t}init(){this.map===null&&(this.map=new Map),this.cloneFrom!==null&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(e=>this.map.set(e,this.cloneFrom.map.get(e))),this.updates.forEach(e=>{switch(e.op){case"a":case"s":let t=(e.op==="a"?this.map.get(e.param):void 0)||[];t.push(P(e.value)),this.map.set(e.param,t);break;case"d":if(e.value!==void 0){let n=this.map.get(e.param)||[],r=n.indexOf(P(e.value));r!==-1&&n.splice(r,1),n.length>0?this.map.set(e.param,n):this.map.delete(e.param)}else{this.map.delete(e.param);break}}}),this.cloneFrom=this.updates=null)}};var z=class{constructor(){this.map=new Map}set(e,t){return this.map.set(e,t),this}get(e){return this.map.has(e)||this.map.set(e,e.defaultValue()),this.map.get(e)}delete(e){return this.map.delete(e),this}has(e){return this.map.has(e)}keys(){return this.map.keys()}};function de(s){switch(s){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}function ee(s){return typeof ArrayBuffer<"u"&&s instanceof ArrayBuffer}function te(s){return typeof Blob<"u"&&s instanceof Blob}function se(s){return typeof FormData<"u"&&s instanceof FormData}function he(s){return typeof URLSearchParams<"u"&&s instanceof URLSearchParams}var w=class{constructor(e,t,n,r){this.url=t,this.body=null,this.reportProgress=!1,this.withCredentials=!1,this.responseType="json",this.method=e.toUpperCase();let o;if(de(this.method)||!!r?(this.body=n!==void 0?n:null,o=r):o=n,o&&(this.reportProgress=!!o.reportProgress,this.withCredentials=!!o.withCredentials,o.responseType&&(this.responseType=o.responseType),o.headers&&(this.headers=o.headers),o.context&&(this.context=o.context),o.params&&(this.params=o.params)),this.headers||(this.headers=new p),this.context||(this.context=new z),!this.params)this.params=new m,this.urlWithParams=t;else{let a=this.params.toString();if(a.length===0)this.urlWithParams=t;else{let h=t.indexOf("?"),i=h===-1?"?":h<t.length-1?"&":"";this.urlWithParams=t+i+a}}}serializeBody(){return this.body===null?null:ee(this.body)||te(this.body)||se(this.body)||he(this.body)||typeof this.body=="string"?this.body:this.body instanceof m?this.body.toString():typeof this.body=="object"||typeof this.body=="boolean"||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return this.body===null||se(this.body)?null:te(this.body)?this.body.type||null:ee(this.body)?null:typeof this.body=="string"?"text/plain":this.body instanceof m?"application/x-www-form-urlencoded;charset=UTF-8":typeof this.body=="object"||typeof this.body=="number"||typeof this.body=="boolean"?"application/json":null}clone(e={}){let t=e.method||this.method,n=e.url||this.url,r=e.responseType||this.responseType,o=e.body!==void 0?e.body:this.body,a=e.withCredentials!==void 0?e.withCredentials:this.withCredentials,h=e.reportProgress!==void 0?e.reportProgress:this.reportProgress,i=e.headers||this.headers,u=e.params||this.params,x=e.context??this.context;return e.setHeaders!==void 0&&(i=Object.keys(e.setHeaders).reduce((v,g)=>v.set(g,e.setHeaders[g]),i)),e.setParams&&(u=Object.keys(e.setParams).reduce((v,g)=>v.set(g,e.setParams[g]),u)),new w(t,n,o,{params:u,headers:i,context:x,reportProgress:h,responseType:r,withCredentials:a})}};var d=(()=>(d=d||{},d[d.Sent=0]="Sent",d[d.UploadProgress=1]="UploadProgress",d[d.ResponseHeader=2]="ResponseHeader",d[d.DownloadProgress=3]="DownloadProgress",d[d.Response=4]="Response",d[d.User=5]="User",d))(),C=class{constructor(e,t=200,n="OK"){this.headers=e.headers||new p,this.status=e.status!==void 0?e.status:t,this.statusText=e.statusText||n,this.url=e.url||null,this.ok=this.status>=200&&this.status<300}},O=class extends C{constructor(e={}){super(e),this.type=d.ResponseHeader}clone(e={}){return new O({headers:e.headers||this.headers,status:e.status!==void 0?e.status:this.status,statusText:e.statusText||this.statusText,url:e.url||this.url||void 0})}},T=class extends C{constructor(e={}){super(e),this.type=d.Response,this.body=e.body!==void 0?e.body:null}clone(e={}){return new T({body:e.body!==void 0?e.body:this.body,headers:e.headers||this.headers,status:e.status!==void 0?e.status:this.status,statusText:e.statusText||this.statusText,url:e.url||this.url||void 0})}},M=class extends C{constructor(e){super(e,0,"Unknown Error"),this.name="HttpErrorResponse",this.ok=!1,this.status>=200&&this.status<300?this.message=`Http failure during parsing for ${e.url||"(unknown url)"}`:this.message=`Http failure response for ${e.url||"(unknown url)"}: ${e.status} ${e.statusText}`,this.error=e.error||null}};function L(s,e){return{body:e,headers:s.headers,context:s.context,observe:s.observe,params:s.params,reportProgress:s.reportProgress,responseType:s.responseType,withCredentials:s.withCredentials}}var ue=(()=>{class s{constructor(t){this.handler=t}request(t,n,r={}){let o;if(t instanceof w)o=t;else{let i;r.headers instanceof p?i=r.headers:i=new p(r.headers);let u;r.params&&(r.params instanceof m?u=r.params:u=new m({fromObject:r.params})),o=new w(t,n,r.body!==void 0?r.body:null,{headers:i,context:r.context,params:u,reportProgress:r.reportProgress,responseType:r.responseType||"json",withCredentials:r.withCredentials})}let a=$(o).pipe(W(i=>this.handler.handle(i)));if(t instanceof w||r.observe==="events")return a;let h=a.pipe(V(i=>i instanceof T));switch(r.observe||"body"){case"body":switch(o.responseType){case"arraybuffer":return h.pipe(N(i=>{if(i.body!==null&&!(i.body instanceof ArrayBuffer))throw new Error("Response is not an ArrayBuffer.");return i.body}));case"blob":return h.pipe(N(i=>{if(i.body!==null&&!(i.body instanceof Blob))throw new Error("Response is not a Blob.");return i.body}));case"text":return h.pipe(N(i=>{if(i.body!==null&&typeof i.body!="string")throw new Error("Response is not a string.");return i.body}));case"json":default:return h.pipe(N(i=>i.body))}case"response":return h;default:throw new Error(`Unreachable: unhandled observe type ${r.observe}}`)}}delete(t,n={}){return this.request("DELETE",t,n)}get(t,n={}){return this.request("GET",t,n)}head(t,n={}){return this.request("HEAD",t,n)}jsonp(t,n){return this.request("JSONP",t,{params:new m().append(n,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(t,n={}){return this.request("OPTIONS",t,n)}patch(t,n,r={}){return this.request("PATCH",t,L(r,n))}post(t,n,r={}){return this.request("POST",t,L(r,n))}put(t,n,r={}){return this.request("PUT",t,L(r,n))}}return s.\u0275fac=function(t){return new(t||s)(y(k))},s.\u0275prov=b({token:s,factory:s.\u0275fac}),s})();var H=class{constructor(e,t){this.next=e,this.interceptor=t}handle(e){return this.interceptor.intercept(e,this.next)}},ne=new S("HTTP_INTERCEPTORS"),fe=(()=>{class s{intercept(t,n){return n.handle(t)}}return s.\u0275fac=function(t){return new(t||s)},s.\u0275prov=b({token:s,factory:s.\u0275fac}),s})();var pe=/^\)\]\}',?\n/;function ye(s){return"responseURL"in s&&s.responseURL?s.responseURL:/^X-Request-URL:/m.test(s.getAllResponseHeaders())?s.getResponseHeader("X-Request-URL"):null}var re=(()=>{class s{constructor(t){this.xhrFactory=t}handle(t){if(t.method==="JSONP")throw new Error("Attempted to construct Jsonp request without HttpClientJsonpModule installed.");return new K(n=>{let r=this.xhrFactory.build();if(r.open(t.method,t.urlWithParams),t.withCredentials&&(r.withCredentials=!0),t.headers.forEach((l,c)=>r.setRequestHeader(l,c.join(","))),t.headers.has("Accept")||r.setRequestHeader("Accept","application/json, text/plain, */*"),!t.headers.has("Content-Type")){let l=t.detectContentTypeHeader();l!==null&&r.setRequestHeader("Content-Type",l)}if(t.responseType){let l=t.responseType.toLowerCase();r.responseType=l!=="json"?l:"text"}let o=t.serializeBody(),a=null,h=()=>{if(a!==null)return a;let l=r.statusText||"OK",c=new p(r.getAllResponseHeaders()),E=ye(r)||t.url;return a=new O({headers:c,status:r.status,statusText:l,url:E}),a},i=()=>{let{headers:l,status:c,statusText:E,url:B}=h(),f=null;c!==204&&(f=typeof r.response>"u"?r.responseText:r.response),c===0&&(c=f?200:0);let I=c>=200&&c<300;if(t.responseType==="json"&&typeof f=="string"){let oe=f;f=f.replace(pe,"");try{f=f!==""?JSON.parse(f):null}catch(ie){f=oe,I&&(I=!1,f={error:ie,text:f})}}I?(n.next(new T({body:f,headers:l,status:c,statusText:E,url:B||void 0})),n.complete()):n.error(new M({error:f,headers:l,status:c,statusText:E,url:B||void 0}))},u=l=>{let{url:c}=h(),E=new M({error:l,status:r.status||0,statusText:r.statusText||"Unknown Error",url:c||void 0});n.error(E)},x=!1,v=l=>{x||(n.next(h()),x=!0);let c={type:d.DownloadProgress,loaded:l.loaded};l.lengthComputable&&(c.total=l.total),t.responseType==="text"&&!!r.responseText&&(c.partialText=r.responseText),n.next(c)},g=l=>{let c={type:d.UploadProgress,loaded:l.loaded};l.lengthComputable&&(c.total=l.total),n.next(c)};return r.addEventListener("load",i),r.addEventListener("error",u),r.addEventListener("timeout",u),r.addEventListener("abort",u),t.reportProgress&&(r.addEventListener("progress",v),o!==null&&r.upload&&r.upload.addEventListener("progress",g)),r.send(o),n.next({type:d.Sent}),()=>{r.removeEventListener("error",u),r.removeEventListener("abort",u),r.removeEventListener("load",i),r.removeEventListener("timeout",u),t.reportProgress&&(r.removeEventListener("progress",v),o!==null&&r.upload&&r.upload.removeEventListener("progress",g)),r.readyState!==r.DONE&&r.abort()}})}}return s.\u0275fac=function(t){return new(t||s)(y(F))},s.\u0275prov=b({token:s,factory:s.\u0275fac}),s})();var J=new S("XSRF_COOKIE_NAME"),X=new S("XSRF_HEADER_NAME"),R=class{},me=(()=>{class s{constructor(t,n,r){this.doc=t,this.platform=n,this.cookieName=r,this.lastCookieString="",this.lastToken=null,this.parseCount=0}getToken(){if(this.platform==="server")return null;let t=this.doc.cookie||"";return t!==this.lastCookieString&&(this.parseCount++,this.lastToken=Z(t,this.cookieName),this.lastCookieString=t),this.lastToken}}return s.\u0275fac=function(t){return new(t||s)(y(Q),y(Y),y(J))},s.\u0275prov=b({token:s,factory:s.\u0275fac}),s})(),_=(()=>{class s{constructor(t,n){this.tokenService=t,this.headerName=n}intercept(t,n){let r=t.url.toLowerCase();if(t.method==="GET"||t.method==="HEAD"||r.startsWith("http://")||r.startsWith("https://"))return n.handle(t);let o=this.tokenService.getToken();return o!==null&&!t.headers.has(this.headerName)&&(t=t.clone({headers:t.headers.set(this.headerName,o)})),n.handle(t)}}return s.\u0275fac=function(t){return new(t||s)(y(R),y(X))},s.\u0275prov=b({token:s,factory:s.\u0275fac}),s})();var ge=(()=>{class s{constructor(t,n){this.backend=t,this.injector=n,this.chain=null}handle(t){if(this.chain===null){let n=this.injector.get(ne,[]);this.chain=n.reduceRight((r,o)=>new H(r,o),this.backend)}return this.chain.handle(t)}}return s.\u0275fac=function(t){return new(t||s)(y(j),y(G))},s.\u0275prov=b({token:s,factory:s.\u0275fac}),s})();var be=(()=>{class s{static disable(){return{ngModule:s,providers:[{provide:_,useClass:fe}]}}static withOptions(t={}){return{ngModule:s,providers:[t.cookieName?{provide:J,useValue:t.cookieName}:[],t.headerName?{provide:X,useValue:t.headerName}:[]]}}}return s.\u0275fac=function(t){return new(t||s)},s.\u0275mod=A({type:s}),s.\u0275inj=D({providers:[_,{provide:ne,useExisting:_,multi:!0},{provide:R,useClass:me},{provide:J,useValue:"XSRF-TOKEN"},{provide:X,useValue:"X-XSRF-TOKEN"}]}),s})(),Pe=(()=>{class s{}return s.\u0275fac=function(t){return new(t||s)},s.\u0275mod=A({type:s}),s.\u0275inj=D({providers:[ue,{provide:k,useClass:ge},re,{provide:j,useExisting:re}],imports:[be.withOptions({cookieName:"XSRF-TOKEN",headerName:"X-XSRF-TOKEN"})]}),s})();export{ue as a,Pe as b};
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license Angular v14.2.12
 * (c) 2010-2022 Google LLC. https://angular.io/
 * License: MIT
 */
