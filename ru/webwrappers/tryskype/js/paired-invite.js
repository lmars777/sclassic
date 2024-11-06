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

SKYPE.namespace("www");
SKYPE.www.PairedInviteSharedObject = function()
{
    var flashUrl = "/i/flash/paired-invite.swf";

    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;
    E.onDOMReady(function() {
        if (location.href.match(/[?&]username=([^&]+)/)) {
            var skypename = location.href.match(/[?&]username=([^&]+)/)[1];
            
            var fullnameMatch = location.href.match(/[?&]fullname=([^&]+)/);
            var fullname = fullnameMatch ? fullnameMatch[1] : "";

            writeFlash(skypename, fullname);
        }
    });
            
    function writeFlash(skypename, fullname) {
          var params = {
              wmode: "transparent"
          };
          var flashvars = {
              skypename: skypename,
              fullname: fullname
          };

          var divId = makeContainerDiv("pairedInviteFlashDiv").id;
          swfobject.embedSWF(flashUrl, divId, 3, 3, "9.0.0", null, flashvars, params, {id: "pairedInviteFlash", bgcolor:"#FFFFFF"});
    }
    function makeContainerDiv(divId){
        var container = document.createElement("DIV");
        container.id = divId;
        YAHOO.util.Dom.setStyle(container, "position", "absolute");
        YAHOO.util.Dom.setStyle(container, "width", "3px");
        YAHOO.util.Dom.setStyle(container, "height", "3px");
        YAHOO.util.Dom.setStyle(container, "font", "1px monospace");
        YAHOO.util.Dom.setStyle(container, "top", "0px");
        YAHOO.util.Dom.setStyle(container, "left", "0px");
        document.body.appendChild(container);
        return container;
    }
}();

}
/*
     FILE ARCHIVED ON 18:40:34 Jan 04, 2011 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 17:50:19 Nov 06, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.669
  exclusion.robots: 0.027
  exclusion.robots.policy: 0.012
  esindex: 0.011
  cdx.remote: 9.206
  LoadShardBlock: 557.889 (3)
  PetaboxLoader3.datanode: 90.55 (5)
  PetaboxLoader3.resolve: 811.348 (3)
  load_resource: 382.441 (2)
*/