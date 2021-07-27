console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
	AOS.init();
  $('ul.sf-menu > li.selected').removeClass('selected');
  $('#menu-home').addClass('selected');
  loadberitaAll('','');
  loadkegiatanAll('','');
  loadberita('','');

});


function loadberitaAll(param, id){

  $.ajax({
      type: 'post',
      dataType: 'json',
      url: 'loadBerita',
      data : {
              param      : param,
              id         : id,
      },
      success: function(result){
          let data = result.data;

          var content = '';

          $.each(data, function(key, value) {
            let id_satuan;
            for (var i = 0; i < value.length; i += 2) {
                // console.log(value);
                var sliceIt = value.slice(i, 2);
                if(sliceIt.length == 2){
                  content += `<ul class="blog column column_1_2">`;
                  content += `<li class="post">
                  							<a href="/berita?params=post&ids=`+sliceIt[0]['id_parent']+`" title="Nuclear Fusion Closer to Becoming a Reality">
                  								<img src='`+$('#baseURL').val()+'/'+sliceIt[0]['path']+sliceIt[0]['file_name']+`' alt='img'>
                  							</a>
                  							<h2 class="with_number">
                  								<a href="/berita?params=post&ids=`+sliceIt[0]['id_parent']+`" title="Nuclear Fusion Closer to Becoming a Reality">`+sliceIt[0]['judul_berita']+`</a>
                  								<a class="comments_number" href="index.html@page=post.html#comments_list" title="2 comments">2<span class="arrow_comments"></span></a>
                  							</h2>
                  							<ul class="post_details">
                  								<li class="category"><a href="/berita?params=satuan&ids=`+sliceIt[0]['satuan']+`" title="`+key.toUpperCase()+`">`+key.toUpperCase()+`</a></li>
                  								<li class="date">
                  									`+sliceIt[0]['create_date']+`
                  								</li>
                  							</ul>
                  							<a class="read_more" href="/berita?params=post&ids=`+sliceIt[0]['id_parent']+`" title="Read more"><span class="arrow"></span><span>READ MORE</span></a>
                  						</li>`;
                  content += `<li class="post">
                  							<a href="/berita?params=post&ids=`+sliceIt[1]['id_parent']+`" title="Nuclear Fusion Closer to Becoming a Reality">
                  								<img src='`+$('#baseURL').val()+'/'+sliceIt[1]['path']+sliceIt[1]['file_name']+`' alt='img'>
                  							</a>
                  							<h2 class="with_number">
                  								<a href="/berita?params=post&ids=`+sliceIt[1]['id_parent']+`" title="Nuclear Fusion Closer to Becoming a Reality">`+sliceIt[1]['judul_berita']+`</a>
                  								<a class="comments_number" href="index.html@page=post.html#comments_list" title="2 comments">2<span class="arrow_comments"></span></a>
                  							</h2>
                  							<ul class="post_details">
                  								<li class="category"><a href="/berita?params=satuan&ids=`+sliceIt[0]['satuan']+`" title="`+key.toUpperCase()+`">`+key.toUpperCase()+`</a></li>
                  								<li class="date">
                  									`+sliceIt[1]['create_date']+`
                  								</li>
                  							</ul>
                  							<a class="read_more" href="/berita?params=post&ids=`+sliceIt[1]['id_parent']+`" title="Read more"><span class="arrow"></span><span>READ MORE</span></a>
                  						</li>`;
                  content += '</ul>';

                }
                // newArr.push(sliceIt);
            }
            // for (var i = 0;(i < 3 && i < value.length); i++) {
            //   id_satuan = value[i].satuan;
            //   content += `<li class="slide">
          	// 		<img src='`+$('#baseURL').val()+'/'+value[i].path+value[i].file_name+`' alt='img'>
          	// 		<div class="slider_content_box">
          	// 			<ul class="post_details simple">
          	// 				<li class="category"><a href="index.html@page=category&amp;cat=health.html" title="`+key.toUpperCase()+`">`+key.toUpperCase()+`</a></li>
          	// 				<li class="date">
          	// 					`+value[i].create_date+`
          	// 				</li>
          	// 			</ul>
          	// 			<h2><a href="/berita?params=post&ids=`+value[i].id_parent+`" title="High Altitudes May Aid Weight Control">`+value[i].judul_berita+`</a></h2>
          	// 			<p class="clearfix">`+value[i].isi_berita+`.</p>
          	// 		</div>
          	// 	</li>`;
            // }

          });

          $('#berita-terbaru').html(content);
          let child = $('#berita-terbaru').children();
          for (var i = 0; i < child.length; i++) {

            if (i > 1){
              $(child[i]).remove();
             }

          }


      }
    });
  }

