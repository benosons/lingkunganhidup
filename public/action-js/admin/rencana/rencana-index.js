"use strict";
console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  $('#nav-menu li').removeClass();
  $('#nav-menu li#menu-rencana').addClass('active');

  $('#all-target').DataTable();

  loadtarget('');

});

function loadtarget(param){

  $.ajax({
      type: 'post',
      dataType: 'json',
      url: 'loadtarget',
      data : {
              code      : param,
      },
      success: function(result){
          let data = result.data;
          var dt = $('#all-target').DataTable({
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
                { 'mDataProp': 'nama_paket'},
                { 'mDataProp': 'pagu'},
                { 'mDataProp': 'pagu'},
            ],
            order: [[0, 'ASC']],
            fixedColumns: true,
            aoColumnDefs:[
              { width: 50, targets: 0 },
              {
                  mRender: function ( data, type, row ) {

                    var el = `Rp. `+data;

                      return el;
                  },
                  aTargets: [5]
              },
              {
                  mRender: function ( data, type, row ) {

                    var el = `
                              <button class="btn btn-xs btn-primary" onclick="window.location.href = 'rencana?param=view&ids=`+row.id+`'">
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
      })
    }
