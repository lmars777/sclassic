var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  //let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

var twttr=window.twttr||{};(function(){if(!twttr.widgets){twttr.widgets={}}if(!twttr.widgets.host){twttr.widgets.host="platform{i}.twitter.com"}if(typeof twttr.widgets.ignoreSSL==="undefined"){twttr.widgets.ignoreSSL=false}function T(X){var Z=M(X);var Y=twttr.widgets.host;var W=Y.replace("{i}",G++);if(G==3){G=0}return Z+"://"+W}function M(W){return(window.location.protocol.match(/s\:$/)||W)&&!twttr.widgets.ignoreSSL?"https":"http"}function S(a){var X;for(var W in a){X=N.apply(this,W.split("."));for(var Y=0,Z;(Z=X[Y]);Y++){new a[W](Z).render()}}}function I(b){var Y;var Z;var X=function(){if(document.readyState=="complete"){Y()}};var W;var a=function(){try{document.documentElement.doScroll("left");Y()}catch(c){}};if(window.addEventListener){Y=function(){if(!Z){Z=true;b()}window.removeEventListener("DOMContentLoaded",Y,false);window.removeEventListener("load",Y,false)};window.addEventListener("DOMContentLoaded",Y,false);window.addEventListener("load",Y,false)}else{if(window.attachEvent){W=window.setInterval(a,13);Y=function(){if(!Z){Z=true;b()}window.clearInterval(W);window.detachEvent("onreadystatechange",X);window.detachEvent("onload",Y)};window.attachEvent("onreadystatechange",X);window.attachEvent("onload",Y)}}}function N(W,a){var Z,b=[],X,Y;try{if(document.querySelectorAll){b=document.querySelectorAll(W+"."+a)}else{if(document.getElementsByClassName){Z=document.getElementsByClassName(a);for(X=0;(Y=Z[X]);X++){if(Y.tagName.toLowerCase()==W){b.push(Y)}}}else{Z=document.getElementsByTagName(W);var d=new RegExp("\\b"+a+"\\b");for(X=0;(Y=Z[X]);X++){if(Y.className.match(d)){b.push(Y)}}}}}catch(c){}return b}function Q(W){return encodeURIComponent(W).replace(/\+/g,"%2B")}function D(W){return decodeURIComponent(W)}function J(Y){var X=[];for(var W in Y){if(Y[W]!==null&&typeof Y[W]!=="undefined"){X.push(Q(W)+"="+Q(Y[W]))}}return X.sort().join("&")}function P(Z){var b={},Y,a,X,W;if(Z){Y=Z.split("&");for(W=0;(X=Y[W]);W++){a=X.split("=");if(a.length==2){b[D(a[0])]=D(a[1])}}}return b}function F(X,Y){for(var W in Y){X[W]=Y[W]}return X}function R(X){var W;if(X.match(/^https?:\/\//)){return X}else{W=location.host;if(location.port.length>0){W+=":"+location.port}return[location.protocol,"//",W,X].join("")}}function A(){var W=document.getElementsByTagName("link");for(var X=0,Y;(Y=W[X]);X++){if(Y.getAttribute("rel")=="canonical"){return R(Y.getAttribute("href"))}}return null}function K(Y){var Z=[];for(var X=0,W=Y.length;X<W;X++){Z.push(Y[X])}return Z}function C(){var X=document.getElementsByTagName("a"),d=document.getElementsByTagName("link"),W=/\bme\b/,Z=/^https?\:\/\/(www\.)?twitter.com\/(#!\/)?([a-zA-Z0-9_]+)\/?$/,c=K(X).concat(K(d)),b,f,Y;for(var a=0,e;(e=c[a]);a++){f=e.getAttribute("rel");Y=e.getAttribute("href");if(f&&Y&&f.match(W)&&(b=Y.match(Z))){return b[3]}}}var E=document.title,L=encodeURI(location.href),G=0,U={en:{vertical:[55,62],horizontal:[110,20],none:[55,20]},de:{vertical:[67,62],horizontal:[110,20],none:[67,20]},es:{vertical:[64,62],horizontal:[110,20],none:[64,20]},fr:{vertical:[65,62],horizontal:[110,20],none:[65,20]},it:{vertical:[55,62],horizontal:[110,20],none:[55,20]},ko:{vertical:[55,62],horizontal:[110,20],none:[55,20]},ja:{vertical:[80,62],horizontal:[130,20],none:[80,20]}},H={en:1,de:1,es:1,fr:1,it:1,ko:1,ja:1},B={vertical:1,horizontal:1,none:1},V={en:"Twitter For Websites: Tweet Button",de:"Twitter für Webseiten: Tweet-Schaltfläche",es:"Twi`tter para sitios web: Botón para Twittear",fr:'Twitter pour votre site web : bouton "Tweeter"',it:"Tweeter per i siti web: Bottone Tweet",ko:"Twitter 웹버전: 트윗 버튼",ja:"WEBサイト向けTwitter: ツイートボタン"};twttr.TweetButton=function(a){this.originElement=a;var X=a.href.split("?")[1],Z=X?P(X):{},W=Z.count||a.getAttribute("data-count"),Y=Z.lang||a.getAttribute("data-lang");this.text=Z.text||a.getAttribute("data-text")||E;this.via=Z.via||a.getAttribute("data-via")||C();this.url=Z.url||a.getAttribute("data-url")||A()||L;this.statusID=Z.status_id||a.getAttribute("data-status-id");this.related=Z.related||a.getAttribute("data-related");this.counturl=Z.counturl||a.getAttribute("data-counturl");this.searchlink=Z.searchlink||a.getAttribute("data-searchlink");this.placeid=Z.placeid||a.getAttribute("data-placeid");if(!B[W]){W="horizontal"}this.count=W;if(!H[Y]){Y="en"}this.lang=Y};F(twttr.TweetButton.prototype,{parameters:function(){var W;if(this.statusID){W={status_id:this.statusID}}else{W={text:this.text,url:this.url,via:this.via,related:this.related,count:this.count,lang:this.lang,counturl:this.counturl,searchlink:this.searchlink,placeid:this.placeid}}W._=(new Date()).getTime();return J(W)},render:function(){if(!twttr.TweetButton.fragment){twttr.TweetButton.fragment=document.createElement("div");twttr.TweetButton.fragment.innerHTML='<iframe allowtransparency="true" frameborder="0" scrolling="no" tabindex="0" class="twitter-share-button twitter-count-'+this.count+'"></iframe>'}var X=twttr.TweetButton.fragment.firstChild.cloneNode(false);X.src=T()+"/widgets/tweet_button.html?"+this.parameters();var Y=U[this.lang][this.count];X.style.width=Y[0]+"px";X.style.height=Y[1]+"px";X.title=V[this.lang];var W=this.originElement.parentNode;if(W){W.replaceChild(X,this.originElement)}}});var O={"a.twitter-share-button":twttr.TweetButton};S(O);I(function(){S(O)})}());

}
/*
     FILE ARCHIVED ON 08:53:26 Jan 22, 2011 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 17:54:09 Nov 04, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.547
  exclusion.robots: 0.02
  exclusion.robots.policy: 0.011
  esindex: 0.01
  cdx.remote: 31.565
  LoadShardBlock: 819.836 (6)
  PetaboxLoader3.datanode: 636.525 (7)
  load_resource: 90.607
  PetaboxLoader3.resolve: 65.729
*/