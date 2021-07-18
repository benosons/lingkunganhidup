"use strict";
console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  const ids = $('#ids').val();
  window.roles = $('#role').val();
  $('#nav-menu li').removeClass();
  $('#nav-menu li#menu-rekap').addClass('active');

  // loadkegiatan("program",0);
  loadtarget(ids);

  $("#pilih_bulan").chosen().change(function(){
    let nama = $('option:selected', this).text();
    $('[name="isibulan"]').html(nama);
    loadbulan(this.value);
  });

});

function saveminggu(ke){

  var formData = new FormData();
  formData.append('kode_bulan', $('#pilih_bulan').val());
  formData.append('id_paket', $('#id_paket').val());
  formData.append('m'+ke, $('#progres_mingu_'+ke).val());
  formData.append('total_progres', $('#total_progres').val());
  if($('#edit_'+ke).is(":checked")){
    formData.append('edited', 1);
    formData.append('idnya', $('#edit_'+ke).attr("idnya"));
  }
  $.ajax({
      type: 'post',
      processData: false,
      contentType: false,
      url: 'addRealisasi',
      data : formData,
      success: function(result){
        Swal.fire({
          type: 'success',
          title: 'Berhasil Tambah Realisasi Minggu Ke #'+ke+' !',
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
}

    function loadtarget(param){

  $.ajax({
      type: 'post',
      dataType: 'json',
      url: 'loadtargetNip',
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

        $('#bidang').val(data[0].bidang);
        $('#seksi').val(data[0].seksi);

        // $('#paket').html('<option value="'+data[0].id_paket+'">'+data[0].nama_paket+'</option>').trigger("chosen:updated");
        $('#paket').val(data[0].nama_paket);
        $('#pagu_kegiatan').val(data[0].pagu);

        $('#nip').val(data[0].nip);
        $('#ppk').val(data[0].user_fullname);

        for (var i = 0; i < data.length; i++) {
          if(data[i].type == 'keuangan'){
            $('#k1').html(data[i].n1);
            $('#k2').html(data[i].n2);
            $('#k3').html(data[i].n3);
            $('#k4').html(data[i].n4);
            $('#k5').html(data[i].n5);
            $('#k6').html(data[i].n6);
            $('#k7').html(data[i].n7);
            $('#k8').html(data[i].n8);
            $('#k9').html(data[i].n9);
            $('#k10').html(data[i].n10);
            $('#k11').html(data[i].n11);
            $('#k12').html(data[i].n12);

            $('#kr1').html(rubah(data[i].progres.n1.tot));
            $('#kr2').html(rubah(data[i].progres.n2.tot));
            $('#kr3').html(rubah(data[i].progres.n3.tot));
            $('#kr4').html(rubah(data[i].progres.n4.tot));
            $('#kr5').html(rubah(data[i].progres.n5.tot));
            $('#kr6').html(rubah(data[i].progres.n6.tot));
            $('#kr7').html(rubah(data[i].progres.n7.tot));
            $('#kr8').html(rubah(data[i].progres.n8.tot));
            $('#kr9').html(rubah(data[i].progres.n9.tot));
            $('#kr10').html(rubah(data[i].progres.n10.tot));
            $('#kr11').html(rubah(data[i].progres.n11.tot));
            $('#kr12').html(rubah(data[i].progres.n12.tot));

            $('#k_koor_1').html(data[i].progres.n1.koordinat);
            $('#k_koor_2').html(data[i].progres.n2.koordinat);
            $('#k_koor_3').html(data[i].progres.n3.koordinat);
            $('#k_koor_4').html(data[i].progres.n4.koordinat);
            $('#k_koor_5').html(data[i].progres.n5.koordinat);
            $('#k_koor_6').html(data[i].progres.n6.koordinat);
            $('#k_koor_7').html(data[i].progres.n7.koordinat);
            $('#k_koor_8').html(data[i].progres.n8.koordinat);
            $('#k_koor_9').html(data[i].progres.n9.koordinat);
            $('#k_koor_10').html(data[i].progres.n10.koordinat);
            $('#k_koor_11').html(data[i].progres.n11.koordinat);
            $('#k_koor_12').html(data[i].progres.n12.koordinat);

            $('#k_latar_1').html(data[i].progres.n1.latar_belakang);
            $('#k_latar_2').html(data[i].progres.n2.latar_belakang);
            $('#k_latar_3').html(data[i].progres.n3.latar_belakang);
            $('#k_latar_4').html(data[i].progres.n4.latar_belakang);
            $('#k_latar_5').html(data[i].progres.n5.latar_belakang);
            $('#k_latar_6').html(data[i].progres.n6.latar_belakang);
            $('#k_latar_7').html(data[i].progres.n7.latar_belakang);
            $('#k_latar_8').html(data[i].progres.n8.latar_belakang);
            $('#k_latar_9').html(data[i].progres.n9.latar_belakang);
            $('#k_latar_10').html(data[i].progres.n10.latar_belakang);
            $('#k_latar_11').html(data[i].progres.n11.latar_belakang);
            $('#k_latar_12').html(data[i].progres.n12.latar_belakang);

            $('#k_uraian_1').html(data[i].progres.n1.uraian);
            $('#k_uraian_2').html(data[i].progres.n2.uraian);
            $('#k_uraian_3').html(data[i].progres.n3.uraian);
            $('#k_uraian_4').html(data[i].progres.n4.uraian);
            $('#k_uraian_5').html(data[i].progres.n5.uraian);
            $('#k_uraian_6').html(data[i].progres.n6.uraian);
            $('#k_uraian_7').html(data[i].progres.n7.uraian);
            $('#k_uraian_8').html(data[i].progres.n8.uraian);
            $('#k_uraian_9').html(data[i].progres.n9.uraian);
            $('#k_uraian_10').html(data[i].progres.n10.uraian);
            $('#k_uraian_11').html(data[i].progres.n11.uraian);
            $('#k_uraian_12').html(data[i].progres.n12.uraian);

            $('#k_masalah_1').html(data[i].progres.n1.permasalahan);
            $('#k_masalah_2').html(data[i].progres.n2.permasalahan);
            $('#k_masalah_3').html(data[i].progres.n3.permasalahan);
            $('#k_masalah_4').html(data[i].progres.n4.permasalahan);
            $('#k_masalah_5').html(data[i].progres.n5.permasalahan);
            $('#k_masalah_6').html(data[i].progres.n6.permasalahan);
            $('#k_masalah_7').html(data[i].progres.n7.permasalahan);
            $('#k_masalah_8').html(data[i].progres.n8.permasalahan);
            $('#k_masalah_9').html(data[i].progres.n9.permasalahan);
            $('#k_masalah_10').html(data[i].progres.n10.permasalahan);
            $('#k_masalah_11').html(data[i].progres.n11.permasalahan);
            $('#k_masalah_12').html(data[i].progres.n12.permasalahan);

          }else if(data[i].type == 'fisik'){

            $('#f1').html(data[i].n1);
            $('#f2').html(data[i].n2);
            $('#f3').html(data[i].n3);
            $('#f4').html(data[i].n4);
            $('#f5').html(data[i].n5);
            $('#f6').html(data[i].n6);
            $('#f7').html(data[i].n7);
            $('#f8').html(data[i].n8);
            $('#f9').html(data[i].n9);
            $('#f10').html(data[i].n10);
            $('#f11').html(data[i].n11);
            $('#f12').html(data[i].n12);

            $('#fr1').html(data[i].progres.n1.tot);
            $('#fr2').html(data[i].progres.n2.tot);
            $('#fr3').html(data[i].progres.n3.tot);
            $('#fr4').html(data[i].progres.n4.tot);
            $('#fr5').html(data[i].progres.n5.tot);
            $('#fr6').html(data[i].progres.n6.tot);
            $('#fr7').html(data[i].progres.n7.tot);
            $('#fr8').html(data[i].progres.n8.tot);
            $('#fr9').html(data[i].progres.n9.tot);
            $('#fr10').html(data[i].progres.n10.tot);
            $('#fr11').html(data[i].progres.n11.tot);
            $('#fr12').html(data[i].progres.n12.tot);

            $('#f_koor_1').html(data[i].progres.n1.koordinat);
            $('#f_koor_2').html(data[i].progres.n2.koordinat);
            $('#f_koor_3').html(data[i].progres.n3.koordinat);
            $('#f_koor_4').html(data[i].progres.n4.koordinat);
            $('#f_koor_5').html(data[i].progres.n5.koordinat);
            $('#f_koor_6').html(data[i].progres.n6.koordinat);
            $('#f_koor_7').html(data[i].progres.n7.koordinat);
            $('#f_koor_8').html(data[i].progres.n8.koordinat);
            $('#f_koor_9').html(data[i].progres.n9.koordinat);
            $('#f_koor_10').html(data[i].progres.n10.koordinat);
            $('#f_koor_11').html(data[i].progres.n11.koordinat);
            $('#f_koor_12').html(data[i].progres.n12.koordinat);

            $('#f_latar_1').html(data[i].progres.n1.latar_belakang);
            $('#f_latar_2').html(data[i].progres.n2.latar_belakang);
            $('#f_latar_3').html(data[i].progres.n3.latar_belakang);
            $('#f_latar_4').html(data[i].progres.n4.latar_belakang);
            $('#f_latar_5').html(data[i].progres.n5.latar_belakang);
            $('#f_latar_6').html(data[i].progres.n6.latar_belakang);
            $('#f_latar_7').html(data[i].progres.n7.latar_belakang);
            $('#f_latar_8').html(data[i].progres.n8.latar_belakang);
            $('#f_latar_9').html(data[i].progres.n9.latar_belakang);
            $('#f_latar_10').html(data[i].progres.n10.latar_belakang);
            $('#f_latar_11').html(data[i].progres.n11.latar_belakang);
            $('#f_latar_12').html(data[i].progres.n12.latar_belakang);

            $('#f_uraian_1').html(data[i].progres.n1.uraian);
            $('#f_uraian_2').html(data[i].progres.n2.uraian);
            $('#f_uraian_3').html(data[i].progres.n3.uraian);
            $('#f_uraian_4').html(data[i].progres.n4.uraian);
            $('#f_uraian_5').html(data[i].progres.n5.uraian);
            $('#f_uraian_6').html(data[i].progres.n6.uraian);
            $('#f_uraian_7').html(data[i].progres.n7.uraian);
            $('#f_uraian_8').html(data[i].progres.n8.uraian);
            $('#f_uraian_9').html(data[i].progres.n9.uraian);
            $('#f_uraian_10').html(data[i].progres.n10.uraian);
            $('#f_uraian_11').html(data[i].progres.n11.uraian);
            $('#f_uraian_12').html(data[i].progres.n12.uraian);

            $('#f_masalah_1').html(data[i].progres.n1.permasalahan);
            $('#f_masalah_2').html(data[i].progres.n2.permasalahan);
            $('#f_masalah_3').html(data[i].progres.n3.permasalahan);
            $('#f_masalah_4').html(data[i].progres.n4.permasalahan);
            $('#f_masalah_5').html(data[i].progres.n5.permasalahan);
            $('#f_masalah_6').html(data[i].progres.n6.permasalahan);
            $('#f_masalah_7').html(data[i].progres.n7.permasalahan);
            $('#f_masalah_8').html(data[i].progres.n8.permasalahan);
            $('#f_masalah_9').html(data[i].progres.n9.permasalahan);
            $('#f_masalah_10').html(data[i].progres.n10.permasalahan);
            $('#f_masalah_11').html(data[i].progres.n11.permasalahan);
            $('#f_masalah_12').html(data[i].progres.n12.permasalahan);

          }
        }
        }
      })
    }

    function rubah(angka){
        var reverse = '0';
      if(typeof  angka !== 'undefined'){
         reverse = angka.toString().split('').reverse().join('');
       }
         var ribuan = reverse.match(/\d{1,3}/g);
         ribuan = ribuan.join('.').split('').reverse().join('');
     return ribuan;
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

    function loadbulan(param){

      $.ajax({
          type: 'post',
          dataType: 'json',
          url: 'loadminggu',
          data : {
                  code      : param,
          },
          success: function(result){
              let data = result.data;
              if(typeof data[0] !== 'undefined'){
                $('#progres_mingu_1').val(data[0].m1);
                $('#edit_1').attr('idnya',data[0].id);
                $('#total_progres').val(data[0].m1);
                $('#progres_bulan_lalu').val(data[0].total_sebelumnya);
              }else{
                $('#progres_mingu_1').val('');
                $('#progres_mingu_1').prop('disabled', false);
                $('#save_minggu_1').prop('disabled', false);
              }

              if(typeof data[1] !== 'undefined'){
                $('#progres_mingu_2').val(data[1].m2);
                $('#edit_2').attr('idnya',data[1].id);
                $('#total_progres').val(data[1].m2);
                $('#progres_bulan_lalu').val(data[1].total_sebelumnya);
              }else{
                $('#progres_mingu_2').val('');
                $('#progres_mingu_2').prop('disabled', false);
                $('#save_minggu_2').prop('disabled', false);
              }

              if(typeof data[2] !== 'undefined'){
                $('#progres_mingu_3').val(data[2].m3);
                $('#edit_3').attr('idnya',data[2].id);
                $('#total_progres').val(data[2].m3);
                $('#progres_bulan_lalu').val(data[2].total_sebelumnya);
              }else{
                $('#progres_mingu_3').val('');
                $('#progres_mingu_3').prop('disabled', false);
                $('#save_minggu_3').prop('disabled', false);
              }

              if(typeof data[3] !== 'undefined'){
                $('#progres_mingu_4').val(data[3].m4);
                $('#edit_4').attr('idnya',data[3].id);
                $('#total_progres').val(data[3].m4);
                $('#progres_bulan_lalu').val(data[3].total_sebelumnya);
              }else{
                $('#progres_mingu_4').val('');
                $('#progres_mingu_4').prop('disabled', false);
                $('#save_minggu_4').prop('disabled', false);
              }

              if(typeof data[4] !== 'undefined'){
                $('#progres_mingu_5').val(data[4].m5);
                $('#edit_5').attr('idnya',data[4].id);
                $('#total_progres').val(data[4].m5);
                $('#progres_bulan_lalu').val(data[4].total_sebelumnya);
              }else{
                $('#progres_mingu_5').val('');
                $('#progres_mingu_5').prop('disabled', false);
                $('#save_minggu_5').prop('disabled', false);
              }

                if(typeof data[0] !== 'undefined'){
                  if(data[0].m1){
                    $('#progres_mingu_1').prop('disabled', true);
                    $('#save_minggu_1').prop('disabled', true);
                  }else{
                    $('#progres_mingu_1').prop('disabled', false);
                    $('#save_minggu_1').prop('disabled', false);
                  }
                }else{
                  $('#progres_mingu_1').val('');
                }

                if(typeof data[1] !== 'undefined'){
                  if(data[1].m2){
                    $('#progres_mingu_2').prop('disabled', true);
                    $('#save_minggu_2').prop('disabled', true);
                  }else{
                    $('#progres_mingu_2').prop('disabled', false);
                    $('#save_minggu_2').prop('disabled', false);
                  }
                }else{
                  $('#progres_mingu_2').val('');
                }

                if(typeof data[2] !== 'undefined'){
                  if(data[2].m3){
                    $('#progres_mingu_3').prop('disabled', true);
                    $('#save_minggu_3').prop('disabled', true);
                  }else{
                    $('#progres_mingu_3').prop('disabled', false);
                    $('#save_minggu_3').prop('disabled', false);
                  }
                }else{
                  $('#progres_mingu_3').val('');
                }

                if(typeof data[3] !== 'undefined'){
                  if(data[3].m4){
                    $('#progres_mingu_4').prop('disabled', true);
                    $('#save_minggu_4').prop('disabled', true);
                  }else{
                    $('#progres_mingu_4').prop('disabled', false);
                    $('#save_minggu_4').prop('disabled', false);
                  }
                }else{
                  $('#progres_mingu_4').val('');
                }

                if(typeof data[4] !== 'undefined'){
                  if(data[4].m5){
                    $('#progres_mingu_5').prop('disabled', true);
                    $('#save_minggu_5').prop('disabled', true);
                  }else{
                    $('#progres_mingu_5').prop('disabled', false);
                    $('#save_minggu_5').prop('disabled', false);
                  }
                }else{
                  $('#progres_mingu_5').val('');
                }

            }
          });
        }

  function editdong(ke){
    if($('#progres_mingu_'+ke).val()){
      if($('#edit_'+ke).is(":checked")){
        $('#progres_mingu_'+ke).prop('disabled', false);
        $('#save_minggu_'+ke).prop('disabled', false);
      }else{
        $('#progres_mingu_'+ke).prop('disabled', true);
        $('#save_minggu_'+ke).prop('disabled', true);
      }
    }

  }
