// ==UserScript==
// @name         Scribd Docs
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://es.scribd.com/search?query=*&content_type=documents&page=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=scribd.com
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //_3Ny5GS
    // Your code here...
    function addSavedClass(){

    $("article").each((i,article)=>{

    const saved = $(article).find("button[data-e2e=save-button-saved]")[0];
    const $title = $(article).find("p[data-e2e=title]");

    $(article).prop("title",$title.text());
     //console.log("title",$title.text());

    if(saved){
          $(article).addClass("nsaved");
    }else{
         $(article).removeClass("nsaved");
    }

    })

    }

    function addStyles(){
     $("body").append(`
      <style>
         .nsaved{
           border: 1px solid green;
           opacity: 0.3;

         }
      </style>
     `)

    }
    $(document).ready(()=>{
        addStyles();

setInterval( addSavedClass,1000);
    })
})();
