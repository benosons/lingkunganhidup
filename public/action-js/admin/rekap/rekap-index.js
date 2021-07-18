"use strict";
console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  $('#nav-menu li').removeClass();
  $('#nav-menu li#menu-rekap').addClass('active');

  $('#all-rekap').DataTable();

  loadppk('');

});

function loadppk(param){

  $.ajax({
      type: 'post',
      dataType: 'json',
      url: 'loadnip',
      data : {
              code      : param,
      },
      success: function(result){
          let data = result.data;
          var dt = $('#all-rekap').DataTable({
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
                { 'mDataProp': 'nip'},
                { 'mDataProp': 'user_fullname'},
                { 'mDataProp': 'nama_paket'},
                { 'mDataProp': 'pagu'},
            ],
            order: [[0, 'ASC']],
            fixedColumns: true,
            aoColumnDefs:[
              { width: 50, targets: 0 },
              {
                  mRender: function ( data, type, row ) {

                    var el = `
                              <button class="btn btn-xs btn-primary" onclick="window.location.href = 'rekap?param=view&ids=`+row.id+`'">
                                <i class="ace-icon fa fa-search bigger-120"></i>
                              </button>
                              <button class="btn btn-xs btn-success" onclick="action(\'delete\','+row.id+',\'\')">
																<i class="ace-icon fa fa-edit bigger-120"></i>
															</button>
                              <button class="btn btn-xs btn-danger" onclick="action(\'delete\','+row.id+',\'\')">
          											<i class="ace-icon fa fa-trash-o bigger-120"></i>
          										</button>`;

                      return el;
                  },
                  aTargets: [4]
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
      })
    }
