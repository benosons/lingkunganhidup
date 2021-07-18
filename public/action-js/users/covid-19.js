console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  $('ul.sf-menu > li.selected').removeClass('selected');
  $('#menu-covid').addClass('selected');
  loadberitaAll('','');
  loadberita('','');
});

function loadberitaAll(param, id){

  $.ajax({
      type: 'post',
      dataType: 'json',
      url: 'loadBeritaCovid',
      data : {
              param      : param,
              id         : id,
      },
      success: function(result){
          let data = result.data;

          var content = '';
            for (var i = 0; i < data.length; i ++) {
              var sliceIt = data.slice(i, i + 2);

              if(sliceIt.length == 2){
                  content += '<ul class="blog column column_1_2">';
                  content += `<li class="post">
                  							<a href="index.html@page=post_small_image.html" title="Built on Brotherhood, Club Lives Up to Name">
                  								<img src='`+$('#baseURL').val()+`/`+sliceIt[0].lampiran[0].path+sliceIt[0].lampiran[0].file_name+`' alt='img'>
                  							</a>
                  							<div class="post_content">
                  								<h2 class="with_number">
                  									<a href="/covid?params=post&ids=`+sliceIt[0].id+`" title="">`+sliceIt[0].judul_berita+`</a>
                  									<a class="comments_number" href="index.html@page=post.html#comments_list" title="2 comments">2<span class="arrow_comments"></span></a>
                  								</h2>
                  								<ul class="post_details">
                  									<li class="category"><a href="covid" title="COVID-19">COVID-19</a></li>
                  									<li class="date">
                  										`+sliceIt[0].create_date+`
                  									</li>
                  								</ul>
                  								`+sliceIt[0].isi_berita.substring(0, 100)+`...
                  								<a class="read_more" href="/covid?params=post&ids=`+sliceIt[0].id+`" title="Read more"><span class="arrow"></span><span>READ MORE</span></a>
                  							</div>
                  						</li>`;
                  content += `<li class="post">
                  							<a href="index.html@page=post_small_image.html" title="Built on Brotherhood, Club Lives Up to Name">
                  								<img src='`+$('#baseURL').val()+`/`+sliceIt[1].lampiran[0].path+sliceIt[1].lampiran[0].file_name+`' alt='img'>
                  							</a>
                  							<div class="post_content">
                  								<h2 class="with_number">
                  									<a href="/covid?params=post&ids=`+sliceIt[1].id+`" title="">`+sliceIt[1].judul_berita+`</a>
                  									<a class="comments_number" href="index.html@page=post.html#comments_list" title="2 comments">2<span class="arrow_comments"></span></a>
                  								</h2>
                  								<ul class="post_details">
                  									<li class="category"><a href="covid" title="COVID-19">COVID-19</a></li>
                  									<li class="date">
                  										`+sliceIt[1].create_date+`
                  									</li>
                  								</ul>
                  								`+sliceIt[1].isi_berita.substring(0, 100)+`...
                  								<a class="read_more" href="/covid?params=post&ids=`+sliceIt[1].id+`" title="Read more"><span class="arrow"></span><span>READ MORE</span></a>
                  							</div>
                  						</li>`;
                    content += '</ul>';
                            }


            }

          $('#berita-covid-terbaru').html(content);

      }
    });
  }

