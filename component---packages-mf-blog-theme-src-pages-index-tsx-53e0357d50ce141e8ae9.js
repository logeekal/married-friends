(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{"6sdu":function(e,t,n){n("IKQL"),n("lQyR"),n("YhIr"),n("+3V6"),n("GkPX"),n("yIlq"),n("4aJ6"),n("M/4x"),n("9p7t"),n("W1QL"),n("K/PF"),n("t91x"),n("75LO"),n("7lGJ"),n("o7PZ"),n("PAbq"),n("+jjx"),n("ABKx"),n("d3/y"),e.exports=function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=12)}([function(e,t){e.exports=n("mXGw")},function(e,t,n){e.exports=n(4)()},function(e,t,n){"use strict";var i,r=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),o=[];function a(e){for(var t=-1,n=0;n<o.length;n++)if(o[n].identifier===e){t=n;break}return t}function c(e,t){for(var n={},i=[],r=0;r<e.length;r++){var c=e[r],l=t.base?c[0]+t.base:c[0],s=n[l]||0,u="".concat(l," ").concat(s);n[l]=s+1;var d=a(u),p={css:c[1],media:c[2],sourceMap:c[3]};-1!==d?(o[d].references++,o[d].updater(p)):o.push({identifier:u,updater:b(p,t),references:1}),i.push(u)}return i}function l(e){var t=document.createElement("style"),i=e.attributes||{};if(void 0===i.nonce){var o=n.nc;o&&(i.nonce=o)}if(Object.keys(i).forEach((function(e){t.setAttribute(e,i[e])})),"function"==typeof e.insert)e.insert(t);else{var a=r(e.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(t)}return t}var s,u=(s=[],function(e,t){return s[e]=t,s.filter(Boolean).join("\n")});function d(e,t,n,i){var r=n?"":i.media?"@media ".concat(i.media," {").concat(i.css,"}"):i.css;if(e.styleSheet)e.styleSheet.cssText=u(t,r);else{var o=document.createTextNode(r),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(o,a[t]):e.appendChild(o)}}function p(e,t,n){var i=n.css,r=n.media,o=n.sourceMap;if(r?e.setAttribute("media",r):e.removeAttribute("media"),o&&btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),e.styleSheet)e.styleSheet.cssText=i;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(i))}}var f=null,m=0;function b(e,t){var n,i,r;if(t.singleton){var o=m++;n=f||(f=l(t)),i=d.bind(null,n,o,!1),r=d.bind(null,n,o,!0)}else n=l(t),i=p.bind(null,n,t),r=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return i(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;i(e=t)}else r()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=(void 0===i&&(i=Boolean(window&&document&&document.all&&!window.atob)),i));var n=c(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var i=0;i<n.length;i++){var r=a(n[i]);o[r].references--}for(var l=c(e,t),s=0;s<n.length;s++){var u=a(n[s]);0===o[u].references&&(o[u].updater(),o.splice(u,1))}n=l}}}},function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n,i,r,o=e[1]||"",a=e[3];if(!a)return o;if(t&&"function"==typeof btoa){var c=(n=a,i=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),r="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(i),"/*# ".concat(r," */")),l=a.sources.map((function(e){return"/*# sourceURL=".concat(a.sourceRoot||"").concat(e," */")}));return[o].concat(l).concat([c]).join("\n")}return[o].join("\n")}(t,e);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,i){"string"==typeof e&&(e=[[null,e,""]]);var r={};if(i)for(var o=0;o<this.length;o++){var a=this[o][0];null!=a&&(r[a]=!0)}for(var c=0;c<e.length;c++){var l=[].concat(e[c]);i&&r[l[0]]||(n&&(l[2]?l[2]="".concat(n," and ").concat(l[2]):l[2]=n),t.push(l))}},t}},function(e,t,n){"use strict";var i=n(5);function r(){}function o(){}o.resetWarningCache=r,e.exports=function(){function e(e,t,n,r,o,a){if(a!==i){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:o,resetWarningCache:r};return n.PropTypes=n,n}},function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,n){var i=n(2),r=n(7);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[e.i,r,""]]);i(r,{insert:"head",singleton:!1}),e.exports=r.locals||{}},function(e,t,n){(t=n(3)(!1)).push([e.i,'.slide-show-container{position:relative;border:0px solid red;width:100%;height:var(--slider-height);overflow:hidden}.car-nav{text-decoration:none;font-size:3rem;position:absolute;top:600px;padding:10px}#car-nav-prev::before{content:"<";position:absolute;transform:translateX(-50px)}#car-nav-next::after{content:">";position:absolute}.slide{transition:0.5s all cubic-bezier(0.445, 0.05, 0.55, 0.95);display:inline-block;position:absolute;top:0;border:0px solid green;width:100%;height:100%}.selected{left:0px;transition:0.5s all cubic-bezier(0.445, 0.05, 0.55, 0.95)}\n',""]),e.exports=t},function(e,t,n){var i=n(2),r=n(9);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[e.i,r,""]]);i(r,{insert:"head",singleton:!1}),e.exports=r.locals||{}},function(e,t,n){(t=n(3)(!1)).push([e.i,".slide-image-container{position:relative;border:0px solid black;width:100%;height:100%}.slide-image-container img{width:100%;height:100%;object-fit:cover}.image-caption{position:absolute;width:40%;min-width:200px;bottom:50px;right:50px;text-align:left;color:white;padding:10px;opacity:0}.image-caption h2,.image-caption p{background-color:#000;padding:10px 10px;margin:5px;display:inline-block;transition:0.4s all ease-in-out}.image-caption h2:hover,.image-caption p:hover{background-color:white;color:black;cursor:pointer}.image-caption.active{opacity:1}.image-caption.active h2,.image-caption.active p{animation-name:text-animation;animation-duration:1s;animation-fill-mode:both}@keyframes text-animation{0%{opacity:0;transform:translateY(3rem);height:0%;width:0px}50%{opacity:0.2}100%{opacity:1;width:auto}}\n",""]),e.exports=t},function(e,t,n){var i=n(2),r=n(11);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[e.i,r,""]]);i(r,{insert:"head",singleton:!1}),e.exports=r.locals||{}},function(e,t,n){(t=n(3)(!1)).push([e.i,".indicator-container{display:flex;justify-content:center;align-items:center;flex-direction:row;position:absolute;width:100%;bottom:10px}.indicator-container .indicator-box{padding:1px;transition:all 0.4s cubic-bezier(0.39, 0.575, 0.565, 1)}.indicator-container .indicator-box.active{border-width:1px;border-color:var(--color);border-style:solid}.indicator-container .indicator-box .indicator{width:10px;height:10px;background-color:var(--color);margin:2px}\n",""]),e.exports=t},function(e,t,n){"use strict";n.r(t);var i=n(0),r=n.n(i),o=n(1),a=n.n(o);function c(e){return r.a.createElement("div",{className:"slide-image-container"},r.a.createElement("img",{className:"slide-image",src:e.data.image,alt:"sample"}),r.a.createElement("div",{className:"image-caption ".concat(e.active?"active":""),style:e.imageCaptionStyle},r.a.createElement("a",{href:e.target},e.titleVisible&&r.a.createElement("h2",null,e.data.title),e.excerptVisible&&r.a.createElement("p",null,e.data.excerpt))))}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}n(6),n(8),c.propTypes={data:a.a.shape({id:a.a.number.isRequired,image:a.a.string.isRequired,target:a.a.string.isRequired,title:a.a.string.isRequired,excerpt:a.a.string.isRequired}),titleVisible:a.a.bool.isRequired,excerptVisible:a.a.bool.isRequired,imageCaptionStyle:a.a.object};var s=function(){var e=r.a.useRef(),t=function(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],i=!0,r=!1,o=void 0;try{for(var a,c=e[Symbol.iterator]();!(i=(a=c.next()).done)&&(n.push(a.value),!t||n.length!==t);i=!0);}catch(e){r=!0,o=e}finally{try{i||null==c.return||c.return()}finally{if(r)throw o}}return n}}(e,t)||function(e,t){if(e){if("string"==typeof e)return l(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(Object(i.useState)({}),2),n=t[0],o=t[1],a=function(){o(e&&e.current?e.current.getBoundingClientRect():{})};return Object(i.useEffect)((function(){a();var e=function(e,t){var n;return function(){for(var t=[],i=arguments.length;i--;)t[i]=arguments[i];return clearTimeout(n),n=setTimeout((function(){return e.apply(void 0,t)}),500)}}(a);return window.addEventListener("resize",e),function(){window.removeEventListener("resize",e)}}),[]),[n,e]};n(10);var u,d=function(e){var t=e.count,n=e.active,i=e.onSelect,o=e.color,a=new Array(t).fill("");return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"indicator-container",style:{"--color":o}},a.map((function(e,t){return r.a.createElement("div",{key:t,className:"indicator-box ".concat(n===t?"active":""),onClick:function(){i(t)}},r.a.createElement("div",{className:"indicator"}))}))))};function p(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],i=!0,r=!1,o=void 0;try{for(var a,c=e[Symbol.iterator]();!(i=(a=c.next()).done)&&(n.push(a.value),!t||n.length!==t);i=!0);}catch(e){r=!0,o=e}finally{try{i||null==c.return||c.return()}finally{if(r)throw o}}return n}}(e,t)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}function m(e){var t,n,o,a=e.data,l=p(s(),2),u=l[0],f=l[1],m=p(Object(i.useState)(20),1)[0],b=p(Object(i.useState)(0),2),h=b[0],v=b[1],g=p(Object(i.useState)(!0),2),y=g[0],x=g[1];return t=function(){!function(e){var t=e+1;t>=20&&(t-=m),v(t)}(h)},n=y&&e.autoplay?e.slideshowDelay:null,o=Object(i.useRef)(),Object(i.useEffect)((function(){o.current=t})),Object(i.useEffect)((function(){if(null!==n){var e=setInterval((function(){return o.current()}),n);return function(){return clearInterval(e)}}}),[n]),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"slide-show-container",ref:f,style:{"--slider-height":e.sliderHeightInpx?e.sliderHeightInpx+"px":"400px"}},a.map((function(t,n){var i=n===h?"selected":"",o="".concat((n-h)*(u&&u.width),"px");return r.a.createElement("div",{id:"car-img-".concat(n),className:"slide ".concat(i),key:n,style:{left:o},onClick:function(){window.open(t.target)}},r.a.createElement(c,{imageCaptionStyle:e.imageCaptionStyle,data:t,active:h===n,titleVisible:e.titleVisible,excerptVisible:e.excerptVisible}))})),e.indicatorVisible&&r.a.createElement(d,{count:m,active:h,onSelect:function(e){x(!1),v(e),setTimeout((function(){return x(!0)}),5e3)},color:"white"})))}m.propTypes={autoplay:a.a.bool.isRequired,indicatorColor:a.a.string.isRequired,data:a.a.arrayOf(a.a.shape({id:a.a.number.isRequired,image:a.a.string.isRequired,target:a.a.string.isRequired,title:a.a.string.isRequired,excerpt:a.a.string.isRequired})),titleVisible:a.a.bool.isRequired,excerptVisible:a.a.bool.isRequired,indicatorVisible:a.a.bool.isRequired,sliderHeightInpx:a.a.number.isRequired,imageCaptionstyle:a.a.object},m.defaultProps={autoplay:!0,indicatorColor:"white",data:(u=new Array(20).fill(0),u=u.map((function(e,t){return{image:"https://picsum.photos/seed/".concat(t+1,"/800/450"),id:t,title:"This is Sample Title",excerpt:"This is a sample excerpt.This is a sample excerpt.This is a sample excerpt.This is a sample excerpt.",target:"http://".concat(t,".com")}}))),titleVisible:!0,excerptVisible:!0,indicatorVisible:!0,sliderHeightInpx:400,slideshowDelay:3e3,imageCaptionstyle:{}},t.default=m}])},IKQL:function(e,t,n){var i=n("X6VK");i(i.P,"Array",{fill:n("Pfmf")}),n("OfmW")("fill")},Pfmf:function(e,t,n){"use strict";var i=n("UnHL"),r=n("BUlT"),o=n("Sp5b");e.exports=function(e){for(var t=i(this),n=o(t.length),a=arguments.length,c=r(a>1?arguments[1]:void 0,n),l=a>2?arguments[2]:void 0,s=void 0===l?n:r(l,n);s>c;)t[c++]=e;return t}},V3qh:function(e,t,n){"use strict";n.r(t);var i=n("Cini"),r=n("cz2p"),o=n("6sdu"),a=n.n(o),c=n("mXGw"),l=n.n(c),s=function(e){return Object(i.c)("header",{sx:{height:200}})};t.default=function(e){return Object(i.c)(l.a.Fragment,null,Object(i.c)(s,{title:"Married Friends",subTitle:"This is a sub title.",menu:[{label:"Test 1",link:"/test",icon:"icon"}]}),Object(i.c)(a.a,{sliderHeightInpx:"600"}),Object(i.c)(r.b.h1,null," Hello, world from theme "))}}}]);
//# sourceMappingURL=component---packages-mf-blog-theme-src-pages-index-tsx-53e0357d50ce141e8ae9.js.map