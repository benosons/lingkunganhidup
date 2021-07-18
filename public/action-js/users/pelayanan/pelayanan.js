console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  window.baseURL = $('#baseUrl').val();
  $('ul.sf-menu > li.selected').removeClass('selected');
  $('#menu-pelayanan').addClass('selected');
  loadKonten('post', 10);
});

function loadKonten(param, id){
  $.ajax({
      type: 'post',
      dataType: 'json',
      url: 'loadKonten',
      data : {
              param      : param,
              id         : id,
      },
      success: function(result){
          let data = result.data;
          console.log(data[0].konten);
          // $('#konten-pelayanan').empty();
          // $('#konten-pelayanan').html($(data[0].konten));
          // $('#banner-pelayanan').attr('src',window.baseURL+'/'+data[0].lampiran[0].path+data[0].lampiran[0].file_name);
        }
      });
}
