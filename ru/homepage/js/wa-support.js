/*global SKYPE, pageTracker, s_gi, sc_custom_local, s, s_account, gotErrorPage, theSearchResultsCount, theSearchTerm, ticketSubmitted, sc_support_form_sent, sc_support_solved_subtopic */
/*jslint bitwise: true, browser: true, eqeqeq: true, immed: true, newcap: true, nomen: true, onevar: true, plusplus: true, white: true, widget: true, undef: true, indent: 2*/

/* Init SKYPE.wanalytics namespace */
if (typeof SKYPE.wanalytics === "undefined" || !SKYPE.account) {
  SKYPE.namespace("wanalytics");
}

SKYPE.wanalytics.Support = (function () {

  var W = SKYPE.wanalytics,

  isOmnitureAvailable = function ()
  {
    return (typeof s_gi !== "undefined" &&
            typeof    s !== "undefined");
  },

  getSearchTerm = function ()
  {
    if (typeof theSearchTerm === "string")
    {
      return theSearchTerm;
    }
    else {
      return "";
    }
  },
  
  somethingWasSearchedFor = function ()
  {
    return (getSearchTerm() !== "");
  },
  
  getNumberOfResults = function ()
  {
    if ((typeof theSearchResultsCount !== "undefined") && theSearchResultsCount !== "")
    {
      return theSearchResultsCount;
    }
    else {
      return "zero";
    }
  };

  return {
    
    reportClick: function (action)
    {
      
      if ((typeof action === "string") && (action === "chat")) {
        SKYPE.wanalytics.Support.reportSupportRequestChat();
      }

      return W.trackAction("support|" + action, function () {
        s.linkTrackVars   = "None";
        s.linkTrackEvents = "None";
      });
    },

    reportSubTopicShow: function (detail) {
    
      var the_name = "support_request_show";

      /* check if omniture tracking is available */
      if (!isOmnitureAvailable()) {
        throw new ReferenceError("Omniture is not available");
      }

      /* Mandatory variable */
      if ((typeof detail !== "string") ||
          (detail        === "")) {
        throw new TypeError("reportAction arguments are incorrect");
      }

      s.linkTrackVars   = "prop18,eVar19";
      s.linkTrackEvents = "None";
      s.prop18          = the_name + ':' + detail;
      s.eVar19          = the_name + ':' + detail;
      
      /* following vars have to be populated */
      if ((typeof s.linkTrackVars !== "undefined") &&
          s.linkTrackVars !== "" &&
          (typeof s.linkTrackEvents !== "undefined") &&
          s.linkTrackEvents !== "") {
        s.trackExternalLinks = true;
        s.tl(this, 'o', the_name + '/' + detail);
        s.trackExternalLinks = false;
        s.linkTrackVars   = "";
        s.linkTrackEvents = "";
        s.prop18          = "";
        s.eVar19          = "";
      }
    },

    reportSupportRequestChat: function ()
    {
      return W.trackAction("support|requestChat", function () {
        s.linkTrackVars   = "events";
        s.linkTrackEvents = "event20";
        s.events          = "event20";
      });
    },

    reportSupportRequestEmail: function ()
    {
      return W.trackAction("support|requestEmail", function () {
        s.linkTrackVars   = "events";
        s.linkTrackEvents = "event19";
        s.events          = "event19";
      });
    },

    /* WEBAN-358 */
    reportContentRatingYes: function ()
    {
      return W.trackAction("support|ContentRatingYes", function () {
        s.linkTrackVars   = "events";
        s.linkTrackEvents = "event50";
        s.events          = "event50";
      });
    },

    /* WEBAN-358 */
    reportContentRatingNo: function ()
    {
      return W.trackAction("support|ContentRatingNo", function () {
        s.linkTrackVars   = "events";
        s.linkTrackEvents = "event51";
        s.events          = "event51";
      });
    },
    
    /* Page Report */
    report: function ()
    {
      if ((typeof gotErrorPage !== "undefined") && gotErrorPage !== "")
      {
        W.track({
          "site": "support",
          "page": W.getPageName() + "[" + gotErrorPage + "]:" + document.referrer,
          "func": function () {
            s.pageType = "errorPage";
          }
        });
      }
      else
      {
        W.track({
          "site": "support",
          "func": function () {

            /* report the searched keywords and its results */
            if (somethingWasSearchedFor())
            {
              s.prop8 = s.eVar8 = "support";
              s.prop12 = s.eVar11 = getSearchTerm();
              s.prop13 = getNumberOfResults();
              s.events = "event2";
            }

            /*If we are looking at a FAQ item, save into an evar */
            if (location.pathname.indexOf("/faq/FA") !== -1)
            {
              s.eVar17 = "support|" +
                location.pathname.match(/\/faq\/(FA[^\/]*)/)[1];
            }

            /* Signal success event when a ticket is submitted */
            if ((typeof ticketSubmitted !== "undefined") &&
                (ticketSubmitted === true))
            {
              s.events = "event4";
            }
           
            /* record subtopic, when on problem solved page */
            if (typeof sc_support_solved_subtopic !== "undefined" &&
                sc_support_solved_subtopic !== "") {
              s.prop18 = s.eVar19 = "support_problem_solved:" +
                sc_support_solved_subtopic;
            }
            
            /* record if user is logged in, when on form_sent page */
            if ((typeof sc_support_form_sent !== "undefined") &&
                (sc_support_form_sent !== "")) {
              s.prop18 = s.eVar19 = "support_form_sent:" + sc_support_form_sent;
              SKYPE.wanalytics.Support.reportSupportRequestEmail();
            }
            
            /* SUPSITE-163 */
            if ((typeof SKYPE.wanalytics.settings.support_contact_method !== "undefined") &&
                (SKYPE.wanalytics.settings.support_contact_method !== "")) {
              s.prop25 = s.eVar37 = SKYPE.wanalytics.settings.support_contact_method;
              SKYPE.wanalytics.settings.support_contact_method = "";
            }

            /* SUPSITE-157 */
            if ((typeof SKYPE.wanalytics.settings.support_category !== "undefined") &&
                (SKYPE.wanalytics.settings.support_category !== "")) {
              s.prop26 = s.eVar38 = SKYPE.wanalytics.settings.support_category;
              SKYPE.wanalytics.settings.support_category = "";
            }

            /* WEBAN-679 */
            s.prop54 = s.eVar54 = "desktop";
            if ((typeof s.pageName !== "undefined") &&
              s.pageName.indexOf("support/m") !== -1) {
              s.prop54 = s.eVar54 = "smartphone";
              if (s.pageName === "support/m") { /* root */
                s.pageName = "support/";
              } else {
                s.pageName = s.pageName.replace("support/m/", "support/");
              }
            }

            /* Hack to remove the jsessionid */
            if ((typeof s.pageName !== "undefined") &&
                s.pageName.indexOf(";jsessionid") !== -1) {
              s.pageName = s.pageName.split(";")[0]; //Get only part before the ;jsession
            } /* and the same for Hierarchy */
            if ((typeof s.hier1 !== "undefined") && s.hier1.indexOf(";jsessionid") !== -1) {
              s.hier1 = s.hier1.split(";")[0]; //Get only part before the ;jsession
            }
          }
        });
      }
    }
  };
}());

SKYPE.wanalytics.Support.report();
