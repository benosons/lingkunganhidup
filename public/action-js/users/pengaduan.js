console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  $('ul.sf-menu > li.selected').removeClass('selected');
  $('#menu-pengaduan').addClass('selected');
  $('#tujuan-laporan').width($('input.form-control').width()+'px');

  $('#kirim-pengaduan').on('click', function(){
    Swal.fire(
        'Berhasil',
        'Pengaduan telah Terkirim !',
        'success'
      )
  });
});

function kirimpengaduan(){
$.ajax({
    type: 'post',
    dataType: 'json',
    url: 'saveAduan',
    data : {
            name        : name,
            email       : email,
            subject     : subject,
            message     : message,
            telepon     : telepon,
            email       : email,
            lampiran    : upload
     },
    success: function(result){
        Swal.fire({
          title: 'Sukses!',
          text: "Berhasil Kirim Pengaduan",
          icon: 'success',
          showConfirmButton: true,
          confirmButtonText: '<i class="fas fa-check"></i>'
        }).then((result) => {
        if (result.isConfirmed) {
          location.reload();
          }
        });
    }
  });

}
