"use strict";
console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  $('#nav-menu li').removeClass();
  // $('#nav-menu li#menu-data').addClass('open');
  $('#nav-menu li#menu-teknis').addClass('active');

  $('[name="id-input-file-3"]').ace_file_input({
    style:'well',
    btn_choose:'Drop files here or click to choose',
    btn_change:null,
    no_icon:'ace-icon fa fa-cloud-upload',
    droppable:true,
    thumbnail:'small'//large | fit
    //,icon_remove:null//set null, to hide remove/reset button
    /**,before_change:function(files, dropped) {
      //Check an example below
      //or examples/file-upload.html
      return true;
    }*/
    /**,before_remove : function() {
      return true;
    }*/
    ,
    preview_error : function(filename, error_code) {
      //name of the file that failed
      //error_code values
      //1 = 'FILE_LOAD_FAILED',
      //2 = 'IMAGE_LOAD_FAILED',
      //3 = 'THUMBNAIL_FAILED'
      //alert(error_code);
    }

  }).on('change', function(){
    //console.log($(this).data('ace_input_files'));
    //console.log($(this).data('ace_input_method'));
  });

  $('#all-permohonan').DataTable();

  loadpermohonan('');

  $('#mohon_save').on('click', function(){

      var formData = new FormData();
      formData.append('param', 'data_permohonan');
      formData.append('type', '1');
      for (let index = 1; index <= 8; index++) {
        formData.append('input_'+index, $('#input_'+index).val());
      }

      formData.append("file[doc_kajian]", $('#doc_kajian')[0].files[0]);
      formData.append("file[doc_standar]", $('#doc_standar')[0].files[0]);
      
      save(formData);
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
                                <i class="ace-icon fa fa-search bigger-120"></i>
                              </button>
                              <button class="btn btn-xs btn-success" onclick="action(\'delete\','+row.user_id+',\'\')">
																<i class="ace-icon fa fa-edit bigger-120"></i>
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

        let first_row = dt.row(':first').data();
        $('#satuan_code').val(parseInt(first_row.id) + 1 + '0');

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

  function action(mode, id, type){
    if(mode == 'view'){
      $('#modal_file').modal('show');
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
            $('#create_date').html(data[0]['created_date']);
            for (let index = 0; index < data.length; index++) {
              if(data[index]['jenis'] == 'doc_kajian'){
                  $('#file_name_kajian').html(data[index]['filename']);
                  $('#file_name_kajian').attr('href', 'public'+ '/'+ data[index]['path']+'/'+data[index]['filename']);
                  $('#file_size_kajian').html(bytesToSize(parseInt(data[index]['size'])));
              }else if(data[index]['jenis'] == 'doc_standar'){
                $('#file_name_standar').html(data[index]['filename']);
                $('#file_name_standar').attr('href', 'public'+ '/'+ data[index]['path']+'/'+data[index]['filename']);
                $('#file_size_standar').html(bytesToSize(parseInt(data[index]['size'])));
              }
              
              
            }
          }
        })
      }
    }

    function bytesToSize(bytes) {
      var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      if (bytes == 0) return '0 Byte';
      var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
   }
