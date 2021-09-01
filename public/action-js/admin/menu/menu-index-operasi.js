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
    thumbnail:false, //| true | large
    //whitelist:'gif|png|jpg|jpeg'
    //blacklist:'exe|php'
    //onchange:''
    //
    before_remove : function() {
      $('#submit_doc').prop('disabled', true);
      return true;
    }
  }).on('change', function(){
    $('#submit_doc').prop('disabled', false);
  });

  $('#all-permohonan').DataTable();
  $('#data-file-doc').DataTable();

  loadpermohonan('2');

  $('#mohon_save').on('click', function(){

      var formData = new FormData();
      formData.append('param', 'data_permohonan');
      formData.append('type', '2');
      let berapa = [];
      for (let index = 1; index <= 8; index++) {
        if($('#input_'+index).val()){
          formData.append('input_'+index, $('#input_'+index).val());
          $('#input_'+index).parent().parent().removeClass('has-error');
          berapa.push(index);
        }else{
          $('#input_'+index).parent().parent().addClass('has-error');
        }
      }


      if(berapa.length == 8){
        save(formData);
      }
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
          let code = result.code;
          if(code != '0'){
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
                              </button>`;

                      if($('#role').val() == '1' || $('#role').val() == '2') {

                        el += `<button class="btn btn-xs btn-danger" onclick="action('delete',`+row.id+`,'`+row.type+`','','data_permohonan')">
          											<i class="ace-icon fa fa-trash-o bigger-120"></i>
          										</button>`;
                      }

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
          }else{
            var dt = $('#all-permohonan').DataTable();
            dt.clear().draw()
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
              location.reload()
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

  function action(mode, id, type, keterangan, param){
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
            let code = result.code;
            
            $('#ini-ID').val(id);
            if(code != '0'){
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
                    { 'mDataProp': 'jenis'},
                    { 'mDataProp': 'filename'},
                    { 'mDataProp': 'status'},
                    { 'mDataProp': 'created_date'},
                    { 'mDataProp': 'keterangan'},
                    { 'mDataProp': 'id'},
                ],
                order: [[0, 'ASC']],
                fixedColumns: true,
                aoColumnDefs:[
                  { width: 50, targets: 0 },
                  // {
                  //     mRender: function ( data, type, row ) {
    
                  //       var el = bytesToSize(parseInt(data));
    
                  //         return el;
                  //     },
                  //     aTargets: [2]
                  // },
                  {
                    mRender: function ( data, type, row ) {
  
                        if($('#role').val() == '10' || $('#role').val() == '100'){
                          let rev = '';
                          let done = '';
                          if(data == '1'){
                              rev = 'selected';
                          }

                          if(data == '0'){
                              done = 'selected';
                          }
                          
                        var el =`<select class="form-control" id="status_2_`+row.id+`" >
                                  <option value=""> - </option>
                                  <option `+rev+` value="1"> Revisi </option>
                                  <option `+done+` value="0"> Selesai </option>
                                </select>`;
                        }else{
                          if(data == '1'){
                            var el = '<span class="label label-danger arrowed">Revisi</span>';
                          }else if(data == '0'){
                            var el = '<span class="label label-primary arrowed">Selesai</span>';
                          }else{
                            var el = '-'
                          }
                        }
  
                        return el;
                    },
                    aTargets: [ 3 ]
                },
                {
                  mRender: function ( data, type, row ) {

                      if($('#role').val() == '10' || $('#role').val() == '100'){
                        if(data == null){
                          data = '';
                        }
                      var el =`<textarea style="width:150px;" id="keterangan_2_`+row.id+`">`+data+`</textarea>`;
                      }else{
                        var el = data;
                      }

                      return el;
                  },
                  aTargets: [ 5 ]
              },
              {
                mRender: function ( data, type, row ) {

                  var el = `<a class="btn btn-xs btn-warning" target="_blank" href="public/`+row.path+'/'+row.filename+`">
                            <i class="ace-icon fa fa-download bigger-120"></i>
                          </a>`;

                if($('#role').val() == '1' || $('#role').val() == '2') {
                  if(row.status == '1'){
                    el += `<button class="btn btn-xs btn-info" onclick="revisi('`+row.id+`','`+row.type+`','`+row.jenis+`','`+row.path+'/'+row.filename+`','`+row.jenis+`')">
                                  <i class="ace-icon fa fa-edit bigger-120"></i>
                                </button>`;

                    el += `<button class="btn btn-xs btn-danger" onclick="action(\'delete\','+row.user_id+',\'\')">
                            <i class="ace-icon fa fa-trash-o bigger-120"></i>
                          </button>`;
                  }
                  
                }else{
                  el += `<button class="btn btn-xs btn-success" onclick="action('update','`+row.id+`','`+row.type+`')">
                            <i class="ace-icon fa fa-check-square-o bigger-120"></i>
                          </button>`;
                }

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
            }else{
              var dt = $('#data-file-doc').DataTable();
              dt.clear().draw();
            }

          }
        })
      }else if(mode == 'update'){
        let stat = $('#status_'+type+'_'+id).val();
        let keterangan = $('#keterangan_'+type+'_'+id).val();
        
        $.ajax({
          type: 'post',
          dataType: 'json',
          url: 'updatestatus',
          data : {
              table     : 'param_file',
              id        : id,
              type      : type,
              stat      : stat,
              keterangan      : keterangan,
          },
          success: function(result){
            let data = result.data;
            location.reload()
          }
        })
      }else if(mode == 'delete'){
        bootbox.confirm({
            message: "Anda Yakin <b>Hapus</b> data ini?",
            buttons: {
            confirm: {
                label: '<i class="fa fa-check"></i> Ya',
                className: 'btn-success btn-xs',
            },
            cancel: {
                label: '<i class="fa fa-times"></i> Tidak',
                className: 'btn-danger btn-xs',
            }
          },
          callback : function(result) {
          if(result) {
              $.ajax({
                type: 'post',
                dataType: 'json',
                url: 'deletedata',
                data : {
                    param     : param,
                    id        : id,
                    type      : type,
                },
                success: function(result){
                  location.reload()
                }
              })
            }
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

    function revisi(id, type, jenis, path){
      $('#edit_group').removeAttr('hidden');
      $('#jenis_edit').val(jenis);
      $('#id_edit').val(id);
      $('#path_edit').val(path);
      $('#type_edit').val(type);
      
      };

      $('#submit_edit').on('click', function(){
      
        var formData = new FormData();
        formData.append('id', $('#id_edit').val());
        formData.append('path', $('#path_edit').val());
        formData.append('type', $('#type_edit').val());
        formData.append("file[]", $('#edit_file')[0].files[0]);
  
        $.ajax({
            type: 'post',
            processData: false,
            contentType: false,
            url: 'editfile',
            data : formData,
            success: function(result){
              location.reload();
            }
          });
        
        });

    function bytesToSize(bytes) {
      var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      if (bytes == 0) return '0 Byte';
      var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
   }
