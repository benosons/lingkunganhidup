"use strict";
console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  const ids = $('#ids').val();
  $('#nav-menu li').removeClass();
  $('#nav-menu li#menu-rencana').addClass('active');

  // loadkegiatan("program",0);
  loadtarget(ids);

});

function loadtarget(param){

  $.ajax({
      type: 'post',
      dataType: 'json',
      url: 'loadtarget',
      data : {
              code      : param,
      },
      success: function(result){
          let data = result.data;
          // $('#kode_program').html('<option value="'+data[0].kode_program+'">'+data[0].kode_program+'</option>').trigger("chosen:updated");
          $('#kode_program').val(data[0].kode_program);
          $('#nama_program').val(data[0].nama_program);

          // $('#kode_kegiatan').html('<option value="'+data[0].kode_kegiatan+'">'+data[0].kode_kegiatan+'</option>').trigger("chosen:updated");
          $('#kode_kegiatan').val(data[0].kode_kegiatan);
          $('#nama_kegiatan').val(data[0].nama_kegiatan);

          // $('#kode_subkegiatan').html('<option value="'+data[0].kode_subkegiatan+'">'+data[0].kode_subkegiatan+'</option>').trigger("chosen:updated");
          $('#kode_subkegiatan').val(data[0].kode_subkegiatan);
          $('#nama_subkegiatan').val(data[0].nama_subkegiatan);
          $('#ppk').val(data[0].nama_ppk);
          $('#bidang').val(data[0].bidang);
          $('#seksi').val(data[0].seksi);

          // $('#paket').html('<option value="'+data[0].id_paket+'">'+data[0].nama_paket+'</option>').trigger("chosen:updated");
          $('#paket').val(data[0].nama_paket);
          $('#pagu_kegiatan').val(data[0].pagu);


          for (var i = 0; i < data.length; i++) {
            if(data[i].type == 'keuangan'){
              $('#k1').val(data[i].n1);
              $('#k2').val(data[i].n2);
              $('#k3').val(data[i].n3);
              $('#k4').val(data[i].n4);
              $('#k5').val(data[i].n5);
              $('#k6').val(data[i].n6);
              $('#k7').val(data[i].n7);
              $('#k8').val(data[i].n8);
              $('#k9').val(data[i].n9);
              $('#k10').val(data[i].n10);
              $('#k11').val(data[i].n11);
              $('#k12').val(data[i].n12);
              $('#ktot').val(data[i].tot)
            }else if(data[i].type == 'fisik'){
              $('#f1').val(data[i].n1);
              $('#f2').val(data[i].n2);
              $('#f3').val(data[i].n3);
              $('#f4').val(data[i].n4);
              $('#f5').val(data[i].n5);
              $('#f6').val(data[i].n6);
              $('#f7').val(data[i].n7);
              $('#f8').val(data[i].n8);
              $('#f9').val(data[i].n9);
              $('#f10').val(data[i].n10);
              $('#f11').val(data[i].n11);
              $('#f12').val(data[i].n12);
              $('#ftot').val(data[i].tot)
            }
          }
        }
      })
    }

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
                loadkegiatan("kegiatan", code);
              }else if(param == 'kegiatan'){
                $('#kode_kegiatan').html(el2);
                $('#kode_kegiatan').trigger("chosen:updated");
                loadkegiatan("subkegiatan",code);
              }else if(param == 'subkegiatan'){
                $('#kode_subkegiatan').html(el3);
                $('#kode_subkegiatan').trigger("chosen:updated");
                loadkegiatan("paket",code);
              }else if(param == 'paket'){
                $('#paket').html(el4);
                $('#paket').trigger("chosen:updated");
                loadtarget(ids.value);
              }
            }
          })
        }
