"use strict";
console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  $('#nav-menu li').removeClass();
  $('#nav-menu li#menu-data').addClass('open');
  $('#nav-menu li#menu-subkegiatan').addClass('active');

  $('#all-subkegiatan').DataTable();

  loadkegiatan("program",0);
  loadsubkegiatan('');

  $('#save_subkegiatan').on('click', function(){
      var kode_program = $('#kode_program').val();
      var kode_kegiatan = $('#kode_kegiatan').val();
      var kode_subkegiatan = $('#kode_subkegiatan').val();
      var nama_subkegiatan = $('#nama_subkegiatan').val();

      var formData = new FormData();
      formData.append('param', 'data_subkegiatan');
      formData.append('kode_program', kode_program);
      formData.append('kode_kegiatan', kode_kegiatan);
      formData.append('kode_subkegiatan', kode_subkegiatan);
      formData.append('nama_subkegiatan', nama_subkegiatan);
      save(formData);
  });

$("#kode_program").chosen().change(function(){
  loadkegiatan("kegiatan",this.value);
});

});

function loadsubkegiatan(param){

  $.ajax({
      type: 'post',
      dataType: 'json',
      url: 'loadsubkegiatan',
      data : {
              param      : param,
      },
      success: function(result){
          let data = result.data;
          var dt = $('#all-subkegiatan').DataTable({
            destroy: true,
            paging: true,
            lengthChange: false,
            searching: true,
            ordering: true,
            info: true,
            autoWidth: false,
            responsive: false,
            pageLength: 10,
            aaData: result.data,
            aoColumns: [
                { 'mDataProp': 'id', 'width':'10%'},
                { 'mDataProp': 'kode_program'},
                { 'mDataProp': 'kode_kegiatan'},
                { 'mDataProp': 'kode_subkegiatan'},
                { 'mDataProp': 'nama_subkegiatan'},
                { 'mDataProp': 'user_status'},
            ],
            order: [[0, 'ASC']],
            fixedColumns: true,
            aoColumnDefs:[
              { width: 50, targets: 0 },
              {
                  mRender: function ( data, type, row ) {

                    var el = `<button class="btn btn-xs btn-success" onclick="action(\'delete\','+row.user_id+',\'\')">
																<i class="ace-icon fa fa-edit bigger-120"></i>
															</button>
                              <button class="btn btn-xs btn-danger" onclick="action(\'delete\','+row.user_id+',\'\')">
          																<i class="ace-icon fa fa-trash-o bigger-120"></i>
          															</button>`;

                      return el;
                  },
                  aTargets: [5]
              },
            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull){
                var index = iDisplayIndexFull + 1;
                $('td:eq(0)', nRow).html('#'+index);
                return  index;
            },
            fnInitComplete: function () {

                var that = this;
                var td ;
                var tr ;
                this.$('td').click( function () {
                    td = this;
                });
                this.$('tr').click( function () {
                    tr = this;
                });
            }
        });

        let first_row = dt.row(':first').data();
        $('#satuan_code').val(parseInt(first_row.id) + 1 + '0');

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
        if(typeof data == 'object'){
          for (var i = 0; i < data.length; i++) {
            el1 += '<option value="'+data[i].kode_program+'">'+data[i].kode_program+'</option>';
            el2 += '<option value="'+data[i].kode_kegiatan+'">'+data[i].kode_kegiatan+'</option>';
          }
        }

        if(param == 'program'){
          $('#kode_program').html(el1);
          $('#kode_program').trigger("chosen:updated");
        }else if(param == 'kegiatan'){
          $('#kode_kegiatan').html(el2);
          $('#kode_kegiatan').trigger("chosen:updated");
        }
        }
      })
    }


function save(formData){

  $.ajax({
      type: 'post',
      processData: false,
      contentType: false,
      url: 'addKegiatan',
      data : formData,
      success: function(result){
        Swal.fire({
          type: 'success',
          title: 'Berhasil Tambah Sub Kegiatan !',
          showConfirmButton: true,
          // showCancelButton: true,
          confirmButtonText: `Ok`,
        }).then((result) => {
          $(document).ready(function(){
              loadkegiatan('');
              $('#kode_program').val(0).trigger("chosen:updated");
              $('#kode_kegiatan').val(0).trigger("chosen:updated");
              $('#kode_subkegiatan').val('');
              $('#nama_subkegiatan').val('');

          });
        })
      }
    });
  };
