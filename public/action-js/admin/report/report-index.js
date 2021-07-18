"use strict";
console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  $('#nav-menu li').removeClass();
  $('#nav-menu li#menu-report').addClass('active');

  $('#all-report').DataTable({
    "ordering": false
  });

  loadall('n1');

});

function loadall(param){

  $.ajax({
      type: 'post',
      dataType: 'json',
      url: 'loadall',
      data : {
              code      : param,
      },
      success: function(result){
          let data = result.data;
          var prog = '';
          for (var i = 0; i < data.length; i++) {
           prog += `<tr>
                    <td></td>
                    <td>`+data[i].kode_program+`</td>
                    <td>`+data[i].nama_program+`</td>
                    <td>`+data[i].pagu_program+`</td>
                    <td>459.736.170</td>
                    <td>4,39</td>
                    <td>239.731.702</td>
                    <td>2,29</td>
                    <td>4,07</td>
                    <td>2,29</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>`;
                  var kegiatan = data[i].kegiatan;
                  if (typeof(kegiatan) === 'object') {
                    for (var i = 0; i < kegiatan.length; i++) {
                      prog += `<tr>
                              <td></td>
                              <td>`+kegiatan[i].kode_kegiatan+`</td>
                              <td>`+kegiatan[i].nama_kegiatan+`</td>
                              <td>`+kegiatan[i].pagu_kegiatan+`</td>
                              <td>459.736.170</td>
                              <td>4,39</td>
                              <td>239.731.702</td>
                              <td>2,29</td>
                              <td>4,07</td>
                              <td>2,29</td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>`;

                      var subkegiatan = kegiatan[i].subkegiatan;
                      for (var i = 0; i < subkegiatan.length; i++) {
                        prog += `<tr>
                                <td>1</td>
                                <td>`+subkegiatan[i].kode_subkegiatan+`</td>
                                <td>`+subkegiatan[i].nama_subkegiatan+`</td>
                                <td>`+subkegiatan[i].pagu_subkegiatan+`</td>
                                <td>10.959.500</td>
                                <td>1,57</td>
                                <td>2.883.500</td>
                                <td>0,41</td>
                                <td>1,57</td>
                                <td>0,41</td>
                                <td>-1,15</td>
                                <td>-1,16</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                              </tr>`;

                        var paket = subkegiatan[i].paket;
                        for (var i = 0; i < paket.length; i++) {
                          var target = paket[i].target;
                          var realisasi = paket[i].realisasi;
                          prog += `<tr>
                                  <td></td>
                                  <td></td>
                                  <td>`+paket[i].nama_paket+`</td>
                                  <td>`+paket[i].pagu_paket+`</td>
                                  <td>10.959.500</td>
                                  <td>21,92</td>
                                  <td>2.883.500</td>
                                  <td>5,77</td>
                                  <td>21,98</td>
                                  <td>5,77</td>
                                  <td>-16,15</td>
                                  <td>-16,15</td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                </tr>`;

                        }
                      }


                    }


                    }



          }
          $('#data_all').html(prog);
        //   var dt = $('#all-rekap').DataTable({
        //     destroy: true,
        //     paging: true,
        //     lengthChange: false,
        //     searching: true,
        //     ordering: true,
        //     info: true,
        //     autoWidth: false,
        //     responsive: false,
        //     pageLength: 10,
        //     aaData: result.data,
        //     aoColumns: [
        //         { 'mDataProp': 'id', 'width':'10%'},
        //         { 'mDataProp': 'nip'},
        //         { 'mDataProp': 'user_fullname'},
        //         { 'mDataProp': 'nama_paket'},
        //         { 'mDataProp': 'pagu'},
        //     ],
        //     order: [[0, 'ASC']],
        //     fixedColumns: true,
        //     aoColumnDefs:[
        //       { width: 50, targets: 0 },
        //       {
        //           mRender: function ( data, type, row ) {
        //
        //             var el = `
        //                       <button class="btn btn-xs btn-primary" onclick="window.location.href = 'rekap?param=view&ids=`+row.id+`'">
        //                         <i class="ace-icon fa fa-search bigger-120"></i>
        //                       </button>
        //                       <button class="btn btn-xs btn-success" onclick="action(\'delete\','+row.id+',\'\')">
				// 												<i class="ace-icon fa fa-edit bigger-120"></i>
				// 											</button>
        //                       <button class="btn btn-xs btn-danger" onclick="action(\'delete\','+row.id+',\'\')">
        //   											<i class="ace-icon fa fa-trash-o bigger-120"></i>
        //   										</button>`;
        //
        //               return el;
        //           },
        //           aTargets: [4]
        //       },
        //     ],
        //     fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull){
        //         var index = iDisplayIndexFull + 1;
        //         $('td:eq(0)', nRow).html('#'+index);
        //         return  index;
        //     },
        //     fnInitComplete: function () {
        //
        //         var that = this;
        //         var td ;
        //         var tr ;
        //         this.$('td').click( function () {
        //             td = this;
        //         });
        //         this.$('tr').click( function () {
        //             tr = this;
        //         });
        //     }
        // });

        }
      })
    }
