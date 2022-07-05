// ==UserScript==
// @name         Google Scholar Search Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://scholar.google.com/scholar?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @require      https://nesmdev.github.io/ndev/dist/ndev.1.0.9.js
// @grant        none
// ==/UserScript==
(function() {
    'use strict';

    // Your code here...

    async function wait(time) {
        return new Promise(resolve => {
            setTimeout(resolve, time)
        });
    }
    async function makeHtml3() {
        const items = Array.from($(".gs_ri"))
        //.slice(0,2);
        for (let id in items) {
            const item = items[id];

            const title = $(item).find("h3 a").text();
            const journal = $(item).find(".gs_a").text().split("-")[1].split(":")[0].trim().replace(/, [0-9]{4}/g, "").replace(/[0-9]{4}/g, "");
            const year = $(item).find(".gs_a").text().split("-")[1].trim().match(/[0-9]{4}/g)[0];

            $(item).append(`<button id="item-${id}">copy</button>`);
            $(`#item-${id}`).data({
                title: new nstring(title).validFileName(),
                journal: journal,
                year: year,

            });


            $(`#item-${id}`).on("click", async function() {
                let data = $(`#item-${id}`).data();
                if (data.filename) {
                    console.log(data);
                    new nstring(data.filename).copy2();
                } else {
                    $(item).find(".gs_or_cit.gs_or_btn.gs_nph")[0].click();

                    await wait(1000);
                    const citeAPA = $("#gs_citt .gs_citr:first").text();
                    const citeISO = $("#gs_citt .gs_citr:eq(1)").text();
                    const citeMLA = $("#gs_citt .gs_citr:eq(2)").text();

                    //const author = citeMLA.split(".")[0].split(",").reverse().map(w => w.trim()).join(" ");
                    const author = citeISO.split(".")[0]
                                          .replace("(ed","; ed.")
                                          .split(";")
                                          .map(au=>au.split(",").reverse()
                                               .map(w => w.trim())
                                               .map(w=>w[0].toUpperCase()+w.substr(1).toLowerCase())
                                               .join(" "))
                                          .join(", ")
                                          .replace(", Ed.",", ed.");

                    const publisher = citeAPA.split(".").reverse()[1];

                    const number = citeMLA.match(/[0-9]{1,}[.]{1}[0-9]{1,}/g) &&
                                   citeMLA.match(/[0-9]{1,}[.]{1}[0-9]{1,}/g)[0] || "";


                    const pages =  citeISO.match(/p. [0-9]{1,}[\-]{1}[0-9]{1,}/) &&
                                   citeISO.match(/p. [0-9]{1,}[\-]{1}[0-9]{1,}/)[0] || "";

                    const page =   citeISO.match(/p. [0-9]{1,}/) &&
                                   citeISO.match(/p. [0-9]{1,}/)[0] || "";



                    //const pages = citeMLA.split(":").reverse()[0];
                    $(`#item-${id}`).data({
                        author: author,
                        number: number,
                        pages: pages && pages.replace("p.","pp.")|| "" ,
                        page: pages ? "" : page,
                        article: journal,
                        publisher:publisher && publisher.trim(),
                    });


                    $("#gs_cit-x")[0].click();

                    //console.log($(#item-${id}).data());

                    console.log({
                        citeAPA: citeAPA,
                        citeISO: citeISO,
                        citeMLA: citeMLA,
                    })

                     data =$(`#item-${id}`).data();


                    const filename = data.article ?
                          `${data.author} [${data.year}]. ${data.title}. ${data.journal} ${data.number}, ${data.pages}${data.page}`
                          : `${data.author} (${data.year}). ${data.title}. ${data.publisher}`;

                     console.log("filename",filename);
                    $(`#item-${id}`).data("filename",filename);
                     new nstring(data.filename).copy2();




                }

            })
        }
    }

    $(document).ready(() => {

        makeHtml3();


    })
})();
