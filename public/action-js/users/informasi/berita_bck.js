console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  window.baseURL = $('#baseUrl').val();
  $('ul.sf-menu > li.selected').removeClass('selected');
  $('#menu-informasi').addClass('selected');
  loadberita('','');
});

function loadberita(param, id){

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
            content += `<div id="`+key+`">
                          <h4 class="box_header">`+key.toUpperCase()+`</h4>
                          <div class="row">`;
            for (var i = 0; i < value.length; i++) {

              content += `<ul class="blog column column_1_3">
                    				<li class="post">
                    					<a href="index.html@page=post.html" title="Built on Brotherhood, Club Lives Up to Name">
                    						<img style="display: block;" src='`+window.baseURL+'/'+value[i].path+value[i].file_name+`' alt='img'>
                    					</a>
                    					<div class="post_content">
                    						<h2 class="with_number">
                    							<a href="index.html@page=post.html" title="`+value[i].judul_berita+`">`+value[i].judul_berita+`</a>
                    							<a class="comments_number" href="index.html@page=post.html#comments_list" title="2 comments">2<span class="arrow_comments"></span></a>
                    						</h2>
                    						<ul class="post_details">
                    							<li class="category"><a href="index.html@page=category&amp;cat=world.html" title="WORLD">LANTAS</a></li>
                    							<li class="date">
                    								10:11 PM, Feb 02
                    							</li>
                    						</ul>
                    						`+value[i].isi_berita+`
                    						<a class="read_more" href="index.html@page=post.html" title="Read more"><span class="arrow"></span><span>READ MORE</span></a>
                    					</div>
                    				</li>
                    			</ul>`;
            }
            content += `</div>
                        <div class="row">
                    			<ul class="pagination clearfix page_margin_top_section">
                    				<li class="left">
                    					<a id="btn_prev" href="javascript:prevPage()" title="">&nbsp;</a>
                    				</li>
                    				<li class="selected">
                    					<a href="index.html@page=blog_3_columns.html#" title="">
                    						1
                    					</a>
                    				</li>
                    				<li>
                    					<a href="index.html@page=blog_3_columns.html#" title="">
                    						2
                    					</a>
                    				</li>
                    				<li>
                    					<a href="index.html@page=blog_3_columns.html#" title="">
                    						3
                    					</a>
                    				</li>
                    				<li class="right">
                    					<a id="btn_next" href="javascript:nextPage()" title="">&nbsp;</a>
                    				</li>
                    			</ul>
                    		</div>
                      </div>`;
          });

          $('#page-berita').append(content);
      }
    });
  }
