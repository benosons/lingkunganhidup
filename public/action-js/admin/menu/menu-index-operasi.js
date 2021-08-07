"use strict";
console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  $('#nav-menu li').removeClass();
  // $('#nav-menu li#menu-data').addClass('open');
  $('#nav-menu li#menu-operasi').addClass('active');

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
      for (let index = 1; index <= 8; index++) {
        formData.append('input_'+index, $('#input_'+index).val());
        
      }
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
                { 'mDataProp': 'input_1'},
                { 'mDataProp': 'input_2'},
                { 'mDataProp': 'input_3'},
                { 'mDataProp': 'input_4'},
                { 'mDataProp': 'input_5'},
                { 'mDataProp': 'input_6'},
                { 'mDataProp': 'input_7'},
                { 'mDataProp': 'input_8'},
                { 'mDataProp': 'id'},
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
