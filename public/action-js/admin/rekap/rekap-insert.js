"use strict";
console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  $('#nav-menu li').removeClass();
  $('#nav-menu li#menu-laporan').addClass('active');

  loadkegiatan("program",0);

  $('#save_target').on('click', function(){
      var kode_program = $('#kode_program').val();
      var kode_kegiatan = $('#kode_kegiatan').val();
      var kode_subkegiatan = $('#kode_subkegiatan').val();
      var id_paket = $('#paket').val();
      var pagu_kegiatan = $('#pagu_kegiatan').val();



      var formData = new FormData();
      formData.append('param', 'data_target');
      formData.append('kode_program', kode_program);
      formData.append('kode_kegiatan', kode_kegiatan);
      formData.append('kode_subkegiatan', kode_subkegiatan);
      formData.append('id_paket', id_paket);
      formData.append('pagu_kegiatan', pagu_kegiatan);

      for (var i = 1; i <= 12; i++) {
        formData.append('k'+i, $('#k'+i).val());
        formData.append('f'+i, $('#f'+i).val());
      }

      save(formData);
  });

  $("#kode_program").chosen().change(function(){
    let nama = $('option:selected', this).attr('nama');
    $('#nama_program').val('');
    $('#nama_kegiatan').val('');
    $('#nama_subkegiatan').val('');

    $('#kode_kegiatan').html('<option value=""></option>').trigger("chosen:updated");
    $('#kode_subkegiatan').html('<option value=""></option>').trigger("chosen:updated");

    $('#nama_program').val(nama);


    loadkegiatan("kegiatan",this.value);
  });

  $("#kode_kegiatan").chosen().change(function(){
    let nama = $('option:selected', this).attr('nama');
    $('#nama_kegiatan').val('');
    $('#nama_subkegiatan').val('');

    $('#kode_subkegiatan').html('<option value=""></option>').trigger("chosen:updated");

    $('#nama_kegiatan').val(nama);
    loadkegiatan("subkegiatan",this.value);
  });

  $("#kode_subkegiatan").chosen().change(function(){
    let nama = $('option:selected', this).attr('nama');
    $('#nama_subkegiatan').val('');
    $('#nama_subkegiatan').val(nama);
    loadkegiatan("paket",this.value);
  });


});

function save(formData){

  $.ajax({
      type: 'post',
      processData: false,
      contentType: false,
      url: 'addTarget',
      data : formData,
      success: function(result){
        Swal.fire({
          type: 'success',
          title: 'Berhasil Tambah Target !',
          showConfirmButton: true,
          // showCancelButton: true,
          confirmButtonText: `Ok`,
        }).then((result) => {
          $(document).ready(function(){
              // loadprogram('');
              // $('#kode_program').val('');
              // $('#nama_program').val('');

          });
        })
      }
    });
  };

  function loadkegiatan(param, code){
      var formData = new FormData();
      formData.append('code', code);

    $.ajax({
        type: 'post',
        processData: false,
        contentType: false,
        url: 'load'+param,
        data : formData,
        success: function(result){

          let data = result.data;
          let el1   = '<option value=""></option>';
          let el2   = '<option value=""></option>';
          let el3   = '<option value=""></option>';
          let el4   = '<option value=""></option>';

          if(typeof data == 'object'){
            for (var i = 0; i < data.length; i++) {
              el1 += '<option nama="'+data[i].nama_program+'" value="'+data[i].kode_program+'">'+data[i].kode_program+'</option>';
              el2 += '<option nama="'+data[i].nama_kegiatan+'" value="'+data[i].kode_kegiatan+'">'+data[i].kode_kegiatan+'</option>';
              el3 += '<option nama="'+data[i].nama_subkegiatan+'" value="'+data[i].kode_subkegiatan+'">'+data[i].kode_subkegiatan+'</option>';
              el4 += '<option value="'+data[i].id+'">'+data[i].nama_paket+'</option>';
            }
          }

            if(param == 'program'){
              $('#kode_program').html(el1);
              $('#kode_program').trigger("chosen:updated");
            }else if(param == 'kegiatan'){
              $('#kode_kegiatan').html(el2);
              $('#kode_kegiatan').trigger("chosen:updated");
            }else if(param == 'subkegiatan'){
              $('#kode_subkegiatan').html(el3);
              $('#kode_subkegiatan').trigger("chosen:updated");
            }else if(param == 'paket'){
              $('#paket').html(el4);
              $('#paket').trigger("chosen:updated");
            }
          }
        })
      }
