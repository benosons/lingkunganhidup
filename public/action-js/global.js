$(document).ready(function(){

  loadmenu('satuan');
  var f = document.createElement("iframe");
  f.src = "https://kopi.dev/widget-covid-19/?dark=true";
  f.width = "100%";
  f.height = 380;
  f.scrolling = "no";
  f.frameBorder = 0;
  f.id = 'covid-kopi';
  var rootEl = document.getElementsByClassName("kopi-covid");

  if(rootEl.length != 0){
    rootEl[0].appendChild(f);
  }

  if($(window).width() < 800){
    setTimeout(function(){
       $("#covid-jabar").attr('style', 'height:500px;');
       $("#covid-kopi").attr('style', 'height:500px;');

     }, 2000);

  }

});

function loadmenu(param){

$.ajax({
    type: 'post',
    dataType: 'json',
    url: 'loadparam',
    data : {
            param      : param,
            id         : '',
    },
    success: function(result){

        let data = result.data;
        var li = '';
        for (var i = 0; i < data.length; i++) {
            if(data[i].satuan_name == 'lantas'){
              var href = 'https://korlantas.polri.go.id/';
            }else{
              var href = '#';
            }
            li += `<li>
                  	<a href="`+href+`" target="_blank" title="Post Default">
                  		SAT `+data[i].satuan_name.toUpperCase()+`
                  	</a>
                  </li>`;
        }

        $('#satuan-fungsi').html(li);
      }
    });

  }

  function coronas(){
    $.ajax({
      type: 'post',
      dataType: 'json',
      url: "coronas",
      success: function(result){
        console.log(result);
      }
    });
  }
