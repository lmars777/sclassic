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

/*global doc_uri, $, sc_custom_local, s, s_account, gotErrorPage, shopProductName, shopCategoryName,language_code*/
/*jslint bitwise: true, browser: true, eqeqeq: true, immed: true, newcap: true, nomen: true, onevar: true, plusplus: true, white: true, widget: true, undef: true, indent: 2*/

var SKYPE = SKYPE || {};
SKYPE.wanalytics = SKYPE.wanalytics || {};

SKYPE.wanalytics.Static = (function () {

  var W = SKYPE.wanalytics.Core,

  /* makes the proper download report */
  trackDownloading = function (url_addr, url_param)
  {
    /* if is not a download avoid running rest of method */
    if (url_addr.indexOf("/get-skype/") === -1 &&      
	url_addr.indexOf("/business/download") === -1) //exception for new business page
    {
      return false;
    }
                                            
    var down_regex = {"Skype: Windows": /\/get-skype\/on-your-computer\/windows\/downloading/,
                      "Skype: Business": /\/business\/download\/downloading/,
                      "Skype: Mac": /\/get-skype\/on-your-computer\/macosx\/downloading/,
                      "Skype: Linux": /\/get-skype\/on-your-computer\/linux\/post-download\//,
                      "Skype: Office Toolbar": /\/get-skype\/on-your-computer\/office-toolbar\/downloading\//,
                      "Skype: Email Toolbar": /\/get-skype\/on-your-computer\/email-toolbar\/downloading\//,
                   /* "Skype: iPhone": /\/get-skype\/on-your-mobile\/download\/iphone-for-skype\//, */
                      "Skype: Blackberry": /\/get-skype\/on-your-mobile\/skype-mobile\/blackberry\//,
                      "Skype: Android": /\/get-skype\/on-your-mobile\/skype-mobile\/android\//,
                      "Skype: Symbian": /\/get-skype\/on-your-mobile\/download\/skype-for-symbian\//,
                      "Skype: NokiaN900": /\/get-skype\/on-your-mobile\/builtin\/nokia-n900\//
                      //"Skype: Windows Beta": /\/download\/skype\/windows\/beta\/downloading\//,
                      //"Skype: WindowsMobile": /\/get-skype\/on-your-mobile\//,
                      //"Skype: Nokia": /\/download\/skype\/nokia\/downloading\//,
                     },
    the_key;
                                    
    for (the_key in down_regex)
    {
      if (location.pathname.match(down_regex[the_key]))
      {
        s.products = ";" + the_key + ";";
        s.events = "event1";
        break;
      }
    }

    /* to count failed light installs */
    if (s.products && s.events && s.products.indexOf("Skype: Windows") !== -1)
    {
      if (url_param.indexOf("source=lightinstaller") !== -1)
      {
        s.products = ";Skype: Windows FULL;";
      }
    }
  };

  return {
    
    //Hack requested on #SCOM-5631
    reportSubsMismatch: function () 
    {
      $('li.quickFilterNone a').live('click', function () {
        var inVal = $('input#countrySelectorInput').val();
        if (typeof inVal === "string" && 
            inVal !== "" && 
            inVal !== "Which country do you want to call?") {
          SKYPE.helpers.trackSelectValues("Mismatch2: " + inVal);     
        }
      });      
    },
    
    /* Page Report */           
    report: function ()
    {
      if ((typeof gotErrorPage !== "undefined") && gotErrorPage !== "")
      {
        W.trackErrorPageSC("static", W.getPageName(location.pathname), gotErrorPage);
      }
      else {        

        //exception for the biz tab tracking, WEBAN-25
        if (location.pathname.match(/\/business\//) && 
            location.hash.match(/^#t_/)) 
        {
          return;
        }
        
        var nameAppend = "";
        if (location.pathname.match(/\/downloading/) && typeof doc_uri !== "undefined") {
          nameAppend = "upgrading";
          if (doc_uri.indexOf("-new-") !== -1) {
            nameAppend = "new";
          }
        }
        W.trackPageSC("static", W.getPageName(location.pathname) + nameAppend, 
                      W.getCategory(location.pathname), function () {

          /* Hack requested by ABrown to normalize new user index page */
          if (s.pageName === "static/index.html" || s.pageName === "static/home") { 
            s.pageName = "static/";
          }
            
          /* track the downloading */
          trackDownloading(location.pathname, location.search);
        });
      }
    }
  };
}());

SKYPE.wanalytics.Static.report();

//hack requested on: #SCOM-5631
if (location.pathname.indexOf('/prices/pay-monthly') !== -1)
{
  SKYPE.wanalytics.Static.reportSubsMismatch();
}


}
/*
     FILE ARCHIVED ON 05:42:42 Jan 07, 2011 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 17:50:19 Nov 06, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.681
  exclusion.robots: 0.027
  exclusion.robots.policy: 0.013
  esindex: 0.012
  cdx.remote: 22.869
  LoadShardBlock: 88.423 (3)
  PetaboxLoader3.datanode: 62.271 (4)
  PetaboxLoader3.resolve: 104.675 (2)
  load_resource: 95.138
*/