// ==UserScript==
// @name         Libgen.is Book
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://libgen.is/book/index.php?md5=*
// @icon         https://www.google.com/s2/favicons?domain=libgen.is
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...

    $(document).ready(function(){
        setTimeout(()=>{
            $("a:contains(this mirror)").attr("target","_blank");
            $("a:contains(this mirror)")[0].click();
            setTimeout(window.close,1000);
        },3000)
    })
})();