function loadberita(param, id){

  $.ajax({
      type: 'post',
      dataType: 'json',
      url: 'loadBeritaHeadlineCovid',
      data : {
              param      : param,
              id         : id,
      },
      success: function(result){
          let data = result.data;
            var content = '';
            for (var i = 0;(i < 3 && i < data.length); i++) {

              content += `<li class="slide">
                      			<img src='`+$('#baseURL').val()+'/'+data[i].path+data[i].file_name+`' alt='img'>
                      			<div class="slider_content_box">
                      				<ul class="post_details simple">
                      					<li class="category"><a href="covid" title="">COVID-19</a></li>
                      					<li class="date">
                      						`+data[i].create_date+`
                      					</li>
                      				</ul>
                      				<h2><a href="/covid?params=post&ids=`+data[i].id_parent+`" title="High Altitudes May Aid Weight Control">`+data[i].judul_berita+`</a></h2>
                      				
                      			</div>
                      		</li>`;
            }

          $('.small_slider').html(content).ready(function () {
            $(".small_slider").each(function(index){
              $(this).addClass("pr_preloader_ss_" + index);
              //$(".pr_preloader_ss_" + index + " img:first").attr('src',$(".pr_preloader_ss_" + index + " img:first").attr('src') + '?i='+getRandom(1,100000));
              //$(".pr_preloader_ss_" + index + " img:first").before("<span class='pr_preloader'></span>");
              $(".pr_preloader_ss_" + index).before("<span class='pr_preloader'></span>");
              $(".pr_preloader_ss_" + index + " img:first").one("load", function(){
                $(".pr_preloader_ss_" + index).prev(".pr_preloader").remove();
                $(".pr_preloader_ss_" + index).fadeTo("slow", 1, function(){
                  $(this).css("opacity", "");
                });

                /*$(this).prev(".pr_preloader").remove();
                $(this).fadeTo("slow", 1, function(){
                  $(this).css("opacity", "");
                });*/

                var id = "small_slider";
                var elementClasses = $(".pr_preloader_ss_" + index).attr('class').split(' ');
                for(var i=0; i<elementClasses.length; i++)
                {
                  if(elementClasses[i].indexOf('id-')!=-1)
                    id = elementClasses[i].replace('id-', '');
                }
                $(".pr_preloader_ss_" + index).carouFredSel({
                  items: {
                    visible: 1,
                    minimum: 1
                  },
                  scroll: {
                    items: 1,
                    easing: "easeInOutQuint",
                    duration: 750
                  },
                  auto: {
                    play: false,
                    timeoutDuration: 500,
                    duration: 5000
                  }/*,
                  swipe: {
                    items: 1,
                    easing: "easeInOutQuint",
                    onTouch: true,
                    onMouse: false,
                    options: {
                      allowPageScroll: "vertical",
                      excludedElements:"button, input, select, textarea, .noSwipe"
                    },
                    duration: 750
                  }*/
                }/*,
                {
                  wrapper: {
                    classname: "caroufredsel_wrapper caroufredsel_wrapper_small_slider"
                  }
                }*/);
                $(".pr_preloader_ss_" + index + " li img").css("display", "block");
                $(".pr_preloader_ss_" + index + " li .icon").css("display", "block");
                $(".pr_preloader_ss_" + index).sliderControl({
                  type: "small",
                  appendTo: $(".slider_content_box"),
                  listContainer: $("#" + id + ".slider_posts_list_container.small"),
                  listItems: ($(".page").width()>462 ? 3 : 2)
                });
              }).each(function(){
                if(this.complete)
                  $(this).load();
              });
            });

            $(".slider").sliderControl({
              appendTo: $(".slider_content_box"),
              listContainer: $(".slider_posts_list_container"),
              listItems: ($(".page").width()>462 ? 4 : 2)
            });

            if($(".small_slider").length)
            {
              $(".small_slider").each(function(){
                if($(this).hasClass("pr_initialized"))
                {
                  $(this).sliderControl("destroy");
                  var id = "small_slider";
                  var elementClasses = $(this).attr('class').split(' ');
                  for(var i=0; i<elementClasses.length; i++)
                  {
                    if(elementClasses[i].indexOf('id-')!=-1)
                      id = elementClasses[i].replace('id-', '');
                  }
                  $(this).sliderControl({
                    type: "small",
                    appendTo: $(".slider_content_box"),
                    listContainer: $("#" + id + ".slider_posts_list_container.small"),
                    listItems: ($(".page").width()>462 ? 3 : 2)

                  });
                }
              });
            }
          });




      }
    });
  }
