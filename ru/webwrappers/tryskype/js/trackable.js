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

/*global SKYPE, swfobject, container, makeContainerDiv, document, console, aCustomTrackable*/
/*jslint bitwise: true, browser: true, eqeqeq: true, immed: true, newcap: true, nomen: true, onevar: true, plusplus: true, white: true, widget: true, undef: true, indent: 2, regexp: false*/

if (typeof SKYPE.inclient === "undefined") { 
  SKYPE.namespace("inclient");
}

SKYPE.inclient.Trackable = (function () { 
  
  var the_referrer = (document.referrer).toLowerCase(),
  the_url          = location.pathname.toLowerCase(),
  the_param        = (decodeURIComponent(location.search)).toLowerCase(),
  
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

  isAlreadyTagged = function ()
  {
    return ((readCookie("channel_source") !== null) || (readCookie("channel") !== null));
  },

  eraseCookie = function (name) {
    createCookie(name, "", -1);
  },
  
  dropCookie = function (cookie, cookie_time) {
    
    var MODE = SKYPE.settings.waMode;
    
    //check if we have a channel already
    if (isAlreadyTagged() || (typeof cookie === "undefined") ||
        (cookie === "") || (typeof cookie_time === "undefined")) {
      return false;
    }
    else {
      createCookie("channel_source", cookie, cookie_time);
      
      if (MODE !== "production" && (typeof console !== "undefined") && 
          (typeof console.log !== "undefined")) {
        console.log("Inclient.Trackable.dropCookie:", arguments);
      }
      
      return true;
    }
  },
  
  dropChannelCookie = function (trackableid, duration) {
   
    //check if we have a channel already
    if (isAlreadyTagged() || (typeof trackableid !== "string") ||
        (trackableid === "") || (typeof duration !== "number")) {
      return false;
    }
    else {
      createCookie("channel", trackableid, duration);
      return true;
    }
  },

  isTransparentTag = function (tag) {
    
    /* should contain cm_mmc*/
    if (tag.indexOf("cm_mmc=") === -1) {
      return false; 
    }

    var tagvals = tag.split("-_-");

    if ((tagvals.length          ===  3) &&  /* should contain 3 parts */ 
        (tagvals[1].indexOf("z") ===  0) &&  /* 2rd param should start with Z */ 
        (tagvals[0].indexOf("|") !== -1)) {  /* 1st param should contain a | */ 
      return tagvals;
    } 
    else {
      return false;
    }
  },

  /*********************
   * Trackable Channels  
   *********************/

  /* All the channels bellow are invoked in pre-defined way, 
   * so all are required to have same interfacing rules:
   * - trackable... = function (a_referrer, a_url, a_param) {
   * - return false, when no channel found.
   * - return { cookie: "", cookie_time: 90 }; when channel found.
   */
  
  trackableTransparent = function (a_referrer, a_url, a_param) {    

    var segment = { cookie: "", cookie_time: 90 },
        isTrans = isTransparentTag(a_param);

    // if is not a Trans tag then drop off.
    if (!isTrans) {
      return false;
    }
        
    segment.cookie = isTrans[1].replace("z", "");
    
    return segment;
  },

  trackableNatural = function (a_referrer, a_url, a_param) {

    //Excluding the stuff coming in with marketing tags
    if ((typeof a_referrer === "undefined") || a_referrer === "" ||
        (a_param.indexOf("cm_mmc=") !== -1) || (a_param.indexOf("source=") !== -1)) {
      return false;
    }
    
    var segment = { cookie: "", cookie_time: 90 },
    
    sengs   = [ /*Order matters, because it stops eval when match*/
      { regex: /google\..*(\?q=|&q=)([^&]+).*/,                    cookie: "259" },
      { regex: /yahoo\.co.*(\?p=|&p=)([^&]+).*/,                   cookie: "260" },
      { regex: /bing\..*(\?q=|&q=)([^&]+).*/,                      cookie: "261" },
      { regex: /msn\..*(\?q=|&q=)([^&]+).*/,                       cookie: "261" },
      { regex: /^http:\/\/search\.live\.com.*(\?q=|&q=)([^&]+).*/, cookie: "261" },
      { regex: /yandex\.ru\/.*([\?|&]text=)([^&]+).*/,             cookie: "353" }
    ],

    tkey;
    
    //figure out which engine
    for (tkey in sengs) {
      if (a_referrer.match(sengs[tkey].regex)) {
        segment.cookie = sengs[tkey].cookie;
        break;
      }
    }
    
    return segment;
  },

  trackablePaid = function (a_referrer, a_url, a_param) {
    
    if (a_param.indexOf("cm_mmc=paids|") === -1) {
      return false; //not paid, drops off
    }

    var segment = { cookie: "", cookie_time: 90 },
    
    paids   = [

      // GAWS
      { name: "209", regex: /paids\|/, stop: false },
      { name: "217", regex: /paids\|gaws\-_\-.*\-_\-bd\|/, stop: false },
      { name: "298", regex: /paids\|gaws\-_\-.*\-_\-bd\|lp/, stop: true }, /*depricated*/
      { name: "298", regex: /paids\|gaws\-_\-.*\-_\-gn\|dicod/, stop: true },
      { name: "299", regex: /paids\|gaws\-_\-.*\-_\-bd\|sp/, stop: true }, /*depricated*/
      { name: "299", regex: /paids\|gaws\-_\-.*\-_\-gn\|docal/, stop: true },
      { name: "301", regex: /paids\|gaws\-_\-.*\-_\-bd\|np/, stop: true },
      { name: "225", regex: /paids\|gaws\-_\-.*\-_\-gn\|/, stop: false },
      { name: "226", regex: /paids\|gaws\-_\-.*\-_\-cc\|/, stop: true },
      { name: "229", regex: /paids\|gaws\-_\-.*\-_\-hw\|/, stop: true }, /*deprecated*/
      { name: "229", regex: /paids\|gaws\-_\-.*\-_\-gn\|savem\-_\-/, stop: true },
      { name: "253", regex: /paids\|gaws\-_\-.*\-_\-sb\|/, stop: true },
/*    { name: "287", regex: /paids\|gaws\-_\-.*\-_\-sb\|/, stop: true }, BIZ version*/
      { name: "227", regex: /paids\|gaws\-_\-.*\-_\-vc\|video\-_\-/, stop: true },
      { name: "230", regex: /paids\|gaws\-_\-.*\-_\-gn\|voipr\-_\-/, stop: true },
      { name: "291", regex: /paids\|gaws\-_\-.*\-_\-gn\|cards\-_\-/, stop: true },
      { name: "233", regex: /paids\|gaws\-_\-.*\-_\-tc\|00002\-_\-/, stop: true },
      { name: "234", regex: /paids\|gaws\-_\-.*\-_\-ev\|intwd\-_\-/, stop: true },
      { name: "257", regex: /paids\|gaws\-_\-.*\-_\-ev\|mothd\-_\-/, stop: true },
      { name: "357", regex: /paids\|gaws\-_\-.*\-_\-gn\|chcal/, stop: true },    

      { name: "388", regex: /paids\|gaws\-_\-.*\-_\-gn\|ocren\-_\-/, stop: true },
      { name: "389", regex: /paids\|gaws\-_\-.*\-_\-gn\|ocres\-_\-/, stop: true },
      { name: "390", regex: /paids\|gaws\-_\-.*\-_\-gn\|ocrde\-_\-/, stop: true },
      { name: "391", regex: /paids\|gaws\-_\-.*\-_\-gn\|ocrfr\-_\-/, stop: true },
      { name: "392", regex: /paids\|gaws\-_\-.*\-_\-gn\|ocrit\-_\-/, stop: true },
      { name: "393", regex: /paids\|gaws\-_\-.*\-_\-gn\|ocrzt\-_\-/, stop: true },
      { name: "394", regex: /paids\|gaws\-_\-.*\-_\-gn\|ocrar\-_\-/, stop: true },
      { name: "395", regex: /paids\|gaws\-_\-.*\-_\-gn\|ocrjp\-_\-/, stop: true },

      { name: "398", regex: /paids\|gaws\-_\-.*\-_\-gn\|ocrzs\-_\-/, stop: true },

      { name: "408", regex: /paids\|gaws\-_\-.*\-_\-ex\|expat\-_\-/, stop: true },
      { name: "409", regex: /paids\|gawc\-_\-.*\-_\-ex\|expat\-_\-/, stop: true },
      { name: "410", regex: /paids\|gaws\-_\-.*\-_\-te\|tests\-_\-/, stop: true },

      //YSMB
      { name: "358", regex: /paids\|ysmb/, stop: true },
      //YSMS
      { name: "284", regex: /paids\|ysms/, stop: false },
      { name: "254", regex: /paids\|ysms\-_\-.*\-_\-cc\|/, stop: true },
      { name: "290", regex: /paids\|ysms\-_\-.*\-_\-gn\|cards\-_\-/, stop: true },
      { name: "288", regex: /paids\|ysms\-_\-.*\-_\-gn\|voipr\-_\-/, stop: true },       
      { name: "300", regex: /paids\|gaws\-_\-.*\-_\-bd\|ep/, stop: true }, /*depricated*/
      { name: "300", regex: /paids\|ysms\-_\-.*\-_\-gn\|video/, stop: true },
      { name: "359", regex: /paids\|ysms\-_\-.*\-_\-gn\|savem\-_\-/, stop: true },
      { name: "362", regex: /paids\|ysms\-_\-.*\-_\-gn\|dicod\-_\-/, stop: true },
      { name: "363", regex: /paids\|ysms\-_\-.*\-_\-gn\|incal\-_\-/, stop: true },
      { name: "364", regex: /paids\|ysms\-_\-.*\-_\-gn\|chcal\-_\-/, stop: true },
      { name: "365", regex: /paids\|ysms\-_\-.*\-_\-gn\|docal\-_\-/, stop: true },
      // GAWC                                 
      { name: "243", regex: /paids\|gawc\-_\-.*\-_\-bd\|/, stop: false },
      { name: "244", regex: /paids\|gawc\-_\-.*\-_\-gn\|/, stop: false },
      { name: "245", regex: /paids\|gawc\-_\-.*\-_\-cc\|/, stop: true },
      { name: "256", regex: /paids\|gawc\-_\-.*\-_\-sb\|/, stop: true },
/*    { name: "TRACKABLE302",      regex: /paids\|gawc\-_\-.*\-_\-sb\|/, stop: true }, BIZ version*/
      { name: "238", regex: /paids\|gawc\-_\-.*\-_\-bd\|ebeta\-_\-/, stop: true },
      { name: "234", regex: /paids\|gawc\-_\-.*\-_\-bd\|ebetb\-_\-/, stop: true }, 
      { name: "239", regex: /paids\|gawc\-_\-.*\-_\-gn\|voipr\-_\-/, stop: true },
      { name: "246", regex: /paids\|gawc\-_\-.*\-_\-bl\|basel\-_\-/, stop: true },
      //MSN
      { name: "285", regex: /paids\|msns/, stop: false },
      { name: "255", regex: /paids\|msns\-_\-.*\-_\-cc\|/, stop: true },
      { name: "289", regex: /paids\|msns\-_\-.*\-_\-gn\|voipr\-_\-/, stop: true },
      { name: "294", regex: /paids\|msns\-_\-.*\-_\-gn\|cards\-_\-/, stop: true },   
      //WAYN
      { name: "232", regex: /paids\|wayn/, stop: true },
      //NAVS
      { name: "297", regex: /paids\|navs\-_\-aspac|kr\|.*\-_\-bd\|/, stop: true },
      //GAWP
      { name: "249", regex: /paids\|gawp\-_\-.*\-_\-bd\|/, stop: true },
      { name: "286", regex: /paids\|gawp\-_\-.*\-_\-pl\|expat\-_\-/, stop: true },
      //FACE
      { name: "252", regex: /paids\|face\-_\-.*\-_\-bd\|00001\-_\-/, stop: true },
      //YANS WALA and YANS
      { name: "355", regex: /paids\|yans/, stop: true },
      { name: "356", regex: /paids\|wlas/, stop: true },
      { name: "360", regex: /paids\|ayns/, stop: true }
    ],
    amatch;
    
    //figure out which engine
    for (amatch in paids) { 
      if (a_param.match(paids[amatch].regex)) {
        segment.cookie = paids[amatch].name;
        if (paids[amatch].stop) {
          break;
        }
      }
    }
    return segment;
  },

  trackableTagger = function (a_referrer, a_url, a_param) {
    
    var tags = {
      "cm_mmc=viral|":                      { cookie: "354", cookie_time: 90 }, 
      "cm_mmc=banna|yahoo":                 { cookie: "214", cookie_time: 90 },
      "cm_mmc=banna|gcn-_-":                { cookie: "237", cookie_time: 90 },
      "cm_mmc=banna|gcnr-_-":               { cookie: "316", cookie_time: 90 },
      "cm_mmc=banna|turn":                  { cookie: "264", cookie_time: 90 },
      "cm_mmc=banna|vc":                    { cookie: "269", cookie_time: 90 },
      "cm_mmc=banna|vrta":                  { cookie: "317", cookie_time: 90 },
      "cm_mmc=hp-_-promo-_-client-_-08":    { cookie: "161", cookie_time: 90 },
      "cm_mmc=acceleration-_-email-_-wtaf": { cookie: "213", cookie_time: 90 },
      "cm_mmc=acceleration-_-email-_-ctaf": { cookie: "212", cookie_time: 90 },
      "cm_mmc=socialm-_-":                  { cookie: "366", cookie_time: 90 },
      "cm_mmc=acceleration-_-email-_-ftaf": { cookie: "374", cookie_time: 90 },
      "cm_mmc=banna|sg":                    { cookie: "223", cookie_time: 90 },
      "cm_mmc=banna|rt":                    { cookie: "267", cookie_time: 90 },
      "cm_mmc=mgomd-_-":                    { cookie: "295", cookie_time: 90 },
      "cm_mmc=omdint|q2-_":                 { cookie: "303", cookie_time: 90 },

      "cm_mmc=banap|video-_-apac|jp|ja-_-goog-_-bnr300":            { cookie: "345", cookie_time: 90 },
      "cm_mmc=banap|generic-_-apac|jp|ja-_-goog-_-bnr300ukulelecm": { cookie: "345", cookie_time: 90 },
      "cm_mmc=banap|generic-_-apac|jp|ja-_-goog-_-bnr300ukulelepm": { cookie: "345", cookie_time: 90 },
      "cm_mmc=banap|generic-_-apac|jp|ja-_-goog-_-bnr300rakugocm":  { cookie: "345", cookie_time: 90 },
      "cm_mmc=banap|generic-_-apac|jp|ja-_-goog-_-bnr300rakugopm":  { cookie: "345", cookie_time: 90 },

      "cm_mmc=banap|travel-_-apac|au|en-_-tripadv-_-bnr728":   { cookie: "361", cookie_time: 90 },
      "cm_mmc=banap|travel-_-apac|au|en-_-tripadv-_-bnr300":   { cookie: "361", cookie_time: 90 },
      "cm_mmc=banap|travel-_-apac|jp|ja-_-tripadv-_-bnr728":   { cookie: "361", cookie_time: 90 },
      "cm_mmc=banap|travel-_-apac|jp|ja-_-tripadv-_-bnr300":   { cookie: "361", cookie_time: 90 }, 
      "cm_mmc=banap|travel-_-apac|au|en-_-wego-_-txtfree"  :   { cookie: "361", cookie_time: 90 },
      "cm_mmc=banap|travel-_-apac|jp|ja-_-yahjap-_-bnr300" :   { cookie: "361", cookie_time: 90 },
      "cm_mmc=banap|travel-_-apac|jp|ja-_-yahjap-_-txtfree":   { cookie: "361", cookie_time: 90 },
      "cm_mmc=banap|travel-_-apac|jp|ja-_-rakutn-_-bnr180" :   { cookie: "361", cookie_time: 90 },
      "cm_mmc=banap|travel-_-apac|jp|ja-_-rakutn-_-txtfree":   { cookie: "361", cookie_time: 90 },

      "cm_mmc=banap|travel|au|en-_-wego-_-bonus1":   { cookie: "361", cookie_time: 90 },
      "cm_mmc=banap|travel|au|en-_-wego-_-bonus2":   { cookie: "361", cookie_time: 90 },
      "cm_mmc=banap|travel|au|en-_-wego-_-bonus3":   { cookie: "361", cookie_time: 90 },
      
      "cm_mmc=banap|generic-_-apac|au|en-_-ebuddy-_-bnr728":   { cookie: "383", cookie_time: 90 },
      "cm_mmc=banap|generic-_-apac|au|en-_-ebuddy-_-bnr300":   { cookie: "383", cookie_time: 90 },
      "cm_mmc=banap|travel-_-apac|jp|ja-_-ebuddy-_-bnr728" :   { cookie: "383", cookie_time: 90 },
      "cm_mmc=banap|travel-_-apac|jp|ja-_-ebuddy-_-bnr300" :   { cookie: "383", cookie_time: 90 },
      "cm_mmc=banap|paidart-_-apac|jp|ja-_-paidart2-_-txtfree": { cookie: "384", cookie_time: 90 },
      "cm_mmc=banap|paidart-_-apac|jp|ja-_-paidart-_-txtfree": { cookie: "384", cookie_time: 90 },
      "cm_mmc=banap|travel-_-apac|au|en-_-network-_-bnr728":   { cookie: "385", cookie_time: 90 },
      "cm_mmc=banap|travel-_-apac|au|en-_-network-_-bnr300":   { cookie: "385", cookie_time: 90 },
      "cm_mmc=banap|travel-_-apac|jp|ja-_-network-_-bnr728":   { cookie: "385", cookie_time: 90 },
      "cm_mmc=banap|travel-_-apac|jp|ja-_-network-_-bnr300":   { cookie: "385", cookie_time: 90 },
      "cm_mmc=banap|travel-_-apac|jp|ja-_-google-_-txtfree":   { cookie: "385", cookie_time: 90 },
      "cm_mmc=banap|travel-_-apac|jp|ja-_-yahoo-_-txtfree":    { cookie: "385", cookie_time: 90 },
      "cm_mmc=world-_-c_-_u-_-p":                              { cookie: "401", cookie_time: 90 },

      "cm_mmc=banap|creditcard-_-apac|jp|ja-_-jcb-_-txtfree":    { cookie: "407", cookie_time: 90 },
      "cm_mmc=banap|creditcard-_-apac|jp|ja-_-jcb-_-txtfreeedm": { cookie: "407", cookie_time: 90 }      
    },
    tag = "";
    
    for (tag in tags) {
      if (a_param.indexOf(tag) !== -1) {
        return tags[tag];
      }
    }
    
    return false;
  },
  
  /* To be used, to directly report values 
   * variables to be used:
   * var aCustomTrackable = { cookie: "", cookie_time: 90 };
   */
  trackableCustom = function (a_referrer, a_url, a_param) {
    if (typeof aCustomTrackable  !== "undefined") {
      return aCustomTrackable;
    }
  },

  /* ******** */

  getAllSegmentMethods = function () { 
    return [trackableNatural, trackablePaid, trackableTagger, trackableCustom, trackableTransparent];
  };
  
  return {

    segment: function (a_referrer, a_url, a_param) {
      
      /*No point in going further if we already tagged*/
      if (isAlreadyTagged())
      {
        return false;
      }

      var f_referrer  = (a_referrer || the_referrer).toLowerCase(),
      f_url           = (a_url || the_url).toLowerCase(),
      f_param         = (decodeURIComponent(a_param || the_param)).toLowerCase(),
      all_segment     = getAllSegmentMethods(),
      segment         = null,
      sucess          = false,
      i;

      for (i = 0; i < all_segment.length; i = i + 1) { 
        segment = all_segment[i](f_referrer, f_url, f_param);
        if (segment && segment.cookie && segment.cookie !== "" && segment.cookie_time) {
          sucess = dropChannelCookie(segment.cookie, segment.cookie_time);
          break;
        }
      }
         
      return ((sucess) ? "cookie:" + segment.cookie + ";cookie_time:" + segment.cookie_time : false);
    }
  };
}());

SKYPE.inclient.Trackable.segment();

}
/*
     FILE ARCHIVED ON 05:43:38 Jan 07, 2011 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 17:50:19 Nov 06, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.561
  exclusion.robots: 0.022
  exclusion.robots.policy: 0.01
  esindex: 0.01
  cdx.remote: 4.733
  LoadShardBlock: 225.145 (3)
  PetaboxLoader3.resolve: 437.035 (3)
  PetaboxLoader3.datanode: 63.827 (4)
  load_resource: 279.256
*/