console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  window.baseURL = $('#baseURL').val();
  $('ul.sf-menu > li.selected').removeClass('selected');

  loadkota('kecamatan');

  $('#input-kecamatan').on('change', function(){
    if(this.value != 0){
      loadkota('desa', this.value);
    }else{
      $('#input-desa').val(0);
      $('#input-desa').prop('disabled', true);
    }
  });

  $('#submit-lapor').on('click', function(){
    var formData = new FormData();
    formData.append('param', 'lapor');
    formData.append('input-name', $('#input-name').val());
    formData.append('input-notelp', $('#input-notelp').val());
    formData.append('input-kecamatan', $('#input-kecamatan').val());
    formData.append('input-desa', $('#input-desa').val());
    formData.append('input-alamat', $('#input-alamat').val());
    // Attach file
    for (var i = 0; i < $('input[type=file]')[0].files.length; i++) {
      formData.append('lampiran[]', $('input[type=file]')[0].files[i]);
    }

    savelapor(formData);
  });
});

function loadkota(param, id){

  $.ajax({
      type: 'post',
      dataType: 'json',
      url: 'loadkota',
      data : {
              param      : param,
              id         : id,
      },
      success: function(result){
          let data = result.data;
          $('#input-desa').prop('disabled', true);
          let content = '<option value="0">- Pilih -</option>';
          if(param == 'kecamatan'){
            for (var i = 0; i < data.length; i++) {
              content += '<option value="'+data[i].id+'">'+data[i].name+'</option>'
            }
            $('#input-kecamatan').html(content);
          }else if(param == 'desa'){
            for (var i = 0; i < data.length; i++) {
              content += '<option value="'+data[i].id+'">'+data[i].name+'</option>'
            }
            $('#input-desa').html(content);
            $('#input-desa').prop('disabled', false);
          }

      }
    });
  }

  function savelapor(formData){

    $.ajax({
        type: 'post',
        processData: false,
        contentType: false,
        url: 'saveLapor',
        data : formData,
        success: function(result){
          Swal.fire({
            type: 'success',
            title: 'Laporan Kerumuman Anda Berhasil dikirm !',
            showConfirmButton: true,
            // showCancelButton: true,
            confirmButtonText: `Ok`,
          }).then((result) => {
              window.location.href = '/home';
          });
        }
      });
    }
