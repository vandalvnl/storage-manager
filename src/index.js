"use strict";var __assign=this&&this.__assign||Object.assign||function(e){for(var t,o=1,n=arguments.length;o<n;o++)for(var r in t=arguments[o])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e};exports.__esModule=!0;var isObject=function(e){return e&&"object"==typeof e&&e.constructor===Object},isString=function(e){return"string"==typeof e||e instanceof String},objKeysMap=function(e,t){try{Object.keys(e).map(function(e){return t(e)})}catch(e){}},intDate=function(e){var t=new Date,o=new Date(1*t+864e5*e);return parseInt(e)?o:e},contains=function(e,t){return!!isObject(e)&&(Object.keys(e).filter(function(e){return e===t}).toString()===t&&isString(t))},cache={},operator={localstorage:{parser:function(){return window.localStorage},get:function(e){return window.localStorage.getItem(e)},set:function(e,t){window.localStorage.setItem(e,t)},unset:function(e){try{window.localStorage.removeItem(e)}catch(e){}},clear:function(){objKeysMap(window.localStorage,operator.localstorage.unset)}},sessionstorage:{parser:function(){return window.sessionStorage},get:function(e){return window.sessionStorage.getItem(e)},set:function(e,t){window.sessionStorage.setItem(e,t)},unset:function(e){try{window.sessionStorage.removeItem(e)}catch(e){}},clear:function(){objKeysMap(window.sessionStorage,operator.sessionstorage.unset)}},cookie:{parser:function(){var e=""!==document.cookie?document.cookie.split("; "):[];if(0!==e.length)return e.map(function(e){return e.split("=")}).reduce(function(e,t){return e[decodeURIComponent(t[0])]=decodeURIComponent(t[1]),e},{})},set:function(e,t,o){void 0===o&&(o={expires:"",path:"/",domain:""});var n=intDate(o.expires)||"",r=o.path||"",a=o.domain||document.location.hostname;document.cookie=encodeURIComponent(e)+"="+encodeURIComponent(t)+';expires="'+n+'";path='+r+";domain="+a},get:function(e){return cache[e]},unset:function(e){document.cookie=encodeURIComponent(e)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT;",cache[e]=void 0},clear:function(){objKeysMap(operator.cookie.parser(),operator.cookie.unset),cache={}}}};function StorageManage(e){void 0===e&&(e="cookie");var t=Object.freeze({c:"cookie",l:"localstorage",s:"sessionstorage",cookie:"cookie",localstorage:"localstorage",sessionstorage:"sessionstorage"});return Storage?e=t[e.toLowerCase()]||"cookie":(console.warn("Browser doesn't have support to Storage"),e="cookie"),Object.freeze({get:n,set:r,json:o,clear:function(){return operator[e].clear(),this},unset:a,change:function(o){void 0===o&&(o="cookie");e=contains(t,o)?t[o.toLowerCase().trim()]:"cookie";return cache=operator[e].parser(),this},clearAll:c,cat:n,all:o,item:n,rm:a,touch:r,create:r,getItem:n,setItem:r,delete:a,remove:a,purge:c});function o(){var t=operator[e].parser(),o={};return Object.keys(t).map(function(e){var n,r;try{o=__assign({},o,((n={})[e]=JSON.parse(t[e]),n))}catch(n){o=__assign({},o,((r={})[e]=t[e],r))}}),o}function n(t,o){var n=operator[e].get(t);try{return"raw"===o||"r"===o?n:"array"===o||"a"===o?n.split(","):JSON.parse(n)}catch(e){return n}}function r(t,o,n){var r;return void 0===n&&(n=""),operator[e].set(t,JSON.stringify(o),n),cache=__assign({},cache,((r={})[t]=o,r)),this}function a(t){return operator[e].unset(t),this}function c(){return["cookie","localstorage","sessionstorage"].forEach(function(e){return operator[e].clear()}),this}}exports.default=StorageManage;
