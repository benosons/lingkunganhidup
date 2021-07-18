console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  window.baseURL = $('#baseUrl').val();
  $('ul.sf-menu > li.selected').removeClass('selected');
  $('#menu-profile').addClass('selected');

});
