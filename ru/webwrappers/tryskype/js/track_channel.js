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

/*global SKYPE*/
/*jslint bitwise: true, browser: true, eqeqeq: true, immed: true, newcap: true, nomen: true, onevar: true, plusplus: true, white: true, widget: true, undef: true, indent: 2, regexp: false*/

if (typeof SKYPE !== "undefined")
{
  SKYPE.namespace("analytics");
  SKYPE.analytics.ChannelTrack = (function () {
   
    var cookieName    = "CHANNEL",
        referr_url    = document.referrer,
        page_url      = location,
        params_url    = (decodeURIComponent(location.search)).toLowerCase(),
        chann_source  = "",      //by default is Direct
        cookie_expire = 90,      //default cookie expiration time
    
    createCookie = function (name, value, days) {
      
      var expires = "",
          dom = ".skype.com",
      date;
    
      try {
        dom = "." + location.host.split(".")[1] + "." + location.host.split(".")[2];
      }
      catch (err) {}

      if (days) {
        date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; domain=" + dom + "; expires=" + date.toGMTString();
      }
    
      document.cookie = name + "=" + value + expires + "; path=/";
    },

    readCookie = function (name) {
      var nameEQ  = name + "=",
      ca          = document.cookie.split(';'),
      i, c;
      
      for (i = 0; i < ca.length; i = i + 1) {
        c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length, c.length);
        }
      }
      return null;
    },
    
    eraseCookie = function (name)
    {
      createCookie(name, "", -1);
    },    

    /* Channels */
    isAffiliateTraffic = function ()
    {
      
      var affiliate_arr = {"200504paffiliate": "211",
                           "TRADEDOUBLER":     "210",
                           "AGENCY1":          "214",
                           "AGENCY2":          "215",
                           "AGENCY3":          "216",
                           "TRIBAL01":         "221",
                           "MEDIABUY":         "224",
                           "VALUECOMMERCE":    "258"};
      
      //can pick up the one from the array
      if (affiliate_arr[readCookie("linkedcampaign")] !== undefined)
      {
        chann_source = affiliate_arr[readCookie("linkedcampaign")];
        
        /* Traffic Broker segmentation */
        if (chann_source === "211" && (params_url.indexOf("sid=1010") !== -1))
        {
          chann_source = "228";
        }
        
        /* 296 segmentation */
        if (chann_source === "211" && (params_url.indexOf("sid=2943525") !== -1))
        {
          chann_source = "296";
        }
      }
    };
    
    return {  
      
      /*******************/
      /* Detect Tracking */
      detectTracking: function ()
      {
        try
        {
          //check if we have a channel already
          if (readCookie("channel") !== null)
          {
            return;
          }
          
          isAffiliateTraffic();
          
          //write the cookie to output
          if (chann_source !== "")
          {
            createCookie("channel", chann_source, cookie_expire);
          }
        }
        catch (err) {}
      }   
    };
  }());
  
  /*****************************************/
  SKYPE.analytics.ChannelTrack.detectTracking();
}

}
/*
     FILE ARCHIVED ON 05:43:26 Jan 07, 2011 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 17:50:19 Nov 06, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.539
  exclusion.robots: 0.019
  exclusion.robots.policy: 0.008
  esindex: 0.012
  cdx.remote: 30.003
  LoadShardBlock: 81.121 (3)
  PetaboxLoader3.datanode: 69.99 (4)
  load_resource: 74.104
  PetaboxLoader3.resolve: 49.028
*/