function buttonUp() {
    var e = $(".search .searchInputContainer input").val();
    e = $.trim(e).length, 0 !== e ?
        (
            $(".search").css("overflow", "visible")
        )
        :
        (
            $(".search .searchInputContainer input").val(""),
            $(".search-toggle-icon").css("display", "block"),
            $(".search").css("overflow", "hidden")
        ),
        $(".search .searchInputContainer a.dnnSearchBoxClearText").click(function () {
            $(".search .searchInputContainer a.dnnSearchBoxClearText").hasClass("dnnShow")
                ?
                $(this).css("overflow", "visible")
                :
                $(".search").css("overflow", "hidden")
        });
}

$(document).ready(function () {

    $(window).on("orientationchange", function (event) {
        window.setTimeout(function () {
            if (window.innerWidth < 992)
                $(".country-bg-img").css("top", "0px");
            else
                initBanner();

            repositionFilter();
        }, 200);
    });

    //Set banner position.
    initBanner();
    repositionFilter();
    $(window).scroll(function () {
        //On scroll, reposition the banner.
        resizeBanner();
        initBanner();
        repositionFilter();
    });

    function getVisible(className) {
        var $el = $('.' + className),
        scrollTop = $(this).scrollTop(),
        scrollBot = scrollTop + $(this).height(),
        elTop = $el.offset().top,
        elBottom = elTop + $el.outerHeight(),
        visibleTop = elTop < scrollTop ? scrollTop : elTop,
        visibleBottom = elBottom > scrollBot ? scrollBot : elBottom;
        return (visibleBottom - visibleTop);
    }

    function initBanner() {
        if (window.innerWidth > 992) {
            var topBarScrollHeight = getVisible('header-wrapper');
            if ($('.home-page').length > 0)
                $(".country-bg-img").css("top", topBarScrollHeight + "px");
            else
                $(".country-bg-img").css("top", topBarScrollHeight + $("#dnnMenu .dropdown.active .dropdown-menu").height() + "px");
        }
    }

    function resizeBanner() {
        if (window.innerWidth > 992) {
            var topBarScrollHeight = getVisible('header-wrapper');
            var subMenuHeight = 0;
            if ($('.home-page').length > 0)
                subMenuHeight = $("header").height();
            else
                subMenuHeight = $("#dnnMenu .dropdown.active .dropdown-menu").height() + $("header").height();

            if (subMenuHeight < topBarScrollHeight)
                $(".country-bg-img").css("top", topBarScrollHeight + "px");
        }
    }

    function repositionFilter() {
        if ($('.home-page').length > 0)
            $(".product-filter").css("top", $('.header-wrapper').height() + "px");
        else
            $(".product-filter").css("top", $('.header-wrapper').height() + $("#dnnMenu .dropdown.active .dropdown-menu").height() + 10 + "px");
    }

    if (window.innerWidth < 992) {
        //Mobile menu url setting.
        $("ul.mobile_menu a").each(function (index) {
            if ($(this).next().hasClass('submenu') && !$(this).hasClass('special-tab'))
                $(this).removeAttr("href");
        });
    }

    function resetMobileMenu()
    {
        $("#sm_menu_ham").css("top", "30px");
        //console.log($(".header-wrapper").height())
        //console.log($("header").height())
        $('.sm_menu_outer').css("top", $('header').height() + "px");
    }

    $('#closebanner, .close-banner').click(function () {        
        $('.banner').slideToggle("slow","",function(){           
            window.scrollTo(0,15); 
            setTimeout(function () {
               $(".sub-page-conventions").find(".brand").css('margin-top', '0px');
            },500)
        });
        
        document.cookie = "bannerclose=true;expires=" + new Date(new Date().getTime() + 60 * 60 * 1000 * 4320).toGMTString();
        //console.log($(".header-wrapper").height())
        $(".product-filter").sticky({
            //topSpacing: $(".header-wrapper").height()-1
        });
        resizeBanner();
        resetMobileMenu();
    });
    if (getCookie("bannerclose") == 'true') {
        $('.banner').hide();
        $(".sub-page-conventions").find(".brand").css('margin-bottom', '25px');
	resizeBanner();
        resetMobileMenu();
    } else {        
	//$(".sub-page-conventions").find(".brand").css('margin-top', '25px');
	$(".sub-page-conventions").find(".brand").css('margin-bottom', '25px');
        $('.banner').show();
        resizeBanner();
        resetMobileMenu();
    }
    $('#cookiePText').html(cookieText);    
    $('body').on("click", '.navbar-nav.sm-collapsible .dropdown.open > a', function (e) {
        e.preventDefault();
    })        
    $(".header-wrapper").sticky({ topSpacing: 0 });
    $('[data-toggle="tooltip"]').length && 
    $('[data-toggle="tooltip"]').tooltip(), 
    $('<span class="search-toggle-icon"></span>').insertAfter(".search a.SearchButton");
    $('#dnnMenu .dropdown-menu li.active').parents('.dropdown').addClass('active');
    $('#dnnMenu .navbar-nav.topLevel li').each(function() {
        var limob = $('#dnnMenu .dropdown-menu.subLevel li.dropdown.active > a').text().trim().toLowerCase();
        var lides = $(this).text().trim().toLowerCase();
        if(limob === lides){
            $(this).addClass("active");
        }
    });
    $('#dnnMenu .navbar-nav.topLevel li').hover(function() {
        var limob; 
        var lides = $(this).text().trim().toLowerCase();
        $("#dnnMenu .navbar-nav.topLevel li").removeClass("hoverArrow");
        $('#dnnMenu .dropdown-menu.subLevel li.dropdown').removeClass("hoverShow"); 
        $(this).addClass("hoverArrow");
        if($("#dnnMenu .navbar-nav.topLevel li").hasClass("active")){
            if ($(".hoverArrow").parent().find("li.active a span").text().trim().toLowerCase() == lides) {
                 $(".hoverArrow").parent().find("li.active").removeClass("removeArrow");
            } else {
                $(".hoverArrow").parent().find("li.active").addClass("removeArrow");
            }            
        }else{
            $(".hoverArrow").parent().find("li.active").addClass("removeArrow");
        }
        $('#dnnMenu .dropdown-menu.subLevel li.dropdown > a').each(function(){
            limob = $(this).text().trim().toLowerCase();
            if(limob === lides){
                $(this).parent().addClass("hoverShow");
            }
        });
    })
    $('#dnnMenu .navbar-nav.topLevel li').mouseleave(function(){
        console.log("leaving")
        if($('#dnnMenu .dropdown-menu.subLevel li.dropdown.hoverShow').is(":hover")){
               console.log("coming after hover")
        }else{
            console.log("else leaving")
//            $(".hoverArrow").parent().find("li.active").removeClass("removeArrow");
//            $(this).removeClass("hoverArrow");
//            $('#dnnMenu .dropdown-menu.subLevel li.dropdown').removeClass("hoverShow"); 
        }
    });
    $('#dnnMenu .dropdown-menu.subLevel li.dropdown .subLevelRight').on('mouseleave',function(){
        if($('#dnnMenu .dropdown-menu.subLevel li.dropdown').hasClass("hoverShow")){
            $(".hoverArrow").parent().find("li.active").removeClass("removeArrow");
            $("#dnnMenu .navbar-nav.topLevel li").removeClass("hoverArrow");
            $('#dnnMenu .dropdown-menu.subLevel li.dropdown').removeClass("hoverShow");
        }
        if (window.innerWidth > 992) {
             setTimeout(function () {
                 $("#dnnMenu .dropdown-menu.subLevel > .dropdown > .dropdown-menu.subLevelRight li.dropdown .dropdown-menu.subLevelRight").attr("style", "display: none !important");
                 $("#dnnMenu .dropdown-menu.subLevel > .dropdown > .dropdown-menu.subLevelRight li.dropdown a span.fa").removeClass('fa-chevron-up');
                 $("#dnnMenu .dropdown-menu.subLevel > .dropdown > .dropdown-menu.subLevelRight li.dropdown a span.fa").addClass('fa-chevron-down');
             }, 200);
         }
    });
    $('#breadcrumb a').after('<span class="seperator">></span>');
    $('#breadcrumb .seperator:last').hide();
    $('body').on('click','.mob-main',function(e) {
        if (window.innerWidth < 992 && $(this).next().hasClass('subLevelRight')) {
            //if (($(this).attr('href').toLowerCase().indexOf("immuno-oncology-research")) == -1)
            //{
                e.preventDefault();
                $(this).next().toggleClass('open');
            //}
        }
    })

    $("#dnnMenu .dropdown-menu.subLevel > .dropdown > .dropdown-menu.subLevelRight li.dropdown").hover(function (e) {
        openTertiaryNav(this);
    });

    $(".country-close-icon").click(function () {
        $(".country-bg-img").hide();
    });

     $("body *").click(function (e) {
         //Hide all other opened tertiary menus.
         if (window.innerWidth > 992) {
             setTimeout(function () {
                 $("#dnnMenu .dropdown-menu.subLevel > .dropdown > .dropdown-menu.subLevelRight li.dropdown .dropdown-menu.subLevelRight").attr("style", "display: none !important");
                 $("#dnnMenu .dropdown-menu.subLevel > .dropdown > .dropdown-menu.subLevelRight li.dropdown a span.fa").removeClass('fa-chevron-up');
                 $("#dnnMenu .dropdown-menu.subLevel > .dropdown > .dropdown-menu.subLevelRight li.dropdown a span.fa").addClass('fa-chevron-down');
             }, 200);
         }
     });

    function openTertiaryNav(obj) {
        if (window.innerWidth > 992) {
            ////Get the hidden/shown state of tertiary menu under the current menu.
            setTimeout(function () {
                //Hide all other opened tertiary menus.
                $("#dnnMenu .dropdown-menu.subLevel > .dropdown > .dropdown-menu.subLevelRight li.dropdown .dropdown-menu.subLevelRight").attr("style", "display: none !important");
                $("#dnnMenu .dropdown-menu.subLevel > .dropdown > .dropdown-menu.subLevelRight li.dropdown a span.fa").removeClass('fa-chevron-up');
                $("#dnnMenu .dropdown-menu.subLevel > .dropdown > .dropdown-menu.subLevelRight li.dropdown a span.fa").addClass('fa-chevron-down');

                $(obj).find("a span.fa").removeClass('fa-chevron-down');
                $(obj).find("a span.fa").addClass('fa-chevron-up');
                ////Hide or show the tertiary menu under the selected menu.
                $(obj).find('.dropdown-menu.subLevelRight').attr("style", "display: block !important");
            }, 200);
        }
    }

    var searchBox = $(".search"),
        searchToggleIcon = $(".search-toggle-icon"),
        clearSearchBox = $(".search .searchInputContainer a.dnnSearchBoxClearText"),
        searchInput = $(".search .searchInputContainer input"),
        searchActive = false;
    searchToggleIcon.click(function (event) {
        event.stopPropagation();
        !searchActive
            ?
            (
                searchBox.addClass("search-open"),
                searchInput.focus(),
                searchActive = true
            )
            :
            (
                searchBox.removeClass("search-open"),
                searchInput.focusout(),
                searchInput.val(""),
                clearSearchBox.removeClass("dnnShow"),
                $(".search").css({ "overflow": "hidden" }),
                searchActive = false
            )
    }),
        searchBox.mouseup(function () {
            return false
        }),
        searchToggleIcon.mouseup(function () {
            return false
        }), $(document).click(function (event) {
            if (!($(event.target).parents(".search").length)) {
                searchActive == true && (searchToggleIcon.click())
            }
        }), searchInput.keyup(buttonUp), $("a#search-action").click(function () {
            $("#search-top").toggleClass("active");
        })
   
    /* USA Map section */
    $(".countryListBtn").click(function () {
        $(".header-bg-img").toggle();
        $(".country-bg-img").toggle();
        $(".mobile_close_btn").toggle();
    });

    /* Off-ramp message / pop up code */
    $("body").on("click", "a.link-external", function (e) {
        e.preventDefault();
        var url = $(this).attr("href");
        $(".offramp-container").show();
        $(".offramp-container .continue").attr({ "href": url, "target": "_blank" });
    });
    $("body").on("click", ".offramp-container a.cancel", function (e) {
        e.preventDefault();
        $(".offramp-container").hide();
    });

    $("body").on("click", ".offramp-container a.continue", function () {
        $(".offramp-container").hide();
    });

    $('.map-link').click(function(e){
        e.preventDefault();
        $("#iframeMap").attr("src", $(this).attr("href"));
    })

    /* To reduce fix height of sticky top navigation (Level-1) */
    var pageName = location.pathname.substring(location.pathname.lastIndexOf("index.html") + 1);
    $('body').addClass(pageName);

    $('[itemprop="name"],#dnnMenu .mob-main span').each(function() {
        var itsVal = $(this).text();
        itsVal = ucFirstAllWords(itsVal);
        $(this).text(itsVal);
    });

    /* To add footer number only on opt out pages */
    var pathName = window.location.pathname;
    if (pathName == "/HCP-Opt-Out" || pathName == "/opt-out-confirmation") {
        $('.hcp-opt-out').removeClass('hidden');
    } else if (pathName == "/consumer-optout" || pathName == "/opt-out-consumer-confirmation") {
        $('.consumer-opt-out').removeClass('hidden');
    } 
   
});

function ucFirstAllWords( str ) {    
    var pieces = str.split(" ");
    for ( var i = 0; i < pieces.length; i++ )
    {
        var j = pieces[i].charAt(0).toUpperCase();
        pieces[i] = j + pieces[i].substr(1).toLowerCase();
    }
    return pieces.join(" ");
}
//Cookie bar
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

