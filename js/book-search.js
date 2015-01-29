$(function(){

  //SPINNER
  var opts = {
    lines: 13, // The number of lines to draw
    length: 20, // The length of each line
    width: 10, // The line thickness
    radius: 30, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#000', // #rgb or #rrggbb or array of colors
    speed: 1, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: false, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: '50%', // Top position relative to parent
    left: '50%' // Left position relative to parent
  };
  var target = document.getElementById('spin');
  var spinner = new Spinner(opts).spin(target);
  $('#spin').hide();

  function bookSearch() {
    
    var searchTerm = $('#search-term').val();

    $('#search-term').val('');
    $('#results').empty();
    $('#spin').show();

    $.ajax({
      url: 'https://www.googleapis.com/books/v1/volumes?q='+searchTerm,
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        console.log(data);
        $('#spin').hide();
        $.each(data.items, function (i, book) {

          if (book.volumeInfo.authors) {
            var author = book.volumeInfo.authors[0];
          } else {
            var author = 'none';
          }

          if (book.volumeInfo.imageLinks) {
            var imageLink = book.volumeInfo.imageLinks.thumbnail;
          } else {
            var imageLink = 'http://fillmurray.com/100/100';
          }

          if (book.volumeInfo.title) {
            var title = book.volumeInfo.title;
          } else {
            var title = 'none';
          }

          if (book.volumeInfo.previewLink) {
            var previewLink = book.volumeInfo.previewLink;
          } else {
            var previewLink = 'http://google.com/books';
          }

          var book = '<div class="book">'+
                        '<a href="'+book.volumeInfo.previewLink+'">'+
                          '<img src="'+imageLink+'" alt="'+title+'">'+
                          '<h2>'+title+'</h2>'+
                          '<h3>'+author+'</h3>'+
                        '</a>'+
                      '</div>';

          $('#results').append(book);
        });

      },
      error: function (jqXHR, textStatus,  errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
      }
    });
  }

  $(document).keypress(function (event) {
    if (event.which === 13) {
      bookSearch();
    }
  });

  $('#search-button').click(bookSearch);

});