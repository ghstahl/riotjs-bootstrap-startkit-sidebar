!function(e){function t(s){if(o[s])return o[s].exports;var r=o[s]={exports:{},id:s,loaded:!1};return e[s].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var o={};return t.m=e,t.c=o,t.p="",t(0)}([/*!*****************!*\
  !*** multi app ***!
  \*****************/
function(e,t,o){e.exports=o(/*! ./src/index.js */3)},/*!*****************************************!*\
  !*** ./src/pages/my-component-page.tag ***!
  \*****************************************/
function(e,t){"use strict";riot.tag2("my-component-page",'<h2>my-component-page</h2> <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur quia soluta optio excepturi, earum saepe explicabo veritatis fuga nesciunt, reprehenderit harum. Libero consequuntur neque fuga eos, aliquam id beatae eaque? </p> <table class="table table-striped table-hover "> <thead> <tr> <th>id</th> <th>username</th> <th>name</th> <th>email</th> <th>phone</th> </tr> </thead> <tbody> <tr each="{this.results}"> <td>{this.id}</td> <td>{this.username}</td> <td>{this.name}</td> <td>{this.email}</td> <td>{this.phone}</td> <td><a onclick="{parent.route}">More...</a></td> </tr> </tbody> </table>',"","",function(e){var t=this;t.error=!1,t.results=[],t.resetData=function(){t.results=[],t.error=!1},t.on("mount",function(){console.log("typicode-users mount"),riot.control.on("typicode_users_changed",t.onTypicodeUsersChanged),riot.control.trigger("typicode_users_fetch")}),t.on("unmount",function(){console.log("typicode-users unmount"),riot.control.off("typicode_users_changed",t.onTypicodeUsersChanged)}),t.onTypicodeUsersChanged=function(e){console.log("typicode_users_changed"),t.results=e,console.log(t.results),t.update()},t.route=function(e){riot.control.trigger("riot-route-dispatch","typicode-user-detail?id="+e.item.id)}})},/*!********************************************!*\
  !*** ./src/pages/typicode-user-detail.tag ***!
  \********************************************/
function(e,t){"use strict";riot.tag2("typicode-user-detail",'<div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title">{result.name}</h3> </div> <div class="panel-body"> <form class="form-horizontal"> <fieldset> <legend>User Details</legend> <div class="form-group"> <label class="col-sm-2 control-label">Name</label> <div class="col-sm-10"> <p class="form-control-static">{result.name}</p> </div> </div> <div class="form-group"> <label class="col-sm-2 control-label">Email</label> <div class="col-sm-10"> <p class="form-control-static">{result.email}</p> </div> </div> <div class="form-group"> <label class="col-sm-2 control-label">Phone</label> <div class="col-sm-10"> <p class="form-control-static">{result.phone}</p> </div> </div> <div class="form-group"> <label class="col-sm-2 control-label">User Name</label> <div class="col-sm-10"> <p class="form-control-static">{result.username}</p> </div> </div> <div class="form-group"> <label class="col-sm-2 control-label">Web Site</label> <div class="col-sm-10"> <p class="form-control-static">{result.website}</p> </div> </div> </fieldset> </form> <form class="form-horizontal"> <fieldset> <legend>Address</legend> <div class="form-group"> <label class="col-sm-2 control-label">Suite</label> <div class="col-sm-10"> <p class="form-control-static">{result.address.suite}</p> </div> </div> <div class="form-group"> <label class="col-sm-2 control-label">Street</label> <div class="col-sm-10"> <p class="form-control-static">{result.address.street}</p> </div> </div> <div class="form-group"> <label class="col-sm-2 control-label">City</label> <div class="col-sm-10"> <p class="form-control-static">{result.address.city}</p> </div> </div> <div class="form-group"> <label class="col-sm-2 control-label">Zip Code</label> <div class="col-sm-10"> <p class="form-control-static">{result.address.zipcode}</p> </div> </div> </fieldset> </form> <form class="form-horizontal"> <fieldset> <legend>Company</legend> <div class="form-group"> <label class="col-sm-2 control-label">Name</label> <div class="col-sm-10"> <p class="form-control-static">{result.company.name}</p> </div> </div> <div class="form-group"> <label class="col-sm-2 control-label">Catch Phrase</label> <div class="col-sm-10"> <p class="form-control-static">{result.company.catchPhrase}</p> </div> </div> <div class="form-group"> <label class="col-sm-2 control-label">Business Statement</label> <div class="col-sm-10"> <p class="form-control-static">{result.company.bs}</p> </div> </div> </fieldset> </form> </div> </div>',"","",function(e){var t=this;t.result={},t.onUserChanged=function(e){t.result=e,console.log(t.result),t.update()},t.on("unmount",function(){console.log("on unmount:"),riot.control.off("typicode_user_changed",t.onUserChanged)}),t.on("mount",function(){var e=riot.route.query();console.log("on mount: typicode-user-detail",e),riot.control.on("typicode_user_changed",t.onUserChanged),riot.control.trigger("typicode_user_fetch",{id:e.id})})})},/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
function(e,t,o){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}o(/*! ./css/index.css */8);var r=o(/*! ./stores/typicode-user-store.js */4),n=s(r);o(/*! ./pages/my-component-page.tag */1),o(/*! ./pages/typicode-user-detail.tag */2);var l=window.riot,i={name:"typicode-component",views:[{view:"my-component-page"},{view:"typicode-user-detail"}],stores:[{store:new n.default}],postLoadEvents:[{event:"typicode-init",data:{}}],preUnloadEvents:[{event:"typicode-uninit",data:{}}]};l.control.trigger("plugin-registration",i),l.control.trigger("component-load-complete",i.name)},/*!*******************************************!*\
  !*** ./src/stores/typicode-user-store.js ***!
  \*******************************************/
function(e,t,o){"use strict";function s(){var e=this;riot.observable(e),e.fetchException=null,e.on("app-mount",function(){console.log("TypicodeUserStore app-mount"),riot.control.on("typicode_users_fetch_result",e.onUsersResult)}),e.on("app-unmount",function(){console.log("TypicodeUserStore app-unmount"),riot.control.off("typicode_users_fetch_result",e.onUsersResult)}),e.on("typicode-init",function(){console.log("TypicodeUserStore typicode-init"),riot.control.on("typicode_users_fetch_result",e.onUsersResult)}),e.on("typicode-uninit",function(){console.log("TypicodeUserStore typicode-uninit"),riot.control.off("typicode_users_fetch_result",e.onUsersResult)}),e.resetData=function(){e.fetchException=null},e.onUsersResult=function(t){console.log("user_fetch_result:",t),riot.control.trigger("localstorage_set",{key:r,data:t}),e.trigger("typicode_users_changed",t)},e.on("typicode_users_fetch",function(){console.log("typicode_users_fetch:");var e="http://jsonplaceholder.typicode.com/users";riot.control.trigger("fetch",e,null,{name:"typicode_users_fetch_result"})}),e.on("typicode_user_fetch",function(t){console.log("typicode_user_fetch:");var o=JSON.parse(localStorage.getItem(r)),s=o.filter(function(e){return e.id==t.id});s&&s.length>0&&e.trigger("typicode_user_changed",s[0])})}var r="typicodeUserCache";e.exports=s},/*!*************************************************************!*\
  !*** ./~/css-loader!./~/postcss-loader!./src/css/index.css ***!
  \*************************************************************/
function(e,t,o){t=e.exports=o(/*! ../../~/css-loader/lib/css-base.js */6)(),t.push([e.id,"",""])},/*!**************************************!*\
  !*** ./~/css-loader/lib/css-base.js ***!
  \**************************************/
function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var o=this[t];o[2]?e.push("@media "+o[2]+"{"+o[1]+"}"):e.push(o[1])}return e.join("")},e.i=function(t,o){"string"==typeof t&&(t=[[null,t,""]]);for(var s={},r=0;r<this.length;r++){var n=this[r][0];"number"==typeof n&&(s[n]=!0)}for(r=0;r<t.length;r++){var l=t[r];"number"==typeof l[0]&&s[l[0]]||(o&&!l[2]?l[2]=o:o&&(l[2]="("+l[2]+") and ("+o+")"),e.push(l))}},e}},/*!*************************************!*\
  !*** ./~/style-loader/addStyles.js ***!
  \*************************************/
