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
            let id_satuan;
            if(value.length != 0){
              content += `<div class="column column_1_3">
                  				<h4 class="box_header page_margin_top_section">`+key.toUpperCase()+`</h4>
                  				<ul class="blog small clearfix">`;
              for (var i = 0;(i < 3 && i < value.length); i++) {

                id_satuan = value[i].satuan;
                content += `<li class="post">
                						<a href="#" title="">
                							<img style="width:100px;" src="`+window.baseURL+'/'+value[i].path+value[i].file_name+`" alt="img">
                						</a>
                						<div class="post_content">
                							<h5>
                              <a href="/berita?params=post&ids=`+value[i].id_parent+`" title="`+value[i].judul_berita+`">`+value[i].judul_berita+`</a>
                							</h5>
                							<ul class="post_details simple">
                								<li class="category"><a href="#" title="`+key.toUpperCase()+`">`+key.toUpperCase()+`</a></li>
                								<li class="date">
                									10:11 PM, Feb 02
                								</li>
                							</ul>
                						</div>
                					</li>`;
              }
              content += `</ul>
                    				<a class="more page_margin_top" href="/berita?params=satuan&ids=`+id_satuan+`">MORE `+key.toUpperCase()+`</a>
                    			</div>`;
            }
          });

          $('#page-berita').append(content);
      }
    });
  }
