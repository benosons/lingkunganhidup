"use strict";
console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  $('#nav-menu li').removeClass();
  // $('#nav-menu li#menu-data').addClass('open');
  $('#nav-menu li#menu-operasi').addClass('active');

  $('[name="id-input-file-3"]').ace_file_input({
    no_file:'tidak ada file ...',
    btn_choose:'Pilih File',
    btn_change:'Ganti',
    droppable:false,
    onchange:null,
    thumbnail:false //| true | large
    //whitelist:'gif|png|jpg|jpeg'
    //blacklist:'exe|php'
    //onchange:''
    //
  });

  $('#all-permohonan').DataTable();
  $('#data-file-doc').DataTable();

  loadpermohonan('2');

  $('#mohon_save').on('click', function(){

      var formData = new FormData();
      formData.append('param', 'data_permohonan');
      formData.append('type', '2');
      for (let index = 1; index <= 8; index++) {
        formData.append('input_'+index, $('#input_'+index).val());
      }


      save(formData);
  });

  $('#submit_doc').on('click', function(){

    var formData = new FormData();
    formData.append('id', $('#ini-ID').val());
    formData.append('param', 'param_file');
    formData.append('type', '2');

    switch ($('#jenis_doc').val()) {
      case 'doc_izin_usaha':
        formData.append("file[doc_izin_usaha]", $('#doc_')[0].files[0]);
        
          break;
      case 'doc_persetujauan_lingkungan':
        formData.append("file[doc_persetujauan_lingkungan]", $('#doc_')[0].files[0]);
        
          break;
      case 'doc_persetujuan_teknis':
        formData.append("file[doc_persetujuan_teknis]", $('#doc_')[0].files[0]);
        
          break;
      case 'doc_hasil_pemantauan':
        formData.append("file[doc_hasil_pemantauan]", $('#doc_')[0].files[0]);
        
          break;
      case 'doc_kontrol_jaminan':
        formData.append("file[doc_kontrol_jaminan]", $('#doc_')[0].files[0]);
        
          break;
      case 'doc_sertifikat_registrasi':
        formData.append("file[doc_sertifikat_registrasi]", $('#doc_')[0].files[0]);
        
          break;
    }

    
    upload(formData);
});

});

function loadpermohonan(param){

  $.ajax({
      type: 'post',
      dataType: 'json',
      url: 'loadpermohonan',
      data : {
              param      : param,
      },
      success: function(result){
          let data = result.data;
          if(data.length){
          var dt = $('#all-permohonan').DataTable({
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
                { 'mDataProp': 'p1'},
                { 'mDataProp': 'p2'},
                { 'mDataProp': 'p3'},
                { 'mDataProp': 'p4'},
                { 'mDataProp': 'p5'},
                { 'mDataProp': 'p6'},
                { 'mDataProp': 'p7'},
                { 'mDataProp': 'p8'},
                { 'mDataProp': 'id'},
            ],
            order: [[0, 'ASC']],
            fixedColumns: true,
            aoColumnDefs:[
              { width: 50, targets: 0 },
              {
                  mRender: function ( data, type, row ) {

                    var el = `<button class="btn btn-xs btn-info" onclick="action('view',`+row.id+`,'`+row.type+`')">
                                <i class="ace-icon fa fa-file bigger-120"></i>
                              </button>

                              <button class="btn btn-xs btn-danger" onclick="action(\'delete\','+row.user_id+',\'\')">
          											<i class="ace-icon fa fa-trash-o bigger-120"></i>
          										</button>`;

                      return el;
                  },
                  aTargets: [9]
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
          }

        }
      })
    }

function save(formData){

  $.ajax({
      type: 'post',
      processData: false,
      contentType: false,
      url: 'addpermohonan',
      data : formData,
      success: function(result){
        Swal.fire({
          type: 'success',
          title: 'Berhasil Tambah Permohonan !',
          showConfirmButton: true,
          // showCancelButton: true,
          confirmButtonText: `Ok`,
        }).then((result) => {
          $(document).ready(function(){

          });
        })
      }
    });
  };

  function upload(formData){

    $.ajax({
        type: 'post',
        processData: false,
        contentType: false,
        url: 'uploadfile',
        data : formData,
        success: function(result){
          location.reload()
        }
      });
    };

  function action(mode, id, type){
    if(mode == 'view'){
      $('#modal_file').modal('show');
      loadstatus(id, 2);
      $.ajax({
          type: 'post',
          dataType: 'json',
          url: 'loadfile',
          data : {
              id        : id,
              type      : type,
          },
          success: function(result){
            let data = result.data;
            console.log(data);
            $('#ini-ID').val(id);
            if(data.length){
              var dt = $('#data-file-doc').DataTable({
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
                    // { 'mDataProp': 'jenis'},
                    { 'mDataProp': 'filename'},
                    { 'mDataProp': 'size'},
                    { 'mDataProp': 'status'},
                    { 'mDataProp': 'created_date'},
                    { 'mDataProp': 'keterangan'},
                    { 'mDataProp': 'id'},
                ],
                order: [[0, 'ASC']],
                fixedColumns: true,
                aoColumnDefs:[
                  { width: 50, targets: 0 },
                  {
                      mRender: function ( data, type, row ) {
    
                        var el = bytesToSize(parseInt(data));
    
                          return el;
                      },
                      aTargets: [2]
                  },
                  {
                      mRender: function ( data, type, row ) {
    
                        var el = `<a class="btn btn-xs btn-warning" target="_blank" href="public/`+row.path+'/'+row.filename+`">
                                    <i class="ace-icon fa fa-download bigger-120"></i>
                                  </a>
                                  
                                  <button class="btn btn-xs btn-danger" onclick="action(\'delete\','+row.user_id+',\'\')">
                                    <i class="ace-icon fa fa-trash-o bigger-120"></i>
                                  </button>`;
    
                          return el;
                      },
                      aTargets: [6]
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
            }

          }
        })
      }else if(mode == 'update'){
        $.ajax({
          type: 'post',
          dataType: 'json',
          url: 'updatestatus',
          data : {
              table     : 'data_permohonan',
              id        : id,
              type      : type,
          },
          success: function(result){
            let data = result.data;
            loadstatus(id);
          }
        })
      }
    }

    function loadstatus(id, type, jenis){
      $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'loadstatus',
        data : {
          id        : id,
          type        : type,
          jenis        : jenis,
        },
        success: function(result){
          let data = result.data;
            
            for (let i = 0; i < data.length; i++) {
              $('#jenis_doc option[value="'+data[i]['jenis']+'"]').prop('disabled',true);
              $('#jenis_doc').trigger("chosen:updated");
              
            }
        }
      })
    }

    function bytesToSize(bytes) {
      var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      if (bytes == 0) return '0 Byte';
      var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
   }