function(e,t,o){function s(e,t){for(var o=0;o<e.length;o++){var s=e[o],r=f[s.id];if(r){r.refs++;for(var n=0;n<r.parts.length;n++)r.parts[n](s.parts[n]);for(;n<s.parts.length;n++)r.parts.push(a(s.parts[n],t))}else{for(var l=[],n=0;n<s.parts.length;n++)l.push(a(s.parts[n],t));f[s.id]={id:s.id,refs:1,parts:l}}}}function r(e){for(var t=[],o={},s=0;s<e.length;s++){var r=e[s],n=r[0],l=r[1],i=r[2],c=r[3],a={css:l,media:i,sourceMap:c};o[n]?o[n].parts.push(a):t.push(o[n]={id:n,parts:[a]})}return t}function n(e,t){var o=v(),s=y[y.length-1];if("top"===e.insertAt)s?s.nextSibling?o.insertBefore(t,s.nextSibling):o.appendChild(t):o.insertBefore(t,o.firstChild),y.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");o.appendChild(t)}}function l(e){e.parentNode.removeChild(e);var t=y.indexOf(e);t>=0&&y.splice(t,1)}function i(e){var t=document.createElement("style");return t.type="text/css",n(e,t),t}function c(e){var t=document.createElement("link");return t.rel="stylesheet",n(e,t),t}function a(e,t){var o,s,r;if(t.singleton){var n=b++;o=g||(g=i(t)),s=u.bind(null,o,n,!1),r=u.bind(null,o,n,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(o=c(t),s=p.bind(null,o),r=function(){l(o),o.href&&URL.revokeObjectURL(o.href)}):(o=i(t),s=d.bind(null,o),r=function(){l(o)});return s(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;s(e=t)}else r()}}function u(e,t,o,s){var r=o?"":s.css;if(e.styleSheet)e.styleSheet.cssText=_(t,r);else{var n=document.createTextNode(r),l=e.childNodes;l[t]&&e.removeChild(l[t]),l.length?e.insertBefore(n,l[t]):e.appendChild(n)}}function d(e,t){var o=t.css,s=t.media;if(s&&e.setAttribute("media",s),e.styleSheet)e.styleSheet.cssText=o;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(o))}}function p(e,t){var o=t.css,s=t.sourceMap;s&&(o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(s))))+" */");var r=new Blob([o],{type:"text/css"}),n=e.href;e.href=URL.createObjectURL(r),n&&URL.revokeObjectURL(n)}var f={},m=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},h=m(function(){return/msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase())}),v=m(function(){return document.head||document.getElementsByTagName("head")[0]}),g=null,b=0,y=[];e.exports=function(e,t){if("object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");t=t||{},"undefined"==typeof t.singleton&&(t.singleton=h()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var o=r(e);return s(o,t),function(e){for(var n=[],l=0;l<o.length;l++){var i=o[l],c=f[i.id];c.refs--,n.push(c)}if(e){var a=r(e);s(a,t)}for(var l=0;l<n.length;l++){var c=n[l];if(0===c.refs){for(var u=0;u<c.parts.length;u++)c.parts[u]();delete f[c.id]}}}};var _=function(){var e=[];return function(t,o){return e[t]=o,e.filter(Boolean).join("\n")}}()},/*!***************************!*\
  !*** ./src/css/index.css ***!
  \***************************/
function(e,t,o){var s=o(/*! !../../~/css-loader!../../~/postcss-loader!./index.css */5);"string"==typeof s&&(s=[[e.id,s,""]]);o(/*! ../../~/style-loader/addStyles.js */7)(s,{});s.locals&&(e.exports=s.locals)}]);
//# sourceMappingURL=bundle.js.map