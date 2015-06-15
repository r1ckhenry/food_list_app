function getCurrList() {
  $.get('/foods')
    .done(function(res){
      console.log(res);
      $(res).each(function(i,e){
        var appendPage = '<div>' + e.name + '<button data-id="' + e.id + '" class="del">delete</button></div>';
        $('#currList').append(appendPage);
      });
    });
  }

function postToList(e) {
  e.preventDefault();
  var newItem = $('#newFood').serialize();
  $.post('/foods', newItem)
    .done(function(res){
      var appendNewItem = '<div>' + res.name + '<button data-id="' + res.id + '" class="del">delete</button></div>';
      $('#currList').append(appendNewItem);
    });
}

function deleteListing(e) {
  e.preventDefault();
  $this = $(this);
  $.ajax({
    type: 'DELETE',
    url: '/foods/:id',
    data: { id: $this.attr('data-id')}
  }).done(function(res){
    var $itemRemove = $this.parent();
    $itemRemove.remove();
  });
  
}



$(document).ready(function(){

  getCurrList();
  $('#newFood').on('submit', postToList);
  $('#currList').on('click', '.del', deleteListing)

});