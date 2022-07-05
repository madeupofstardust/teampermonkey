// ==UserScript==
// @name         dialnet.unirioja.es Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://dialnet.unirioja.es/servlet/autor?codigo=775837
// @icon         https://www.google.com/s2/favicons?sz=64&domain=unirioja.es
// @require      https://nesmdev.github.io/ndev/dist/ndev.1.0.9.js
// @grant        none
// ==/UserScript==
(function() {
    'use strict';

    // Your code here...

    function formatHtml() {

        $("li.articulo").each((i, art) => {

            const titulo = $(art).find("p.titulo").text();

            const autor = $(art).find(".autores").text();
            const pdf = $(art).find("a:contains(Texto completo)")[0];
            const journal = $(art).find(".localizacion a:first").text().split(":")[0].replace("Ilu. Revista de ciencias de las religiones", "'Ilu, RCR")
            const nums = $(art).find(".localizacion a:eq(1)").text().split(",");

            let num = "";
            let year = "";

            if (nums.length === 3) {
                num = nums[0].trim() + "||" + nums[1].trim();
                year = nums[2].trim();

            } else if (nums.length === 2) {
                num = nums[0].trim();
                year = nums[1].trim();

            }

            num = num.replace(/[a-zA-Zº(). ]/g, "").replace("||", ".");

            let pags = "";

            pags = $(art).find(".localizacion").text().match(/(págs.) [0-9]{1,}-[0-9]{1,}/);

            if (!pags) pags = $(art).find(".localizacion").text().match(/pág. [0-9]{1,}/);


            pags = pags[0].replace("págs.", "").replace("pág.", "").trim();

            let name =`${autor} [${year}]. ${titulo}. ${journal} ${num}, pp. ${pags}`;
            name = new nstring(name).validFileName();

            $(art).append(`<button data-copy="${name}" class="btn-copy">copy name</button>`);

            if (pdf) {
                console.log(name);
                $(art).addClass("npdf");

            }
        });

        $(".btn-copy").on("click",function(){
          const name = $(this).data("copy");
          console.log(name);
           new nstring(name).copy2();
           $(this).css({backgroundColor: "black", color: "white"})
        })
    }

   function addStyles(){
     $("body").append(`
     <style>

        .npdf{

          border: 2px solid blue;
          border-radius: 10px;
        }
     </style>`)

   }

    $(document).ready(()=>{

     formatHtml();

        addStyles();

    })
})();
