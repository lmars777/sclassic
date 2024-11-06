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

/**
 * Skype Screenshot Viewer
 * Dependences: yahoo-dom-event.js, animations.js
 */

var D = YAHOO.util.Dom;
var E = YAHOO.util.Event;

var screenShotViewer = function() {
    if (D.get("screenShotViewer")) {
        
        var screenShotViewerContainer = D.getElementsByClassName("screenShotViewerContainer", "div", "screenShotViewer")[0];
        var screenShotViewerContainerOpenHeight = parseInt(D.getStyle(screenShotViewerContainer, "height"));
        
        // add click handlers to thumbnails with class="thumbLink"
        D.getElementsByClassName("thumbLink", "a", "screenShotViewer", function() {
            if (window.location.hash == this.hash) {
                D.addClass(this, "selected");
            }
            E.addListener(this, "click", function(ev) {
                
                E.preventDefault(ev);                
                
                // remove "selected" class from previously selected thumbLinks, then add "selected" class to proper thumbLink
                D.getElementsByClassName("thumbLink", "a", "screenShotViewer", function() {
                    D.removeClass(this, "selected");
                });
                D.addClass(this, "selected");
                
                var screenshotId = this.hash.substr(1);
                var screenShot = D.get(screenshotId);
                
                var slideAttributes = { 
        	        scroll: { to: [0, screenShot.offsetTop] }
        	    }; 
        	    var slideAnim = new YAHOO.util.Scroll(screenShotViewerContainer, slideAttributes, 0.6, YAHOO.util.Easing.easeBothStrong);
        	    
        	    slideAnim.onComplete.subscribe(function(){
                    window.location.replace(window.location.href.split("#")[0] + "#" + screenshotId); 
                });
                
                if (D.hasClass(screenShotViewerContainer, "hiddenBlock")) {
                    D.removeClass(screenShotViewerContainer, "hiddenBlock");
                    var slideOpenAttributes = { 
            	        height: { from: 113, to: screenShotViewerContainerOpenHeight },
            	        opacity: { from: 0, to: 1 }
            	    };
                    var slideOpenAnim = new YAHOO.util.Anim(screenShotViewerContainer, slideOpenAttributes, 0.8, YAHOO.util.Easing.easeBothStrong);
                    slideOpenAnim.animate();
                }
        	    
                slideAnim.animate();
                
            });
        });
        
        // add close buttons to screenshots
        D.getElementsByClassName("screenShotBig","div","screenShotViewer", function() {
            var closeButton = document.createElement("a");
            D.addClass(closeButton, "closeScreenShot");
            closeButton.innerHTML = "Close";
            this.insertBefore(closeButton, this.firstChild);
            E.addListener(closeButton, "click", function(){
                var slideCloseAttributes = { 
        	        height: { to: 113 },
        	        opacity: { to: 0 }
        	    };
                var slideCloseAnim = new YAHOO.util.Anim(screenShotViewerContainer, slideCloseAttributes, 0.8, YAHOO.util.Easing.easeBothStrong);
                
                slideCloseAnim.onComplete.subscribe(function(){
                    D.addClass(screenShotViewerContainer, "hiddenBlock");
                    // remove selected arrow from thumb
                    D.getElementsByClassName("thumbLink", "a", "screenShotViewer", function() {
                        D.removeClass(this, "selected");
                    });                    
                });
                
                slideCloseAnim.animate();
            });
        });
            
        // hide screenshotViewerContainer by default
        if (window.location.hash.indexOf("uiShot") == -1) {
            D.addClass(screenShotViewerContainer, "hiddenBlock");
            D.setStyle(screenShotViewerContainer, "height", "113px");
            D.setStyle(screenShotViewerContainer, "opacity", 0);
        }
            
    }
    
};

E.onDOMReady(function() {
    screenShotViewer();
});

}
/*
     FILE ARCHIVED ON 18:40:21 Jan 04, 2011 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 17:50:19 Nov 06, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 1.058
  exclusion.robots: 0.022
  exclusion.robots.policy: 0.013
  esindex: 0.01
  cdx.remote: 8.763
  LoadShardBlock: 191.334 (3)
  PetaboxLoader3.datanode: 185.151 (5)
  PetaboxLoader3.resolve: 166.659 (3)
  load_resource: 195.286 (2)
*/