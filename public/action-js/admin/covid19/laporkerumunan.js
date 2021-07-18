console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  window.baseURL = $('#baseUrl').val();
  $('.pcoded-item li#menu-covid').addClass('active pcoded-trigger');
  $('#laporcovid').addClass('active');
  $('.note-toolbar .note-insert, .note-toolbar .note-table, .note-toolbar .note-style:first, .note-toolbar .note-para').remove();
  $('.note-toolbar.panel-heading').remove();
  $('.note-popover').remove();

  $('#setting-default').DataTable();
  $('.berita-tulis').hide();
  $('#post-berita').hide();

  loadparam('satuan');
  loadlaporan('','');

  $('#post-berita').on('click', function(){
      var judul = $('#judul').val();
      var isi = $('.berita-summernote').summernote('code');

      var formData = new FormData();
      formData.append('param', 'berita');
      formData.append('judul', judul);
      formData.append('isi', isi);
      // Attach file
      for (var i = 0; i < $('input[type=file]')[0].files.length; i++) {
        formData.append('lampiran[]', $('input[type=file]')[0].files[i]);
      }

      save(formData);
  });

});

function loadparam(param){

  $.ajax({
      type: 'post',
      dataType: 'json',
      url: 'loadparam',
      data : {
              param      : param,
      },
      success: function(result){
          let data = result.data;
          var opt = '<option value="0">- Pilih Satuan -</option>';
          for (var i = 0; i < data.length; i++) {
            opt += '<option value="'+data[i].satuan_code+'">'+data[i].satuan_desc+'</option>';
          }

          $('#tujuan').append(opt);
        }
      })
    }

function onberita(type){
    $('.page-list > li').removeClass('active');
    if(type == 'list'){
      $('#list-berita').addClass('active');
      $('.lapor-detail').prop('hidden', true);
      $('.lapor-list').prop('hidden', false);
      animate('.lapor-list', 'fadeIn');
    }
};

function save(formData){

  $.ajax({
      type: 'post',
      processData: false,
      contentType: false,
      url: 'saveBeritaCovid',
      data : formData,
      success: function(result){
        Swal.fire({
          type: 'success',
          title: 'Berita Berhasil Diposting !',
          showConfirmButton: true,
          // showCancelButton: true,
          confirmButtonText: `Ok`,
        }).then((result) => {
          $(document).ready(function(){
              $("#list-berita > div > a").trigger("click");
              $('#tujuan').prop("selectedIndex", 0).val();
              $('#judul').val('');
              $('#filer_input').val('');
              $('.berita-summernote').summernote('reset');
          });
        })
      }
    });
  };

  function loadlaporan(param, id){

    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'getLaporCovid',
        data : {
                param      : param,
                id         : id,
        },
        success: function(result){
            console.log(result.data);
            // $('#balas-pengaduan').attr("disabled", true);
            // $('.email-content').show();
            // $('.email-read').hide();
            // $('.email-compose').hide();
            //
            // $('#input-pengaduan').show();
            // $('#kirim-pengaduan').hide();
            //
            // $('.page-list li.active').removeClass();
            // if(param == 'inbox'){
            //   $('.page-list li#inbox').addClass('active');
            // }else{
            //   $('.page-list li#sent').addClass('active');
            // }

            var dt = $('#setting-default').DataTable({
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
                  { 'mDataProp': 'no_telepon'},
                  { 'mDataProp': 'nama'},
                  { 'mDataProp': 'create_date'},
                  { 'mDataProp': 'alamat'},
                  { 'mDataProp': 'create_date'},

              ],
              order: [[1, 'ASC']],
              fixedColumns: true,
              aoColumnDefs:[
                { width: 50, targets: 0 },
                {
                    mRender: function ( data, type, row ) {

                        let el = '';
                          el +=        `<button class="btn btn-mini btn-info" onclick="action('view', '`+row.id+`')"><i class="ti-eye"></i></button>
                                        <button class="btn btn-mini btn-danger" onclick="action('delete', '`+row.id+`')"><i class="icofont icofont-trash"></i></button>`;
                        return el;
                    },
                    aTargets: [ 5 ]
                },
                {
                  mRender: function ( data, type, row ) {
                    var el = '';
                    el = row.alamat +', '+ row.nama_desa +', '+ row.nama_kecamatan
                    return el;
                  },
                  aTargets: [ 4 ]
                },
                // {
                //   mRender: function ( data, type, row ) {
                //     var el =
                //     `<a href="#" onclick="loadpengaduan('read',`+row.id+`)" class="email-name">`+row.judul_berita+`</a>`;
                //     return el;
                //   },
                //   aTargets: [ 3 ]
                // },
                // {
                //     mRender: function ( data, type, row ) {
                //       var el =
                //       `<a href="email-inbox.html#"><i class="icofont icofont-clip"></i></a>`;
                //         return el;
                //     },
                //     aTargets: [ 4 ]
                // },
              ],
              fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull){
                  var index = iDisplayIndexFull + 1;
                  $('td:eq(0)', nRow).html('#'+index);
                  return  index;
              },
              fnInitComplete: function () {
                // var elemprimary = $('.js-primary');
                // for (var i = 0; i < elemprimary.length; i++) {
                //   var switchery = new Switchery(elemprimary[i], { color: '#1abc9c', jackColor: '#fff', size: 'small', className : 'switchery status' });
                //   elemprimary[i].onchange = function() {
                //     action('update',this.value, this.checked)
                //   }
                // }
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
      });
  };

  function action(mode, id, stat){

    let isObject    = {};
    isObject.mode   = mode;
    isObject.id     = id;
    isObject.stat   = stat;

      $.ajax({
          type: 'post',
          dataType: 'json',
          url: 'actionLaporCovid',
          data : {
                  param      : isObject,
          },
          success: function(result){
            let data = result.data[0];
            let lampiran = result.data[0].lampiran;
            let content = '';
            if(mode == 'view'){
              for (var i = 0; i < lampiran.length; i++) {
                content += `<div class="col-lg-4 col-sm-6">
                                <div class="thumbnail">
                                    <div class="thumb">
                                        <a href="` + window.baseURL + '/' + lampiran[i].path + lampiran[i].file_name + `" data-lightbox="1" target="_blank" data-title="My caption 1">
                                            <img src="` + window.baseURL + '/' + lampiran[i].path + lampiran[i].file_name + `" alt="" class="img-fluid img-thumbnail">
                                        </a>
                                    </div>
                                </div>
                            </div>`;
              }

              $('#detail-image').html(content);
              $('.lapor-detail').prop('hidden', false);
              $('.lapor-list').prop('hidden', true);
              animate('.lapor-detail', 'fadeIn');
            }

          }
        });
  }
