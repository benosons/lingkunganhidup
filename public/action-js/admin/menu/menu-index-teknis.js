"use strict";
console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  $('#nav-menu li').removeClass();
  // $('#nav-menu li#menu-data').addClass('open');
  $('#nav-menu li#menu-teknis').addClass('active');

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

  $('#modal_program').on('shown.bs.modal', function () {


  })

  $('#all-permohonan').DataTable();
  $('#data-file').DataTable();

  loadpermohonan('1');

  $('#mohon_save').on('click', function(){

      var formData = new FormData();
      formData.append('param', 'data_permohonan');
      formData.append('type', '1');
      for (let index = 1; index <= 8; index++) {
        formData.append('input_'+index, $('#input_'+index).val());
      }

      // formData.append("file[doc_kajian]", $('#doc_kajian')[0].files[0]);
      // formData.append("bab_kajian", $('#bab_kajian').val());
      // formData.append("file[doc_standar]", $('#doc_standar')[0].files[0]);
      // formData.append("bab_standar", $('#bab_standar').val());
      
      save(formData);
  });

  $('#submit_kajian').on('click', function(){

    var formData = new FormData();
    formData.append('id', $('#ini-ID').val());
    formData.append('param', 'param_file');
    formData.append('type', '1');

    formData.append("file[doc_kajian]", $('#doc_kajian')[0].files[0]);
    formData.append("bab", $('#bab_kajian').val());
    
    upload(formData);
});

$('#submit_standar').on('click', function(){

  var formData = new FormData();
  formData.append('id', $('#ini-ID').val());
  formData.append('param', 'param_file');
  formData.append('type', '1');

  formData.append("file[doc_standar]", $('#doc_standar')[0].files[0]);
  formData.append("bab", $('#bab_standar').val());
  
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
                                  </button>`;

                        if($('#role').val() == '1' || $('#role').val() == '2') {
                          
                          el += `<button class="btn btn-xs btn-danger" onclick="action(\'delete\','+row.user_id+',\'\')">
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

  function action(mode, id, type, keterangan){
    if(mode == 'view'){
      $('#modal_file').modal('show');
      $('#ini-ID').val(id);
      $.ajax({
          type: 'post',
          dataType: 'json',
          url: 'loadfile',
          data : {
              id        : id,
              type      : type,
              jenis      : 'doc_kajian',
          },
          success: function(result){
            loadstatus(id, 1, 'doc_kajian' );
            let data = result.data;
            
            if(data.length){
              var dt = $('#data-file-kajian').DataTable({
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
                    { 'mDataProp': 'bab'},
                    { 'mDataProp': 'filename'},
                    // { 'mDataProp': 'size'},
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
                  //     aTargets: [3]
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
                          
                        var el =`<select class="form-control" id="status_1_`+row.id+`" >
                                  <option value=""> - </option>
                                  <option `+rev+` value="1"> Revisi </option>
                                  <option `+done+` value="0"> Selesai </option>
                                </select>`;
                        }else{
                          var el = data;
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
                        var el =`<textarea style="width:150px;" id="keterangan_1_`+row.id+`">`+data+`</textarea>`;
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
                        el += `<button class="btn btn-xs btn-danger" onclick="action(\'delete\','+row.user_id+',\'\')">
                                  <i class="ace-icon fa fa-trash-o bigger-120"></i>
                                </button>`;
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
            }
            // $('#create_date').html(data[0]['created_date']);
            // for (let index = 0; index < data.length; index++) {
            //   if(data[index]['jenis'] == 'doc_kajian'){
            //       $('#file_name_kajian').html(data[index]['filename']);
            //       $('#file_name_kajian').attr('href', 'public'+ '/'+ data[index]['path']+'/'+data[index]['filename']);
            //       $('#file_size_kajian').html(bytesToSize(parseInt(data[index]['size'])));
            //   }else if(data[index]['jenis'] == 'doc_standar'){
            //     $('#file_name_standar').html(data[index]['filename']);
            //     $('#file_name_standar').attr('href', 'public'+ '/'+ data[index]['path']+'/'+data[index]['filename']);
            //     $('#file_size_standar').html(bytesToSize(parseInt(data[index]['size'])));
            //   }
              
              
            // }
          }
      })
      $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'loadfile',
        data : {
            id        : id,
            type      : type,
            jenis      : 'doc_standar',
        },
        success: function(result){
          loadstatus(id, 1, 'doc_standar');
          let data = result.data;
          
          if(data.length){
            var dt = $('#data-file-standar').DataTable({
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
                  { 'mDataProp': 'bab'},
                  { 'mDataProp': 'filename'},
                  // { 'mDataProp': 'size'},
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
                //     aTargets: [3]
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
                      
                    var el =`<select class="form-control" id="status_1_`+row.id+`" >
                              <option value=""> - </option>
                              <option `+rev+` value="1"> Revisi </option>
                              <option `+done+` value="0"> Selesai </option>
                            </select>`;
                    }else{
                        var el = data;
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
                    var el =`<textarea style="width:150px;" id="keterangan_1_`+row.id+`">`+data+`</textarea>`;
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
                        el += `<button class="btn btn-xs btn-danger" onclick="action(\'delete\','+row.user_id+',\'\')">
                                  <i class="ace-icon fa fa-trash-o bigger-120"></i>
                                </button>`;
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
          }
          // $('#create_date').html(data[0]['created_date']);
          // for (let index = 0; index < data.length; index++) {
          //   if(data[index]['jenis'] == 'doc_kajian'){
          //       $('#file_name_kajian').html(data[index]['filename']);
          //       $('#file_name_kajian').attr('href', 'public'+ '/'+ data[index]['path']+'/'+data[index]['filename']);
          //       $('#file_size_kajian').html(bytesToSize(parseInt(data[index]['size'])));
          //   }else if(data[index]['jenis'] == 'doc_standar'){
          //     $('#file_name_standar').html(data[index]['filename']);
          //     $('#file_name_standar').attr('href', 'public'+ '/'+ data[index]['path']+'/'+data[index]['filename']);
          //     $('#file_size_standar').html(bytesToSize(parseInt(data[index]['size'])));
          //   }
            
            
          // }
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
          
          if(jenis == 'doc_kajian'){
            for (let i = 0; i < data.length; i++) {
              $('#bab_kajian option[value="'+data[i]['bab']+'"]').prop('disabled',true);
              $('#bab_kajian').trigger("chosen:updated");
              
            }
          }else if(jenis == 'doc_standar'){
            for (let i = 0; i < data.length; i++) {
              $('#bab_standar option[value="'+data[i]['bab']+'"]').prop('disabled',true);
              $('#bab_standar').trigger("chosen:updated");
              
            }
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
