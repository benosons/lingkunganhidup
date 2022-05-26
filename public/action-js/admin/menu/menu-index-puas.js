"use strict";
console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  $('#nav-menu li').removeClass();
  // $('#nav-menu li#menu-data').addClass('open');
  $('#nav-menu li#menu-puas').addClass('active');

  $('#all-loadkepuasan').DataTable();
  $('#data-file').DataTable();

  loadkepuasan($('#isRole').val());

  const ratingStars = [...document.getElementsByClassName("rating__star")];

  
  executeRating(ratingStars);

  $('#kepuasan_save').on('click', function(){
      let rating = $('.rating i');
      let ratingnya = [];
      for (let index = 0; index < rating.length; index++) {
        const element = rating[index];
        if($(element).hasClass('star-active')){
          ratingnya.push(true);
        }
      }

      var formData = new FormData();
      formData.append('nilai', ratingnya.length);
      formData.append('tingkat', $('#tingkat_kepuasan').val());
      formData.append('catatan', $('#catatan').val());

      savekepuasan(formData);
  })
});

function executeRating(stars) {
  
  const starClassActive = "rating__star star-active fa fa-star";
  const starClassInactive = "rating__star star-inactive fa fa-star";
  const starsLength = stars.length;
  let i;
  stars.map((star) => {
    star.onclick = () => {
      i = stars.indexOf(star);

      if (star.className===starClassInactive) {
        for (i; i >= 0; --i) stars[i].className = starClassActive;
      } else {
        for (i; i < starsLength; ++i) stars[i].className = starClassInactive;
      }
    };
  });
}



function loadkepuasan(param){
  sessionStorage.setItem('survey', 1)
  $.ajax({
      type: 'post',
      dataType: 'json',
      url: 'loadkepuasan',
      data : {
              param      : param,
      },
      success: function(result){
          let data = result.data;
          let code = result.code;

          if(code != '0'){
            if($('#isRole').val() == 1 || $('#isRole').val() == 2){
              console.log(data[0]);

              $('#tingkat_kepuasan').val(data[0].tingkat);
              $('#tingkat_kepuasan').trigger("chosen:updated");
              $('#catatan').val(data[0].catatan);
              
              let str = $('.rating i');
              for (let index = 0; index < data[0].nilai; index++) {
                const element = str[index];
                $(element).attr('class', 'rating__star fa fa-star star-active');
              }

              $('#kepuasan_save').prop('disabled', true);
              

            }else{
              var dt = $('#all-kepuasan').DataTable({
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
                      { 'mDataProp': 'user_fullname'},
                      { 'mDataProp': 'nilai'},
                      // { 'mDataProp': 'tingkat'},
                      { 'mDataProp': 'catatan'},
                  ],
                  order: [[0, 'ASC']],
                  fixedColumns: true,
                  aoColumnDefs:[
                    { width: 50, targets: 0 },
                    {
                      mRender: function ( data, type, row ) {
                        var el = `<div class="rating">`;
                        for (let index = 1; index <= data; index++) {
                          el += '<i class="rating__star star-active fa fa-star"></i>'
                        }
                        
                        el += `</div>`
    
                          return el;
                      },
                      aTargets: [2]
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

          }else{
            if($('#isRole').val() == 1){
              // $('#initambah').show()
              // $('#cekunggahan').hide()
              // $('#deletedataini').hide()
            }else{
              var tb = $('#all-kepuasan').DataTable()
              tb.clear().draw();
            }
            
          }

        }
      })
    }

function savekepuasan(formData){

  $.ajax({
      type: 'post',
      processData: false,
      contentType: false,
      url: 'addkepuasan',
      data : formData,
      success: function(result){
        Swal.fire({
          type: 'success',
          title: 'Berhasil Memberi Nilai !',
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
