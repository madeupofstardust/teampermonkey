// ==UserScript==
// @name         Scribd Doc
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://es.scribd.com/document/*/*
// @match        https://es.scribd.com/doc/*/*
// @match        https://es.scribd.com/presentation/*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=scribd.com
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...

    $(document).ready(()=>{
        const url = window.location.href;
        const id = url.match(/\/[0-9]{1,}\//g)[0].replaceAll("/","");
        $("body").append(`
        <style>
          .button {
            border-radius:5px;
            font-weight:bold;
          }
          .button-blue {
            background-color: darkblue;
            color: white;
          }
          .button-black {
            background-color: black;
            color: white;
          }
        </style>

        `)
        $(".doc_actions").append(`
         <a href="https://scribddown.com/download/${id}/" target="_blank">
             <button class="button button-blue">ScribdDown</button>
         </a>`);

          $(".doc_actions").append(`
         <a href="https://downscribd.com/download/${id}/" target="_blank">
             <button class="button button-black">DownScribd</button>
         </a>`);
    })
})();
