(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{xc71:function(e,t,r){"use strict";r.r(t);var a=r("Cini"),n=r("6sdu"),c=r.n(n),o=r("8X/V"),i=r("6wJw"),s=r("Ssux"),l=r("7JQO"),d=r("mXGw"),m=r.n(d),u=r("oedh"),f=r("1Gva"),p=r("cz2p");function x(e,t){var r;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"==typeof e)return g(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return g(e,t)}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var a=0;return function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(r=e[Symbol.iterator]()).next.bind(r)}function g(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}var b={day:"2-digit",year:"numeric",month:"long"};function h(e){for(var t=e.categories.nodes[0],r="/"+t.slug,a=t;a.parent;)r+="/"+a.parent.slug,a=a.parent;return r+"/"+e.slug}var j=function(e){var t=e.children,r=e.className,n=e.sx,c=Object(u.a)(e,["children","className","sx"]);return Object(a.c)("span",Object.assign({className:"article-normal-text "+r,sx:Object.assign({color:"secondary",fontSize:20},n)},c),t)},y=function(e){var t=e.children,r=e.className,n=e.sx,c=Object(u.a)(e,["children","className","sx"]);return Object(a.c)("span",Object.assign({className:"accented-text "+r,sx:Object.assign({color:"accent",cursor:"text"},n)},c),t)},O=r("Knsn"),v=function(e){var t=e.post,r=e.type,n=e.articleStyle,c=e.sx,o=e.className,i=Object(u.a)(e,["post","type","articleStyle","sx","className"]);console.log(t.excerpt);var s=function(e,t){var r;void 0===t&&(t=b),r=e?new Date(e):new Date;for(var a,n={day:0,month:"",year:0},c=x(new Intl.DateTimeFormat("en",t).formatToParts(r));!(a=c()).done;){var o=a.value;o.type in n&&(n[o.type]=o.value)}return n}(t.date);return Object(a.c)("div",Object.assign({className:"card-"+r+" "+o,sx:Object.assign({display:"flex",flexDirection:"column",height:"100%",flex:"major"===r?"100%":"1 1 300px",minWidth:"100px",backgroundColor:"bgCard",margin:1,cursor:"pointer"},c)},i),Object(a.c)(f.d,{href:h(t)},Object(a.c)("div",{sx:{flex:"50%"}},Object(a.c)("img",{src:t.featuredImage.mediaItemUrl,alt:t.featuredImage.altText,width:"100%"})),Object(a.c)("div",{className:"card__article",sx:{backgroundColor:"bgCard",padding:"major"===r?2:1}},Object(a.c)(p.b.h2,{sx:{padding:"0px",margin:"0px",marginBottom:0,color:"primary"},dangerouslySetInnerHTML:{__html:t.title}}),Object(a.c)(y,{sx:{textTransform:"uppercase",fontSize:"12px",fontWeight:"bold",marginTop:0,marginBottom:0}},Object(a.c)(f.d,{href:"/"+t.categories.nodes[0].slug},t.categories.nodes[0].name),Object(a.c)(j,{sx:{fontSize:0}}," / "),s.day+"."+s.month+"."+s.year),Object(a.c)("article",{sx:Object.assign({},n)},Object(a.c)("p",null,Object(a.c)(j,null,function(e){if("undefined"!=typeof document){var t=document.createElement("span");return t.innerHTML=e,t.innerText}}(t.excerpt)))),Object(a.c)("div",{className:"card-footer",sx:{display:"flex",justifyContent:"space-between"}},Object(a.c)("span",{className:"footer-left"},Object(a.c)(y,{sx:{cursor:"pointer",fontSize:"12px"}},"READ MORE")),Object(a.c)("span",{className:"footer-social"},Object(a.c)(O.a,{includeSearch:!1,socialProfiles:[{type:"share",name:"share",target:"http://google.com"}],width:"16px"}))))))},w=function(e){var t=m.a.useState(0),r=t[0],n=t[1],c=m.a.useState([]),o=c[0],i=c[1],s=m.a.useState([]),l=s[0],d=s[1],u=m.a.useRef(null);return m.a.useLayoutEffect((function(){if(u.current){console.log("===",u.current);var e=u.current.querySelectorAll(".card-minor");console.log("===minorcard : ",e);var t=Array.from(e).reduce((function(e,t){return e=Math.max(e,t.clientHeight)}),0);console.log("===Max Height is : ",t);var r=Array.from(e).map((function(e){return e.firstChild.parentElement.querySelector("article").clientHeight})),a=Array.from(e).map((function(e){return e.clientHeight}));console.log("===card height: ",a),console.log("===article height :",r),d(a),i(r),n(t)}}),[]),Object(a.c)("div",{className:"article-grid",sx:{display:"flex",flexDirection:"column"}},Object(a.c)("div",{className:"first-article",sx:{flex:1}},Object(a.c)(v,{post:e.articles[0],type:"major"})),Object(a.c)("div",{className:"rest-grid",ref:u,sx:{display:"flex",flexWrap:"wrap"}},e.articles.map((function(e,t){return t>0&&Object(a.c)(v,{key:t,sx:{flex:"1 1 300px"},post:e,type:0===t?"major":"minor","data-height":l[t-1],"data-artHeight":o[t-1],"data-diff":r-l[t-1],articleStyle:{marginBottom:r-l[t-1]}})}))))},S=r("odLS");t.default=function(e){var t=e.pageContext.posts;return console.log(t),Object(a.c)(o.a,null,Object(a.c)("div",{className:"home__carousel",sx:{margin:1}},"undefined"!=typeof window&&"undefined"!=typeof document&&c.a&&Object(a.c)(c.a,{sliderHeightInpx:"600"})),Object(a.c)("div",{className:"home__container",sx:{display:"flex",flexDirection:"row",flexWrap:"wrap"}},Object(a.c)("div",{className:"home-left__container",sx:{border:"0px solid red",marginTop:0,marginBottom:0,flex:.7,"@media only screen and (max-width: 768px)":{flex:1,minWidth:"100%"}}},Object(a.c)(w,{articles:t})),Object(a.c)("div",{className:"home-right__container",sx:{border:"0px solid green",marginTop:0,marginBottom:0,flex:.3,"@media only screen and (max-width: 768px)":{flex:1,width:"100%"}}},Object(a.c)(i.a,null),Object(a.c)(l.a,null),Object(a.c)(s.a,null))),Object(a.c)(S.a,null))}}}]);
//# sourceMappingURL=component---packages-mf-blog-theme-src-templates-index-tsx-a040203bdddeaf906b6e.js.map