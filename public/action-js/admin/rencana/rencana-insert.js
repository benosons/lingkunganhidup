"use strict";
console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  $('#nav-menu li').removeClass();
  $('#nav-menu li#menu-rencana').addClass('active');
   $( '.uang, .uang-pagu' ).mask('000.000.000.000.000', {reverse: true});
  loadkegiatan("program",0);
  loadppk();

  $('#save_target').on('click', function(){
      var kode_program = $('#kode_program').val();
      var kode_kegiatan = $('#kode_kegiatan').val();
      var kode_subkegiatan = $('#kode_subkegiatan').val();
      var id_paket = $('#paket').val();
      var pagu_kegiatan = $('#pagu_kegiatan').val();
      var ktot = $('#ktot').val();
      var ftot = $('#ftot').val();
      var ppk = $('#pilih_ppk').val();
      var bidang = $('#pilih_bidang').val();
      var seksi = $('#pilih_seksi').val();

      var formData = new FormData();
      formData.append('param', 'data_target');
      formData.append('kode_program', kode_program);
      formData.append('kode_kegiatan', kode_kegiatan);
      formData.append('kode_subkegiatan', kode_subkegiatan);
      formData.append('id_paket', id_paket);
      formData.append('pagu_kegiatan', pagu_kegiatan);
      formData.append('ktot', ktot);
      formData.append('ftot', ftot);
      formData.append('ppk', ppk);
      formData.append('bidang', bidang);
      formData.append('seksi', seksi);

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

  $('#pilih_bidang').on('change', function(){
    var el = '<option value="">  </option>'
    switch (this.value) {
      case 'Infrastruktur Permukiman':
            el += `<option value="Drainase dan Air Limbah">Drainase dan Air Limbah</option>`
            el += `<option value="Air Minum">Air Minum</option>`
            el += `<option value="Persampahan">Persampahan</option>`;

        break;
      case 'Perumahan':
            el += `<option value="Penyelengaraan Bangunan Gedung" >Penyelengaraan Bangunan Gedung</option>`;
            el += `<option value="Rumah Khusus dan Swadaya" >Rumah Khusus dan Swadaya</option>`;
            el += `<option value="Rumah Umum" >Rumah Umum</option>`;
        break;
      case 'Kawasan Permukiman':
            el += '<option value="Penetaan Kawasan Permukian Perkotaan" >Penetaan Kawasan Permukian Perkotaan</option>';
            el += '<option value="Pedesaan" >Pedesaan</option>';
        break;
      case 'Pertanahan':
            el += '<option value="Perencanaan Pengadaan tanah">Perencanaan Pengadaan tanah</option>';
            el += '<option value="Data dan Informasi">Data dan Informasi</option>';
            el += '<option value="Penataan Gunaan tanah">Penataan Gunaan tanah</option>';
        break;
      case 'Sekretariat':
            el += '<option value="Subag PP">Subag PP</option>';
            el += '<option value="Kepegawaian dan Umum">Kepegawaian dan Umum</option>';
            el += '<option value="Gaji dan Keuangan">Gaji dan Keuangan</option>';
        break;
      case 'UPT P3JB':
            el += '<option value="Pengelolaan Rusunawa">Pengelolaan Rusunawa</option>';
        break;
      default:

    }

    $('#pilih_seksi').html(el).trigger("chosen:updated");
  })


  var ktot = [];
  $('.uang').keyup(function(){
    ktot = [];
    for (var i = 1; i <= 12; i++) {
      let vlue = $('#k'+i).val();
      let lue = vlue.replaceAll('.', '');
      let vl = ($('#k'+i).val() == '') ? 0 : parseInt(lue);
      ktot.push(vl);
    }
    ;
    $('#ktot').val(rubah(ktot.reduce((a, b) => a + b, 0)));
  })

  let ftot = [];
  $('.fis').keyup(function(){
    ftot = [];
    for (var i = 1; i <= 12; i++) {
      let vlue = $('#f'+i).val();
      if(vlue){
        ftot.push(vlue);
      }
    }
    $('#ftot').val(ftot[ftot.length - 1]);
  });

  function rubah(angka){
   var reverse = angka.toString().split('').reverse().join(''),
   ribuan = reverse.match(/\d{1,3}/g);
   ribuan = ribuan.join('.').split('').reverse().join('');
   return ribuan;
 }


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
  function loadppk(param, code){
      var formData = new FormData();
      formData.append('code', code);

    $.ajax({
        type: 'post',
        processData: false,
        contentType: false,
        url: 'loadppk',
        data : formData,
        success: function(result){

          let data = result.data;
          let elppk   = '<option value=""></option>';

            if(typeof data == 'object'){
              for (var i = 0; i < data.length; i++) {
                  elppk += '<option value="'+data[i].user_id+'">'+data[i].user_fullname+'</option>';
              }
            }

          $('#pilih_ppk').html(elppk).trigger('chosen:updated');
          }
        })
      }
