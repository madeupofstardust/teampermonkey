// ==UserScript==
// @name         DownScribd Download
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://downscribd.com/download/*/?hash=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=downscribd.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...

        $(document).ready(()=>{

      setTimeout(()=>{
         const $btn = $("a:contains(Download PDF):not(.clicked)");
          if($btn[0]) {
              $btn[0].click();
              $btn.addClass("clicked");
              setTimeout(window.close,3000);
          }
      },1000)
    })
})();
