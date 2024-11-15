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

var AjaxForm=function(){"use strict";var n={},t="data-form-submitted";return n.ResetForm=function(n){$(n).attr(t,null)},n.Submit=function(i,r,u){var e=r?$("#"+r):"",f=$(i),s="function"==typeof u?u:function(){},o={url:i.action,type:i.method||"GET",complete:function(){n.ResetForm(i);s()},data:f.serializeArray(),success:function(n){e.length>0&&e.html(n)},headers:{"X-RequestVerificationToken":f.data("requestverificationtoken")}};"undefined"!=typeof SKYPE&&(o.headers["X-Skypetoken"]=SKYPE.login.Silent.getSkypetoken());"1"!==f.attr(t)&&(f.attr(t,"1"),$.ajax(o))},n}()

}
/*
     FILE ARCHIVED ON 01:52:34 Apr 12, 2022 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 18:11:24 Nov 11, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.996
  exclusion.robots: 0.041
  exclusion.robots.policy: 0.025
  esindex: 0.016
  cdx.remote: 268.341
  LoadShardBlock: 307.423 (3)
  PetaboxLoader3.datanode: 262.914 (5)
  PetaboxLoader3.resolve: 177.011 (2)
  load_resource: 224.062
  loaddict: 124.291
*/