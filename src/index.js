"use strict";var __assign=this&&this.__assign||Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++){s=arguments[i];for(var p in s)Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p])}return t};exports.__esModule=!0;var objKeysMap=function(object,callback){try{Object.keys(object).map(function(item){return callback(item)})}catch(error){}},contains=function(object,value){return!!function(value){return value&&"object"==typeof value&&value.constructor===Object}(object)&&(Object.keys(object).filter(function(item){return item===value}).toString()===value&&function(value){return"string"==typeof value||value instanceof String}(value))},cache={},operator={localstorage:{parser:function(){return window.localStorage},get:function(key){return window.localStorage.getItem(key)},set:function(key,value){window.localStorage.setItem(key,value)},unset:function(key){try{window.localStorage.removeItem(key)}catch(error){}},clear:function(){objKeysMap(window.localStorage,operator.localstorage.unset)}},sessionstorage:{parser:function(){return window.sessionStorage},get:function(key){return window.sessionStorage.getItem(key)},set:function(key,value){window.sessionStorage.setItem(key,value)},unset:function(key){try{window.sessionStorage.removeItem(key)}catch(error){}},clear:function(){objKeysMap(window.sessionStorage,operator.sessionstorage.unset)}},cookie:{parser:function(){var all=document.cookie?document.cookie.split("; "):[];if(0!==all.length)return all.map(function(val){return val.split("=")}).reduce(function(acc,val){acc[decodeURIComponent(val[0])]=decodeURIComponent(val[1]);return acc},{})},set:function(key,val,parameters){void 0===parameters&&(parameters={expires:""});var string,date,withInteger,exp=(string=parameters.expires,date=new Date,withInteger=new Date(1*date+864e5*string),parseInt(string)?withInteger:string)||"";document.cookie=exp?encodeURIComponent(key)+"="+encodeURIComponent(val)+';expires="'+exp+'";':encodeURIComponent(key)+"="+encodeURIComponent(val)},get:function(key){return cache[key]},unset:function(key){document.cookie=encodeURIComponent(key)+"=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";cache[key]=void 0},clear:function(){objKeysMap(operator.cookie.parser(),operator.cookie.unset);cache={}}}};exports.default=function(manager){void 0===manager&&(manager="cookie");var managers=Object.freeze({c:"cookie",l:"localstorage",s:"sessionstorage",cookie:"cookie",localstorage:"localstorage",sessionstorage:"sessionstorage"});if(Storage)manager=managers[manager.toLowerCase()]||"cookie";else{console.warn("Browser doesn't have support to Storage");manager="cookie"}return Object.freeze({get:get,set:set,json:json,clear:function(){operator[manager].clear();return this},unset:unset,change:function(value){void 0===value&&(value="cookie");manager=contains(managers,value)?managers[value.toLowerCase().trim()]:"cookie";cache=operator[manager].parser();return this},clearAll:clearAll,cat:get,all:json,item:get,rm:unset,touch:set,create:set,getItem:get,setItem:set,delete:unset,remove:unset,purge:clearAll});function json(){var parser=operator[manager].parser(),json={};Object.keys(parser).map(function(item){try{json=__assign({},json,((_a={})[item]=JSON.parse(parser[item]),_a))}catch(error){json=__assign({},json,((_b={})[item]=parser[item],_b))}var _a,_b});return json}function get(key,expect){var value=operator[manager].get(key);try{return"raw"===expect||"r"===expect?value:"array"===expect||"a"===expect?value.split(","):JSON.parse(value)}catch(error){return value}}function set(key,value,expires){void 0===expires&&(expires="");operator[manager].set(key,JSON.stringify(value),expires);cache=__assign({},cache,((_a={})[key]=value,_a));return this;var _a}function unset(key){operator[manager].unset(key);return this}function clearAll(){["cookie","localstorage","sessionstorage"].forEach(function(x){return operator[x].clear()});return this}};
