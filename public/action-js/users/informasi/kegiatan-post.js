console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  window.baseURL = $('#baseUrl').val();
  $('ul.sf-menu > li.selected').removeClass('selected');
  $('#menu-informasi').addClass('selected');
  loadberita($('#param').val(), $('#id_satuan').val());
  loadparam($('#param').val());
});

function loadberita(param, id){

  $.ajax({
      type: 'post',
      dataType: 'json',
      url: 'loadKegiatan',
      data : {
              param      : param,
              id         : id,
      },
      success: function(result){
          let data = result.data;
          var content = '<div class="row">';
          $.each(data, function(key, value) {
            console.log(value.lampiran);
            var horizon = `<div class="horizontal_carousel_container thin page_margin_top gallery_control">
  						<ul class="horizontal_carousel control-for-post-gallery visible-5 autoplay-0 scroll-1 navigation-1 easing-easeInOutQuint duration-750">`;

            for (var i = 0; i < value.lampiran.length; i++) {
              horizon += `<li>
                        <a href="#"><img src='`+window.baseURL+`/`+value.lampiran[i].path+value.lampiran[i].file_name+`' alt='img'></a>
                      </li>`;
            }

            horizon += `</ul>
            </div>`;

            var control = `<div id="control-by-post-gallery" class="horizontal_carousel_container big margin_top_10">
  						<ul id="post-gallery" class="horizontal_carousel visible-1 autoplay-0 scroll-1 navigation-1 easing-easeInOutQuint duration-750">`;
            for (var i = 0; i < value.lampiran.length; i++) {
              control += `<li>
                            <!--class="prettyPhoto" rel="prettyPhoto[gallery]"-->
                            <a href="`+window.baseURL+`/`+value.lampiran[i].path+value.lampiran[i].file_name+`" data-rel="gallery" title="Struggling Nuremberg Sack Coach Verbeek">
                              <span class="icon fullscreen animated"></span>
                              <img src='`+window.baseURL+`/`+value.lampiran[i].path+value.lampiran[i].file_name+`' alt='img'>
                            </a>
                          </li>`;
            }

            control += `</ul>
              					</div>`;

            // var gallery = ``

            content += `<div class="post single">
                					<h1 class="post_title">
                						`+value.judul_kegiatan+`
                					</h1>
                					<ul class="post_details clearfix">
                						<li class="detail category">Satuan <a href="/berita?params=satuan&ids=`+value.satuan_code+`" title="`+value.satuan_name+`">`+value.satuan_name.toUpperCase()+`</a></li>
                						<li class="detail date">8:25 PM, Feb 23</li>
                						<li class="detail author">By <a href="index.html@page=author.html" title="Anna Shubina">Anna Shubina</a></li>
                						<li class="detail views">6 254 Views</li>
                						<li class="detail comments"><a href="index.html@page=post.html#comments_list" class="scroll_to_comments" title="6 Comments">6 Comments</a></li>
                					</ul>
                          `+horizon+`
                          `+control+`
                				</div>`;
          });

          content += '</div>';

          $('#post-kegiatan').html(content);
          var controlBySlideLeft = function(param){
            var self = $(this);
            var index = (typeof(param.data)!="undefined" ? param.data.index : param);
            $("#" + self.parent().attr("id").replace("control-by-", "")).trigger("isScrolling", function(isScrolling){
              if(!isScrolling)
              {
                var controlFor = $(".control-for-" + self.parent().attr("id").replace("control-by-", ""));
                var currentIndex = controlFor.children().index(controlFor.children(".current"));
                if(currentIndex==0)
                {
                  controlFor.trigger("prevPage");
                  if(controlFor.children(".current").prev().length)
                    controlFor.children(".current").removeClass("current").prev().addClass("current");
                  else
                  {
                    controlFor.children(".current").removeClass("current");
                    controlFor.children(":last").addClass("current");
                  }
                }
                else if(currentIndex>controlFor.triggerHandler("currentVisible").length+1)
                {
                  var slideToIndex = parseInt($(this).children(":first").attr("id").replace("horizontal_slide_" + index + "_", ""));
                  if(slideToIndex==0)
                    slideToIndex = controlFor.children().length-1;
                  else
                    slideToIndex--;
                  //controlFor.trigger("slideTo", slideToIndex);
                  controlFor.trigger("slideTo", [slideToIndex, {
                    onAfter: function(){
                      controlFor.children(".current").removeClass("current");
                      controlFor.children(":first").addClass("current");
                    }
                  }]);

                }
                else
                  controlFor.children(".current").removeClass("current").prev().addClass("current");
              }
            });
          };
          var controlBySlideRight = function(param){
            var self = $(this);
            var index = (typeof(param.data)!="undefined" ? param.data.index : param);
            $("#" + self.parent().attr("id").replace("control-by-", "")).trigger("isScrolling", function(isScrolling){
              if(!isScrolling)
              {
                var controlFor = $(".control-for-" + self.parent().attr("id").replace("control-by-", ""));
                var currentIndex = controlFor.children().index(controlFor.children(".current"));
                if(currentIndex==controlFor.triggerHandler("currentVisible").length)
                {
                  controlFor.trigger("nextPage");
                  controlFor.children(".current").removeClass("current").next().addClass("current");
                }
                else if(currentIndex>controlFor.triggerHandler("currentVisible").length)
                {
                  var slideToIndex = parseInt($(this).children(":first").attr("id").replace("horizontal_slide_" + index + "_", ""));
                  if(slideToIndex==controlFor.children().length-1)
                    slideToIndex = 0;
                  else
                    slideToIndex++;
                  //controlFor.trigger("slideTo", [slideToIndex, "next"]);
                  controlFor.trigger("slideTo", slideToIndex);
                  controlFor.children(".current").removeClass("current");
                  controlFor.children(":first").addClass("current");
                }
                else
                {
                  if(controlFor.children(".current").next().length)
                    controlFor.children(".current").removeClass("current").next().addClass("current");
                  else
                  {
                    controlFor.children(".current").removeClass("current");
                    controlFor.children(":first").addClass("current");
                  }
                }
              }
            });
          };
          //horizontal carousel
          var horizontalCarousel = function()
          {
            $(".horizontal_carousel").each(function(index){
              $(this).addClass("pr_preloader_" + index);
              //$(".pr_preloader_" + index + " img:first").attr('src',$(".pr_preloader_" + index + " img:first").attr('src') + '?i='+getRandom(1,100000));
              $(".pr_preloader_" + index).before("<span class='pr_preloader'></span>");
              $(".pr_preloader_" + index + " img:first").one("load", function(){
                $(".pr_preloader_" + index).prev(".pr_preloader").remove();
                $(".pr_preloader_" + index).fadeTo("slow", 1, function(){
                  $(this).css("opacity", "");
                });

                /*$(this).prev(".pr_preloader").remove();
                $(this).fadeTo("slow", 1, function(){
                  $(this).css("opacity", "");
                });*/
                //caroufred
                var visible = 3;
                var autoplay = 0;
                var pause_on_hover = 0;
                var scroll = 1;
                var effect = "scroll";
                var easing = "easeInOutQuint";
                var duration = 750;
                var navigation = 1;
                var control_for = "";
                var elementClasses = $(".pr_preloader_" + index).attr('class').split(' ');
                for(var i=0; i<elementClasses.length; i++)
                {
                  if(elementClasses[i].indexOf('visible-')!=-1)
                    visible = elementClasses[i].replace('visible-', '');
                  if(elementClasses[i].indexOf('autoplay-')!=-1)
                    autoplay = elementClasses[i].replace('autoplay-', '');
                  if(elementClasses[i].indexOf('pause_on_hover-')!=-1)
                    pause_on_hover = elementClasses[i].replace('pause_on_hover-', '');
                  if(elementClasses[i].indexOf('scroll-')!=-1)
                    scroll = elementClasses[i].replace('scroll-', '');
                  if(elementClasses[i].indexOf('effect-')!=-1)
                    effect = elementClasses[i].replace('effect-', '');
                  if(elementClasses[i].indexOf('easing-')!=-1)
                    easing = elementClasses[i].replace('easing-', '');
                  if(elementClasses[i].indexOf('duration-')!=-1)
                    duration = elementClasses[i].replace('duration-', '');
                  if(elementClasses[i].indexOf('navigation-')!=-1)
                    navigation = elementClasses[i].replace('navigation-', '');
                  /*if(elementClasses[i].indexOf('threshold-')!=-1)
                    var threshold = elementClasses[i].replace('threshold-', '');*/
                  if(elementClasses[i].indexOf('control-for-')!=-1)
                    control_for = elementClasses[i].replace('control-for-', '');
                }
                var length = $(this).children().length;
                if(length<visible)
                  visible = length;
                var carouselOptions = {
                  items: {
                    visible: parseInt(visible, 10)
                  },
                  scroll: {
                    items: parseInt(scroll),
                    fx: effect,
                    easing: easing,
                    duration: parseInt(duration),
                    pauseOnHover: (parseInt(pause_on_hover) ? true : false),
                    onAfter: function(){
                      var popup = false;
                      if(typeof($(this).attr("id"))!="undefined")
                      {
                        var split = $(this).attr("id").split("-");
                        if(split[split.length-1]=="popup")
                          popup = true;
                      }
                      if(popup)
                        var scroll = $(".gallery_popup").scrollTop();
                      $(this).trigger('configuration', [{scroll :{
                        easing: "easeInOutQuint",
                        duration: 750
                      }}, true]);
                      if($(".control-for-" + $(this).attr("id")).length)
                      {
                        $(".control-for-" + $(this).attr("id")).trigger("configuration", {scroll: {
                          easing: "easeInOutQuint",
                          duration: 750
                        }});
                      }
                      if(popup)
                        $(".gallery_popup").scrollTop(scroll);
                    }
                  },
                  auto: {
                    items: parseInt(scroll),
                    play: (parseInt(autoplay) ? true : false),
                    fx: effect,
                    easing: easing,
                    duration: parseInt(duration),
                    pauseOnHover: (parseInt(pause_on_hover) ? true : false),
                    onAfter: null
                  }/*,
                  swipe: {
                    items: parseInt(scroll),
                    easing: easing,
                    duration: parseInt(duration),
                    onTouch: true,
                    onMouse: false,
                    options: {
                      allowPageScroll: "vertical",
                      excludedElements:"button, input, select, textarea, .noSwipe"
                    }
                  }*/
                };
                $(".pr_preloader_" + index).carouFredSel(carouselOptions,{
                  wrapper: {
                    classname: "caroufredsel_wrapper caroufredsel_wrapper_hortizontal_carousel"
                  }
                });

                if(parseInt(navigation))
                {
                  $(".pr_preloader_" + index).parent().before("<a class='slider_control left slider_control_" + index + "' href='#' title='prev'></a>");
                  $(".pr_preloader_" + index).parent().after("<a class='slider_control right slider_control_" + index + "' href='#' title='next'></a>");
                  $(".pr_preloader_" + index).parent().parent().hover(function(){
                    $(".horizontal_carousel_container .left.slider_control_" + index).removeClass("slideRightBack").addClass("slideRight");
                    $(".horizontal_carousel_container .right.slider_control_" + index).removeClass("slideLeftBack").addClass("slideLeft");
                    $(".horizontal_carousel_container .pr_preloader_" + index + " .fullscreen").removeClass("slideRightBack").addClass("slideRight");
                  },
                  function(){
                    $(".horizontal_carousel_container .left.slider_control_" + index).removeClass("slideRight").addClass("slideRightBack");
                    $(".horizontal_carousel_container .right.slider_control_" + index).removeClass("slideLeft").addClass("slideLeftBack");
                    $(".horizontal_carousel_container .pr_preloader_" + index + " .fullscreen").removeClass("slideRight").addClass("slideRightBack");
                  });
                }
                $(".pr_preloader_" + index).trigger('configuration', ['prev', {button: $(".horizontal_carousel_container .left.slider_control_" + index)}, false]);
                $(".pr_preloader_" + index).trigger('configuration', ['next', {button: $(".horizontal_carousel_container .right.slider_control_" + index)}, false]);
                $(".pr_preloader_" + index + " li img").css("display", "block");
                $(".pr_preloader_" + index + " li .icon").css("display", "block");
                //$(".mc_preloader_" + index).trigger('configuration', ['debug', false, true]); //for width
                $(".pr_preloader_" + index).trigger('configuration', ['debug', false, true]); //for width

                var self = $(".pr_preloader_" + index);
                var base = "x";
                var scrollOptions = {
                  scroll: {
                    easing: "linear",
                    duration: 200
                  }
                };
                self.swipe({
                  fallbackToMouseEvents: false,
                  allowPageScroll: "vertical",
                  excludedElements:"button, input, select, textarea, .noSwipe",
                  swipeStatus: function(event, phase, direction, distance, fingerCount, fingerData ) {
                    //if(!self.is(":animated") && (!$(".control-for-" + self.attr("id")).length || ($(".control-for-" + self.attr("id")).length && !$(".control-for-" + self.attr("id")).is(":animated"))))
                    if(!self.is(":animated"))
                    {
                      self.trigger("isScrolling", function(isScrolling){
                        if(!isScrolling)
                        {
                          if (phase == "move" && (direction == "left" || direction == "right"))
                          {
                            if(base=="x")
                            {
                              if($(".gallery_popup").is(":visible"))
                                var scroll = $(".gallery_popup").scrollTop();
                              self.trigger("configuration", scrollOptions);
                              if($(".control-for-" + self.attr("id")).length)
                                $(".control-for-" + self.attr("id")).trigger("configuration", scrollOptions);
                              if($(".gallery_popup").is(":visible"))
                                $(".gallery_popup").scrollTop(scroll);
                              self.trigger("pause");
                            }
                            if (direction == "left")
                            {
                              if(base=="x")
                                base = 0;
                              self.css("left", parseInt(base)-distance + "px");
                            }
                            else if (direction == "right")
                            {
                              if(base=="x" || base==0)
                              {
                                self.children().last().prependTo(self);
                                base = -self.children().first().width()-parseInt(self.children().first().css("margin-right"));
                              }
                              self.css("left", base+distance + "px");
                            }

                          }
                          else if (phase == "cancel")
                          {
                            if(distance!=0)
                            {
                              self.trigger("play");
                              self.animate({
                                "left": base + "px"
                              }, 750, "easeInOutQuint", function(){
                                if($(".gallery_popup").is(":visible"))
                                  var scroll = $(".gallery_popup").scrollTop();
                                if(base==-self.children().first().width()-parseInt(self.children().first().css("margin-right")))
                                {
                                  self.children().first().appendTo(self);
                                  self.css("left", "0px");
                                  base = "x";
                                }
                                self.trigger("configuration", {scroll: {
                                  easing: "easeInOutQuint",
                                  duration: 750
                                }});
                                if($(".control-for-" + self.attr("id")).length)
                                  $(".control-for-" + self.attr("id")).trigger("configuration", {scroll: {
                                    easing: "easeInOutQuint",
                                    duration: 750
                                  }});
                                if($(".gallery_popup").is(":visible"))
                                  $(".gallery_popup").scrollTop(scroll);
                              });
                            }
                          }
                          else if (phase == "end")
                          {
                            self.trigger("play");
                            if (direction == "right")
                            {
                              if(typeof(self.parent().parent().attr("id"))!="undefined" && self.parent().parent().attr("id").indexOf('control-by')==0)
                              {
                                if($(".horizontal_carousel_container .left.slider_control_" + index).length)
                                  controlBySlideLeft.call($(".horizontal_carousel_container .left.slider_control_" + index), index);
                                else
                                  controlBySlideLeft.call($(".pr_preloader_" + index).parent(), index);
                              }
                              self.animate({
                                "left": 0 + "px"
                              }, 200, "linear", function(){
                                if($(".gallery_popup").is(":visible"))
                                  var scroll = $(".gallery_popup").scrollTop();
                                self.trigger("configuration", {scroll: {
                                  easing: "easeInOutQuint",
                                  duration: 750
                                }});
                                if($(".control-for-" + self.attr("id")).length)
                                  $(".control-for-" + self.attr("id")).trigger("configuration", {scroll: {
                                    easing: "easeInOutQuint",
                                    duration: 750
                                  }});
                                if($(".gallery_popup").is(":visible"))
                                  $(".gallery_popup").scrollTop(scroll);
                                base = "x";
                              });

                            }
                            else if (direction == "left")
                            {
                              if(base==-self.children().first().width()-parseInt(self.children().first().css("margin-right")))
                              {
                                self.children().first().appendTo(self);
                                self.css("left", (parseInt(self.css("left"))-base)+"px");
                              }
                              if($(".horizontal_carousel_container .right.slider_control_" + index).length)
                                $(".horizontal_carousel_container .right.slider_control_" + index).trigger("click");
                              else
                                $(".horizontal_carousel_container .slider_control .right_" + index).trigger("click");
                              base = "x";
                            }
                          }
                        }
                      });
                    }
                  }
                });
                $(window).trigger("resize");
                $(".pr_preloader_" + index).trigger('configuration', ['debug', false, true]); //for height
                if(control_for!="")
                {
                  $(".pr_preloader_" + index).children().each(function(child_index){
                    if(child_index==0)
                      $(this).addClass("current");
                    $(this).attr("id", "horizontal_slide_" + index + "_" + child_index);
                  });
                  $(".pr_preloader_" + index).children().click(function(event){
                    event.preventDefault();
                    var self = $(this);
                    $("#" + control_for).trigger("isScrolling", function(isScrolling){
                      if(!isScrolling)
                      {
                        var slideIndex = self.attr("id").replace("horizontal_slide_" + index + "_", "");
                        self.parent().children().removeClass("current");
                        self.addClass("current");
                        var controlForIndex = parseInt($("#" + control_for).children(":first").attr("id").split("_")[2]);
                        //$("#" + control_for).trigger("slideTo", parseInt(slideIndex));
                        $("#" + control_for).trigger("slideTo", $("#horizontal_slide_" + controlForIndex + "_" + slideIndex));
                      }
                    });
                  });
                }
                $("[id^='control-by-'] .pr_preloader_" + index).children().each(function(child_index){
                  $(this).attr("id", "horizontal_slide_" + index + "_" + child_index);
                });
                $("[id^='control-by-'] .left.slider_control_" + index).click({index: index}, controlBySlideLeft);
                $("[id^='control-by-'] .right.slider_control_" + index).click({index: index}, controlBySlideRight);
              }).each(function(){
                if(this.complete)
                  $(this).load();
              });
            });
          };
          horizontalCarousel();
          //$(".gallery_popup").css("display", "none");
          $("a[data-rel]").click(function(event){
            event.preventDefault();
            var currentSlideIndex = parseInt($(this).parent().attr("id").split("_")[3]);
            var panelId = "#" + $(this).attr("data-rel") + "-popup";
            if(!$(panelId).hasClass("disabled"))
            {
              $("body").append("<div class='gallery_overlay'></div>");
              $(".gallery_overlay").css({"width":$(window).width()+"px", "height":$(document).height()+"px", "opacity":"1"});
              //var top = ($(window).height()-$(panelId).height())/2+$(window).scrollTop();
              var top = $(window).scrollTop();
              if(top<0)
                top = 0;
              top = 0;
              $(panelId).css("top", top + "px");
              //$(panelId).css("left", ($(window).width()-$(panelId).width())/2+$(window).scrollLeft() + "px");
              $(panelId).appendTo("body").css("display", "block");
              var carouselControl = $(panelId + " .horizontal_carousel_container.thin .horizontal_carousel");
              var carouselControlIndex = parseInt(carouselControl.children(":first").attr("id").split("_")[2]);
              if(carouselControl.children().length<7)
                $(panelId + " .horizontal_carousel_container.thin").css("width", "1050px");

              var carousel = $(panelId + " .horizontal_carousel_container.big .horizontal_carousel");
              var carouselIndex = parseInt(carousel.children(":first").attr("id").split("_")[2]);
              if(!carousel.find(".navigation_container").length)
              {
                carousel.children().each(function(index){
                  $(this).find(".column_1_3").prepend("<div class='navigation_container clearfix'><ul id='slider_navigation_" + index + "' class='slider_navigation'><li class='slider_control'><a title='prev' href='#' class='left_" + index + "'></a></li><li class='slider_control'><a title='next' href='#' class='right_" + index + "'></a></li></ul><div class='slider_info'>" + (index+1) + " / " + carousel.children().length + "</div></div>");
                  $(panelId + " .left_" + index).click(function(event){
                    event.preventDefault();
                    carousel.trigger("isScrolling", function(isScrolling){
                      if(!isScrolling)
                      {
                        controlBySlideLeft.call(carousel.parent(), carouselIndex);
                        carousel.trigger("prevPage");

                        /*var controlFor = $(".control-for-" + carousel.attr("id").replace(, carouselIndex""));
                        var currentIndex = controlFor.children().index(controlFor.children(".current"));
                        if(currentIndex==0)
                        {
                          controlFor.trigger("prevPage");
                          controlFor.children(".current").removeClass("current").prev().addClass("current");
                        }
                        else if(currentIndex>controlFor.triggerHandler("currentVisible").length+1)
                        {
                          var slideToIndex = parseInt(carousel.children(":first").attr("id").replace("horizontal_slide_" + carouselIndex + "_", ""));
                          controlFor.trigger("slideTo", slideToIndex);
                          controlFor.children(".current").removeClass("current");
                          controlFor.children(":first").addClass("current");
                        }
                        else
                          controlFor.children(".current").removeClass("current").prev().addClass("current");*/
                      }
                    });
                  });
                  $(panelId + " .right_" + index).click(function(event){
                    event.preventDefault();
                    carousel.trigger("isScrolling", function(isScrolling){
                      if(!isScrolling)
                      {
                        controlBySlideRight.call(carousel.parent(), carouselIndex);
                        carousel.trigger("nextPage");
                        /*var controlFor = $(".control-for-" + carousel.attr("id").replace("control-, carouselIndex					var currentIndex = controlFor.children().index(controlFor.children(".current"));
                        if(currentIndex==controlFor.triggerHandler("currentVisible").length)
                        {
                          controlFor.trigger("nextPage");
                          controlFor.children(".current").removeClass("current").next().addClass("current");
                        }
                        else if(currentIndex>controlFor.triggerHandler("currentVisible").length)
                        {
                          var slideToIndex = parseInt(carousel.children(":first").attr("id").replace("horizontal_slide_" + carouselIndex + "_", ""));
                          if(slideToIndex==controlFor.children().length-1)
                            slideToIndex = 0;
                          else
                            slideToIndex++;
                          controlFor.trigger("slideTo", slideToIndex);
                          controlFor.children(".current").removeClass("current");
                          controlFor.children(":first").addClass("current");
                        }
                        else
                          controlFor.children(".current").removeClass("current").next().addClass("current");*/
                      }
                    });
                  });
                });
              }
              carouselControl.children(".current").removeClass("current");
              carousel.trigger('configuration', ['debug', false, true]);
              carouselControl.trigger('configuration', ['debug', false, true]);
              $("#horizontal_slide_" + carouselControlIndex + "_" + currentSlideIndex).addClass("current");
              carousel.trigger("slideTo", [$("#horizontal_slide_" + carouselIndex + "_" + currentSlideIndex), {
                duration    : 10
              }]);
              carouselControl.trigger("slideTo", [$("#horizontal_slide_" + carouselControlIndex + "_" + currentSlideIndex), {
                duration    : 10
              }]);
              $(panelId).css("opacity", "0");
              carousel.trigger('configuration', ['debug', false, true]);
              carouselControl.trigger('configuration', ['debug', false, true]);
              $(panelId).animate({opacity: 1}, 500, function(){if(jQuery.browser.msie)this.style.removeAttribute("filter");carousel.trigger('configuration', ['debug', false, true]);/*IE bug fix*/});
              $(panelId).css("height", $(window).height()+"px");
              //$("html,body").css("overflow", "hidden").addClass("dont_scroll");
              var scrollPosition = $(window).scrollTop();
              $("body").addClass("lock-position");
              $(".close_popup").one("click", function(event){
                event.preventDefault();
                $(".close_popup").unbind("click");
                //$("html,body").css("overflow", "auto").removeClass("dont_scroll");
                $("body").removeClass("lock-position");
                $(window).scrollTop(scrollPosition);
                $(panelId).css({"top": scrollPosition, "overflow": "hidden"});
                $(panelId).addClass("disabled").animate({opacity:0},500,function(){$(this).css("display", "none").removeClass("disabled");$(panelId).css({"top": 0, "overflow-y": "scroll"});});
                $(".gallery_overlay").animate({opacity:0},500,function(){$(this).remove()});
              });
            }
          });
      }
    });
  }

  function loadparam(param){

    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'loadparam',
        data : {
                param      : param,
                id         : $('#id_satuan').val(),
        },
        success: function(result){
            let data = result.data;
            for (var i = 0; i < data.length; i++) {

              $('.page_title').html('Berita '+ data[i].satuan_desc);
            }
          }
        })
      }