function loadberita(param, id){

  $.ajax({
      type: 'post',
      dataType: 'json',
      url: 'loadBeritaHeadline',
      data : {
              param      : param,
              id         : id,
      },
      success: function(result){
          let data = result.data;

          var content = '';
          $.each(data, function(key, value) {
            let id_satuan;
            content += ``;
            for (var i = 0;(i < 3 && i < value.length); i++) {
              id_satuan = value[i].satuan;
              content += `<li class="slide">
          			<img src='`+$('#baseURL').val()+'/'+value[i].path+value[i].file_name+`' alt='img'>
          			<div class="slider_content_box">
          				<ul class="post_details simple">
          					<li class="category"><a href="index.html@page=category&amp;cat=health.html" title="`+key.toUpperCase()+`">`+key.toUpperCase()+`</a></li>
          					<li class="date">
          						`+value[i].create_date+`
          					</li>
          				</ul>
          				<h2><a href="/berita?params=post&ids=`+value[i].id_parent+`" title="High Altitudes May Aid Weight Control">`+value[i].judul_berita+`</a></h2>
          				<p class="clearfix">`+value[i].isi_berita+`.</p>
          			</div>
          		</li>`;
            }

          });

          $('.slider').html(content);

          //slider
        	$(".slider").carouFredSel({
        		responsive: false,
        		//align: "left",
        		width: "100%",
        		items: {
        			start: -1,
        			visible: 3,
        			minimum: 3
        		},
        		scroll: {
        			items: 1,
        			easing: "easeInOutQuint",
        			duration: 750
        		},
        		/*prev: {
        			onAfter: onAfterSlide,
        			onBefore: onBeforeSlide,
        			easing: "easeInOutQuint",
        			duration: 750
        		},
        		next: {
        			onAfter: onAfterSlide,
        			onBefore: onBeforeSlide,
        			easing: "easeInOutQuint",
        			duration: 750
        		},*/
        		auto: {
        			play: false,
        			timeoutDuration: 500,
        			duration: 5000/*,
        			onAfter: onAfterSlide,
        			onBefore: onBeforeSlide,
        			easing: "easeInOutQuint",
        			duration: 750*/
        		}
        	},
        	{
        		transition: true/*,
        		wrapper: {
        			classname: "caroufredsel_wrapper caroufredsel_wrapper_slider"
        		}*/
        	});
        	$(".slider").sliderControl({
        		appendTo: $(".slider_content_box"),
        		listContainer: $(".slider_posts_list_container"),
        		listItems: ($(".page").width()>462 ? 4 : 2)
        	});


      }
    });
  }

function loadkegiatanAll(param, id){

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

            var content = '';

            $.each(data, function(key, value) {
              let id_satuan;
              for (var i = 0; i < value.length; i += 2) {
                  console.log(value);
                  var sliceIt = value.slice(i, 2);
                  if(sliceIt.length == 2){
                    content += `<ul class="blog column column_1_2">`;
                    content += `<li class="post">
                    							<a href="/kegiatan?params=post&ids=`+sliceIt[0]['id_parent']+`" title="Nuclear Fusion Closer to Becoming a Reality">
                    								<span class="icon gallery" style="display: block;"></span>
                                    <img src='`+$('#baseURL').val()+'/'+sliceIt[0]['path']+sliceIt[0]['file_name']+`' alt='img'>
                    							</a>
                    							<h2 class="with_number">
                    								<a href="/kegiatan?params=post&ids=`+sliceIt[0]['id_parent']+`" title="Nuclear Fusion Closer to Becoming a Reality">`+sliceIt[0]['judul_kegiatan']+`</a>
                    								<a class="comments_number" href="index.html@page=post.html#comments_list" title="2 comments">2<span class="arrow_comments"></span></a>
                    							</h2>
                    							<ul class="post_details">
                    								<li class="category"><a href="/kegiatan?params=satuan&ids=`+sliceIt[0]['satuan']+`" title="`+key.toUpperCase()+`">`+key.toUpperCase()+`</a></li>
                    								<li class="date">
                    									`+sliceIt[0]['create_date']+`
                    								</li>
                    							</ul>
                    							<a class="read_more" href="/kegiatan?params=post&ids=`+sliceIt[0]['id_parent']+`" title="Read more"><span class="arrow"></span><span>READ MORE</span></a>
                    						</li>`;
                    content += `<li class="post">
                    							<a href="/kegiatan?params=post&ids=`+sliceIt[1]['id_parent']+`" title="Nuclear Fusion Closer to Becoming a Reality">
                    								<span class="icon gallery" style="display: block;"></span>
                                    <img src='`+$('#baseURL').val()+'/'+sliceIt[1]['path']+sliceIt[1]['file_name']+`' alt='img'>
                    							</a>
                    							<h2 class="with_number">
                    								<a href="/kegiatan?params=post&ids=`+sliceIt[1]['id_parent']+`" title="Nuclear Fusion Closer to Becoming a Reality">`+sliceIt[1]['judul_kegiatan']+`</a>
                    								<a class="comments_number" href="index.html@page=post.html#comments_list" title="2 comments">2<span class="arrow_comments"></span></a>
                    							</h2>
                    							<ul class="post_details">
                    								<li class="category"><a href="/kegiatan?params=satuan&ids=`+sliceIt[0]['satuan']+`" title="`+key.toUpperCase()+`">`+key.toUpperCase()+`</a></li>
                    								<li class="date">
                    									`+sliceIt[1]['create_date']+`
                    								</li>
                    							</ul>
                    							<a class="read_more" href="/kegiatan?params=post&ids=`+sliceIt[1]['id_parent']+`" title="Read more"><span class="arrow"></span><span>READ MORE</span></a>
                    						</li>`;
                    content += '</ul>';

                  }
              }

            });

            $('#kegiatan-terbaru').html(content);
            let child = $('#kegiatan-terbaru').children();
            for (var i = 0; i < child.length; i++) {

              if (i > 1){
                $(child[i]).remove();
               }

            }


        }
      });
    }
