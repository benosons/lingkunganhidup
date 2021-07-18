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
      url: 'loadBerita',
      data : {
              param      : param,
              id         : id,
      },
      success: function(result){
          let data = result.data;
          var content = '<div class="row">';
          $.each(data, function(key, value) {
            console.log(value);
            content += `<div class="post single">
                					<h1 class="post_title">
                						`+value.judul_berita+`
                					</h1>
                					<ul class="post_details clearfix">
                						<li class="detail category">Satuan <a href="/berita?params=satuan&ids=`+value.satuan_code+`" title="`+value.satuan_name+`">`+value.satuan_name.toUpperCase()+`</a></li>
                						<li class="detail date">`+value.create_date+`</li>
                						<li class="detail author">By <a href="index.html@page=author.html" title="Anna Shubina">Anna Shubina</a></li>
                						<li class="detail views">6 254 Views</li>
                						<li class="detail comments"><a href="index.html@page=post.html#comments_list" class="scroll_to_comments" title="6 Comments">6 Comments</a></li>
                					</ul>
                					<a href="`+window.baseURL+'/'+value.path+value.file_name+`" class="post_image page_margin_top prettyPhoto" title="Britons are never more comfortable than when talking about the weather.">
                						<img src='`+window.baseURL+'/'+value.path+value.file_name+`' alt='img' style="display:block;">
                					</a>
                					<div class="post_content page_margin_top_section clearfix">
                						<div class="">
                							`+value.isi_berita+`
                						</div>
                					</div>
                				</div>`;
          });

          content += '</div>';
          content += `<div class="row page_margin_top">
                				<div class="share_box clearfix">
                					<label>Share:</label>
                					<ul class="social_icons clearfix">
                						<li>
                							<a target="_blank" title="" href="http://facebook.com/QuanticaLabs" class="social_icon facebook">
                								&nbsp;
                							</a>
                						</li>
                						<li>
                							<a target="_blank" title="" href="https://twitter.com/QuanticaLabs" class="social_icon twitter">
                								&nbsp;
                							</a>
                						</li>
                						<li>
                							<a title="" href="mailto:contact@pressroom.com" class="social_icon mail">
                								&nbsp;
                							</a>
                						</li>
                						<li>
                							<a title="" href="index.html@page=post.html#" class="social_icon instagram">
                								&nbsp;
                							</a>
                						</li>
                					</ul>
                				</div>
                			</div>`;
          content += `<div class="row page_margin_top">
                				<ul class="taxonomies tags left clearfix">
                					<li>
                						<a href="index.html@page=post.html#" title="People">PEOPLE</a>
                					</li>
                					<li>
                						<a href="index.html@page=post.html#" title="Sport">SPORT</a>
                					</li>
                				</ul>
                				<ul class="taxonomies categories right clearfix">
                					<li>
                						<a href="index.html@page=category&amp;cat=health.html" title="HEALTH">HEALTH</a>
                					</li>
                				</ul>
                			</div>`;

            content += `<div class="row page_margin_top_section">
                  				<h4 class="box_header">Kirim komentar</h4>
                  				<p class="padding_top_30">Alamat email Anda tidak akan dipublikasikan. Bidang yang harus diisi ditandai dengan *</p>
                  				<form class="comment_form margin_top_15" id="comment_form" method="post" action="index.html@page=post.html">
                  					<fieldset class="column column_1_3">
                  						<input class="text_input" name="name" type="text" value="Your Name *" placeholder="Your Name *">
                  					</fieldset>
                  					<fieldset class="column column_1_3">
                  						<input class="text_input" name="email" type="text" value="Your Email *" placeholder="Your Email *">
                  					</fieldset>
                  					<fieldset class="column column_1_3">
                  						<input class="text_input" name="website" type="text" value="Website" placeholder="Website">
                  					</fieldset>
                  					<fieldset>
                  						<textarea name="message" placeholder="Comment *">Comment *</textarea>
                  					</fieldset>
                  					<fieldset>
                  						<input type="submit" value="POSTING KOMENTAR" class="more active">
                  						<a href="index.html@page=post.html#cancel" id="cancel_comment" title="Cancel reply">Cancel reply</a>
                  					</fieldset>
                  				</form>
                  			</div>`;
          content += `<div class="row page_margin_top_section">
                				<h4 class="box_header">6 Komentar</h4>
                				<ul id="comments_list">
                					<li class="comment clearfix" id="comment-1">
                						<div class="comment_author_avatar">
                							&nbsp;
                						</div>
                						<div class="comment_details">
                							<div class="posted_by clearfix">
                								<h5><a class="author" href="index.html@page=post.html#" title="Kevin Nomad">Kevin Nomad</a></h5>
                								<abbr title="22 July 2014" class="timeago">22 July 2014</abbr>
                							</div>
                							<p>
                								Donec ipsum diam, pretium mollis dapibus risus. Nullam tindun pulvinar at interdum eget, suscipit eget felis. Pellentesque est faucibus tincidunt risus id interdum primis orci cubilla gravida id interdum eget.
                							</p>
                							<a class="read_more" href="index.html@page=post.html#comment_form" title="Reply">
                								<span class="arrow"></span><span>REPLY</span>
                							</a>
                						</div>
                					</li>
                					<li class="comment clearfix" id="comment-2">
                						<div class="comment_author_avatar">
                							&nbsp;
                						</div>
                						<div class="comment_details">
                							<div class="posted_by clearfix">
                								<h5><a class="author" href="index.html@page=post.html#" title="Kevin Nomad">Kevin Nomad</a></h5>
                								<abbr title="22 July 2014" class="timeago">22 July 2014</abbr>
                							</div>
                							<p>
                								Donec ipsum diam, pretium mollis dapibus risus. Nullam tindun pulvinar at interdum eget, suscipit eget felis. Pellentesque est faucibus tincidunt risus id interdum primis orci cubilla gravida id interdum eget.
                							</p>
                							<a class="read_more" href="index.html@page=post.html#comment_form" title="Reply">
                								<span class="arrow"></span><span>REPLY</span>
                							</a>
                						</div>
                						<ul class="children">
                							<li class="comment clearfix">
                								<a href="index.html@page=post.html#comment-2" class="parent_arrow"></a>
                								<div class="comment_author_avatar">
                									&nbsp;
                								</div>
                								<div class="comment_details">
                									<div class="posted_by clearfix">
                										<h5><a class="author" href="index.html@page=post.html#" title="Keith Douglas">Keith Douglas</a><a href="index.html@page=post.html#comment-2" class="in_reply">@Kevin Nomad</a></h5>
                										<abbr title="22 July 2014" class="timeago">22 July 2014</abbr>
                									</div>
                									<p>
                										Donec ipsum diam, pretium mollis dapibus risus. Nullam tindun pulvinar at interdum eget, suscipit eget felis. Pellentesque est faucibus tincidunt risus id interdum primis orci cubilla gravida id interdum eget.
                									</p>
                									<a class="read_more" href="index.html@page=post.html#comment_form" title="Reply">
                										<span class="arrow"></span><span>REPLY</span>
                									</a>
                								</div>
                							</li>
                							<li class="comment clearfix">
                								<a href="index.html@page=post.html#comment-2" class="parent_arrow"></a>
                								<div class="comment_author_avatar">
                									&nbsp;
                								</div>
                								<div class="comment_details">
                									<div class="posted_by clearfix">
                										<h5><a class="author" href="index.html@page=post.html#" title="Keith Douglas">Keith Douglas</a><a href="index.html@page=post.html#comment-2" class="in_reply">@Kevin Nomad</a></h5>
                										<abbr title="22 July 2014" class="timeago">22 July 2014</abbr>
                									</div>
                									<p>
                										Donec ipsum diam, pretium mollis dapibus risus. Nullam tindun pulvinar at interdum eget, suscipit eget felis. Pellentesque est faucibus tincidunt risus id interdum primis orci cubilla gravida id interdum eget.
                									</p>
                									<a class="read_more" href="index.html@page=post.html#comment_form" title="Reply">
                										<span class="arrow"></span><span>REPLY</span>
                									</a>
                								</div>
                							</li>
                						</ul>
                					</li>
                				</ul>
                				<ul class="pagination page_margin_top_section">
                					<li class="left">
                						<a href="index.html@page=post.html#" title="">&nbsp;</a>
                					</li>
                					<li class="selected">
                						<a href="index.html@page=post.html#" title="">
                							1
                						</a>
                					</li>
                					<li>
                						<a href="index.html@page=post.html#" title="">
                							2
                						</a>
                					</li>
                					<li>
                						<a href="index.html@page=post.html#" title="">
                							3
                						</a>
                					</li>
                					<li class="right">
                						<a href="index.html@page=post.html#" title="">&nbsp;</a>
                					</li>
                				</ul>
                			</div>`;

          $('#post-berita').append(content);
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
