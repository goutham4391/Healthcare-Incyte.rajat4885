/// <reference path="jquery-1.10.2.js" />

var pageName = location.pathname.substring(1).toLowerCase();
var ua = navigator.userAgent.toLowerCase();
var isIE = ua.indexOf("msie ") > -1 || ua.indexOf("trident") > -1;
var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream; //&& ua.indexOf("mobile");
var isMac = navigator.platform.toLowerCase() == 'macintel';



function limitText(event, limitNum, limitText) {
    var limitField = event.target;
    if (limitField.value.length > limitNum) {
        limitField.value = limitField.value.substring(0, limitNum);
    } else {
        var limitCount = $(limitField).next().children('span')[0];
        if (limitCount != undefined)
            limitCount.innerHTML = limitNum - limitField.value.length;
    }
}

$(document).ready(function () {
    $(window).scroll(function () {
       if($(".sticky-wrapper").hasClass("is-sticky")){
           $(".hideScroll").slideUp();
           if($("#topHeader").find(".banner").is(":hidden")){
               $("#topHeader").css("min-height",0);               
           }else{
           }
       }else{
           $(".hideScroll").slideDown();
//           $("#topHeader").css("min-height","35px");               
       }
    });
    $(".searchInputContainer-cust").keyup(function (event) {
        console.log($(this).val())
        if ($(this).val().length !=0) {
            $(".search-toggle-icon-cust").removeClass("deactive")
        }else{
            $(".search-toggle-icon-cust").addClass("deactive")
        }
    })
    $(".searchInputContainer-cust").keypress(function (event) {
        var code = event.which;
        var objSearchInput = this;
        
        if (code == 13) {         
	    event.preventDefault();  
            if ($(objSearchInput).val() != "") { 
                setTimeout(function () { globalSearch(objSearchInput); }, 500);
            } else {
                //window.location.href = "/search-results/q/";
                return false;
            }
        }
        return true;
    });

    $(".gotoSection").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        var accordionID = $(this).closest(".accordion").find(".accordion-heading.collapsed").attr("href");
        $(accordionID).collapse('show');
        var totHei = $($(this).attr("data-href")).offset().top - ($(".header-wrapper").height() + $(".subLevelRight").outerHeight());
        $('html, body').animate({
            scrollTop: totHei
        }, 700);
    });
    $(".search-toggle-icon-cust").on("click", function () {
        if ($(this).parent().find(".searchInputContainer-cust").val().length != 0) {
            globalSearch($(this).parent().find(".searchInputContainer-cust"));
        }
    });
    $(".navbar-header .navbar-toggle").on("click", function () {
        $(this).toggleClass("open");
    });
    $(".subLevel li").click(function () {
        $(this).find("a span.fa").toggleClass("fa-chevron-down fa-chevron-up");
    });

    var main = $('div.country-dropdown .btn');
    var ul = $('div.country-dropdown > ul');
    var li = $('div.country-dropdown .dropdown-menu ul > li');
    console.log(li)
    main.click(function () {
        $(".scrollable-menu ul").niceScroll({
            cursorcolor: "#005CAB",
            cursorwidth: "9px",
            background:"#F1F2F2",
            autohidemode:false,
            cursorborderradius: "5px"
        });
    });

    // Insert Data
        li.click(function () {
            main.find(".contryName").html($(this).text());
            main.find("img").attr("src",$(this).find("img").attr("src"))
        });
//    $(window).resize(function(){
//        console.log("resize",$("#sticky-wrapper").height())
//        $(".country-bg-img").css("top",$("#sticky-wrapper").height());
    //    });
    // psSiteSearch functionality started
    setTimeout(function () { 
    $('.notFound').text($('.psTxtSearch').val());
    $('.psSearchTxtBtn').click(function () {
        $('.notFound').text($('.psTxtSearch').val());
    });
        $('<div class="Search-Custom-Header-div"><span class="Search-Custom-Header">SEARCH</span> </div>').insertBefore(".psTxtSearch");
        $('<div class="search-count"> <span class="count">1</span> of <span class="total-results">11</span>   </div>').insertBefore('.dnnSearchResultItem-Title');
        $('.dnnRight-psSearch').hide();        
        $('.total-results').text($('.totalRecord').text());
        if ($('.psResultsNav').children().length > 1) {
            $('.pageCount-psSearch').text($('.psResultsNav').children().length);
            $('.dnnRight-psSearch').show();

            var urlPaging = $(location).attr('href');
            if (urlPaging.toLocaleLowerCase().indexOf("psp/index.html") != -1) {
                var parts = urlPaging.split("index.html");
                var last_part = parts[parts.length - 1];
                var currentPage = (last_part / 10) + 1;
                $('.currentPage').text(currentPage);
                if (currentPage >= $('.psResultsNav').children().length) {
                    $('.dnnPager-next').addClass('dnnPager-disable');
                }
                if (1 == currentPage) {
                    $('.dnnPager-prev').addClass('dnnPager-disable');
                } else {
                    $('.dnnPager-prev').removeClass('dnnPager-disable');
                }
                setSerialNumber(currentPage);
            } 
            else {
                setSerialNumber(1);
            }
            $('.dnnPager-next').click(function () {
                if (!$(this).hasClass('dnnPager-disable')) {
                    var paging = $('.currentPage').text() * 10;
                    window.location.href = "/search-results/search/" + $('.psTxtSearch').val() + "/psp/" + paging;
                }
            });
            $('.dnnPager-prev').click(function () {
                if (!$(this).hasClass('dnnPager-disable')) {
                    var paging = ($('.currentPage').text() - 2) * 10;
                    window.location.href = "/search-results/search/" + $('.psTxtSearch').val() + "/psp/" + paging;
                }
            });
        }
        else {
            setSerialNumber(1);
        }

    }, 500);
    // psSiteSearch functionality End
});

function globalSearch(objInput) {
    var searchterm = $(objInput).val();
    $(objInput).val("");
    window.location.href = "/search-results?search=" + searchterm + "&size=10"
}
function setSerialNumber(currentPage) {
    var serialNo = (currentPage - 1) * 10;
    $('.search-count').each(function () {
        $(this).find('.count').text(serialNo + 1);
        serialNo++;
    });
}