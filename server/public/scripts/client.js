$(document).ready(function(){
  console.log('jQuery sourced.');
  refreshBooks();
  addClickHandlers();
});

function addClickHandlers() {
  $('#submitBtn').on('click', handleSubmit);

  // TODO - Add code for edit & delete buttons
  $( '#bookShelf' ).on( 'click', '.deleteBookButton', deleteBook);
}

function handleSubmit() {
  console.log('Submit button clicked.');
  let book = {};
  book.author = $('#author').val();
  book.title = $('#title').val();
  addBook(book);
}

// adds a book to the database
function addBook(bookToAdd) {
  $.ajax({
    type: 'POST',
    url: '/books',
    data: bookToAdd,
    }).then(function(response) {
      console.log('Response from server.', response);
      refreshBooks();
    }).catch(function(error) {
      console.log('Error in POST', error)
      alert('Unable to add book at this time. Please try again later.');
    });
}

// refreshBooks will get all books from the server and render to page
function refreshBooks() {
  $.ajax({
    type: 'GET',
    url: '/books'
  }).then(function(response) {
    console.log(response);
    renderBooks(response);
  }).catch(function(error){
    console.log('error in GET', error);
  });
}


// Displays an array of books to the DOM
function renderBooks(books) {
  $('#bookShelf').empty();

  for(let i = 0; i < books.length; i += 1) {
    let book = books[i];
    // For each book, append a new row to our table
    $('#bookShelf').append(`
      <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td><button data-id="${books[i].id}"class="deleteBookButton">Delete</button></td>
      </tr>
    `);
  }
}

function deleteBook() {
  let myID = $( this ).data( 'id' );
  console.log( 'in deleteBook:', myID);
  // run ajax delete call
  $.ajax({
    method: 'DELETE',
    url: '/books/' + myID
  }).then( function( response) {
    console.log( 'back from DELETE with:', response);
    refreshBooks();
  }).catch( function( err ) {
    alert( 'error deleting book' );
    console.log( err );
  })
} // end deleteBook

function 
