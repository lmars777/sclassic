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

/*global jQuery, $, document, YAHOO, SKYPE, SkypeDetection, s, s_gi, s_account, location*/
/*jslint white: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, strict: false, newcap: true, immed: true, indent: 2 */

var SKYPEWANALYTICS = SKYPEWANALYTICS || {};

SKYPEWANALYTICS.runDetection = function () {
  SKYPEWANALYTICS.ClientDetection = (function () {

    var isOmnitureAvailable = function ()
    {
      return (typeof s_gi !== "undefined" &&
      typeof s !== "undefined" &&
      typeof s.tl !== "undefined");
    },

    /*Micro-Tracking, use when page content changes less than 50%*/
    track = function (state) {

      /* check if omniture tracking is available */
      if (!isOmnitureAvailable()) {
        throw new ReferenceError("SC is not available");
      }

      if (typeof state !== "string" || state === "") {
        throw new TypeError("incorrect argument, should be either 'new' or 'user'");
      }

      s.linkTrackVars = "prop21,eVar18";
      s.eVar18 = s.prop21 = state;
      s.tl(this, 'o', "clientdetection");
      s.linkTrackVars = "";
      s.eVar18 = s.prop21 = "";
    };

    return {

      report: function () {

        var userSegment,
        isInstalled,
        setStatus;

        if (typeof SkypeDetection !== "undefined") {
          userSegment = SkypeDetection.internal.segment || "";
          isInstalled = SkypeDetection.installed;
          setStatus = SkypeDetection.internal.setUserSegment;
        } else if (typeof SKYPE.util.ClientDetection !== "undefined") {
          userSegment = SKYPE.util.ClientDetection.getUserSegment() || "";
          isInstalled = SKYPE.util.ClientDetection.isInstalled();
          setStatus = SKYPE.util.ClientDetection.setUserSegment;
        } else {
          return;
        }

        if (userSegment === "user") {
          return;
          //does not needs to check anything else
        } else if (isInstalled) {
          //client installed
          setStatus('user');
          track('user');
          return;
        }

        if (userSegment === "") {
          setStatus('new');
          track('new');
        }
      }
    };
  }());

  if (typeof SkypeDetection !== "undefined") {
    SkypeDetection.detect(SKYPEWANALYTICS.ClientDetection.report);
  } else if (typeof SKYPE.util.ClientDetection !== "undefined") {
    SKYPE.util.ClientDetection.subscribe(
    SKYPEWANALYTICS.ClientDetection.report, {},
    false);
  }
};

if (typeof jQuery !== "undefined") {
  $(document).ready(function () {
    SKYPEWANALYTICS.runDetection();
  });
} else if (typeof YAHOO !== "undefined" && typeof jQuery === "undefined") {
  YAHOO.util.Event.onDOMReady(function () {
    SKYPEWANALYTICS.runDetection();
  });
}

}
/*
     FILE ARCHIVED ON 05:43:03 Jan 07, 2011 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 17:50:18 Nov 06, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.522
  exclusion.robots: 0.019
  exclusion.robots.policy: 0.008
  esindex: 0.011
  cdx.remote: 37.235
  LoadShardBlock: 65.98 (3)
  PetaboxLoader3.datanode: 74.798 (4)
  load_resource: 51.799
  PetaboxLoader3.resolve: 38.646
*/